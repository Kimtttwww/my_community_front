import { BoardAPI } from "@/entity/board/path/BoardAPI";

export class GuestApi {
	static readonly HOST = BoardAPI.HOST;
	static readonly LOGIN = this.HOST + '/guest/access';
}