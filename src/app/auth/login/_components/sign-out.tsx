import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOut() {
  const signout = async () => {
    try {
      const res = await fetch("/api/auth/logout");

      console.log(res, "SignOut");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      type="submit"
      className="w-full justify-start"
      variant={"ghost"}
      onClick={signout}
    >
      <LogOut className="mr-2 h-4 w-4" /> Sign Out
    </Button>
  );
}
