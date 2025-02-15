"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import EventCard from "~~/components/EventCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [loadedEvents, setLoadedEvents] = useState<any[]>([]);

  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldReadContract({
    contractName: "EcoETH", // Contract name
    functionName: "getAllEvents", // Function name to call
  });

  useEffect(() => {
    if (events) {
      console.log("Events data:", events);
      setLoadedEvents(events);
    }
  }, [events]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Container to center the content */}
      <div className="max-w-7xl mx-auto">
        {/* Display loading or error message */}
        {isLoading && <p>Loading events...</p>}
        {error && <p>Error loading events: {error.message}</p>}

        {/* Event cards container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loadedEvents.length > 0 ? (
            loadedEvents.map((event, index) => (
              <EventCard
                key={index}
                name={event.name}
                description={event.description}
                isActive={event.isActive}
                imageLink={event.ipfsLink}
                location={event.location}
                creator={event.creator}
              />
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
