export class BoardPath {
	static readonly HOST = process.env.SERVER_URL;
	static readonly BOARD_NAMES = this.HOST + '/metaboard/';
	static readonly BOARD_LIST = (domain: string) => `${this.HOST}/${domain}/`;
	static readonly BOARD = (domain: string, boardNo: number) => this.BOARD_LIST(domain) + boardNo;
	static readonly BOARD_TITLE = (domain: string) => this.BOARD_NAMES + domain;
	static readonly CATEGORY_LIST = (domain: string) => this.BOARD_LIST(domain) + 'category'
}
