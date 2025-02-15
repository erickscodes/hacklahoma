"use client";

import { useState } from "react";
import { Map } from "@vis.gl/react-maplibre";
import { MapPin } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
// Import the Location icon from lucide-react
import type { NextPage } from "next";
import { useAccount } from "wagmi";

export const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [viewState, setViewState] = useState({
    longitude: -96.797,
    latitude: 32.7767,
    zoom: 15, // You can adjust the zoom level based on how close or far you want the map to be
  });

  return (
    <div style={{ height: "100vh" }}>
      {/* <Map
        initialViewState={viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        attributionControl={false}
      /> */}
    </div>
  );
};

export default Home;
