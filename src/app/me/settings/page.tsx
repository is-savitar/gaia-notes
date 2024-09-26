import { settings_tabs } from "@/_components/settings/tabs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

export default async function Settings() {
  return (
    <main>
      <div className="max-w-[1320px] md:max-w-[700px] lg:max-w-[850px] mx-auto px-5 sm:px-4 py-14">
        <h3 className="mb-6 text-4xl font-medium">Settings</h3>
        <Tabs defaultValue={"account"}>
          <TabsList className="flex gap-5 w-full bg-transparent border-b py-6 rounded-none">
            {settings_tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.value}
                className="!shadow-none bg-transparent rounded-none text-sm"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {settings_tabs.map((tab, index) => (
            <TabsContent value={tab.value} key={index}>
              <tab.component />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
