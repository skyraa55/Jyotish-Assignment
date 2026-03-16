import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const cityCoordinates = {
  Edinburgh: [55.9533, -3.1883],
  Tokyo: [35.6762, 139.6503],
  "San Francisco": [37.7749, -122.4194],
  "New York": [40.7128, -74.006],
  London: [51.5074, -0.1278],
  Sydney: [-33.8688, 151.2093],
  Singapore: [1.3521, 103.8198],
};
function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const coords = Object.values(cityCoordinates);
    map.fitBounds(coords, { padding: [80, 80] });
  }, [map]);
  return null;
}

export default function CityMap({ employees = [] }) {
  return (
    <div className="flex justify-center bg-white p-8 rounded-xl">
      <div className="w-[700px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Employee Cities Map
        </h2>
        <MapContainer
          style={{
            height: "450px",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds />
          {Object.entries(cityCoordinates).map(([city, coords]) => {
            const count = employees.filter(e => e[2] === city).length;
            return (
              <CircleMarker
                key={city}
                center={coords}
                radius={12}
                pathOptions={{
                  color: "#1D4ED8",
                  fillColor: "#271F5D",
                  fillOpacity: 0.9,
                  weight: 2
                }}
              >
                <Tooltip permanent direction="top" offset={[0, -8]} className="text-md">
                  {city}
                </Tooltip>
                <Popup>
                  <b>{city}</b>
                  <br />
                  Employees: {count}
                </Popup>
              </CircleMarker>
            );

          })}
        </MapContainer>
      </div>
    </div>
  );
}