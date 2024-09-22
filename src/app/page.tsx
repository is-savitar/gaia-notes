import { Footer } from "@/_components/common/footer";
import Categories from "@/_components/home/categories";

export default async function Home() {
  return (
    <div className="bg-white w-full mx-auto flex flex-col min-h-screen pt-12">
      <Categories />
    </div>
  );
}
