import React from "react";
import { toast } from "react-hot-toast";

interface EventCardProps {
  name: string;
  description: string;
  isActive: boolean;
  imageLink: string;
  location: string;
  creator: string; // Optional prop
}

const EventCard = ({ name, description, isActive, imageLink, location, creator }: EventCardProps) => {
  // Truncate description to the first 60 characters
  const truncatedDescription = description.length > 60 ? `${description.substring(0, 60)}...` : description;
  // Truncate creator address to the first 10 characters
  const truncatedAddress = `${creator.substring(0, 10)}...`;

  // Function to copy the creator address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(creator)
      .then(() => {
        toast.success("Address copied to clipboard!");
      })
      .catch(err => {
        toast.error("Failed to copy address: " + err);
      });
  };

  // Function to open the location in Google Maps
  const openGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps?q=${encodedLocation}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="w-[300px] border text-black rounded-lg">
      <img src={imageLink} alt={name} className="w-full h-32 object-cover rounded-lg" />
      <div className="p-2 space-y-1">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-700">{truncatedDescription}</p>
        {/* Location clickable to open Google Maps */}
        <p className="text-blue-500 cursor-pointer hover:underline" onClick={openGoogleMaps}>
          {location}
        </p>
        {/* Creator address clickable to copy to clipboard */}
        <p className="text-gray-500 cursor-pointer hover:underline" onClick={copyToClipboard}>
          Creator: {truncatedAddress}
        </p>
        <p className={`text-sm ${isActive ? "text-green-500" : "text-red-500"}`}>{isActive ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
};

export default EventCard;
