export default function useReplaceWriter() {
	const anonymousWriters = new Map<number, string>([]);

	function setWriter(writer: number) {
		if (!anonymousWriters.has(writer)) {
			anonymousWriters.set(writer, String(anonymousWriters.size + 1));
		}
	}

	function getWriterNickname(writer: number, nickname: string = '누군가') {
		const getResult = anonymousWriters.get(writer);
		return getResult ? nickname + getResult : getResult;
	}

	return ({ setWriter, getWriterNickname });
}
