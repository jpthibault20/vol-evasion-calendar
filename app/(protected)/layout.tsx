import { Sidebar } from "./_components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="h-full w-full flex bg-white">
      <Sidebar />
      <div className="w-full">
        {children}
      </div>
    </div>
   );
}
 
export default ProtectedLayout;