import type { Reply } from "./Reply";
import type { User } from "./User";

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}
