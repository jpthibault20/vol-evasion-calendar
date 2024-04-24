"use client"

import { CardWrapper } from "../CardWrapper"

interface UpdateUserProps {
    ID: string
    show: boolean
    setShow: (load: boolean) => void
}

export const InfoUser = ({ show, setShow, ID }: UpdateUserProps) => {
    
    if (!show) {
        return null;
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <CardWrapper headerLabel={"Information utilisateur"} setShowForm={setShow} showForm={show}>
            Info User : {ID}
        </CardWrapper>  
        </div>
        
    )
}

