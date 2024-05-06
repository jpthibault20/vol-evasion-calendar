import { User, Calendar, Plane, GraduationCap, BetweenHorizontalEnd } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface pageIconProps {
    location: string
}

export const PageIcon = ({ location }: pageIconProps) => {
    const [icon, setIcon] = useState<JSX.Element>();
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        if (location.includes("calendar")) {
            setIcon(<Calendar />);
            setTitle("Calendrier")
        }
        if (location.includes("appointments")) {
            setIcon(<BetweenHorizontalEnd  />);
            setTitle("Mes vols")
        }
        if (location.includes("account")) {
            setIcon(<User />);
            setTitle("Mon Profil")
        }
        if (location.includes("planes")) {
            setIcon(<Plane />);
            setTitle("Mes ULM")
        }
        if (location.includes("students")) {
            setIcon(<GraduationCap />);
            setTitle("Mes utilisateurs")
        }
        if (location.includes("account")) {
            setIcon(<User />);
            setTitle("Mon Profil")
        }
    }, [location])


    return (
        <div className='flex w-full'>
            <div>
                {icon}
            </div>
            <div className='w-full text-center'>
                <h1 className='font-semibold'>
                    {title}
                </h1>
            </div>

        </div>
    )
}
