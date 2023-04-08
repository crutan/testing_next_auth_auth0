/* eslint-disable @next/next/no-img-element */

"use client";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        {/* Top nav*/}
        <header className="relative flex h-16 shrink-0 items-center bg-onyx-900">
          {/* Logo area */}
          <div className="absolute inset-y-0 left-0 md:static md:shrink-0">
            <a
              className="flex h-16 w-16 items-center justify-center bg-celesteal-500 p-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-celesteal-600 md:w-20"
              href="#"
            >
              <svg
                fill="none"
                height="179"
                viewBox="0 0 352 179"
                width="352"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M167.321 147.019C165.761 144.643 167.78 139.992 170.792 135.97C179.053 124.913 195.598 103.165 219.77 79.7712C262.222 66.8276 304.499 51.6171 329.568 38.9369C364.918 21.0572 351.217 -1.08578 328.941 0.479145C308.415 1.91975 273.291 11.5433 205.15 78.7693C185.222 84.4148 213.083 76.5243 174.109 87.5593C168.531 89.4313 159.023 92.1224 147.305 95.4205C151.564 91.1352 155.931 86.6598 160.43 81.9431C196.262 44.4141 210.677 31.0391 216.088 25.9421C223.146 19.2948 230.481 17.452 233.114 15.2582C234.944 13.7298 234.127 12.5525 231.633 12.5525C212.325 12.5159 222.497 12.5525 203.969 12.5525C197.312 12.5525 196.05 13.1814 191.354 15.3021C189.378 16.1942 188.715 17.6275 188.54 19.5361C188.467 20.2967 188 26.8635 187.708 30.7393C187.621 31.8874 187.038 33.3207 186.017 34.6443C180.14 42.213 156.668 70.0891 123.119 102.251C84.123 113.417 35.998 128.284 17.098 141.973C-9.09366 160.943 -0.248872 177.199 18.5053 178.683C37.2668 180.168 73.1855 168.314 140.232 102.455C174.139 92.8537 136.003 103.655 178.929 91.4935C185.054 89.8481 191.303 88.115 197.611 86.3088C194.162 89.8043 190.632 93.4314 187.023 97.2194C155.837 129.885 139.897 144.131 132.481 150.946C129.659 153.535 125.459 154.171 124.905 156.635C124.402 158.873 129.681 163.838 130.316 164.467C131.205 165.352 132.62 165.966 134.064 165.272C138.147 163.319 144.483 160.687 154.94 158.595C168.874 155.809 177.894 157.016 181.095 157.147C183.261 157.235 184.318 153.754 183.931 152.796C182.962 150.427 168.83 149.315 167.321 147.019ZM18.9136 169.009C5.40217 168.65 7.62613 151.546 33.6209 138.061C54.0959 127.436 84.7355 118.222 115.484 109.468C109.709 114.865 103.687 120.342 97.4303 125.834C67.1261 152.431 36.122 169.469 18.9136 169.009ZM329.211 7.84308C346.412 8.51585 346.674 20.8451 321.095 35.2366C297.732 48.3849 260.727 62.4473 227.667 72.3195C234.572 65.9794 242.017 59.5953 250.001 53.3356C281.858 28.3407 307.7 7.00211 329.211 7.84308Z"
                  fill="#FFFFFF"
                />
              </svg>
            </a>
          </div>

          {/* Desktop nav area */}
          <div className="hidden md:flex md:min-w-0 md:flex-1 md:items-center md:justify-between">
            <div className="min-w-0 flex-1 px-5" />

            <div className="ml-10 flex shrink-0 items-center space-x-10 pr-4">
              <nav aria-label="Global" className="flex space-x-10">
                <Link
                  className="text-sm font-medium text-celesteal-500"
                  href="/"
                >
                  HoneyComb Admin
                </Link>
              </nav>
              <div className="flex items-center space-x-4" />
            </div>
          </div>
        </header>

        {/* Bottom section */}
        <div className="flex min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </>
  );
}
