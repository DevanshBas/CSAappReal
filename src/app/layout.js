"use client";
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
        <style jsx global>{`
          :root {
            --background: #0f172a;
            --card: #1e293b;
            --text-primary: #f8fafc;
            --text-secondary: #cbd5e1;
            --border: #334155;
            --accent-blue: #3b82f6;
            --accent-green: #10b981;
          }
          
          [data-theme="light"] {
            --background: #ffffff;
            --card: #f8fafc;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --border: #e2e8f0;
            --accent-blue: #3b82f6;
            --accent-green: #10b981;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background-color: var(--background);
            color: var(--text-primary);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .text-gradient {
            background: linear-gradient(45deg, var(--accent-blue), var(--accent-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .btn-primary {
            background: linear-gradient(45deg, var(--accent-blue), var(--accent-green));
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
          }
          
          .btn-primary:hover {
            transform: translateY(-1px);
          }
          
          .fade-in {
            animation: fadeIn 0.5s ease-in;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </head>
      <body className="min-h-screen">
        {/* Sidebar - Desktop */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full glass-effect" style={{ borderRight: '1px solid var(--border)' }}>
            {/* Sidebar header */}
            <div style={{ padding: '1rem' }}>
              <Link href="/" className="flex items-center space-x-2 group" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'linear-gradient(45deg, var(--accent-blue), var(--accent-green))',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>C</span>
                </div>
                <span className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>CivicMix</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav style={{ marginTop: '1rem', padding: '0 0.5rem' }}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      marginBottom: '0.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)',
                      backgroundColor: isActive ? 'var(--card)' : 'transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '1.25rem', marginRight: '0.75rem' }}>{item.icon}</span>
                    <span style={{ fontWeight: '500' }}>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Header - Mobile */}
        <header className="glass-effect" style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 40, 
          marginLeft: '16rem', 
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              height: '4rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  style={{
                    display: 'none',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isSidebarOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Header actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    {theme === 'dark' ? (
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    ) : (
                      <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
                    )}
                  </svg>
                </button>

                {/* User section */}
                {isLoggedIn ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, var(--accent-blue), var(--accent-green))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                      }}>
                        U
                      </div>
                      <span style={{ fontWeight: '500' }}>User Name</span>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsLoggedIn(true)}
                    className="btn-primary"
                    style={{ fontSize: '0.875rem' }}
                  >
                    <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <main style={{ marginLeft: '16rem', minHeight: 'calc(100vh - 4rem)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem' }}>
            {/* Page content */}
            <div className="fade-in">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile navigation overlay */}
        {isSidebarOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 40
            }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </body>
    </html>
  );
}
