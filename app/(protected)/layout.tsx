import { Sidebar } from "./_components/sidebar";
import { SidebarPhone } from "./_components/sidebarPhone";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
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
  );
}

export default ProtectedLayout;