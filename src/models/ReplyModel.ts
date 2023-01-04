import type { Reply } from "@/types/Reply";
import type { User } from "@/types/User";
import { UserModel } from "./UserModel";

export class ReplyModel implements Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;

  constructor(data?: Reply) {
    this.id = data?.id || 0;
    this.content = data?.content || "";
    this.createdAt = data?.createdAt || "";
    this.score = data?.score || 0;
    this.replyingTo = data?.replyingTo || "";
    this.user = new UserModel(data?.user);
  }
}
