'use client'

import { useTour, scanPage } from "@tour-ai/sdk";

export default function Home() {
  const { startTour } = useTour();

  const handleStartTour = () => {
    startTour({
      id: 'demo-tour',
      steps: [
        {
          id: 'step-1',
          title: 'Welcome to TourAI!',
          content: 'This is the easiest lightweight onboarding SDK.',
          target: '#hero-title',
        },
        {
          id: 'step-2',
          title: 'Smart Targeting',
          content: 'We can target any element on the page using CSS selectors.',
          target: '#features-section',
          position: 'top',
        },
        {
          id: 'step-3',
          title: 'Ready to build?',
          content: 'Start building your own tours today.',
          target: '#start-button',
          position: 'right',
        }
      ]
    })
  }

  const handleScanPage = () => {
    const interactables = scanPage();
    console.log('--- Map of Intent (Scanned Interactables) ---');
    console.table(interactables);
    alert(`Found ${interactables.length} interactable elements. Check the console for details!`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex gap-4">
        <h1 id="hero-title" className="text-4xl font-bold">TourAI Project</h1>
        <div className="flex gap-4">
          <button
            onClick={handleStartTour}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Start Onboarding
          </button>
          <button
            onClick={handleScanPage}
            className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded transition"
          >
            Scan Page
          </button>
        </div>
      </div>

      <div id="features-section" className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">Lightweight</h2>
          <p>Under 10kb bundle size.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">AI-Native</h2>
          <p>Generate tours with a single click.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">Easy to use</h2>
          <p>React hooks & provider model.</p>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <button
          id="start-button"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Get Started{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about TourAI features and API.
          </p>
        </button>
      </div>
    </main>
  );
}
