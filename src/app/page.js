'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: "Bill Explorer",
      description: "Discover and understand current legislation",
      icon: "📋",
      link: "/bills",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      title: "Remix Studio",
      description: "Create and share your own versions of bills",
      icon: "🎨",
      link: "/remix",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      title: "Battle Arena",
      description: "Participate in bill battles and competitions",
      icon: "⚔️",
      link: "/battles",
      gradient: "from-orange-500 to-red-400"
    },
    {
      title: "Squads",
      description: "Join forces with others to make a bigger impact",
      icon: "👥",
      link: "/squads",
      gradient: "from-green-500 to-emerald-400"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="text-4xl md:text-5xl font-black mb-6">
          Engage with Legislation,<br />Remix Your Future
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-8">
          CivicMix is where policy meets participation. Explore bills, join battles,
          remix legislation, and shape the future through civic engagement.
        </p>
        <Link href="/bills" className="btn btn-primary">
          Get Started
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Link 
            key={feature.title} 
            href={feature.link}
            className="card group hover:scale-[1.02] transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            <p className="text-text-secondary">{feature.description}</p>
          </Link>
        ))}
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Bills", value: "150+" },
          { label: "Remixes Created", value: "2.5k" },
          { label: "Active Battles", value: "48" },
          { label: "Squad Members", value: "12k" }
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{stat.value}</div>
            <div className="text-text-secondary">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="glass-card p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
          Join our community of engaged citizens and help shape the future of legislation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/bills" className="btn btn-primary">
            Explore Bills
          </Link>
          <Link href="/squads" className="btn btn-secondary">
            Join a Squad
          </Link>
        </div>
      </section>
    </div>
  );
}