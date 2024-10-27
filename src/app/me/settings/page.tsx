import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { settings_tabs } from "./_components/tabs";

export default async function Settings() {
	return (
		<main>
			<div className="max-w-[1320px] md:max-w-[700px] lg:max-w-[850px] mx-auto px-5 sm:px-4 py-14">
				<h3 className="mb-6 text-4xl font-medium">Settings</h3>
				<Tabs defaultValue={"account"}>
					<TabsList className="flex gap-4 md:gap-7 w-full bg-transparent border-b py-6 justify-start rounded-none">
						{settings_tabs.map((tab, index) => (
							<TabsTrigger
								key={index}
								value={tab.value}
								className="!shadow-none bgsmransparent rounded-none text-sm"
							>
								{tab.title}
							</TabsTrigger>
						))}
					</TabsList>
					{settings_tabs.map((tab, index) => (
						<TabsContent value={tab.value} key={index} asChild className="py-5">
							<tab.component />
						</TabsContent>
					))}
				</Tabs>
			</div>
		</main>
	);
}
