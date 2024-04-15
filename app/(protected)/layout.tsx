import { Sidebar } from "./_components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="h-full w-full flex  bg-white">
      <Sidebar />
      <div className="h-full w-full flex items-center justify-center">
        {children}
      </div>
    </div>
   );
}
 
export default ProtectedLayout;