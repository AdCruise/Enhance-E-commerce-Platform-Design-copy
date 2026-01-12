import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artists } from '../data/nftData';

interface ArtistsPageProps {
  onArtistClick: (artistId: string) => void;
}

export function ArtistsPage({ onArtistClick }: ArtistsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4">Top Artists</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover and follow the most talented NFT creators in the metaverse
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
                placeholder="Search artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[
              { id: 'all', label: 'All Artists', icon: Users },
              { id: 'verified', label: 'Verified', icon: CheckCircle },
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'top', label: 'Top Sellers', icon: Award },
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

      {/* Top Artists Leaderboard */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Leaderboard</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-left text-sm text-white/50 border-b border-white/10">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Artist</th>
                    <th className="p-4">NFTs</th>
                    <th className="p-4">Volume</th>
                    <th className="p-4">Followers</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArtists.slice(0, 10).map((artist, i) => (
                    <motion.tr
                      key={artist.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                      onClick={() => onArtistClick(artist.id)}
                    >
                      <td className="p-4">
                        <span className="text-purple-400">#{i + 1}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={artist.avatar}
                            alt={artist.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="flex items-center gap-2">
                              {artist.name}
                              {artist.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-400 fill-blue-400" />
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{artist.nfts}</td>
                      <td className="p-4">
                        <p className="text-purple-400">{artist.volume} ETH</p>
                      </td>
                      <td className="p-4">{(artist.followers / 1000).toFixed(1)}K</td>
                      <td className="p-4">
                        <motion.button
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Follow
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* All Artists Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">All Artists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist, i) => (
              <motion.div
                key={artist.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
                onClick={() => onArtistClick(artist.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <ImageWithFallback
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-24 h-24 rounded-full border-2 border-purple-500 group-hover:border-purple-400 transition-colors"
                    />
                    {artist.verified && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                        <CheckCircle className="w-5 h-5 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="mb-1 group-hover:text-purple-400 transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">{artist.bio}</p>

                  <div className="grid grid-cols-3 gap-4 w-full mb-4 text-center">
                    <div>
                      <p className="text-xs text-white/50">NFTs</p>
                      <p>{artist.nfts}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Volume</p>
                      <p className="text-purple-400">{artist.volume}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Followers</p>
                      <p>{(artist.followers / 1000).toFixed(1)}K</p>
                    </div>
                  </div>

                  <motion.button
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Follow
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Artists', value: '12,450+', icon: Users },
              { label: 'Verified Creators', value: '3,240', icon: CheckCircle },
              { label: 'Total Artworks', value: '850K+', icon: Award },
              { label: 'Combined Volume', value: '4.2M ETH', icon: TrendingUp },
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
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <p className="text-3xl mb-1">{stat.value}</p>
                <p className="text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
