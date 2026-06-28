"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, ImageOverlay, Marker, Popup, useMap } from "react-leaflet";
import { VERIFICATION, type Location } from "@/lib/types";

// The base map is a 1000x1000 image. Swap MAP_IMAGE for a real/licensed
// Leonida map render later — just keep the same square dimensions.
const W = 1000;
const H = 1000;
const BOUNDS: L.LatLngBoundsExpression = [
  [0, 0],
  [H, W],
];
const MAP_IMAGE = "/map/leonida.svg";

const TONE_HEX: Record<string, string> = {
  cyan: "#22d3ee",
  purple: "#a855f7",
  pink: "#ff2d95",
};

// Location coords are 0–100 (% from top-left). Convert to Leaflet's
// bottom-left origin: lat = (100 - y), lng = x, scaled to image size.
function toLatLng(x: number, y: number): [number, number] {
  return [((100 - y) / 100) * H, (x / 100) * W];
}

function markerIcon(tone: string, active: boolean): L.DivIcon {
  const c = TONE_HEX[tone] ?? "#ff2d95";
  const size = active ? 22 : 16;
  return L.divIcon({
    className: "vch-pin-wrap",
    html: `<span class="vch-pin${active ? " vch-pin--active" : ""}" style="--pin:${c}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function MapController({ active }: { active: Location | null }) {
  const map = useMap();
  useEffect(() => {
    if (active?.coordinates) {
      const [lat, lng] = toLatLng(active.coordinates.x, active.coordinates.y);
      map.flyTo([lat, lng], Math.max(map.getZoom(), 0), { duration: 0.6 });
    }
  }, [active, map]);
  return null;
}

export default function LeonidaMap({
  locations,
  activeId,
  onSelect,
}: {
  locations: Location[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const pinned = locations.filter((l) => l.coordinates);
  const active = pinned.find((l) => l.id === activeId) ?? null;

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={BOUNDS}
      maxBounds={BOUNDS}
      maxBoundsViscosity={1}
      minZoom={-1}
      maxZoom={2}
      zoomControl
      attributionControl={false}
      style={{ height: "100%", width: "100%", background: "transparent" }}
    >
      <ImageOverlay url={MAP_IMAGE} bounds={BOUNDS} />
      {pinned.map((l) => (
        <Marker
          key={l.id}
          position={toLatLng(l.coordinates!.x, l.coordinates!.y)}
          icon={markerIcon(VERIFICATION[l.status].tone, l.id === activeId)}
          eventHandlers={{ click: () => onSelect(l.id) }}
        >
          <Popup>
            <div className="vch-popup">
              <div className="vch-popup__eyebrow">{l.type}</div>
              <div className="vch-popup__title">{l.title}</div>
              <p className="vch-popup__desc">{l.description}</p>
              <a className="vch-popup__link" href={`/locations/${l.slug}`}>
                View location →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapController active={active} />
    </MapContainer>
  );
}
