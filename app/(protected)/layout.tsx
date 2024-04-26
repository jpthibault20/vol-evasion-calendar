import { Sidebar } from "./_components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (

    <div className="h-max w-full flex ">
      <Sidebar />
      <div className="w-full h-full ">
        {children}
      </div>
    </div>



  );
}

export default ProtectedLayout;