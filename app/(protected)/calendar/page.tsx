"use client"

import Calendar from "@/components/calendar"

const calendar = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-4 text-center">Calendrier</h1>
        <Calendar />
      </div>
    </div>
  )
}

export default calendar
