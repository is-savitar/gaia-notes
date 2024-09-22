"use client";
import {
  usePlateEditor,
  Plate,
  PlateContent,
} from "@udecode/plate-common/react";

export default function BasicEditor() {
  const editor = usePlateEditor();

  return (
    <main className="px-5 sm:px-4 mx-auto py-12 max-w-[1200px]">
      <Plate editor={editor}>
        <PlateContent placeholder="Type..." />
      </Plate>
    </main>
  );
}
