import type { User } from "@/types/User";

interface Image {
  png: string;
  webp: string;
}
class ImageModel implements Image {
  png: string;
  webp: string;

  constructor(data?: Image) {
    this.png = data?.png || "";
    this.webp = data?.webp || "";
  }
}

export class UserModel implements User {
  image: ImageModel;
  username: string;

  constructor(data?: User) {
    this.image = new ImageModel(data?.image);
    this.username = data?.username || "";
  }
}
