import { UUID } from "crypto";

export interface BlogSchema {
  author: string;
  author_id: UUID;
  title: string;
  cover_image: string;
  created_at: Date;
  min_read: number;
  tagline: string;
}
