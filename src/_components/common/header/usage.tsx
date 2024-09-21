"use client";
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { LogoLink } from "../logo";
import { Header as HeaderTemplate } from "./header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const headerLinks = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/#faqs" },
  { name: "Testimonial", href: "/#testimonials" },
];
const icons = [
  {
    name: "Twitter",
    icon: <TwitterLogoIcon className="size-4" />,
    href: "",
  },
  {
    name: "GitHub",
    icon: <DiscordLogoIcon className="size-4" />,
    href: "",
  },
];
const HeaderLink = (props: { href: string; name: string }) => {
  return (
    <Link
      href={props.href}
      className="text-[#151515] hover:text-[#5845EE] transition-colors duration-200"
    >
      {props.name}
    </Link>
  );
};

export const Header = ({
  variant = "centered",
}: {
  variant: "default" | "centered";
}) => (
  <HeaderTemplate
    Logo={<LogoLink />}
    variant={variant}
    sticky={true}
    desktopItems={
      <div className="flex items-center gap-3">
        {headerLinks.map((link, i) => (
          <HeaderLink key={i} href={link.href} name={link.name} />
        ))}
      </div>
    }
    mobileItems={({ setIsOpen }) => (
      <>
        {headerLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={"outline"}
            className="w-full rounded-xl justify-center"
            size="lg"
            onClick={() => setIsOpen(false)}
          >
            <Link href={link.href}>{link.name}</Link>
          </Button>
        ))}
        <div className="flex-row-end w-full gap-3 border-t pt-4 border-dashed">
          {icons && (
            <div className="flex-row-center grow gap-2 justify-center flex">
              {icons.map((icon) => (
                <Button
                  key={icon.name}
                  size="icon"
                  className="rounded-full"
                  variant={"outline"}
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={icon.href}>{icon.icon}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </>
    )}
  />
);
