import { AppointmentCardWrapper } from "@/components/appointment/AppointmentCardWrapper"
import { NewAppointment } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form, FormDescription } from "../ui/form";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

interface AppointmentFormProps {
    setShowForm: (load: boolean) => void;
    showForm: boolean;
}

export const AppointmentForm = ({ setShowForm, showForm }: AppointmentFormProps) => {
    const [isPending, startTransition] = useTransition();
    const [dateAppointment, setDateAppointment] = useState<Date>()
    const [timeAppointment, setTimeAppointment] = useState<Date>()

    const form = useForm<z.infer<typeof NewAppointment>>({
        resolver: zodResolver(NewAppointment),
        defaultValues: {
            type: appointmentType.ALL,
            recurrence: false,
            date: new Date(),
            endDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
        },
    });

    const onSubmit = (values: z.infer<typeof NewAppointment>) => {

    }


    return (
        <div>
            <AppointmentCardWrapper headerLabel="Ahouter une disponibilitée" setShowForm={setShowForm} showForm={showForm}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (

                                    <FormItem>
                                        <FormLabel>Type de disponibilitée</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choisir un type de disponibilitée" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={appointmentType.BAPTEME}>
                                                    Baptème
                                                </SelectItem>
                                                <SelectItem value={appointmentType.COURS}>
                                                    Cours
                                                </SelectItem>
                                                <SelectItem value={appointmentType.ALL}>
                                                    Baptème / Cours
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            <FormField
                                control={form.control}
                                name="recurrence"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Disponibilité récurente</FormLabel>
                                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Disponibilitée Récurente</FormLabel>
                                                <FormDescription>
                                                    Disponibilitée récurente toutes les semaines
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )} />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <div className="">
                                        <FormLabel>Date</FormLabel>
                                        <div className="mt-2 grid grid-col-2 grid-flow-col">
                                           <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !dateAppointment && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {dateAppointment ? format(dateAppointment, "dd/MM/yyyy hh:mm") : <span>Date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={dateAppointment}
                                                    onSelect={setDateAppointment}
                                                    initialFocus
                                                />

                                                <div className="flex w-full justify-center p-2">
                                                    ZOUBINOU
                                                </div>
                                            </PopoverContent>
                                        </Popover> 

                                        </div>
                                        
                                    </div>

                                )} />





                        </div>

                    </form>
                </Form>
            </AppointmentCardWrapper>

        </div>
    )
}
