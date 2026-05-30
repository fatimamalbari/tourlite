import { TourProvider } from "@tour-ai/sdk";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TourProvider enableBuilder={true}>
          <div className="flex min-h-screen bg-gray-100">
            <aside id="sidebar" className="w-64 bg-gray-900 text-white p-6">
              <h2 className="text-2xl font-bold mb-10">TourAI</h2>
              <nav className="space-y-4">
                <a href="/" className="block w-full p-2 hover:bg-gray-800 rounded">Dashboard</a>
                <a href="/projects" className="block w-full p-2 hover:bg-gray-800 rounded">Projects</a>
                <a href="/team" className="block w-full p-2 hover:bg-gray-800 rounded">Team</a>
              </nav>
            </aside>
            <main className="flex-1 p-10">{children}</main>
          </div>
        </TourProvider>
      </body>
    </html>
  );
}
