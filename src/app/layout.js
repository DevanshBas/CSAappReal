"use client";
import '../styles/globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('dark');
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/bills', label: 'Bills', icon: '📋' },
    { href: '/battles', label: 'Battles', icon: '⚔️' },
    { href: '/squads', label: 'Squads', icon: '👥' },
    { href: '/profile', label: 'Profile', icon: '👤' },
    { href: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <title>CivicMix</title>
        <meta name="description" content="Civic engagement made fun." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-80 border-b border-gray-200 dark:border-gray-700">
          <div className="card mx-4 my-2 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="btn-icon md:hidden"
                aria-label="Toggle navigation"
              >
                <span className="text-xl">
                  {isSidebarOpen ? '✕' : '☰'}
                </span>
              </button>
              
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gradient">CivicMix</span>
              </Link>
            </div>

            {/* Header actions */}
            <div className="flex items-center space-x-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="btn-icon"
                aria-label="Toggle theme"
              >
                <span className="text-lg">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </span>
              </button>

              {/* User section */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white text-sm font-bold">
                      U
                    </div>
                    <span className="hidden sm:block font-medium">User Name</span>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="btn-primary text-sm"
                >
                  <span className="mr-1">🔐</span>
                  Login
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main layout */}
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Sidebar overlay for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            fixed md:sticky top-0 left-0 z-50 md:z-0
            w-64 h-screen md:h-auto
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
            flex flex-col
          `}>
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
              <span className="font-bold text-gradient">Navigation</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="btn-icon"
              >
                <span className="text-lg">✕</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link flex items-center space-x-3 w-full ${
                        pathname === item.href ? 'active' : ''
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                © 2025 CivicMix
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 flex flex-col min-h-screen">
            {/* Content area */}
            <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
              <div className="animate-fade-in">
                {children}
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Company info */}
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-gradient">CivicMix</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Making civic engagement fun and accessible for everyone.
                    </p>
                  </div>

                  {/* Quick links */}
                  <div>
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">About</Link></li>
                      <li><Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Help Center</Link></li>
                      <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Contact</Link></li>
                    </ul>
                  </div>

                  {/* Legal */}
                  <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Privacy Policy</Link></li>
                      <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Terms of Service</Link></li>
                      <li><Link href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Cookie Policy</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  © 2025 CivicMix. All rights reserved.
                </div>
              </div>
            </footer>
          </main>
        </div>

        {/* Toast notifications container */}
        <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2">
          {/* Toast notifications will be rendered here */}
        </div>
      </body>
    </html>
  );
}