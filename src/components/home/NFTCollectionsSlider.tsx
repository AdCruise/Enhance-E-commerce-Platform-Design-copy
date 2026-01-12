import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { collections } from '../../data/nftData';

export function NFTCollectionsSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  const allCollections = [...collections, ...collections, ...collections];

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4">NFT Collections</h2>
          <p className="text-white/60 text-lg">Curated collections from top artists</p>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollBehavior: 'auto' }}
      >
        {allCollections.map((collection, i) => (
          <motion.div
            key={`${collection.id}-${i}`}
            className="flex-shrink-0 w-80 sm:w-96 group cursor-pointer"
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-purple-500/10 group-hover:shadow-purple-500/30 transition-all">
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl mb-2 group-hover:text-purple-400 transition-colors">
                  {collection.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{collection.items} items</span>
                  <span className="text-purple-400">{collection.volume} ETH</span>
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.2)',
                    '0 0 40px rgba(168, 85, 247, 0.4)',
                    '0 0 20px rgba(168, 85, 247, 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
