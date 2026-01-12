import { motion } from 'motion/react';
import { TrendingUp, Award, Users } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { collections, artists } from '../../data/nftData';

export function TopCollections() {
  const topCollections = collections.map((col, i) => ({
    ...col,
    rank: i + 1,
    change: Math.random() > 0.5 ? '+' + (Math.random() * 50).toFixed(1) : '-' + (Math.random() * 20).toFixed(1),
    floor: (Math.random() * 5 + 1).toFixed(2),
  }));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4">Top Collections Over Time</h2>
          <p className="text-white/60 text-lg">Trending collections and top creators</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Trending Collections Table */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl">Trending Collections</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-left text-sm text-white/50 border-b border-white/10">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Collection</th>
                    <th className="p-4">Volume</th>
                    <th className="p-4">24h %</th>
                  </tr>
                </thead>
                <tbody>
                  {topCollections.map((collection) => (
                    <motion.tr
                      key={collection.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <td className="p-4">
                        <span className="text-purple-400">#{collection.rank}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={collection.image}
                            alt={collection.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="line-clamp-1">{collection.name}</p>
                            <p className="text-sm text-white/50">{collection.items} items</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-purple-400">{collection.volume} ETH</p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`${
                            collection.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {collection.change}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Top Creators */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl">Top Creators</h3>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {artists.slice(0, 10).map((artist, i) => (
                <motion.div
                  key={artist.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="text-purple-400 w-8">#{i + 1}</span>
                  <ImageWithFallback
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1 flex items-center gap-2">
                      {artist.name}
                      {artist.verified && (
                        <span className="text-blue-400 text-xs">✓</span>
                      )}
                    </p>
                    <p className="text-sm text-white/50">{artist.volume} ETH</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/60">{artist.nfts} NFTs</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              label: 'Total Volume',
              value: '2.5M ETH',
              change: '+12.5%',
            },
            {
              icon: Users,
              label: 'Total Users',
              value: '145K+',
              change: '+8.2%',
            },
            {
              icon: Award,
              label: 'Total NFTs',
              value: '850K+',
              change: '+15.7%',
            },
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
                <span className="text-green-400 text-sm">{stat.change}</span>
              </div>
              <p className="text-3xl mb-1">{stat.value}</p>
              <p className="text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
