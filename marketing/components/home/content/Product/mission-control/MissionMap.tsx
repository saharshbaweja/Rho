import { useId } from "react";
import { FLEET } from "./scenario";

function routePosition(route: string, fraction: number) {
  const numbers = (route.match(/\d+/g) ?? []).map(Number);
  const points = Array.from({ length: numbers.length / 2 }, (_, i) => ({
    x: numbers[i * 2],
    y: numbers[i * 2 + 1],
  }));
  const scaled = Math.max(0, Math.min(0.9999, fraction)) * (points.length - 1);
  const index = Math.floor(scaled);
  const part = scaled - index;
  const start = points[index];
  const end = points[index + 1];
  return {
    x: start.x + (end.x - start.x) * part,
    y: start.y + (end.y - start.y) * part,
    angle: (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI + 90,
  };
}
export function MissionMap({
  chapter,
  progress,
  selected,
  onSelect,
  layer,
  zoom,
  playing,
}: {
  chapter: number;
  progress: number;
  selected: number;
  onSelect: (value: number) => void;
  layer: string;
  zoom: number;
  playing: boolean;
}) {
  const prefix = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 900 560"
      preserveAspectRatio="xMidYMid slice"
      className="aeros-map-svg"
      aria-label="Illustrative north district mission map with aircraft, mission boundaries, and recovery routes"
      role="img"
    >
      <defs>
        <radialGradient id={`${prefix}-land`}>
          <stop stopColor="#283332" />
          <stop offset="1" stopColor="#141e21" />
        </radialGradient>
        <pattern
          id={`${prefix}-grid`}
          width="90"
          height="70"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M90 0H0V70"
            fill="none"
            stroke="#a0c1c5"
            strokeOpacity=".065"
            strokeWidth=".8"
          />
        </pattern>
        <pattern
          id={`${prefix}-restriction`}
          width="9"
          height="9"
          patternTransform="rotate(35)"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0V9"
            stroke="#e2ad70"
            strokeOpacity=".2"
            strokeWidth="2"
          />
        </pattern>
        <filter id={`${prefix}-terrain`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".035"
            numOctaves="3"
            seed="19"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".12" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="soft-light" />
        </filter>
        <filter
          id={`${prefix}-glow`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <linearGradient id={`${prefix}-weather`} x1="0" x2="1">
          <stop stopColor="#d9ac65" stopOpacity="0" />
          <stop offset=".5" stopColor="#d9ac65" stopOpacity=".15" />
          <stop offset="1" stopColor="#d9ac65" stopOpacity="0" />
        </linearGradient>
        {FLEET.map((drone, i) => (
          <path id={`${prefix}-route-${i}`} key={drone.id} d={drone.route} />
        ))}
      </defs>
      <rect width="900" height="560" fill={`url(#${prefix}-land)`} />
      <g
        transform={`translate(${450 - 450 * zoom} ${280 - 280 * zoom}) scale(${zoom})`}
      >
        <image
          href="/static/landing/drone/alameda-aerial.jpg"
          width="900"
          height="560"
          preserveAspectRatio="xMidYMid slice"
        />
        <rect width="900" height="560" fill="#132335" opacity=".24" />
        <g fontFamily="inherit" fontSize="10" letterSpacing="1.5" fill="#fff">
          <text x="350" y="270">
            ALAMEDA POINT
          </text>
          <text x="440" y="100">
            OAKLAND INNER HARBOR
          </text>
        </g>
        {layer !== "weather" && (
          <g>
            <path
              d="M130 130L395 105L430 360L280 460L110 380Z"
              fill="#7fc7dc"
              fillOpacity={chapter >= 1 ? ".035" : "0"}
              stroke="#8ed5e6"
              strokeOpacity={chapter >= 1 ? ".48" : ".15"}
              strokeWidth="1"
              strokeDasharray="5 6"
            />
            <path
              d="M590 85L790 90L810 350L650 420L560 300Z"
              fill="#b7a9de"
              fillOpacity=".035"
              stroke="#b7a9de"
              strokeOpacity=".3"
              strokeWidth="1"
              strokeDasharray="5 6"
            />
          </g>
        )}
        {(layer === "airspace" || chapter === 1) && (
          <g>
            <path
              d="M660 0H900V160L760 140L640 70Z"
              fill={`url(#${prefix}-restriction)`}
              stroke="#d7aa72"
              strokeOpacity=".4"
              strokeDasharray="4 4"
            />
            <text x="734" y="60" fontSize="9" letterSpacing="1" fill="#d7aa72">
              RESTRICTED AREA
            </text>
          </g>
        )}
        {(layer === "weather" || chapter === 3) && (
          <g>
            <ellipse
              cx="420"
              cy="335"
              rx="230"
              ry="125"
              fill={`url(#${prefix}-weather)`}
              transform="rotate(-35 420 335)"
            />
            <g fill="none" stroke="#d7aa72" strokeOpacity=".3">
              {[0, 1, 2, 3].map((i) => (
                <path key={i} d={`M${270 + i * 46} 275l24-15m-6 0h6v6`} />
              ))}
            </g>
            <text
              x="292"
              y="255"
              fill="#d7aa72"
              fontSize="10"
              letterSpacing="1"
            >
              WIND SHIFT · 18 KT
            </text>
          </g>
        )}
        {chapter >= 1 &&
          FLEET.map((drone, i) => (
            <g key={drone.id} opacity={selected === i ? 1 : 0.45}>
              <path
                d={drone.route}
                stroke={drone.color}
                strokeWidth="8"
                opacity=".12"
                fill="none"
                filter={`url(#${prefix}-glow)`}
              />
              <path
                d={drone.route}
                stroke={drone.color}
                strokeWidth={selected === i ? 2 : 1.3}
                fill="none"
                strokeDasharray={chapter === 1 ? "4 5" : undefined}
              />
              {[0, 1, 2, 3].map((j) => (
                <circle
                  key={j}
                  cx={i === 2 ? 625 + j * 40 : 170 + j * 52}
                  cy={i === 2 ? 150 + j * 48 : 160 + j * 60}
                  r="2.5"
                  fill={drone.color}
                  opacity=".65"
                />
              ))}
            </g>
          ))}
        {chapter === 3 && (
          <path
            d="M650 380L540 410L460 370L535 310L570 235"
            stroke="#e7b475"
            strokeWidth="2"
            strokeDasharray="7 5"
            fill="none"
          />
        )}
        {[
          { x: 180, y: 405, label: "DOCK N-01" },
          { x: 650, y: 380, label: "DOCK E-02" },
        ].map((d) => (
          <g key={d.label}>
            <circle
              cx={d.x}
              cy={d.y}
              r="20"
              fill="#071319"
              stroke="#78898a"
              strokeOpacity=".5"
            />
            <path
              d={`M${d.x - 6} ${d.y + 4}v-9h12v9m-15 1h18`}
              fill="none"
              stroke="#c8d2cd"
              strokeWidth="1.2"
            />
            <text
              x={d.x + 28}
              y={d.y + 3}
              fontSize="9"
              letterSpacing="1"
              fill="#b5c4c1"
            >
              {d.label}
            </text>
          </g>
        ))}
        {chapter >= 1 &&
          FLEET.map((drone, i) => {
            const position = routePosition(
              drone.route,
              chapter === 1
                ? i * 0.12
                : chapter === 4
                  ? 0.98
                  : ((progress - 40) / 40 + i * 0.13) % 1
            );
            return (
              <g
                key={drone.id}
                role="button"
                tabIndex={0}
                aria-label={`Inspect aircraft ${drone.id}`}
                onClick={() => onSelect(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(i);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <g
                  transform={`translate(${position.x} ${position.y})`}
                  style={{
                    transition: playing ? "transform .1s linear" : "none",
                  }}
                >
                  <circle
                    r={selected === i ? 24 : 17}
                    fill={drone.color}
                    fillOpacity=".06"
                    stroke={drone.color}
                    strokeOpacity=".25"
                  />
                  <circle
                    r="11"
                    fill="#102129"
                    stroke={drone.color}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M0-7L5 5L0 2L-5 5Z"
                    fill={drone.color}
                    transform={`rotate(${position.angle})`}
                  />
                  <g transform="translate(18 -26)">
                    <rect
                      width="84"
                      height="25"
                      rx="5"
                      fill="#0c171f"
                      stroke={drone.color}
                      strokeOpacity=".3"
                    />
                    <text x="9" y="16" fontSize="10" fill="#e3ece8">
                      {drone.id}{" "}
                      <tspan fill="#8caaa7">
                        {chapter === 1
                          ? "Ready"
                          : chapter === 4
                            ? "Landed"
                            : i === selected
                              ? "↗ 32m"
                              : "↗ 45m"}
                      </tspan>
                    </text>
                  </g>
                </g>
              </g>
            );
          })}
        {chapter === 4 && (
          <g>
            <path
              d="M130 130L395 105L430 360L280 460L110 380Z"
              fill="#a6cd98"
              fillOpacity=".08"
              stroke="#a6cd98"
              strokeOpacity=".6"
            />
            <g fill="#deb278">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <g
                  key={i}
                  transform={`translate(${168 + i * 24} ${185 + (i % 3) * 72})`}
                >
                  <circle
                    r="6"
                    fillOpacity=".13"
                    stroke="#deb278"
                    strokeOpacity=".7"
                  />
                  <circle r="2" />
                </g>
              ))}
            </g>
          </g>
        )}
      </g>
      <g fontSize="8" fontFamily="monospace" fill="#7f9291" opacity=".65">
        <text x="20" y="535">
          37°47′10″ N
        </text>
        <text x="799" y="535">
          122°18′07″ W
        </text>
        <path d="M750 515h100m-100-4v8m100-8v8" stroke="#7f9291" />
        <text x="785" y="505">
          500 M
        </text>
      </g>
    </svg>
  );
}
