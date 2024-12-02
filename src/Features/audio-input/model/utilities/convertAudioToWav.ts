export const convertAudioToWav = async (audioBlob: Blob): Promise<Blob> => {
	const audioContext = new AudioContext({ sampleRate: 16000 });
	const arrayBuffer = await audioBlob.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

	// Конвертируем в моно
	const offlineAudioContext = new OfflineAudioContext(1, audioBuffer.length, 16000);
	const bufferSource = offlineAudioContext.createBufferSource();
	bufferSource.buffer = audioBuffer;
	bufferSource.connect(offlineAudioContext.destination);
	bufferSource.start(0);

	const renderedBuffer = await offlineAudioContext.startRendering();
	return audioBufferToWav(renderedBuffer);
};

const audioBufferToWav = (audioBuffer: AudioBuffer): Blob => {
	const numOfChannels = audioBuffer.numberOfChannels;
	const length = 44 + audioBuffer.length * numOfChannels * 2;
	const buffer = new ArrayBuffer(length);
	const view = new DataView(buffer);

	// Создание WAV-заголовка
	writeString(view, 0, 'RIFF');
	view.setUint32(4, 36 + audioBuffer.length * 2, true); // Размер файла - 8 байт заголовка
	writeString(view, 8, 'WAVE');
	writeString(view, 12, 'fmt ');
	view.setUint32(16, 16, true); // Размер блока fmt
	view.setUint16(20, 1, true); // Аудиоформат (1 = PCM)
	view.setUint16(22, numOfChannels, true); // Количество каналов
	view.setUint32(24, audioBuffer.sampleRate, true); // Частота дискретизации
	view.setUint32(28, audioBuffer.sampleRate * numOfChannels * 2, true); // Байтовая скорость
	view.setUint16(32, numOfChannels * 2, true); // Количество байтов на сэмпл (включает все каналы)
	view.setUint16(34, 16, true); // Битность сэмпла
	writeString(view, 36, 'data');
	view.setUint32(40, audioBuffer.length * numOfChannels * 2, true); // Размер данных

	let offset = 44;
	for (let i = 0; i < numOfChannels; i++) {
		const channelData = audioBuffer.getChannelData(i);
		for (let j = 0; j < channelData.length; j++) {
			view.setInt16(offset, channelData[j] * 0x7fff, true);
			offset += 2;
		}
	}

	return new Blob([view], { type: 'audio/wav' });
};

const writeString = (view: DataView, offset: number, string: string) => {
	for (let i = 0; i < string.length; i++) {
		view.setUint8(offset + i, string.charCodeAt(i));
	}
};
