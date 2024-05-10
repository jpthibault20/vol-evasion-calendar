import { Poppins } from "next/font/google";

import { LoginForm } from "@/components/auth/login-form";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[url('/planeBackground.jpg')]">
       {/* <LoginForm /> */}
    </main>
  )
}
