export default function Curve() {
    return (
        <svg width="320" height="140" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 120
                   C50 60, 90 140, 130 70
                   C170 0, 210 110, 250 40
                   C270 -10, 300 60, 310 30"
                stroke="url(#gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="0.5" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#ffffff" />
                </linearGradient>
            </defs>
        </svg>
    );
}