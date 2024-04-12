import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
};

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className={cn(
          "font-semibold text-black drop-shadow-md text-center",
          font.className,
        )}>
          <h1 className="text-4xl ">Vol-Evasion</h1>
          <h2 className="text-2xl ">Calendar</h2>
        </div>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  );
};
