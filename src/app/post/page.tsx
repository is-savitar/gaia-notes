"use client";

import React from "react";
import PlateEditor from "@/_components/post/plate-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParagraphPlugin } from "@udecode/plate-common/react";

const PostBlog = () => {
  const handlePost = () => {};

  return (
    <main className="max-w-[1200px] mx-auto px-5 sm:px-4 py-14 flex flex-col gap-4">
      <div className="">
        <Label className="mb-2">Title of your blog</Label>
        <Input placeholder="Title" className="" />
      </div>
      <div className="">
        <Label className="mb-2">Tagline</Label>
        <Input placeholder="Enter tagline here" className="" />
      </div>
      <PlateEditor
        initialValue={[
          {
            id: "1",
            type: ParagraphPlugin.key,
            children: [{ text: "Start writing your blog post here..." }],
          },
        ]}
      />
      <Button className="self-end" onClick={handlePost}>
        Post
      </Button>
    </main>
  );
};

export default PostBlog;
