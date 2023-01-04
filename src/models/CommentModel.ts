import type { Comment } from "@/types/Comment";
import type { Reply } from "@/types/Reply";
import type { User } from "@/types/User";
import { ReplyModel } from "./ReplyModel";
import { UserModel } from "./UserModel";

export class CommentModel implements Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];

  constructor(data?: Comment) {
    this.id = data?.id || 0;
    this.content = data?.content || "";
    this.createdAt = data?.createdAt || "";
    this.score = data?.score || 0;
    this.user = new UserModel(data?.user);
    this.replies = data?.replies?.map((reply) => new ReplyModel(reply)) || [];
  }
}
