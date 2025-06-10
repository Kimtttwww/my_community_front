import { BoardPath } from "@/entity/board/model/BoardPath";

export class GuestPath {
	static readonly HOST = BoardPath.HOST;
	static readonly LOGIN = this.HOST + '/guest/access';
}
