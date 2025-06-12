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

  // Initialize theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
  // Navigation items with descriptions
  const navItems = [
    { 
      href: '/', 
      label: 'Home', 
      icon: '🏠',
      description: 'Your dashboard and activity feed'
    },
    { 
      href: '/bills', 
      label: 'Bills', 
      icon: '📋',
      description: 'Explore and interact with legislation'
    },
    { 
      href: '/remix', 
      label: 'Remix Studio', 
      icon: '🎨',
      description: 'Create and share bill remixes'
    },
    { 
      href: '/battles', 
      label: 'Battles', 
      icon: '⚔️',
      description: 'Participate in bill battles'
    },
    { 
      href: '/squads', 
      label: 'Squads', 
      icon: '👥',
      description: 'Join and manage your squads'
    },
    { 
      href: '/leaderboard', 
      label: 'Leaderboard', 
      icon: '🏆',
      description: 'See top performers and rankings'
    },
    { 
      href: '/profile', 
      label: 'Profile', 
      icon: '👤',
      description: 'Your personal profile and stats'
    },
    { 
      href: '/settings', 
      label: 'Settings', 
      icon: '⚙️',
      description: 'Customize your experience'
    }
  ];

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <title>CivicMix</title>
        <meta name="description" content="Civic engagement made fun." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>      <body className="min-h-screen bg-background text-text-primary">
        {/* Sidebar - Desktop */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full glass-effect border-r" style={{ borderColor: 'var(--border)' }}>
            {/* Sidebar header */}
            <div className="p-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-green rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold text-gradient">CivicMix</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="mt-4 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 
                      ${isActive ? 'bg-card text-accent-blue' : 'hover:bg-card hover:text-text-primary'}`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-3 py-1 bg-card rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm whitespace-nowrap z-50">
                      {item.description}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Header - Mobile */}
        <header className="sticky top-0 z-40 lg:pl-64 glass-effect border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Toggle navigation"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isSidebarOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="text-xl font-bold text-gradient hidden sm:block">CivicMix</span>
                </Link>
              </div>

              {/* Header actions */}
              <div className="flex items-center space-x-3">
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Toggle theme"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {theme === 'dark' ? (
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    ) : (
                      <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
                    )}
                  </svg>
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
                    className="btn-primary text-sm px-4 py-2"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="lg:pl-64 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
            {/* Breadcrumb navigation */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm">
                {pathname.split('/').map((segment, index, array) => {
                  if (!segment) return null;
                  const path = '/' + array.slice(1, index + 1).join('/');
                  const navItem = navItems.find(item => item.href === path);
                  const label = navItem ? navItem.label : segment;
                  
                  return (
                    <li key={path} className="flex items-center">
                      {index > 0 && (
                        <span className="mx-2 text-text-secondary">/</span>
                      )}
                      <Link 
                        href={path}
                        className={`hover:text-accent-blue transition-colors ${
                          index === array.length - 1 ? 'text-text-primary font-medium' : 'text-text-secondary'
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Page title */}
            <div className="mb-8">
              {pathname !== '/' && (
                <h1 className="text-3xl font-bold">
                  {navItems.find(item => item.href === pathname)?.label || 'Page'}
                </h1>
              )}
            </div>

            {/* Page content */}
            <div className="fade-in">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile navigation overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </body>
    </html>
  );
}