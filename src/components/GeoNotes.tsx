import React, { useEffect, useRef } from "react";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGeoNotes } from "../hooks/useGeoNotes";

const GeoNotes: React.FC = () => {
  const { notes, checkIn } = useGeoNotes();
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([16.0471, 108.2068], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      notes.forEach((note) => {
        L.marker([note.lat, note.lng])
          .addTo(mapRef.current!)
          .bindPopup(note.text);
      });
    }
  }, [notes]);

  const handleCheckIn = async () => {
    const text = prompt("Enter your note:") || "No title";
    await checkIn(text);
  };

  return (
    <div>
      <button onClick={handleCheckIn}>📍 Check-in</button>
      <div className="leaflet-container">
        <div id="map" style={{ height: "100%", marginTop: "10px" }}></div>
      </div>
      <h3>Check Point List</h3>
      <ul className="notes-list">
        {notes.map((n) => (
          <a
            href={`https://www.google.com/maps?q=${n.lat},${n.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            <li className="note-item" key={n.id}>
              {n.text} ({n.lat.toFixed(5)}, {n.lng.toFixed(5)})
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default GeoNotes;
