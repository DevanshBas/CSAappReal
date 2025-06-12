'use client';

// This is a test comment
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-gray-900 dark:text-white font-bold text-2xl md:text-3xl mb-4">
          Engage with Legislation, Remix Your Future
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
          CivicMix is where policy meets participation. Understand bills, propose changes, and see how your ideas stack up in community battles.
        </p>
        {/* Placeholder Call to Action Button */}
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
          Get Started
        </button>
      </div>
    </section>
  );
}