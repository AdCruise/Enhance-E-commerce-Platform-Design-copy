import { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import { NFTCard } from '../components/NFTCard';
import { NFTModal } from '../components/NFTModal';
import { generateNFTs } from '../data/nftData';

const allNFTs = generateNFTs(40);

const filters = {
  price: ['All Prices', 'Under 1 ETH', '1-5 ETH', '5-10 ETH', 'Over 10 ETH'],
  blockchain: ['All Chains', 'Ethereum', 'Polygon', 'Solana', 'Binance'],
  category: ['All Categories', 'Art', 'Gaming', 'Music', 'Photography', '3D', 'Video'],
  status: ['All', 'Buy Now', 'On Auction', 'Has Offers'],
};

const sortOptions = ['Recently Added', 'Price: Low to High', 'Price: High to Low', 'Most Liked', 'Most Viewed'];

export function MarketplacePage() {
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    price: 'All Prices',
    blockchain: 'All Chains',
    category: 'All Categories',
    status: 'All',
  });
  const [sortBy, setSortBy] = useState('Recently Added');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4">Explore Marketplace</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover, collect, and sell extraordinary NFTs from creators worldwide
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search NFTs, collections, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Sort Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {showFilters && <span className="ml-2 text-xs bg-purple-500 px-2 py-0.5 rounded-full">Active</span>}
            </motion.button>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <span className="text-sm text-white/60">{allNFTs.length} items</span>
              <div className="relative flex-1 sm:flex-none sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option} className="bg-purple-900 text-white">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filter Panels */}
          {showFilters && (
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {Object.entries(filters).map(([key, options]) => (
                <div key={key}>
                  <label className="block text-sm text-white/60 mb-2 capitalize">{key}</label>
                  <select
                    value={activeFilters[key as keyof typeof activeFilters]}
                    onChange={(e) => setActiveFilters({ ...activeFilters, [key]: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                  >
                    {options.map((option) => (
                      <option key={option} value={option} className="bg-purple-900 text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured NFT Slider */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Featured Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNFTs.slice(0, 3).map((nft) => (
              <motion.div
                key={nft.id}
                className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedNFT(nft)}
              >
                <img src={nft.image} alt={nft.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl mb-1">{nft.title}</h3>
                  <p className="text-white/60 mb-2">{nft.creator}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">{nft.price} ETH</span>
                    <motion.button
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    >
                      Place Bid
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All NFTs Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">All NFTs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allNFTs.map((nft, i) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
              >
                <NFTCard {...nft} onClick={() => setSelectedNFT(nft)} />
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div className="text-center mt-12">
            <motion.button
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Load More NFTs
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* NFT Modal */}
      <NFTModal
        isOpen={!!selectedNFT}
        onClose={() => setSelectedNFT(null)}
        nft={selectedNFT || { title: '', creator: '', price: '', image: '' }}
      />
    </div>
  );
}
