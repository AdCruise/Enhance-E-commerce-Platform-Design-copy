import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Wallet } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'collections', label: 'Collections' },
    { id: 'artists', label: 'Artists' },
    { id: 'stats', label: 'Stats' },
    { id: 'create', label: 'Create NFT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="font-bold">NFT</span>
            </div>
            <span className="ml-3 hidden sm:block tracking-wider">FUTURE</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 transition-colors ${
                  currentPage === item.id ? 'text-purple-400' : 'text-white/80 hover:text-white'
                }`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/50"
                    layoutId="navbar-indicator"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Connect Wallet Button - Desktop */}
          <motion.button
            className="hidden lg:block bg-white text-black px-6 py-2.5 rounded-lg hover:shadow-xl hover:shadow-white/30 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </div>
          </motion.button>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <motion.button
              className="bg-white/10 backdrop-blur-sm p-2 rounded-lg"
              whileTap={{ scale: 0.9 }}
            >
              <Wallet className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-16 right-0 bottom-0 w-64 bg-gradient-to-br from-purple-900/95 via-purple-800/95 to-blue-900/95 backdrop-blur-xl border-l border-white/10 lg:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-white/20 text-white shadow-lg shadow-purple-500/30'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                className="bg-white text-black px-4 py-3 rounded-lg mt-4"
                whileTap={{ scale: 0.95 }}
              >
                Connect Wallet
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
