import { cn } from "@/lib/utils";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { EthereumIcon } from "../ui/ethereum-icon";
import { ThemeToggle } from "../ui/theme-toggle";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = router.asPath;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14">
        <DesktopNav />
        <MobileNav />

        <div className="flex-1 flex items-center justify-end space-x-4">
          <Link
            href={"/donate"}
            className={cn(
              "transition-colors items-center gap-1 text-sm hover:text-foreground/80 hidden md:flex",
              pathname === "/donate" ? "text-foreground" : "text-foreground/60"
            )}
          >
            <EthereumIcon className="h-5 w-5" />
            Donate
          </Link>

          <div className="w-px h-6 bg-border hidden md:block" />

          <Link
            href={"https://github.com/haardikk21/UserOperations"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground/80 transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="hidden md:block">GitHub</span>
          </Link>

          <div className="w-px h-6 bg-border hidden md:block" />

          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
