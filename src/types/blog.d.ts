import { UUID } from "crypto";

interface Author {
  name: string;
  id: UUID;
  image: string;
  username: string;
}

export interface BlogSchema {
  author: Author;
  title: string;
  cover_image: string;
  created_at: string;
  min_read: number;
  tagline: string;
}
