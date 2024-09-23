"use client";
import PlateEditor from "@/_components/post/plate-editor";
import { useEffect, useState } from "react";

const PostBlog = () => {
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  return (
    <main className="max-w-[1200px] mx-auto px-5 sm:px-4 py-14">
      <PlateEditor onChange={setContent} />
    </main>
  );
};

export default PostBlog;
