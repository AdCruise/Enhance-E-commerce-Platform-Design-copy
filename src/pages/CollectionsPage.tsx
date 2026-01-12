import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, TrendingUp, Clock, Flame } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { collections, artists, generateNFTs } from '../data/nftData';

const expandedCollections = Array.from({ length: 24 }, (_, i) => ({
  ...collections[i % collections.length],
  id: `collection-${i}`,
  name: `${collections[i % collections.length].name} #${Math.floor(i / collections.length) + 1}`,
  floor: (Math.random() * 5 + 1).toFixed(2),
  volume24h: (Math.random() * 100 + 10).toFixed(1),
  change: Math.random() > 0.5 ? '+' + (Math.random() * 50).toFixed(1) : '-' + (Math.random() * 20).toFixed(1),
  owners: Math.floor(Math.random() * 5000) + 100,
}));

export function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('trending');
  const [currentCreatorOffset, setCurrentCreatorOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCreatorOffset((prev) => (prev + 1) % artists.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredCollections = expandedCollections.filter((col) =>
    col.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4">NFT Collections</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Browse the most popular and trending NFT collections
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
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Creators Slider */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Featured Creators</h2>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: -currentCreatorOffset * 280 }}
              transition={{ duration: 0.5 }}
            >
              {[...artists, ...artists].map((artist, i) => (
                <motion.div
                  key={`${artist.id}-${i}`}
                  className="flex-shrink-0 w-64 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 cursor-pointer"
                  whileHover={{ scale: 1.03, y: -5, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
                >
                  <div className="flex flex-col items-center text-center">
                    <ImageWithFallback
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-20 h-20 rounded-full mb-4 border-2 border-purple-500"
                    />
                    <h3 className="mb-1 flex items-center gap-2">
                      {artist.name}
                      {artist.verified && <span className="text-blue-400 text-xs">✓</span>}
                    </h3>
                    <p className="text-sm text-white/60 mb-3">{artist.nfts} NFTs</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <p className="text-white/50">Volume</p>
                        <p className="text-purple-400">{artist.volume} ETH</p>
                      </div>
                      <div>
                        <p className="text-white/50">Followers</p>
                        <p>{(artist.followers / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'recent', label: 'Recent', icon: Clock },
              { id: 'top', label: 'Top', icon: Flame },
            ].map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setFilterBy(filter.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-sm border whitespace-nowrap transition-all ${
                  filterBy === filter.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <filter.icon className="w-5 h-5" />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCollections.map((collection, i) => (
              <motion.div
                key={collection.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              >
                <div className="flex flex-col sm:flex-row gap-4 p-6">
                  <div className="relative aspect-square sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
                      {collection.name}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-white/50">Floor</p>
                        <p className="text-purple-400">{collection.floor} ETH</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Volume</p>
                        <p>{collection.volume24h}K ETH</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">24h %</p>
                        <p className={collection.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                          {collection.change}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Owners</p>
                        <p>{(collection.owners / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/60">{collection.items} items</span>
                    </div>
                  </div>
                </div>
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
              Load More Collections
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Collection Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Collections', value: '12,450+', change: '+125 this week' },
              { label: 'Total Volume', value: '2.8M ETH', change: '+18.5% this month' },
              { label: 'Active Traders', value: '145K', change: '+2.3K today' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              >
                <p className="text-white/60 mb-2">{stat.label}</p>
                <p className="text-3xl mb-2">{stat.value}</p>
                <p className="text-sm text-green-400">{stat.change}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}