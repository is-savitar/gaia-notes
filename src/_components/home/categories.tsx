"use client";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import Link from "next/link";
import slugify from "slugify";

const Categories = () => {
  return (
    <div className="mx-auto flex gap-3 max-w-[1200px] border-b pb-3 px-3 relative">
      {categories.map((category, index) => (
        <Button key={index} variant={"ghost"} asChild>
          <Link
            href={`/?category=${slugify(category.toLowerCase())}`}
            className="text-[#6b6b6b] text-base"
          >
            {category}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default Categories;

// "use client"
//
// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
//
// const categories = [
//   "Software Development",
//   "Python",
//   "Business",
//   "Money",
//   "Productivity",
//   "Self Improvement",
//   "Artificial Intelligence",
//   "Data Science",
//   "Machine Learning",
//   "Web Development",
// ]
//
// export default function Component() {
//   const scrollRef = React.useRef<HTMLDivElement>(null)
//
//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === "left" ? -200 : 200
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
//     }
//   }
//
//   return (
//     <div className="relative w-full max-w-3xl mx-auto">
//       <ScrollArea className="w-full whitespace-nowrap rounded-md border">
//         <div ref={scrollRef} className="flex space-x-4 p-4">
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant="ghost"
//               className="flex-shrink-0 text-sm text-muted-foreground hover:text-foreground"
//             >
//               {category}
//             </Button>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" className="hidden" />
//       </ScrollArea>
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute left-0 top-1/2 -translate-y-1/2 bg-background"
//         onClick={() => scroll("left")}
//       >
//         <ChevronLeft className="h-4 w-4" />
//         <span className="sr-only">Scroll left</span>
//       </Button>
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute right-0 top-1/2 -translate-y-1/2 bg-background"
//         onClick={() => scroll("right")}
//       >
//         <ChevronRight className="h-4 w-4" />
//         <span className="sr-only">Scroll right</span>
//       </Button>
//     </div>
//   )
// }
