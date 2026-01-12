import { useState } from 'react';
import { motion } from 'motion/react';
import { NFTCard } from '../NFTCard';
import { NFTModal } from '../NFTModal';
import { categories } from '../../data/nftData';

export function PopularCollections() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  const activeCategory = categories.find((cat) => cat.id === activeTab);

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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4">Popular Collections</h2>
          <p className="text-white/60 text-lg">Explore trending NFTs across all categories</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-12">
          {/* Desktop Tabs */}
          <div className="hidden md:flex justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-xl backdrop-blur-sm border transition-all ${
                  activeTab === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Scrollable Tabs */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-5 py-2.5 rounded-full backdrop-blur-sm border whitespace-nowrap transition-all ${
                    activeTab === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 shadow-lg shadow-purple-500/50'
                      : 'bg-white/5 border-white/10'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <motion.div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeCategory?.nfts.slice(0, 12).map((nft, i) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <NFTCard
                {...nft}
                onClick={() => setSelectedNFT(nft)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            View All Collections
          </motion.button>
        </motion.div>
      </div>

      {/* NFT Modal */}
      <NFTModal
        isOpen={!!selectedNFT}
        onClose={() => setSelectedNFT(null)}
        nft={selectedNFT || { title: '', creator: '', price: '', image: '' }}
      />
    </section>
  );
}
