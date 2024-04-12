import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Card } from "@/components/ui/card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[url('/planeBackground.jpg')]">
      <Card className="space-y-6 text-center bg-[#ffffff] p-6 border-none">
        <div className={cn(
          "font-semibold text-black drop-shadow-md",
          font.className,
        )}>
          <h1 className="text-4xl ">Vol-Evasion</h1>
          <h2 className="text-2xl ">Calendar</h2>
        </div>
        <div>
          <LoginButton  asChild>
            <Button  size="sm">
              Connexion
            </Button>
          </LoginButton>
        </div>
      </Card>
    </main>
  )
}
