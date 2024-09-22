import { UUID } from "crypto";

const author1 = {
  name: "Savitar",
  id: "f6cb21ed-c2e5-4082-95bf-4e7f4cf77451" as UUID,
  image: "/s4vitar.png",
  username: "@savitar",
};

const blog1 = {
  author: author1,
  title: "Building StacksInk, behind the scenes",
  cover_image: "/quasar.png",
  created_at: "2024-09-22",
  min_read: 6,
  tagline: "Intro",
};
export const blogs = [blog1, blog1, blog1, blog1, blog1, blog1];
