import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Share2, Flag, TrendingUp, Award, Users } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { NFTCard } from '../components/NFTCard';
import { artists, generateNFTs } from '../data/nftData';
import { useState } from 'react';
import { NFTModal } from '../components/NFTModal';

interface ArtistDetailPageProps {
  artistId: string;
  onBack: () => void;
}

export function ArtistDetailPage({ artistId, onBack }: ArtistDetailPageProps) {
  const artist = artists.find((a) => a.id === artistId) || artists[0];
  const artistNFTs = generateNFTs(12, artist.name);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      {/* Back Button */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all"
            whileHover={{ scale: 1.02, x: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Artists
          </motion.button>
        </div>
      </div>

      {/* Artist Header */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            {/* Cover Image */}
            <div className="h-48 sm:h-64 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200')] bg-cover bg-center opacity-30" />
            </div>

            {/* Profile Info */}
            <div className="px-6 sm:px-8 pb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 sm:-mt-20 mb-6">
                <div className="relative">
                  <ImageWithFallback
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-purple-900 shadow-xl"
                  />
                  {artist.verified && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2">
                      <CheckCircle className="w-6 h-6 text-white fill-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-2 flex items-center gap-3 flex-wrap">
                    {artist.name}
                    {artist.verified && (
                      <span className="text-blue-400 text-sm">Verified Creator</span>
                    )}
                  </h1>
                  <p className="text-white/70 mb-4 max-w-2xl">{artist.bio}</p>

                  <div className="flex flex-wrap items-center gap-4">
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/30"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Follow
                    </motion.button>
                    <motion.button
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Flag className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/50 text-sm mb-1">Total NFTs</p>
                  <p className="text-2xl">{artist.nfts}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/50 text-sm mb-1">Volume</p>
                  <p className="text-2xl text-purple-400">{artist.volume} ETH</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/50 text-sm mb-1">Followers</p>
                  <p className="text-2xl">{(artist.followers / 1000).toFixed(1)}K</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/50 text-sm mb-1">Floor Price</p>
                  <p className="text-2xl">{(Math.random() * 3 + 0.5).toFixed(2)} ETH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Achievements & Badges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {artist.achievements.map((achievement, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Award className="w-8 h-8" />
                </motion.div>
                <h3 className="mb-1">{achievement.title}</h3>
                <p className="text-sm text-white/60">{achievement.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist's NFTs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Created NFTs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artistNFTs.map((nft, i) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <NFTCard {...nft} onClick={() => setSelectedNFT(nft)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Chart */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">Activity & Stats</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Sales Volume (Last 30 Days)
              </h3>
              <div className="h-64 flex items-end gap-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const height = Math.random() * 100;
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-purple-600 to-blue-600 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Engagement Metrics
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Profile Views', value: '125K', percentage: 85 },
                  { label: 'NFT Views', value: '450K', percentage: 95 },
                  { label: 'Likes Received', value: '85K', percentage: 70 },
                  { label: 'Comments', value: '12K', percentage: 60 },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">{metric.label}</span>
                      <span>{metric.value}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
