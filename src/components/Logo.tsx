export default function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="80" viewBox="0 0 480 160" role="img" aria-label="momo store logo">
      <defs>
        <style>{`.bg { fill: rgb(238,77,45); } .bag-body { fill: #ffffff; stroke: none; } .bag-handle { fill: none; stroke: #ffffff; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; } .wordmark { font-family: Inter, Roboto, Helvetica Neue, Arial, sans-serif; font-weight: 700; fill: rgb(238,77,45); letter-spacing: -0.02em; } .subtitle { font-family: Inter, Roboto, Helvetica Neue, Arial, sans-serif; font-size: 38px; fill: #777; font-weight: 700; }`}</style>
      </defs>
      <circle cx="80" cy="80" r="70" className="bg" />
      <g transform="translate(45,38)">
        <rect x="5" y="30" width="60" height="55" rx="8" ry="8" className="bag-body" />
        <path d="M20 30 C20 15, 50 15, 50 30" className="bag-handle" />
        <circle cx="20" cy="30" r="3" fill="#ffffff" />
        <circle cx="50" cy="30" r="3" fill="#ffffff" />
      </g>
      <text x="180" y="95" fontSize="56" className="wordmark">momo</text>
      <text x="355" y="95" className="subtitle">Store</text>
    </svg>
  );
}


