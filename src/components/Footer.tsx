import { motion } from 'motion/react';
import { Mail, Twitter, Github, MessageCircle, Youtube, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const links = {
    marketplace: ['Explore', 'How it Works', 'Support', 'Platform Status'],
    company: ['About', 'Careers', 'Blog', 'Press Kit'],
    community: ['Discord', 'Twitter', 'Instagram', 'YouTube'],
    resources: ['Help Center', 'Partners', 'Suggestions', 'Newsletter'],
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl mb-2">Stay in the loop</h3>
              <p className="text-white/60">
                Join our mailing list to stay in the loop with our newest feature releases and NFT drops.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto md:min-w-[400px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-500 focus:outline-none backdrop-blur-sm"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl whitespace-nowrap shadow-lg shadow-purple-500/30"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="mb-4 text-purple-400">Marketplace</h4>
            <ul className="space-y-2">
              {links.marketplace.map((link) => (
                <li key={link}>
                  <motion.button
                    onClick={() => onNavigate('marketplace')}
                    className="text-white/60 hover:text-white transition-colors text-left"
                    whileHover={{ x: 3 }}
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-purple-400">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link}>
                  <motion.button
                    className="text-white/60 hover:text-white transition-colors text-left"
                    whileHover={{ x: 3 }}
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-purple-400">Community</h4>
            <ul className="space-y-2">
              {links.community.map((link) => (
                <li key={link}>
                  <motion.button
                    className="text-white/60 hover:text-white transition-colors text-left"
                    whileHover={{ x: 3 }}
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-purple-400">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link}>
                  <motion.button
                    className="text-white/60 hover:text-white transition-colors text-left"
                    whileHover={{ x: 3 }}
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Icons & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="font-bold">NFT</span>
              </div>
              <span className="tracking-wider">FUTURE NFTS</span>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Instagram, label: 'Instagram' },
              { icon: MessageCircle, label: 'Discord' },
              { icon: Youtube, label: 'YouTube' },
              { icon: Github, label: 'GitHub' },
            ].map((social) => (
              <motion.button
                key={social.label}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </div>

          <p className="text-white/50 text-sm">© 2025 Future NFTs. All rights reserved.</p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
    </footer>
  );
}
