import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { HorseRoster } from './components/HorseRoster';
import { HorseProfile } from './components/HorseProfile';
import { HealthRecords } from './components/HealthRecords';
import { FeedingSchedule } from './components/FeedingSchedule';
import { Home, List, Heart, Calendar } from 'lucide-react';

type Page = 'dashboard' | 'roster' | 'profile' | 'health' | 'feeding';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedHorseId, setSelectedHorseId] = useState<string | null>(null);

  const handleSelectHorse = (horseId: string) => {
    setSelectedHorseId(horseId);
    setCurrentPage('profile');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'roster':
        return <HorseRoster onSelectHorse={handleSelectHorse} />;
      case 'profile':
        return <HorseProfile horseId={selectedHorseId} onBack={() => setCurrentPage('roster')} />;
      case 'health':
        return <HealthRecords />;
      case 'feeding':
        return <FeedingSchedule />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-emerald-600">Equine Shelter Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Professional Care System</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'dashboard'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentPage('roster')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'roster' || currentPage === 'profile'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <List className="w-5 h-5" />
            <span>Horse Roster</span>
          </button>

          <button
            onClick={() => setCurrentPage('health')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'health'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Health Records</span>
          </button>

          <button
            onClick={() => setCurrentPage('feeding')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'feeding'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Feeding Schedule</span>
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              SA
            </div>
            <div>
              <p className="text-sm">Shelter Admin</p>
              <p className="text-xs text-gray-500">admin@shelter.org</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {renderPage()}
      </main>
    </div>
  );
}
