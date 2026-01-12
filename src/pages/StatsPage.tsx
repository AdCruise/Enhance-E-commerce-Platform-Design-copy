import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, Activity, DollarSign, Users, Package } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { collections, artists } from '../data/nftData';

export function StatsPage() {
  const [timeFilter, setTimeFilter] = useState('7d');

  const chartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    volume: Math.random() * 1000 + 500,
    sales: Math.random() * 500 + 100,
  }));

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4">Platform Statistics</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Real-time analytics and insights from the NFT marketplace
            </p>
          </motion.div>

          {/* Time Filter */}
          <div className="flex justify-center gap-3 mb-12">
            {['24h', '7d', '30d', '90d', '1y', 'All'].map((period) => (
              <motion.button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-4 py-2 rounded-xl backdrop-blur-sm border transition-all ${
                  timeFilter === period
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {period}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Key Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                label: 'Total Volume',
                value: '12.5M ETH',
                change: '+18.2%',
                positive: true,
              },
              {
                icon: Activity,
                label: 'Total Sales',
                value: '2.4M',
                change: '+12.5%',
                positive: true,
              },
              {
                icon: Users,
                label: 'Active Users',
                value: '145K',
                change: '+8.7%',
                positive: true,
              },
              {
                icon: Package,
                label: 'Listed NFTs',
                value: '850K',
                change: '+25.3%',
                positive: true,
              },
              {
                icon: TrendingUp,
                label: 'Avg. Price',
                value: '5.2 ETH',
                change: '-3.1%',
                positive: false,
              },
              {
                icon: BarChart3,
                label: 'Floor Price',
                value: '2.8 ETH',
                change: '+5.9%',
                positive: true,
              },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <metric.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <span
                    className={`text-sm ${
                      metric.positive ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <p className="text-3xl mb-1">{metric.value}</p>
                <p className="text-white/50">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume Chart */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl">Trading Volume</h2>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-white/60">Volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-white/60">Sales</span>
                </div>
              </div>
            </div>
            <div className="h-96 flex items-end gap-1">
              {chartData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end gap-1 group">
                  <motion.div
                    className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm cursor-pointer hover:from-purple-500 hover:to-purple-300 transition-colors"
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.volume / 1500) * 100}%` }}
                    transition={{ delay: i * 0.02, duration: 0.5 }}
                  />
                  <motion.div
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm cursor-pointer hover:from-blue-500 hover:to-blue-300 transition-colors"
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.sales / 600) * 100}%` }}
                    transition={{ delay: i * 0.02, duration: 0.5 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Collections & Rankings */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Top Collections */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl">Top Collections</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-left text-sm text-white/50 border-b border-white/10">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Collection</th>
                    <th className="p-4">Volume</th>
                    <th className="p-4">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((collection, i) => (
                    <motion.tr
                      key={collection.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <td className="p-4">
                        <span className="text-purple-400">#{i + 1}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={collection.image}
                            alt={collection.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="line-clamp-1">{collection.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-purple-400">{collection.volume} ETH</span>
                      </td>
                      <td className="p-4">
                        <span className="text-green-400">
                          +{(Math.random() * 30).toFixed(1)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Sellers */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl">Top Sellers</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-left text-sm text-white/50 border-b border-white/10">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Artist</th>
                    <th className="p-4">Volume</th>
                    <th className="p-4">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.slice(0, 5).map((artist, i) => (
                    <motion.tr
                      key={artist.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <td className="p-4">
                        <span className="text-purple-400">#{i + 1}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={artist.avatar}
                            alt={artist.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="line-clamp-1">{artist.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-purple-400">{artist.volume} ETH</span>
                      </td>
                      <td className="p-4">{artist.nfts}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Heatmap */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Activity Heatmap</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const intensity = Math.random();
                return (
                  <motion.div
                    key={i}
                    className="aspect-square rounded-lg cursor-pointer"
                    style={{
                      backgroundColor: `rgba(168, 85, 247, ${intensity})`,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 1)' }}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-6 text-sm text-white/60">
              <span>Less Active</span>
              <div className="flex items-center gap-1">
                {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded"
                    style={{
                      backgroundColor: `rgba(168, 85, 247, ${opacity})`,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
              <span>More Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Market Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Rising Stars', count: 145, change: '+25%' },
              { label: 'Hot Collections', count: 89, change: '+18%' },
              { label: 'New Listings', count: 1250, change: '+32%' },
              { label: 'Verified Drops', count: 42, change: '+12%' },
            ].map((trend, i) => (
              <motion.div
                key={trend.label}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              >
                <p className="text-white/60 mb-2">{trend.label}</p>
                <p className="text-4xl mb-2">{trend.count}</p>
                <p className="text-green-400">{trend.change}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
