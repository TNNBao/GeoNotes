import React, { useEffect, useRef } from "react";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGeoNotes } from "../hooks/useGeoNotes";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});

const GeoNotes: React.FC = () => {
  const { notes, checkIn, deleteNote } = useGeoNotes();
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("GPS OK:", pos.coords);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            alert("⚠️ Vui lòng bật định vị (GPS) để sử dụng bản đồ!");
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            alert("Không thể truy cập GPS. Hãy bật định vị trong cài đặt!");
          }
        }
      );
    } else {
      alert("Thiết bị này không hỗ trợ định vị (GPS).");
    }
  }, []);

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

  useEffect(() => {
    if (mapRef.current) {
      // trước tiên clear tất cả marker cũ trước khi vẽ lại
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });

      notes.forEach((note) => {
        L.marker([note.lat, note.lng])
          .addTo(mapRef.current!)
          .bindPopup(note.text);
      });
    }
  }, [notes]);

  const focusNote = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 16); // zoom tới note
    }
  };

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
          <li
            className="note-item"
            key={n.id}
            onClick={() => focusNote(n.lat, n.lng)}
            style={{ cursor: "pointer" }}
          >
            <span className="note-text">
              {n.text} ({n.lat.toFixed(5)}, {n.lng.toFixed(5)})
            </span>
            <div className="note-actions">
              <a
                href={`https://www.google.com/maps?q=${n.lat},${n.lng}`}
                target="_blank"
                rel="noreferrer"
                className="guide-link"
              >
                🧭 Guide
              </a>
              <button className="delete-btn" onClick={() => deleteNote(n.id)}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeoNotes;
