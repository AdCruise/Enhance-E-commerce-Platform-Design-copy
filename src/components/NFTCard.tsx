import { motion } from 'motion/react';
import { Heart, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NFTCardProps {
  title: string;
  creator: string;
  price: string;
  image: string;
  views?: number;
  likes?: number;
  onClick?: () => void;
}

export function NFTCard({ title, creator, price, image, views, likes, onClick }: NFTCardProps) {
  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 cursor-pointer"
      whileHover={{ scale: 1.03, y: -5 }}
      animate={{
        boxShadow: [
          '0 0 20px rgba(168, 85, 247, 0.2)',
          '0 0 30px rgba(168, 85, 247, 0.4)',
          '0 0 20px rgba(168, 85, 247, 0.2)',
        ],
      }}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.2 },
        y: { duration: 0.2 },
      }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-purple-900/20">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Stats */}
        {(views || likes) && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {views && (
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                <Eye className="w-3 h-3" />
                <span className="text-xs">{views}</span>
              </div>
            )}
            {likes && (
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                <Heart className="w-3 h-3" />
                <span className="text-xs">{likes}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-white/60 text-sm mb-3">{creator}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/50">Current Bid</p>
            <p className="text-purple-400">{price} ETH</p>
          </div>
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Place Bid
          </motion.button>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.5)]" />
      </div>
    </motion.div>
  );
}
