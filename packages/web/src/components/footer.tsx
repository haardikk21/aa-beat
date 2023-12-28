import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex text-sm justify-center text-foreground/80 h-10 max-w-screen-2xl items-center">
        Made with ❤️ by&nbsp;
        <Link
          href={`https://haardik.dev/`}
          target="_blank"
          className="hover:text-foreground transition-colors underline"
        >
          haardik.eth
        </Link>
      </div>
    </footer>
  );
};
