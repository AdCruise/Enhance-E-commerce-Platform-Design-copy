import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { StatsPage } from './pages/StatsPage';
import { CreateNFTPage } from './pages/CreateNFTPage';
import { ArtistDetailPage } from './pages/ArtistDetailPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const renderPage = () => {
    if (selectedArtist) {
      return <ArtistDetailPage artistId={selectedArtist} onBack={() => setSelectedArtist(null)} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'collections':
        return <CollectionsPage />;
      case 'artists':
        return <ArtistsPage onArtistClick={setSelectedArtist} />;
      case 'stats':
        return <StatsPage />;
      case 'create':
        return <CreateNFTPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6A00FF] via-[#3d0099] to-[#001B8C] text-white">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
