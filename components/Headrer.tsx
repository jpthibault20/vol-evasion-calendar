import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  setShowForm: (load: boolean) => void;
  showForm: boolean;
};

export const Header = ({
  label,
  setShowForm,
  showForm,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex w-full justify-end ">
        <button onClick={() => { setShowForm(!showForm) }}>
          <X />
        </button>
      </div>
      <div className={cn(
        "font-semibold text-black drop-shadow-md text-center",
        font.className,
      )}>
        <h1 className="text-2xl ">{label}</h1>
      </div>
    </div>
  );
};
