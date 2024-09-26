"use client";

import React, { useCallback, useRef } from "react";
import { cn } from "@udecode/cn";
import { Plate } from "@udecode/plate-common/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { serializeHtml } from "@udecode/plate-serializer-html";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { Button } from "@/components/ui/button";
import { TElement } from "@udecode/plate-common";

export default function PlateEditor({
  onChange,
  readOnly = false,
  editor,
}: {
  onChange?: any;
  readOnly?: boolean;
  editor: any;
}) {
  const containerRef = useRef(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        readOnly={readOnly}
        editor={editor}
        onChange={({ value, editor }) => {
          // onChange(value);
        }}
      >
        <div
          ref={containerRef}
          className={cn(
            "relative",
            "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4 border",
          )}
        >
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>

          <Editor
            className="px-[46px] py-12"
            autoFocus
            focusRing={false}
            variant="ghost"
            size="md"
          />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
          <CursorOverlay containerRef={containerRef} />
        </div>
      </Plate>
      <Button
        type="button"
        onClick={() => {
          console.log("Heyyyoo");
        }}
      >
        Test Get
      </Button>
    </DndProvider>
  );
}

// export const useMyEditor = (initialValue: any) => {
//   const editor = createPlateEditor({
//     value: initialValue,
//     plugins: [
//       // Nodes
//       HeadingPlugin,
//       BlockquotePlugin,
//       CodeBlockPlugin,
//       CodeLinePlugin,
//       CodeSyntaxPlugin,
//       HorizontalRulePlugin,
//       LinkPlugin.configure({
//         render: { afterEditable: () => <LinkFloatingToolbar /> },
//       }),
//       ImagePlugin,
//       MediaEmbedPlugin,
//       CaptionPlugin.configure({
//         options: { plugins: [ImagePlugin, MediaEmbedPlugin] },
//       }),
//       MentionPlugin,
//       MentionInputPlugin,
//       TablePlugin,
//       TableRowPlugin,
//       TableCellPlugin,
//       TableCellHeaderPlugin,
//       TodoListPlugin,
//       ExcalidrawPlugin,
//
//       // Marks
//       BoldPlugin,
//       ItalicPlugin,
//       UnderlinePlugin,
//       StrikethroughPlugin,
//       CodePlugin,
//       SubscriptPlugin,
//       SuperscriptPlugin,
//       FontColorPlugin,
//       FontBackgroundColorPlugin,
//       FontSizePlugin,
//       HighlightPlugin,
//       KbdPlugin,
//
//       // Block Style
//       AlignPlugin.configure({
//         inject: {
//           targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS],
//         },
//       }),
//       IndentPlugin.configure({
//         inject: {
//           targetPlugins: [
//             ParagraphPlugin.key,
//             BlockquotePlugin.key,
//             CodeBlockPlugin.key,
//             ...HEADING_LEVELS,
//           ],
//         },
//       }),
//       IndentListPlugin.configure({
//         inject: {
//           targetPlugins: [
//             ParagraphPlugin.key,
//             BlockquotePlugin.key,
//             CodeBlockPlugin.key,
//             ...HEADING_LEVELS,
//           ],
//         },
//       }),
//       LineHeightPlugin.configure({
//         inject: {
//           nodeProps: {
//             defaultNodeValue: 1.5,
//             validNodeValues: [1, 1.2, 1.5, 2, 3],
//           },
//           targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS],
//         },
//       }),
//
//       // Functionality
//       AutoformatPlugin.configure({
//         options: {
//           rules: autoformatRules,
//           enableUndoOnDelete: true,
//         },
//       }),
//       BlockSelectionPlugin,
//       DndPlugin.configure({
//         options: { enableScroller: true },
//       }),
//       EmojiPlugin,
//       ExitBreakPlugin.configure({
//         options: {
//           rules: [
//             {
//               hotkey: "mod+enter",
//             },
//             {
//               hotkey: "mod+shift+enter",
//               before: true,
//             },
//             {
//               hotkey: "enter",
//               query: {
//                 start: true,
//                 end: true,
//                 allow: HEADING_LEVELS,
//               },
//               relative: true,
//               level: 1,
//             },
//           ],
//         },
//       }),
//       NodeIdPlugin,
//       ResetNodePlugin.configure({
//         options: {
//           rules: [
//             {
//               types: [BlockquotePlugin.key, TodoListPlugin.key],
//               defaultType: ParagraphPlugin.key,
//               hotkey: "Enter",
//               predicate: isBlockAboveEmpty,
//             },
//             {
//               types: [BlockquotePlugin.key, TodoListPlugin.key],
//               defaultType: ParagraphPlugin.key,
//               hotkey: "Backspace",
//               predicate: isSelectionAtBlockStart,
//             },
//             {
//               types: [CodeBlockPlugin.key],
//               defaultType: ParagraphPlugin.key,
//               onReset: unwrapCodeBlock,
//               hotkey: "Enter",
//               predicate: isCodeBlockEmpty,
//             },
//             {
//               types: [CodeBlockPlugin.key],
//               defaultType: ParagraphPlugin.key,
//               onReset: unwrapCodeBlock,
//               hotkey: "Backspace",
//               predicate: isSelectionAtCodeBlockStart,
//             },
//           ],
//         },
//       }),
//       SelectOnBackspacePlugin.configure({
//         options: {
//           query: {
//             allow: [ImagePlugin.key, HorizontalRulePlugin.key],
//           },
//         },
//       }),
//       SoftBreakPlugin.configure({
//         options: {
//           rules: [
//             { hotkey: "shift+enter" },
//             {
//               hotkey: "enter",
//               query: {
//                 allow: [
//                   CodeBlockPlugin.key,
//                   BlockquotePlugin.key,
//                   TableCellPlugin.key,
//                   TableCellHeaderPlugin.key,
//                 ],
//               },
//             },
//           ],
//         },
//       }),
//       TabbablePlugin.configure(({ editor }) => ({
//         options: {
//           query: () => {
//             if (isSelectionAtBlockStart(editor)) return false;
//
//             return !someNode(editor, {
//               match: (n) => {
//                 return !!(
//                   n.type &&
//                   ([
//                     TablePlugin.key,
//                     TodoListPlugin.key,
//                     CodeBlockPlugin.key,
//                   ].includes(n.type as string) ||
//                     n.listStyleType)
//                 );
//               },
//             });
//           },
//         },
//       })),
//       TrailingBlockPlugin.configure({
//         options: { type: ParagraphPlugin.key },
//       }),
//       DragOverCursorPlugin,
//
//       // Deserialization
//       DocxPlugin,
//       MarkdownPlugin,
//       JuicePlugin,
//     ],
//     override: {
//       components: withDraggables(
//         withPlaceholders({
//           [BlockquotePlugin.key]: BlockquoteElement,
//           [CodeBlockPlugin.key]: CodeBlockElement,
//           [CodeLinePlugin.key]: CodeLineElement,
//           [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
//           [HorizontalRulePlugin.key]: HrElement,
//           [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
//           [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
//           [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
//           [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
//           [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
//           [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
//           [ImagePlugin.key]: ImageElement,
//           [LinkPlugin.key]: LinkElement,
//           [MediaEmbedPlugin.key]: MediaEmbedElement,
//           [MentionPlugin.key]: MentionElement,
//           [MentionInputPlugin.key]: MentionInputElement,
//           [ParagraphPlugin.key]: ParagraphElement,
//           [TablePlugin.key]: TableElement,
//           [TableRowPlugin.key]: TableRowElement,
//           [TableCellPlugin.key]: TableCellElement,
//           [TableCellHeaderPlugin.key]: TableCellHeaderElement,
//           [TodoListPlugin.key]: TodoListElement,
//           [ExcalidrawPlugin.key]: ExcalidrawElement,
//           [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
//           [CodePlugin.key]: CodeLeaf,
//           [HighlightPlugin.key]: HighlightLeaf,
//           [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
//           [KbdPlugin.key]: KbdLeaf,
//           [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
//           [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
//           [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
//           [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
//         }),
//       ),
//     },
//   });
//   return editor;
// };
