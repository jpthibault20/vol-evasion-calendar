import { AppointmentCardWrapper } from "@/components/appointment/AppointmentCardWrapper"
import { NewAppointment } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form, FormDescription } from "../ui/form";
import { useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import TimePicker from "@/components/appointment/TimePicker"
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { newAppointment } from "@/actions/new-appointment";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { fr } from 'date-fns/locale/fr';


interface AppointmentFormProps {
    setShowForm: (load: boolean) => void;
    showForm: boolean;
}

export const AppointmentForm = ({ setShowForm, showForm }: AppointmentFormProps) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const [dateAppointment, setDateAppointment] = useState<Date>()
    const [timeAppointmentStart, setTimeAppointmentStart] = useState<Date>()
    const [timeAppointmentEnd, setTimeAppointmentEnd] = useState<Date>()

    const [PopoverCalendar, setPopoverCalendar] = useState(false);
    const [popoverCalendarAppointment, setPopoverCalendarAppointment] = useState(false);

    const form = useForm<z.infer<typeof NewAppointment>>({
        resolver: zodResolver(NewAppointment),
        defaultValues: {
            type: appointmentType.ALL,
            timeStart: new Date(),
            timeEnd: new Date(),
            recurrence: false,
            dateEndReccurence: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10),
        },
    });

    const onSubmit = (values: z.infer<typeof NewAppointment>) => {
        values.timeStart = timeAppointmentStart as Date;
        values.timeEnd = timeAppointmentEnd as Date;
        values.dateEndReccurence = dateAppointment as Date;

        setError("");
        setSuccess("");

        startTransition(() => {
            newAppointment(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.success) {
                        setShowForm(false);
                        toast("Disponibilité ajouté !", {
                            action: {
                                label: "X",
                                onClick: () => console.log("Undo"),
                            },
                        })
                    }



                });

        })
    }






    return (
        <div>
            <AppointmentCardWrapper headerLabel="Nouvelle disponibilitée" setShowForm={setShowForm} showForm={showForm}>
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
                                name="date"
                                render={({ field }) => (
                                    <div className="">
                                        <FormLabel>Date</FormLabel>
                                        <div className="mt-2 grid grid-col-2 grid-flow-col">
                                            <Popover open={PopoverCalendar} onOpenChange={setPopoverCalendar}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value
                                                            ? format(new Date(field.value), "dd/MM/yyyy")
                                                            : "date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        weekStartsOn={1}
                                                        locale={fr}
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => {
                                                            field.onChange(date);
                                                            setPopoverCalendar(false);
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <FormMessage />
                                    </div>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="timeStart"
                                render={({ field }) => (
                                    <div className="">
                                        <FormLabel>Horaire début</FormLabel>
                                        <div className="mt-2 grid grid-col-2 grid-flow-col">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !timeAppointmentStart && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <Clock3 className="mr-2 h-4 w-4" />
                                                        {timeAppointmentStart ? format(timeAppointmentStart, "k:mm") : "horaire début"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <TimePicker timeAppointment={timeAppointmentStart} setTimeAppointment={setTimeAppointmentStart} />
                                                </PopoverContent>
                                            </Popover>

                                        </div>

                                    </div>

                                )} />

                            <FormField
                                control={form.control}
                                name="timeEnd"
                                render={({ field }) => (
                                    <div className="">
                                        <FormLabel>Horaire Fin</FormLabel>
                                        <div className="mt-2 grid grid-col-2 grid-flow-col">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !timeAppointmentEnd && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <Clock3 className="mr-2 h-4 w-4" />
                                                        {timeAppointmentEnd ? format(timeAppointmentEnd, "k:mm") : "horaire fin"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <TimePicker timeAppointment={timeAppointmentEnd} setTimeAppointment={setTimeAppointmentEnd} />
                                                </PopoverContent>
                                            </Popover>

                                        </div>

                                    </div>

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

                            {form.getValues("recurrence") && (
                                <FormField
                                    control={form.control}
                                    name="dateEndReccurence"
                                    render={({ field }) => (
                                        <div className="">
                                            <FormLabel>Date fin recurrence</FormLabel>
                                            <div className="mt-2 grid grid-col-2 grid-flow-col">
                                                <Popover open={popoverCalendarAppointment} onOpenChange={setPopoverCalendarAppointment}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !dateAppointment && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {dateAppointment ? format(dateAppointment, "dd/MM/yyyy") : "date fin"}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            weekStartsOn={1}
                                                            locale={fr}
                                                            selected={dateAppointment}
                                                            onSelect={(data) => {
                                                                setDateAppointment(data);
                                                                setPopoverCalendarAppointment(false);
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>

                                            </div>

                                        </div>

                                    )} />
                            )}


                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </AppointmentCardWrapper>

        </div>
    )
}
