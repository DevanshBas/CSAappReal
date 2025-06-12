"use client";
import '../styles/globals.css'; // Import global styles
import Link from 'next/link'; // Import Link for navigation
import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname to get current path

export default function RootLayout({ children }) {
  // Consider using useRouter to determine the active link based on pathname
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility on mobile
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage logged-in/logged-out status
  return (
    <html lang="en">
      <head>
        {/* Add necessary head elements here, like title, meta tags, etc. */}
        <title>CivicMix</title>
        <meta name="description" content="Civic engagement made fun." />
      </head>
      <body>
        <header className="p-4 bg-gray-800 text-white flex justify-between items-center"> {/* Added some basic styling for visibility */}
          <div className="flex items-center"> {/* Container for Logo */}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">CivicMix</span>
          </div>
          <div className="flex items-center space-x-4"> {/* Container for User Auth and Settings, added spacing */}
            {/* Conditional rendering for logged-in/logged-out state */}
            {isLoggedIn ? (
              /* Logged-in state placeholder */
              <div className="flex items-center space-x-2"> {/* Container for Avatar and Display Name */}
                <div className="w-12 h-12 rounded-full bg-gray-400"></div> {/* Avatar Placeholder */}
                <span>Display Name</span> {/* Display Name Placeholder */}
              </div>
            ) : (
              /* Logged-out state placeholder */
              <div>
                <button className="px-4 py-2 rounded-md bg-accent text-white flex items-center space-x-1">
                  <span>[Icon]</span> {/* LogIn Icon Placeholder */}
                  <span>Login</span>
                </button>
              </div>
            )}
            {/* Settings Icon Placeholder with hover animation */}
            {/* You'll need to add state/logic here later for the slide-out drawer */}
            <span className="transition hover:rotate-3 hover:scale-105">[Settings Icon]</span>
          </div>
        </header>

        {/* Main Content Area with Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6">
          {/* Navigation Sidebar - Responsive */}
          <div className="col-span-1 relative"> {/* Container for sidebar and mobile toggle */}
            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle navigation"
            >
              {isSidebarOpen ? '[Close Icon]' : '[Hamburger Icon]'} {/* Toggle Icon based on state */}
            </button>

            {/* Navigation Sidebar */}
            {/* Apply conditional classes for mobile slide-in/out */}
            {/* Added conditional positioning and visibility classes */}
            <nav className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:bg-transparent md:z-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col space-y-4 p-4 md:p-0 md:flex-row md:space-x-4 md:space-y-0 md:flex-col md:space-y-4`}>
              {/* Apply conditional classes for active link and hover transition */}
              <Link href="/" onClick={() => setIsSidebarOpen(false)} className={`p-3 rounded-lg text-gray-700 transition-colors duration-200 ${usePathname() === '/' ? 'bg-blue-600 font-bold text-white' : 'hover:bg-gray-200'}`} aria-label="Link to Home">Home</Link>
              <Link href="/bills" onClick={() => setIsSidebarOpen(false)} className={`p-3 rounded-lg text-gray-700 transition-colors duration-200 ${usePathname() === '/bills' ? 'bg-blue-600 font-bold text-white' : 'hover:bg-gray-200'}`} aria-label="Link to Bills">Bills</Link>
              <Link href="/battles" onClick={() => setIsSidebarOpen(false)} className={`p-3 rounded-lg text-gray-700 transition-colors duration-200 ${usePathname() === '/battles' ? 'bg-blue-600 font-bold text-white' : 'hover:bg-gray-200'}`} aria-label="Link to Battles">Battles</Link>
              <Link href="/squads" onClick={() => setIsSidebarOpen(false)} className={`p-3 rounded-lg text-gray-700 transition-colors duration-200 ${usePathname() === '/squads' ? 'bg-blue-600 font-bold text-white' : 'hover:bg-gray-200'}`} aria-label="Link to Squads">Squads</Link>
              <Link href="/profile" onClick={() => setIsSidebarOpen(false)} className={`p-3 rounded-lg text-gray-700 transition-colors duration-200 ${usePathname() === '/profile' ? 'bg-blue-600 font-bold text-white' : 'hover:bg-gray-200'}`} aria-label="Link to Profile">Profile</Link>
              <Link href="/settings" onClick={() => setIsSidebarOpen(false)} className={`p-3 rounded-lg text-gray-700 transition-colors duration-200 ${usePathname() === '/settings' ? 'bg-blue-600 font-bold text-white' : 'hover:bg-gray-200'}`} aria-label="Link to Settings">Settings</Link>
            </nav>

            {/* Mobile Sidebar Overlay (Hidden by default) */}
            {/* You'll need to implement the logic to show/hide this overlay */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              ></div>
            )}
             {/* Mobile Sidebar (Hidden by default) */}
             {/* You'll need to implement the logic and animation for this sidebar */}
             {/* Removed the redundant mobile sidebar div */}
          </div>

          {/* Main Content */}
          <main className="col-span-1 md:col-span-3 p-6 bg-gray-50 max-w-7xl mx-auto overflow-y-auto mt-4 font-sans text-gray-800">{children}</main>
        </div>
        
        {/* Footer */}
        <footer className="w-full bg-gray-900 text-white py-4 text-center h-12">
 <div className="container mx-auto px-4">
 <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm mb-2">
 <Link href="#" className="text-gray-400 hover:underline">About</Link>
 <Link href="#" className="text-gray-400 hover:underline">Privacy Policy</Link>
 <Link href="#" className="text-gray-400 hover:underline">Terms of Service</Link>
 </div>
          © 2025 CivicMix. All rights reserved.
 </div>
        </footer>

        {/* Placeholder for ModalsContainer */}
      </body>
    </html>
  );
}