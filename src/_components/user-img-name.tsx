import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircularImage } from "@/components/ui/circular-image";
import Link from "next/link";

export default function UserImageName({
  profile_pic,
  name,
  username,
}: {
  profile_pic: string;
  name: string;
  username: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* <CircularImage size={16} alt={name} src={profile_pic} /> */}
      <Avatar>
        <AvatarImage
          src={profile_pic}
          className="object-cover"
          height={16}
          width={16}
        />
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
      <Link href={`/@${username}`} className="text-xs hover:underline">
        {name}
      </Link>
    </div>
  );
}
