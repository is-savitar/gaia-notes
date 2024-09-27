import SignOut from "@/_components/auth/sign-out";
import signOut from "@/app/auth/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links, manage } from "@/data/user-dropdown";
import { getUUIDClient } from "@/lib/utils/uuid_client";
import Link from "next/link";

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage src="" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" sideOffset={25}>
        <DropdownMenuGroup>
          {links.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={item.href}>
                {<item.icon className="mr-2 h-4 w-4" />}
                <span>{item.text}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {manage.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={item.href} className="capitalize">
                <span>{item.text}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        {getUUIDClient() && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="p-0">
              <SignOut />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
