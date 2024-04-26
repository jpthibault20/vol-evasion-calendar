"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./Headrer";



interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  setShowForm: (load: boolean) => void;
  showForm: boolean;
};

export const CardWrapper = ({ children, headerLabel, showForm, setShowForm }: CardWrapperProps) => {
  return (
    <Card className="w-[300px] md:w-[400px] shadow-md">

      <CardHeader >
        <Header label={headerLabel} setShowForm={setShowForm} showForm={showForm}/>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  );
};


