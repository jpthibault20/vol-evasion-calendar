import { SessionProvider } from "next-auth/react";
import { Sidebar } from "./_components/sidebar";
import { SidebarPhone } from "./_components/sidebarPhone";
import { auth } from "@/auth";
import { SpeedInsights } from '@vercel/speed-insights/next';

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

export default async function protectedLayout({ children }: ProtectedLayoutProps)  {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div>
        <div className="md:hidden">
          <div className="h-max w-full">
            <SidebarPhone />
            <div className="w-full h-full ">
              {children}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="h-max w-full flex ">
            <Sidebar />
            <div className="w-full h-full ">
              {children}
            </div>
          </div>
        </div>
      </div>
      <SpeedInsights />
    </SessionProvider>
  );
}