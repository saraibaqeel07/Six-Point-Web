import React from "react";
import Button from "@/app/components/elements/Button";

const TimeTableSection = () => {
  // Days of the week (you can make dynamic later)
  const days = [
    "Sunday 07/10",
    "Monday 07/11",
    "Tuesday 07/12",
    "Wednesday 07/13",
    "Thursday 07/14",
    "Friday 07/15",
    "Saturday 07/16",
  ];

  // Time slots shown in the table
  const timeSlots = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
  ];

  return (
    <div className="bg-[#1D1818] text-white py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-[90%] mx-auto">
        {/* Header with navigation */}
        <div className="relative flex items-center mb-6 w-full justify-between gap-5 flex-wrap">
          <div className="flex border overflow-hidden">
            <button className="px-7 py-2 text-sm font-medium border-r">
              Today
            </button>
            <button className="px-7 py-2 text-sm font-medium border-r">
              Back
            </button>
            <button className="px-7 py-2 text-sm font-medium">Next</button>
          </div>

          <h2 className=" text-lg md:text-xl font-light">
            27 Feb 2026 - 16 March 2026
          </h2>
        </div>

        {/* Main calendar grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] border overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-8  border-b ">
              <div className="p-3 text-center text-sm font-medium border-r ">
                Time
              </div>
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className="p-3 text-center text-sm font-medium border-r  last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Time rows */}
            {timeSlots.map((time, rowIdx) => (
              <div
                key={time}
                className="grid grid-cols-8 border-b last:border-b-0"
              >
                {/* Time label */}
                <div className="p-3 text-right text-sm font-medium  border-r  flex items-center justify-center">
                  {time}
                </div>

                {/* Cells for each day */}
                {Array.from({ length: 7 }).map((_, colIdx) => {
                  // You can later extract real data from array / props
                  // For now - hardcoded positions based on your screenshot
                  let content = null;
                  let bgColor = "bg-transparent";
                  let textColor = "text-white";

                  // Sunday 07/10
                  if (rowIdx === 0 && colIdx === 0) {
                    content = "06:00 - 02:00 PM\nAndy Porter\nPack & Move";
                    bgColor = "bg-cyan-600/80";
                  }
                  // Monday 07/11
                  else if (rowIdx === 0 && colIdx === 1) {
                    content = "06:00 - 12:00 PM\nJames May\nMove";
                    bgColor = "bg-red-600/80";
                  } else if (rowIdx === 1 && colIdx === 1) {
                    content = "07:00 - 12:00 PM\nShawn Tite\nPack & Move";
                    bgColor = "bg-purple-600/80";
                  } else if (rowIdx === 2 && colIdx === 1) {
                    content = "08:00 - 02:00 PM\nPaul Jones\nMoving";
                    bgColor = "bg-teal-600/80";
                  } else if (rowIdx === 4 && colIdx === 1) {
                    content = "10:00 - 03:00 PM\nPeter Smith\nMove";
                    bgColor = "bg-red-700/80";
                  }
                  // Tuesday 07/12
                  else if (rowIdx === 2 && colIdx === 2) {
                    content = "08:00 - 02:00 PM\nPaul Jones\nMoving";
                    bgColor = "bg-cyan-700/80";
                  } else if (rowIdx === 5 && colIdx === 2) {
                    content = "11:00 - 05:00 PM\nCarl Marx\nPack & Move";
                    bgColor = "bg-orange-600/80";
                  }
                  // Wednesday 07/13
                  else if (rowIdx === 0 && colIdx === 3) {
                    content = "06:00 - 12:00 PM\nJames May\nMove";
                    bgColor = "bg-red-500/80";
                  } else if (rowIdx === 1 && colIdx === 3) {
                    content = "07:00 - 12:00 PM\nShawn Tite\nPack & Move";
                    bgColor = "bg-purple-500/80";
                  } else if (rowIdx === 4 && colIdx === 3) {
                    content = "10:00 - 02:00 PM\nNorman Bates\nStorage";
                    bgColor = "bg-rose-600/80";
                  }
                  // Thursday 07/14
                  else if (rowIdx === 0 && colIdx === 4) {
                    content = "06:00 - 11:00 AM\nJames Matthew\nMove";
                    bgColor = "bg-blue-600/80";
                  } else if (rowIdx === 2 && colIdx === 4) {
                    content = "08:00 - 04:00 PM\nJessica Franco\nMove";
                    bgColor = "bg-emerald-600/80";
                  } else if (rowIdx === 5 && colIdx === 4) {
                    content = "11:00 - 02:00 PM\nAndrew Barnett\nPack & Move";
                    bgColor = "bg-sky-600/80";
                  }
                  // Friday 07/15
                  else if (rowIdx === 3 && colIdx === 5) {
                    content = "09:00 - 04:00 PM\nNiles Miller\nStorage";
                    bgColor = "bg-blue-500/80";
                  }
                  // Saturday 07/16
                  else if (rowIdx === 0 && colIdx === 6) {
                    content = "06:00 - 11:00 AM\nPhil Matthew\nMove";
                    bgColor = "bg-indigo-600/80";
                  }

                  return (
                    <div
                      key={colIdx}
                      className="p-4 border-r flex justify-center items-center last:border-r-0 min-h-[80px] relative"
                    >
                      {content && (
                        <div
                          className={`text-xs font-medium ${textColor} ${bgColor} whitespace-pre-line leading-tight px-4 py-2 `}
                        >
                          {content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>


       <div className="text-white py-10 md:py-14 px-4 sm:px-6 lg:px-0">
  <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">

    {/* Left column */}
    <div className="flex-1 space-y-6 md:space-y-8">

      <h2 className="text-[clamp(22px,4vw,40px)] font-light uppercase tracking-wide leading-[1.2]">
        Advanced Training
      </h2>

      <div className="space-y-4 md:space-y-6 text-gray-300 leading-relaxed text-[clamp(14px,1.6vw,16px)]">
        <p>
          The Head Coach Instructor, Igor Silva, is widely known in the Jiu-Jitsu industry as one of the most winning Head athletes. His achievements in National competition has granted him the highest reputation in the UAE. His international path around the world is remarkable, which printed his name in the jiu-jitsu hall of fame in Europe, Brazil, and Russia.
        </p>

        <p>
          Six Points Jiu-Jitsu is a professional Brazilian Jiu-Jitsu studio dedicated to developing technically refined athletes in a structured and supportive environment.
        </p>
      </div>

      <Button href="#" className="hidden sm:inline-flex text-sm md:text-base">
        Sixth Point JJ Club Founders Platinum Membership Agreement
      </Button>
    </div>

    {/* Right column */}
    <div className="w-full sm:max-w-sm lg:max-w-md border bg-white text-black 
                    p-6 sm:p-8 md:p-10 flex flex-col">

      <ul className="space-y-3 md:space-y-4 flex-1 text-sm md:text-base">

        {[
          "Digital Progress Tracker",
          "Encrypted cloud backups",
          "Invite training partners",
          "3 months free access",
          "£5/month after 3 months"
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-xs shrink-0">
              ✔
            </span>
            <span>{item}</span>
          </li>
        ))}

      </ul>
    </div>

  </div>
</div>

      </div>


    </div>
  );
};

export default TimeTableSection;
