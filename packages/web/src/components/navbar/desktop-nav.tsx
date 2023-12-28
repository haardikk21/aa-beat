import { navbarItems } from "@/config/navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export const DesktopNav: React.FC = () => {
  const router = useRouter();
  const pathname = router.asPath;

  return (
    <div className="hidden md:flex md:items-center md:gap-6">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl">✨</span>
        <span className="font-bold">UserOperations</span>
      </Link>

      <nav className="flex items-center gap-6 text-sm">
        {navbarItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.path
                ? "text-foreground border-b"
                : "text-foreground/60"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};
