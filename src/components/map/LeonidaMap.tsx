"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle, useMap } from "react-leaflet";
import { type Location } from "@/lib/types";
import { regionColor, regionRadius } from "@/lib/regionColors";

// Leonida is modeled on Florida, so we render real Florida geography. Regions
// are pinned at their real-world equivalents. Basemaps are free + attributed.
const CENTER: [number, number] = [28.0, -83.0];
const FL_BOUNDS: L.LatLngBoundsExpression = [
  [24.0, -88.5],
  [31.4, -79.2],
];

const BASEMAPS = {
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics",
    maxZoom: 18,
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20,
  },
} as const;

type Basemap = keyof typeof BASEMAPS;

// Real-world coordinates for each known region (Florida equivalents).
const GEO: Record<string, [number, number]> = {
  "vice-city": [25.77, -80.19], // Miami
  "leonida-keys": [24.66, -81.55], // Florida Keys
  grassrivers: [25.85, -80.9], // Everglades
  "port-gellhorn": [30.16, -85.66], // Panama City (Panhandle)
  ambrosia: [26.75, -80.93], // Clewiston (sugar country)
  "mount-kalliga": [27.95, -81.58], // Lake Wales Ridge (highlands)
};

function fallbackLatLng(x: number, y: number): [number, number] {
  const latMax = 31.0,
    latMin = 24.3,
    lngMin = -87.6,
    lngMax = -79.9;
  return [latMax - (y / 100) * (latMax - latMin), lngMin + (x / 100) * (lngMax - lngMin)];
}

function geoFor(l: Location): [number, number] {
  return GEO[l.slug] ?? fallbackLatLng(l.coordinates!.x, l.coordinates!.y);
}

function markerIcon(c: string, active: boolean): L.DivIcon {
  const size = active ? 26 : 20;
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
    if (active) {
      map.flyTo(geoFor(active), Math.max(map.getZoom(), 10), { duration: 0.7 });
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
  const [basemap, setBasemap] = useState<Basemap>("satellite");
  const pinned = locations.filter((l) => l.coordinates);
  const active = pinned.find((l) => l.id === activeId) ?? null;
  const tiles = BASEMAPS[basemap];

  return (
    <div className="relative h-full w-full">
      {/* basemap toggle */}
      <div className="absolute right-3 top-3 z-[1000] flex overflow-hidden rounded-lg border border-white/15 bg-night/80 backdrop-blur">
        {(["satellite", "dark"] as Basemap[]).map((b) => (
          <button
            key={b}
            onClick={() => setBasemap(b)}
            className={`cursor-pointer px-3 py-1.5 text-xs font-semibold capitalize transition ${
              basemap === b ? "bg-neon-pink text-white" : "text-muted hover:text-foreground"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <MapContainer
        center={CENTER}
        zoom={6}
        minZoom={5}
        maxZoom={tiles.maxZoom}
        maxBounds={FL_BOUNDS}
        maxBoundsViscosity={0.9}
        zoomControl
        style={{ height: "100%", width: "100%", background: "#05101a" }}
      >
        <TileLayer
          key={basemap}
          url={tiles.url}
          attribution={tiles.attribution}
          subdomains={basemap === "dark" ? "abcd" : "abc"}
          maxZoom={tiles.maxZoom}
        />
        {pinned.map((l) => {
          const color = regionColor(l.type);
          const pos = geoFor(l);
          const isActive = l.id === activeId;
          return (
            <Fragment key={l.id}>
              {/* region boundary / zone outline */}
              <Circle
                center={pos}
                radius={regionRadius(l.type)}
                pathOptions={{
                  color,
                  weight: isActive ? 2.5 : 1.5,
                  opacity: 0.85,
                  fillColor: color,
                  fillOpacity: isActive ? 0.2 : 0.1,
                  dashArray: "5 7",
                }}
                eventHandlers={{ click: () => onSelect(l.id) }}
              />
              <Marker
                position={pos}
                icon={markerIcon(color, isActive)}
                eventHandlers={{ click: () => onSelect(l.id) }}
              >
                {/* always-on label */}
                <Tooltip permanent direction="top" offset={[0, -12]} className="vch-label">
                  {l.title}
                </Tooltip>
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
            </Fragment>
          );
        })}
        <MapController active={active} />
      </MapContainer>
    </div>
  );
}
