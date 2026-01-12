import { HeroSection } from '../components/home/HeroSection';
import { PopularCollections } from '../components/home/PopularCollections';
import { NFTCollectionsSlider } from '../components/home/NFTCollectionsSlider';
import { TopCollections } from '../components/home/TopCollections';

export function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSection />
      <PopularCollections />
      <NFTCollectionsSlider />
      <TopCollections />
    </div>
  );
}
