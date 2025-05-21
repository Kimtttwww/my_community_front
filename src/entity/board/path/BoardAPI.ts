export class BoardAPI {
  static readonly HOST = process.env.SERVER_URL;
  static readonly BOARD_NAMES = this.HOST + '/metaboard/';
}
