import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export function CreateNFTPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    royalty: '10',
    blockchain: 'ethereum',
    category: 'art',
    supply: '1',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setTimeout(() => setIsUploading(false), 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    setStep(5);
    setTimeout(() => setStep(6), 2000);
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4">Create NFT</h1>
            <p className="text-xl text-white/70">
              Mint your digital artwork and list it on the marketplace
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[
                { num: 1, label: 'Upload' },
                { num: 2, label: 'Details' },
                { num: 3, label: 'Pricing' },
                { num: 4, label: 'Review' },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <motion.div
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      step >= s.num
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50'
                        : 'bg-white/5 border border-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {step > s.num ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                        {s.num}
                      </span>
                    )}
                    <span className="hidden sm:inline">{s.label}</span>
                  </motion.div>
                  {i < 3 && <div className="w-8 h-0.5 bg-white/20 mx-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Upload/Preview */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl mb-6">Upload Artwork</h2>

              {!imagePreview ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <motion.div
                    className="aspect-square border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-white/5 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Upload className="w-16 h-16 mb-4 text-white/40" />
                    <p className="text-lg mb-2">Drop your file here</p>
                    <p className="text-sm text-white/50">
                      PNG, JPG, GIF, WebP (Max 100MB)
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/20 border border-white/10">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <Loader className="w-12 h-12 animate-spin text-purple-400" />
                      </div>
                    )}
                  </div>
                  <motion.button
                    onClick={() => setImagePreview(null)}
                    className="w-full py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/15 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Change Image
                  </motion.button>
                </div>
              )}

              {/* Preview Card */}
              {imagePreview && (
                <motion.div
                  className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-white/50 mb-2">Preview</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1">{formData.name || 'Untitled'}</p>
                      <p className="text-sm text-white/60">
                        {formData.price || '0'} ETH
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-purple-500/20 rounded-lg text-sm">
                      {formData.category}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right - Form Fields */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Step 1: Basic Info */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl mb-6">NFT Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter NFT name"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Tell us about your NFT"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none cursor-pointer"
                    >
                      <option value="art" className="bg-purple-900">Art</option>
                      <option value="gaming" className="bg-purple-900">Gaming</option>
                      <option value="music" className="bg-purple-900">Music</option>
                      <option value="photography" className="bg-purple-900">Photography</option>
                      <option value="3d" className="bg-purple-900">3D</option>
                      <option value="video" className="bg-purple-900">Video</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Pricing */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl mb-6">Pricing & Supply</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Price (ETH) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                    {formData.price && (
                      <p className="text-sm text-white/50 mt-2">
                        ≈ ${(parseFloat(formData.price) * 2340).toFixed(2)} USD
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Royalty (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={formData.royalty}
                      onChange={(e) =>
                        setFormData({ ...formData, royalty: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                    <p className="text-sm text-white/50 mt-2">
                      You'll receive {formData.royalty}% on secondary sales
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Blockchain
                    </label>
                    <select
                      value={formData.blockchain}
                      onChange={(e) =>
                        setFormData({ ...formData, blockchain: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none cursor-pointer"
                    >
                      <option value="ethereum" className="bg-purple-900">Ethereum</option>
                      <option value="polygon" className="bg-purple-900">Polygon</option>
                      <option value="solana" className="bg-purple-900">Solana</option>
                      <option value="binance" className="bg-purple-900">Binance Smart Chain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Supply
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.supply}
                      onChange={(e) =>
                        setFormData({ ...formData, supply: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  className="flex-1 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Draft
                </motion.button>
                <motion.button
                  onClick={handlePublish}
                  disabled={!imagePreview || !formData.name || !formData.price}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {step === 5 ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      Publishing...
                    </span>
                  ) : step === 6 ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Published!
                    </span>
                  ) : (
                    'Publish NFT'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: CheckCircle,
                title: 'Easy Process',
                description: 'Simple steps to create and list your NFT',
              },
              {
                icon: ImageIcon,
                title: 'Any Format',
                description: 'Support for images, videos, and 3D files',
              },
              {
                icon: AlertCircle,
                title: 'Gas Free',
                description: 'No upfront costs, pay only when sold',
              },
            ].map((info, i) => (
              <motion.div
                key={info.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="mb-2">{info.title}</h3>
                <p className="text-sm text-white/60">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
