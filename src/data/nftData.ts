export const nftImages = [
  'https://images.unsplash.com/photo-1762278804729-13d330fad71a?w=600',
  'https://images.unsplash.com/photo-1677760179017-4862f5114d48?w=600',
  'https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?w=600',
  'https://images.unsplash.com/photo-1684770114368-6e01b4f8741a?w=600',
  'https://images.unsplash.com/photo-1635399860495-2a2802a6df5e?w=600',
  'https://images.unsplash.com/photo-1559818447-969ea3aa2fbd?w=600',
  'https://images.unsplash.com/photo-1633957897986-70e83293f3ff?w=600',
  'https://images.unsplash.com/photo-1622570230304-a37c75da9d70?w=600',
];

const creators = [
  'CyberArtist',
  'NeonDreamer',
  'DigitalVision',
  'MetaCreator',
  'FuturePixel',
  'CryptoMaster',
  'VirtualArt',
  'GlowDesigner',
  'QuantumArt',
  'HologramPro',
];

export const generateNFTs = (count: number, category?: string) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `nft-${category || 'all'}-${i}`,
    title: `${category ? category + ' ' : ''}NFT #${i + 1}`,
    creator: creators[i % creators.length],
    price: (Math.random() * 5 + 0.1).toFixed(2),
    image: nftImages[i % nftImages.length],
    views: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 1000) + 50,
    description: `A unique ${category || 'digital'} artwork from the future. This piece represents the convergence of art and technology in the metaverse.`,
  }));
};

export const categories = [
  { id: 'all', label: 'All', nfts: generateNFTs(20) },
  { id: 'games', label: 'Games', nfts: generateNFTs(15, 'Game') },
  { id: 'sports', label: 'Sports', nfts: generateNFTs(12, 'Sport') },
  { id: 'anime', label: 'Anime', nfts: generateNFTs(18, 'Anime') },
  { id: 'photography', label: 'Photography', nfts: generateNFTs(14, 'Photo') },
  { id: '3d', label: '3D', nfts: generateNFTs(16, '3D') },
  { id: 'music', label: 'Music', nfts: generateNFTs(13, 'Music') },
];

export const collections = [
  {
    id: 'digital-meeting',
    name: 'Digital Meeting Point',
    image: nftImages[0],
    items: 245,
    volume: '12.5K',
  },
  {
    id: 'blue-collection',
    name: 'Blue Collection',
    image: nftImages[1],
    items: 189,
    volume: '8.3K',
  },
  {
    id: 'ice-float',
    name: 'Ice Float',
    image: nftImages[2],
    items: 312,
    volume: '15.7K',
  },
  {
    id: 'nft-posters',
    name: 'NFT Posters',
    image: nftImages[3],
    items: 156,
    volume: '6.2K',
  },
  {
    id: 'magazine-cover',
    name: 'Magazine Cover',
    image: nftImages[4],
    items: 278,
    volume: '11.4K',
  },
];

export const artists = Array.from({ length: 25 }, (_, i) => ({
  id: `artist-${i}`,
  name: creators[i % creators.length] + ` ${i + 1}`,
  avatar: `https://images.unsplash.com/photo-${
    ['1633957897986-70e83293f3ff', '1535713875002-d1d0cf377fde', '1527980965255-d3b416303d12'][i % 3]
  }?w=200`,
  followers: Math.floor(Math.random() * 50000) + 1000,
  nfts: Math.floor(Math.random() * 500) + 10,
  volume: (Math.random() * 100 + 10).toFixed(1) + 'K',
  verified: i % 3 === 0,
  bio: `Award-winning digital artist specializing in ${
    ['cyberpunk aesthetics', 'futuristic designs', 'abstract compositions'][i % 3]
  }. Creating unique NFTs since 2021.`,
  achievements: [
    { title: 'Top Creator', date: '2024' },
    { title: 'Most Sold', date: '2023' },
    { title: 'Community Favorite', date: '2023' },
  ],
}));
