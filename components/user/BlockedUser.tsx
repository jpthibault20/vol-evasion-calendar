import React from 'react'
import { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch"
import { getUserById } from '@/data/user';
import { updateBlockedReservation } from '@/actions/updateUser';

interface Props {
    user: any;
}
export const BlockedUser = ({ user }: Props) => {
    const [blocked, setBlocked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setBlocked(user.blocked_reservation);
    }, [user]);

    const handleBlockedChange = (value: boolean) => {
        console.log('handleBlockedChange', value);
        setBlocked(value);
        blockUser(user.id, value);
    }

    const blockUser = (ID: string, blocked: boolean) => {
        console.log(ID, blocked);
        setIsLoading(true);
        updateBlockedReservation(ID, blocked)
            .catch(error => {
                setBlocked(!blocked);
                setIsLoading(false);
                console.error(error);
            })
            .finally(() => setIsLoading(false))
    }


    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Switch checked={blocked} onCheckedChange={(value) => handleBlockedChange(value)} />
                    {blocked ? 'Bloqué' : 'Non bloqué'}
                </div>
            )}
        </div>
    )
}

