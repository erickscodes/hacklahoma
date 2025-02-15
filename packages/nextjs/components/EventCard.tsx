import React from "react";

interface EventCardProps {
  name: string;
  description: string;
  isActive: boolean;
  imageLink: string;
  location: string;
  creator: string; // Optional prop
}

const EventCard = ({ name, description, isActive, imageLink, location, creator }: EventCardProps) => {
  const truncatedDescription = description.length > 60 ? `${description.substring(0, 60)}...` : description;
  const truncatedAddress = `${creator.substring(0, 10)}...`;
  return (
    <div className="w-[300px] border text-black rounded-lg">
      <img src={imageLink} alt={name} className="w-full h-32 object-cover rounded-lg" />
      <div className="p-2 space-y-1">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-700">{truncatedDescription}</p>
        <p className="text-gray-500">{location}</p>
        <p className="text-gray-500">creator: {creator}</p>
        <p className={`text-sm ${isActive ? "text-green-500" : "text-red-500"}`}>{isActive ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
};

export default EventCard;
