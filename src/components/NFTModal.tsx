import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Share2, BarChart3 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: {
    title: string;
    creator: string;
    price: string;
    image: string;
    description?: string;
    creatorAvatar?: string;
  };
}

export function NFTModal({ isOpen, onClose, nft }: NFTModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-gradient-to-br from-purple-900/90 via-purple-800/90 to-blue-900/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl shadow-purple-500/30 z-50 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              {/* Left - Image */}
              <div className="md:w-1/2 bg-black/30 relative">
                <ImageWithFallback
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </div>

              {/* Right - Details */}
              <div className="md:w-1/2 flex flex-col overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-white/10">
                  <div className="flex-1">
                    <h2 className="text-2xl mb-2">{nft.title}</h2>
                    <div className="flex items-center gap-2">
                      {nft.creatorAvatar && (
                        <ImageWithFallback
                          src={nft.creatorAvatar}
                          alt={nft.creator}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-xs text-white/50">Created by</p>
                        <p className="text-sm text-purple-400">{nft.creator}</p>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Description */}
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-sm text-white/50 mb-2">Description</h3>
                  <p className="text-white/80">
                    {nft.description ||
                      'A unique digital artwork from the future. This piece represents the convergence of art and technology in the metaverse.'}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="p-6 space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 mb-1">Current Price</p>
                    <p className="text-3xl text-purple-400">{nft.price} ETH</p>
                    <p className="text-sm text-white/50 mt-1">≈ ${(parseFloat(nft.price) * 2340).toFixed(2)}</p>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-xl shadow-lg shadow-purple-500/30"
                      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Buy Now
                    </motion.button>
                    <motion.button
                      className="px-4 bg-white/10 rounded-xl border border-white/20"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="px-4 bg-white/10 rounded-xl border border-white/20"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-white/50 mb-1">Views</p>
                    <p>1.2K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/50 mb-1">Likes</p>
                    <p>234</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/50 mb-1">Owned by</p>
                    <p>42</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
