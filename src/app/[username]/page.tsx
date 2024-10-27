import Blogs from "@/_components/common/blogs";
import { Button } from "@/components/ui/button";
import { CircularImage } from "@/components/ui/circular-image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ellipsis, Link2, User } from "lucide-react";
import Link from "next/link";

export default async function Page() {
	return (
		<main>
			<div className="max-w-[1320px] md:max-w-[700px] lg:max-w-[850px] mx-auto px-5 sm:px-4  py-14">
				<div className="flex justify-between">
					<div className="flex gap-5 py-4">
						<CircularImage src="/s4vitar.png" alt="Savitar" size={50} />
						<div className="text-[#191919]">
							<h3 className="text-2xl font-medium">Savitar</h3>
							<span className="">1 follower</span>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size={"icon"} variant={"ghost"}>
								<Ellipsis />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>Profile</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem asChild>
									<Link href={"/"}>
										<User className="mr-2 h-4 w-4" />
										<span>Design your profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link2 className="mr-2 h-4 w-4" />
									<span>Copy Profile Link</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<Tabs defaultValue={"home"}>
					<TabsList className="grid w-full grid-cols-3 bg-transparent border-b py-10 rounded-none">
						<TabsTrigger
							value="home"
							className="!shadow-none bg-transparent rounded-none"
						>
							Home
						</TabsTrigger>
						<TabsTrigger
							value="list"
							className="!shadow-none bg-transparent rounded-none"
						>
							List
						</TabsTrigger>
						<TabsTrigger
							value="about"
							className="!shadow-none bg-transparent rounded-none"
						>
							About
						</TabsTrigger>
					</TabsList>
					<TabsContent value="home">
						<Blogs category="all" />
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
}
