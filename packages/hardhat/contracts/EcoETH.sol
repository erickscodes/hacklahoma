//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EcoETH is ERC20 {
    struct Event {
        address creator;
        string name;
        bool isActive;
        string ipfsLink;
        string description;
        string location;  // New location field
        int256 latitude;   // New latitude field (using int256 to support both positive and negative values)
        int256 longitude;  // New longitude field (using int256 to support both positive and negative values)
    }

    // Mapping to store events by event ID
    mapping(uint256 => Event) public events;
    // Array to store event IDs
    uint256[] public eventIds;
    uint256 public nextEventId;

    constructor() ERC20("EcoETH", "ECO") {}

    // Minting is open to anyone and for free.
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    // Function to create an event with location, latitude, and longitude
    function createEvent(
        string memory name,
        bool isActive,
        string memory ipfsLink,
        string memory description,
        string memory location,   // Added location parameter
        int256 latitude,          // Added latitude parameter
        int256 longitude          // Added longitude parameter
    ) public returns (uint256) {
        uint256 eventId = nextEventId;
        events[eventId] = Event({
            creator: msg.sender,
            name: name,
            isActive: isActive,
            ipfsLink: ipfsLink,
            description: description,
            location: location,     // Store location
            latitude: latitude,     // Store latitude
            longitude: longitude    // Store longitude
        });

        eventIds.push(eventId);  // Store the event ID in the array
        nextEventId++;
        return eventId;
    }

    // Function to get event details
    function getEvent(uint256 eventId) public view returns (
        address, 
        string memory, 
        bool, 
        string memory, 
        string memory,         // Return description
        string memory,         // Return location
        int256,                // Return latitude
        int256                 // Return longitude
    ) {
        Event storage e = events[eventId];
        return (e.creator, e.name, e.isActive, e.ipfsLink, e.description, e.location, e.latitude, e.longitude);  // Include location, latitude, and longitude in return
    }

    // Optional: function to update event status
    function updateEventStatus(uint256 eventId, bool isActive) public {
        Event storage e = events[eventId];
        require(e.creator == msg.sender, "You are not the creator of this event.");
        e.isActive = isActive;
    }

    // Function to get the total count of events
    function getEventCount() public view returns (uint256) {
        return eventIds.length;  // Return the length of the eventIds array
    }

    // Function to get all events
    function getAllEvents() public view returns (Event[] memory) {
        uint256 eventCount = eventIds.length;
        Event[] memory eventList = new Event[](eventCount);
        
        for (uint256 i = 0; i < eventCount; i++) {
            uint256 eventId = eventIds[i];
            eventList[i] = events[eventId];
        }
        
        return eventList;
    }
}
