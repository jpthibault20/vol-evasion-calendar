import React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/time-picker-input";

interface TimePickerPrrops {
  timeAppointment: Date | undefined;
  setTimeAppointment: (load: Date | undefined) => void;
}

const TimePicker = ({timeAppointment, setTimeAppointment} : TimePickerPrrops) => {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  
  return (
    <div className="flex items-end gap-2 p-5 shadow-lg">

      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Heures
        </Label>
        <TimePickerInput
          picker="hours"
          date={timeAppointment}
          setDate={setTimeAppointment}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>

      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          date={timeAppointment}
          setDate={setTimeAppointment}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
    </div>
  )
}

export default TimePicker
