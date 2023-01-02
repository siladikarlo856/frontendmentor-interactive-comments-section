import type { User } from "./User";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
}
