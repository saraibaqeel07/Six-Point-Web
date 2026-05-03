// components/EventCard.tsx
import React from "react";

const events = [
  {
    title: "Competitions",
    date: "SEP",
    day: "10",
    time: "6:00 PM - 9:00 PM",
    image: "/assets/competitions.png",
  },
  {
    title: "Special training camps",
    date: "SEP",
    day: "10",
    time: "6:00 PM - 9:00 PM",
    image: "/assets/special-training-camps.png",
  },
  {
    title: "International seminars",
    date: "SEP",
    day: "10",
    time: "6:00 PM - 9:00 PM",
    image: "/assets/international-seminars.png",
  },
  {
    title: "Community events",
    date: "SEP",
    day: "10",
    time: "6:00 PM - 9:00 PM",
    image: "/assets/community-events.png",
  },
];

const EventCard = () => {
  return (
    <div className="bg-[#1D1818] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="group">

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className=" pt-3 flex gap-4 items-start">

                {/* Date */}
                <div className="flex flex-col items-center text-purple-500 font-bold">
                  <span className="text-sm">{event.date}</span>
                  <span className="text-3xl leading-none text-white">
                    {event.day}
                  </span>
                </div>

                {/* Title & Time */}
                <div>
                  <h3 className="text-lg font-light mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm ">
                    {event.time}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default EventCard;