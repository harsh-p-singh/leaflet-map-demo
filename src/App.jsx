import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([28.6139, 77.209], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const getCountryName = async (lat, lng) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const error = "Unable to Catch the Loaction"
          const data = await response.json();
          return data.address?.country || error;
        } catch (error) {
          console.error("Error fetching country:", error);
          return error;
        }
      };

      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        const countryName = await getCountryName(lat, lng);

        const popupMsg = `
        <div style="text-align: center; width: 200px;">
          <h3>You clicked here!</h3>
          <p><b>Country:</b> ${countryName}</p>
          <p><b>Latitude:</b> ${lat.toFixed(4)}</p>
          <p><b>Longitude:</b> ${lng.toFixed(4)}</p>
        </div>
      `;
      
        L.popup()
        .setLatLng([lat, lng])
        .setContent(popupMsg)
        .openOn(map);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
}

export default App;
