import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import exampleImage from 'figma:asset/3397aa1169fd55fec705090604b6e4cbd1ab1403.png';

const creators = [
  'https://images.unsplash.com/photo-1633957897986-70e83293f3ff?w=100',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
];

const nftPreviews = [
  {
    title: 'Neon Lights',
    image: 'https://images.unsplash.com/photo-1762278804729-13d330fad71a?w=400',
  },
  {
    title: 'Cyber Wave',
    image: 'https://images.unsplash.com/photo-1677760179017-4862f5114d48?w=400',
  },
  {
    title: 'Future Vision',
    image: 'https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?w=400',
  },
];

const blockchainLogos = [
  { name: 'Binance', icon: '◆' },
  { name: 'Cardano', icon: '◇' },
  { name: 'Coincheck', icon: '●' },
  { name: 'Paradigm', icon: '◊' },
  { name: 'Coinbase', icon: '■' },
];

export function HeroSection() {
  const [currentCreatorOffset, setCurrentCreatorOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCreatorOffset((prev) => (prev + 1) % creators.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          {/* Creator Avatars Row */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 overflow-hidden">
            <motion.div
              className="flex gap-2"
              animate={{ x: -currentCreatorOffset * 52 }}
              transition={{ duration: 0.5 }}
            >
              {[...creators, ...creators].map((creator, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <ImageWithFallback
                    src={creator}
                    alt={`Creator ${i}`}
                    className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/50"
                  />
                  <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/20 transition-all" />
                </motion.div>
              ))}
            </motion.div>
            <div className="ml-4 text-left">
              <p className="text-sm text-white/60">2400+ Dedicated Creators</p>
            </div>
          </div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            FUTURE NFTs
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the next generation of digital assets
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/30"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Marketplace
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              Create NFT
            </motion.button>
          </motion.div>

          {/* Blockchain Logos */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
            {blockchainLogos.map((logo, i) => (
              <motion.div
                key={logo.name}
                className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                }}
                whileHover={{ scale: 1.2, y: -5 }}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl">
                  {logo.icon}
                </div>
                <span className="text-xs text-white/60">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right - NFT Preview Cards */}
        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-6">
            {nftPreviews.map((nft, i) => (
              <motion.div
                key={nft.title}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                style={{ marginTop: i % 2 === 0 ? 0 : 40 }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-purple-900/20 border border-white/10 shadow-xl shadow-purple-500/20">
                  <ImageWithFallback
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm">{nft.title}</p>
                  </div>
                </div>
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.3)',
                      '0 0 40px rgba(168, 85, 247, 0.6)',
                      '0 0 20px rgba(168, 85, 247, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile NFT Preview */}
        <div className="lg:hidden">
          <motion.div
            className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-purple-900/20 border border-white/10 shadow-xl shadow-purple-500/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ImageWithFallback
              src={exampleImage}
              alt="Featured NFT"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
