const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full flex items-center justify-center bg-[url('/planeBackground.jpg')]">
      {children}
    </div>
  );
}

export default AuthLayout;