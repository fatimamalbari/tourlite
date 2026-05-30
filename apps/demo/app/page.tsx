'use client'

import { useTour, scanPage } from "@tour-ai/sdk";
import { useState } from 'react';

export default function Home() {
  const { startTour } = useTour();
  const [activeTab, setActiveTab] = useState('Overview');

  const handleStartTour = () => {
    startTour({
      id: 'demo-tour',
      steps: [
        { id: 'step-1', title: 'Welcome!', content: 'Welcome to the dashboard.', target: '#hero-title', position: 'bottom' },
        { id: 'step-2', title: 'Sidebar', content: 'Navigate here.', target: '#sidebar', position: 'right' },
        { id: 'step-3', title: 'Form Action', content: 'Submit your settings.', target: '#settings-form', position: 'top' }
      ]
    })
  }

  const handleScanPage = () => {
    const interactables = scanPage();
    console.log('--- Map of Intent (Scanned Interactables) ---');
    console.table(interactables);
    alert(`Found ${interactables.length} elements. Check console!`);
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
          <h1 id="hero-title" className="text-3xl font-bold">Project Dashboard</h1>
          <div className="flex gap-2">
            <button onClick={handleStartTour} className="bg-blue-600 text-white px-4 py-2 rounded">Tour</button>
            <button onClick={handleScanPage} className="bg-gray-800 text-white px-4 py-2 rounded">Scan</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          {['Overview', 'Analytics', 'Settings'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-blue-600 font-bold' : ''}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="mt-6">
          {activeTab === 'Overview' && (
            <div id="settings-form" className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Overview Dashboard</h3>
              <p>Welcome to your project overview. All your stats are here.</p>
            </div>
          )}
          {activeTab === 'Analytics' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Analytics</h3>
              <p>Here you can see your traffic and user engagement charts.</p>
            </div>
          )}
          {activeTab === 'Settings' && (
            <div id="settings-form" className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Update Settings</h3>
              <input type="text" placeholder="Project Name" className="border p-2 w-full mb-4 rounded" />
              <textarea placeholder="Description" className="border p-2 w-full mb-4 rounded"></textarea>
              <button className="bg-green-600 text-white px-6 py-2 rounded">Save Settings</button>
            </div>
          )}
        </div>
    </div>
  );
}
