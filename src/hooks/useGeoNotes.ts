import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import type { Note } from "../types/Note";

export function useGeoNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const checkIn = async (text: string = "New Note") => {
    try {
      // Chỉ xin quyền nếu đang chạy trong môi trường native
      if (Capacitor.isNativePlatform()) {
        const permResult = await Geolocation.requestPermissions();
        if (
          permResult.location === "denied" ||
          permResult.coarseLocation === "denied"
        ) {
          throw new Error("Access Denied");
        }
      }

      // Lấy vị trí hiện tại
      const coords = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      const note: Note = {
        id: Date.now(),
        text,
        lat: coords.coords.latitude,
        lng: coords.coords.longitude,
      };

      setNotes((prev) => [...prev, note]);
      return note;
    } catch (err) {
      console.error("Could not get location:", err);
      return null;
    }
  };

  return { notes, checkIn };
}
