'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBar from '@/components/SocialBar';
import Chatbot from '@/components/Chatbot';
import PageHeader from '@/components/PageHeader';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: 'training' | 'farm' | 'breeds' | 'events';
  categoryLabel: string;
  description: string;
  tags: string[];
  initialLikes: number;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'showcase'>('grid');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Showcase Auto-Slide State
  const [currentShowcaseIdx, setCurrentShowcaseIdx] = useState(0);
  const [isPlayingShowcase, setIsPlayingShowcase] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [likesMap, setLikesMap] = useState<Record<number, number>>({});
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: '/1.jpeg',
      title: 'Modern Stall-Fed Model Goat Unit',
      category: 'farm',
      categoryLabel: 'Farm & Sheds',
      description: 'Elevated wooden slatted floor housing system providing dry, clean, zero-odor conditions and optimal ventilation.',
      tags: ['Stall-Fed', 'Slatted Floor', 'Bio-Security'],
      initialLikes: 142
    },
    {
      id: 2,
      src: '/4.jpeg',
      title: 'Practical Expert Clinical Training',
      category: 'training',
      categoryLabel: 'Training Workshop',
      description: 'Hands-on practical training for body weight calculation, subcutaneous vaccination, and deworming administration.',
      tags: ['Expert Training', 'Practical', 'Diagnostics'],
      initialLikes: 218
    },
    {
      id: 3,
      src: '/5 (1).jpeg',
      title: 'Pedigree Foundation Stock Selection',
      category: 'breeds',
      categoryLabel: 'Champion Breeds',
      description: 'Purebred foundation does and bucks selected for accelerated growth rates, high twinning, and climate adaptability.',
      tags: ['Barbari', 'Genetics', 'Seed Stock'],
      initialLikes: 189
    },
    {
      id: 4,
      src: '/5 (2).jpeg',
      title: 'Field Visit & Farm Drainage Audit',
      category: 'training',
      categoryLabel: 'Training Workshop',
      description: 'On-site technical evaluation of farm drainage, ammonia escape angles, and predator fencing design.',
      tags: ['Shed Audit', 'Ventilation', 'Farm Tour'],
      initialLikes: 95
    },
    {
      id: 5,
      src: '/5 (3).jpeg',
      title: 'Commercial Feeding Aisles & TMR Troughs',
      category: 'farm',
      categoryLabel: 'Farm & Sheds',
      description: 'Organized feeding aisles enabling rapid mechanical feeding of Total Mixed Ration (TMR) and chopped green fodder.',
      tags: ['TMR Trough', 'Automation', 'Zero Waste'],
      initialLikes: 134
    },
    {
      id: 6,
      src: '/5 (4).jpeg',
      title: 'Pedigree Buck Reproductive Assessment',
      category: 'breeds',
      categoryLabel: 'Champion Breeds',
      description: 'Regular reproductive soundness checkup of champion breeding sires to ensure high conception rates.',
      tags: ['Sirohi Buck', 'Health Score', 'Fertility'],
      initialLikes: 267
    },
    {
      id: 7,
      src: '/5 (5).jpeg',
      title: 'Nursery Zone & Neonatal Kid Warming',
      category: 'farm',
      categoryLabel: 'Farm & Sheds',
      description: 'Dedicated climate-controlled nursery zone for newborn kids with infrared warmth and dry straw bedding.',
      tags: ['Kid Care', 'Zero Mortality', 'Nursery'],
      initialLikes: 310
    },
    {
      id: 8,
      src: '/5 (6).jpeg',
      title: 'Intramuscular & Subcutaneous Injection Class',
      category: 'training',
      categoryLabel: 'Training Workshop',
      description: 'Teaching farmers the exact needle gauges, sterile techniques, and medicine dosages for emergency triage.',
      tags: ['Injections', 'First-Aid', 'Vaccination'],
      initialLikes: 178
    },
    {
      id: 9,
      src: '/5 (7).jpeg',
      title: 'Super Napier & Green Fodder Harvesting',
      category: 'farm',
      categoryLabel: 'Farm & Sheds',
      description: 'Protein-rich green fodder cultivation and mechanical chaffing for cost-effective daily goat nutrition.',
      tags: ['Super Napier', 'Hydroponics', 'Green Fodder'],
      initialLikes: 156
    },
    {
      id: 10,
      src: '/5 (8).jpeg',
      title: 'Anaerobic Silage Bag Preservation',
      category: 'training',
      categoryLabel: 'Training Workshop',
      description: 'Silage making using bacterial inoculants to preserve excess monsoon fodder for hot summer months.',
      tags: ['Silage Bag', 'Feed Storage', 'TMR'],
      initialLikes: 204
    },
    {
      id: 11,
      src: '/5 (9).jpeg',
      title: 'State Livestock Expo & Technology Pavilion',
      category: 'events',
      categoryLabel: 'Events & Expos',
      description: 'BakriWala delegation representing modern commercial goat farming methods at state agricultural expos.',
      tags: ['Expo', 'Agri-Tech', 'State Summit'],
      initialLikes: 188
    },
    {
      id: 12,
      src: '/5 (10).jpeg',
      title: 'Certified Farm Supervisors Convocation',
      category: 'events',
      categoryLabel: 'Events & Expos',
      description: 'Graduating batch of certified commercial goat farm supervisors ready to manage progressive farms nationwide.',
      tags: ['Certification', 'Graduation', 'Farmers'],
      initialLikes: 290
    },
    {
      id: 13,
      src: '/5 (11).jpeg',
      title: 'Semi-Intensive Exercise & Grazing Paddock',
      category: 'farm',
      categoryLabel: 'Farm & Sheds',
      description: 'Secure open paddock allowing natural grazing, sunlight exposure, and daily herd exercise.',
      tags: ['Paddock', 'Free Range', 'Exercise'],
      initialLikes: 165
    },
    {
      id: 14,
      src: '/5 (12).jpeg',
      title: 'Champion Breed Conformation & Roman Nose',
      category: 'breeds',
      categoryLabel: 'Champion Breeds',
      description: 'Showcasing the distinctive body characteristics, pendulous ears, and heavy stature of Jamunapari stock.',
      tags: ['Jamunapari', 'Roman Nose', 'Majestic'],
      initialLikes: 340
    },
    {
      id: 15,
      src: '/5 (13).jpeg',
      title: 'Free Village Deworming & Vaccination Camp',
      category: 'events',
      categoryLabel: 'Events & Expos',
      description: 'Mass vaccination and deworming outreach drive protecting over 2,000 village goats against PPR and ET.',
      tags: ['Outreach', 'Free Camp', 'Community'],
      initialLikes: 245
    },
    {
      id: 16,
      src: '/5 (14).jpeg',
      title: 'BakriWala Expert Consulting Team',
      category: 'events',
      categoryLabel: 'Events & Expos',
      description: 'Our dedicated team of livestock experts, nutritionists, and agronomists supporting farmers daily.',
      tags: ['Expert Team', 'Consultants', 'Leadership'],
      initialLikes: 275
    }
  ];

  // Initialize Likes
  useEffect(() => {
    const initial: Record<number, number> = {};
    galleryItems.forEach((item) => {
      initial[item.id] = item.initialLikes;
    });
    setLikesMap(initial);
  }, []);

  // Filtered List
  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Showcase Timer
  useEffect(() => {
    if (!isPlayingShowcase || viewMode !== 'showcase') return;
    const interval = setInterval(() => {
      setCurrentShowcaseIdx((prev) => (prev + 1) % galleryItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlayingShowcase, viewMode, galleryItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
        setZoomLevel(1);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
        setZoomLevel(1);
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  // Handle Like Button
  const toggleLike = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isLiked = likedMap[id];
    setLikedMap({ ...likedMap, [id]: !isLiked });
    setLikesMap({
      ...likesMap,
      [id]: (likesMap[id] || 0) + (isLiked ? -1 : 1)
    });
  };

  const currentSelectedItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 relative flex flex-col justify-between">
      <Navbar />
      <SocialBar />
      <Chatbot />

      <main className="flex-1">
        <PageHeader
          badge="Live Visual Showcase"
          title="Interactive Farm & Event Gallery"
          subtitle="Explore dynamic tours of our modern elevated goat sheds, expert training sessions, championship breeds, and farmer graduation events."
          breadcrumb="Gallery"
        />

        {/* ======================================================= */}
        {/* 1. DYNAMIC AUTO-MARQUEE PHOTO TICKER                    */}
        {/* ======================================================= */}
        <section className="py-6 bg-slate-900 overflow-hidden border-b border-slate-800 shadow-inner">
          <div className="flex flex-col gap-3">
            {/* Ticker Row 1 */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee flex items-center gap-4">
                {[...galleryItems, ...galleryItems].map((item, idx) => (
                  <div
                    key={`t1-${idx}`}
                    onClick={() => {
                      const foundIdx = filteredItems.findIndex((fi) => fi.id === item.id);
                      setSelectedImageIndex(foundIdx >= 0 ? foundIdx : 0);
                    }}
                    className="relative w-48 sm:w-64 h-32 sm:h-40 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 group border border-slate-700 shadow-md transform hover:scale-105 transition duration-300"
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-green-400 uppercase">{item.categoryLabel}</span>
                      <p className="text-white text-xs font-bold line-clamp-1">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticker Row 2 (Reverse) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-reverse flex items-center gap-4">
                {[...galleryItems.slice(6), ...galleryItems, ...galleryItems.slice(0, 6)].map((item, idx) => (
                  <div
                    key={`t2-${idx}`}
                    onClick={() => {
                      const foundIdx = filteredItems.findIndex((fi) => fi.id === item.id);
                      setSelectedImageIndex(foundIdx >= 0 ? foundIdx : 0);
                    }}
                    className="relative w-48 sm:w-64 h-32 sm:h-40 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 group border border-slate-700 shadow-md transform hover:scale-105 transition duration-300"
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-yellow-400 uppercase">{item.categoryLabel}</span>
                      <p className="text-white text-xs font-bold line-clamp-1">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            💡 Tip: Hover over marquee strip to pause • Click any photo to zoom
          </div>
        </section>

        {/* ======================================================= */}
        {/* 2. CONTROLS BAR: FILTERS + VIEW MODES                   */}
        {/* ======================================================= */}
        <section className="pt-10 pb-4 px-6 max-w-7xl mx-auto">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
              {[
                { label: 'All Photos', val: 'all', count: galleryItems.length },
                { label: 'Farm & Sheds', val: 'farm', count: galleryItems.filter(i => i.category === 'farm').length },
                { label: 'Training Workshops', val: 'training', count: galleryItems.filter(i => i.category === 'training').length },
                { label: 'Champion Breeds', val: 'breeds', count: galleryItems.filter(i => i.category === 'breeds').length },
                { label: 'Events & Expos', val: 'events', count: galleryItems.filter(i => i.category === 'events').length }
              ].map((cat) => {
                const isActive = activeCategory === cat.val;
                return (
                  <button
                    key={cat.val}
                    onClick={() => setActiveCategory(cat.val)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-xs ${
                      isActive
                        ? 'bg-green-700 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-green-800 text-green-100' : 'bg-slate-200 text-slate-600'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto justify-center">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>⏹️ Grid</span>
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  viewMode === 'masonry' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🧱 Masonry</span>
              </button>
              <button
                onClick={() => setViewMode('showcase')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  viewMode === 'showcase' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🎬 Cinema Tour</span>
              </button>
            </div>

          </div>
        </section>

        {/* ======================================================= */}
        {/* 3. SHOWCASE / CINEMA TOUR MODE                          */}
        {/* ======================================================= */}
        {viewMode === 'showcase' && (
          <section className="py-8 px-6 max-w-6xl mx-auto animate-fadeIn">
            <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative text-white">
              
              {/* Main Active Slide */}
              <div className="relative h-[360px] sm:h-[500px] md:h-[560px] bg-black flex items-center justify-center overflow-hidden group">
                <img
                  key={currentShowcaseIdx}
                  src={galleryItems[currentShowcaseIdx].src}
                  alt={galleryItems[currentShowcaseIdx].title}
                  className="w-full h-full object-contain animate-fadeIn"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>

                {/* Left / Right Nav Overlays */}
                <button
                  onClick={() => setCurrentShowcaseIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-green-700 text-white flex items-center justify-center font-black text-xl transition transform hover:scale-110 shadow-lg"
                  aria-label="Previous Slide"
                >
                  ❮
                </button>
                <button
                  onClick={() => setCurrentShowcaseIdx((prev) => (prev + 1) % galleryItems.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-green-700 text-white flex items-center justify-center font-black text-xl transition transform hover:scale-110 shadow-lg"
                  aria-label="Next Slide"
                >
                  ❯
                </button>

                {/* Top Controls: Play/Pause + Expand */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingShowcase(!isPlayingShowcase)}
                    className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-xs font-bold text-white backdrop-blur-md transition flex items-center gap-1.5 border border-white/20"
                  >
                    <span>{isPlayingShowcase ? '⏸️ Pause Auto-Tour' : '▶️ Play Auto-Tour'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(currentShowcaseIdx)}
                    className="px-3 py-1.5 rounded-full bg-green-700 hover:bg-green-800 text-xs font-bold text-white transition flex items-center gap-1 shadow-md"
                  >
                    <span>🔍 Fullscreen</span>
                  </button>
                </div>
              </div>

              {/* Slide Caption & Details */}
              <div className="p-6 sm:p-8 bg-slate-900 border-t border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-green-500/20 text-green-400 border border-green-500/30">
                      {galleryItems[currentShowcaseIdx].categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400">
                      Photo {currentShowcaseIdx + 1} of {galleryItems.length}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{galleryItems[currentShowcaseIdx].title}</h3>
                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    {galleryItems[currentShowcaseIdx].description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(galleryItems[currentShowcaseIdx].id)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
                      likedMap[galleryItems[currentShowcaseIdx].id]
                        ? 'bg-pink-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{likedMap[galleryItems[currentShowcaseIdx].id] ? '❤️' : '🤍'}</span>
                    <span>{likesMap[galleryItems[currentShowcaseIdx].id] || 0} Likes</span>
                  </button>
                </div>
              </div>

              {/* Bottom Thumbnail Strip */}
              <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex gap-2 overflow-x-auto no-scrollbar">
                {galleryItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentShowcaseIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      currentShowcaseIdx === idx
                        ? 'ring-2 ring-green-500 scale-105 opacity-100'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ======================================================= */}
        {/* 4. STANDARD GRID VIEW                                   */}
        {/* ======================================================= */}
        {viewMode === 'grid' && (
          <section className="py-8 px-6 max-w-7xl mx-auto animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => {
                const isLiked = likedMap[item.id];
                const likesCount = likesMap[item.id] || item.initialLikes;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setZoomLevel(1);
                    }}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 flex flex-col justify-between"
                  >
                    {/* Image Box */}
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-115 transition duration-700"
                      />
                      
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-black uppercase tracking-wider text-green-300 bg-green-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-green-400/30">
                            {item.categoryLabel}
                          </span>
                          <button
                            onClick={(e) => toggleLike(item.id, e)}
                            className="w-8 h-8 rounded-full bg-black/60 hover:bg-pink-600 text-white flex items-center justify-center text-sm transition transform hover:scale-110"
                            aria-label="Like photo"
                          >
                            {isLiked ? '❤️' : '🤍'}
                          </button>
                        </div>

                        <div className="flex justify-between items-end text-white">
                          <span className="text-xs font-bold flex items-center gap-1.5">
                            <span>🔍 Click to View</span>
                          </span>
                          <span className="text-[11px] font-bold text-slate-300">
                            ❤️ {likesCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-0.5 rounded-md">
                          {item.categoryLabel}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          ❤️ {likesCount}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-green-700 transition line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tag Chips */}
                      <div className="pt-2 flex flex-wrap gap-1">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ======================================================= */}
        {/* 5. MASONRY FEED VIEW                                    */}
        {/* ======================================================= */}
        {viewMode === 'masonry' && (
          <section className="py-8 px-6 max-w-7xl mx-auto animate-fadeIn">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredItems.map((item, index) => {
                const isLiked = likedMap[item.id];
                const likesCount = likesMap[item.id] || item.initialLikes;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setZoomLevel(1);
                    }}
                    className="break-inside-avoid group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative overflow-hidden bg-slate-100">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={(e) => toggleLike(item.id, e)}
                          className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold hover:bg-pink-600 transition"
                        >
                          {isLiked ? '❤️' : '🤍'} {likesCount}
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-0.5 rounded-md">
                        {item.categoryLabel}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-green-700 transition">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ======================================================= */}
        {/* 6. PRO LIGHTBOX MODAL WITH ZOOM & NEXT/PREV             */}
        {/* ======================================================= */}
        {currentSelectedItem && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-6 animate-fadeIn"
            onClick={() => {
              setSelectedImageIndex(null);
              setZoomLevel(1);
            }}
          >
            <div
              className="bg-slate-950 text-white rounded-3xl overflow-hidden max-w-5xl w-full shadow-2xl relative border border-slate-800 flex flex-col max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    {currentSelectedItem.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {selectedImageIndex! + 1} of {filteredItems.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition"
                    title="Zoom Out"
                  >
                    −
                  </button>
                  <span className="text-xs font-mono text-slate-400 w-12 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition"
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-bold transition ml-1"
                  >
                    Reset
                  </button>
                  
                  {/* Close */}
                  <button
                    onClick={() => {
                      setSelectedImageIndex(null);
                      setZoomLevel(1);
                    }}
                    className="ml-2 w-9 h-9 rounded-full bg-slate-800 hover:bg-red-600 text-white font-bold text-lg flex items-center justify-center transition"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Main Zoomable Image Canvas */}
              <div className="relative flex-1 bg-black min-h-[300px] sm:min-h-[460px] flex items-center justify-center overflow-hidden p-4">
                <img
                  src={currentSelectedItem.src}
                  alt={currentSelectedItem.title}
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="max-h-[60vh] w-auto max-w-full object-contain transition-transform duration-200 select-none"
                />

                {/* Left / Right Nav Arrows */}
                <button
                  onClick={() => {
                    setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
                    setZoomLevel(1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-green-700 text-white flex items-center justify-center font-bold text-2xl transition shadow-xl"
                  aria-label="Previous Photo"
                >
                  ❮
                </button>
                <button
                  onClick={() => {
                    setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
                    setZoomLevel(1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-green-700 text-white flex items-center justify-center font-bold text-2xl transition shadow-xl"
                  aria-label="Next Photo"
                >
                  ❯
                </button>
              </div>

              {/* Caption & Actions */}
              <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1 max-w-xl">
                  <h3 className="text-xl font-bold text-white">{currentSelectedItem.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    {currentSelectedItem.description}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {currentSelectedItem.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-green-400 bg-green-950/80 px-2 py-0.5 rounded-md border border-green-800/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(currentSelectedItem.id)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
                      likedMap[currentSelectedItem.id]
                        ? 'bg-pink-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{likedMap[currentSelectedItem.id] ? '❤️' : '🤍'}</span>
                    <span>{likesMap[currentSelectedItem.id] || currentSelectedItem.initialLikes} Likes</span>
                  </button>
                </div>
              </div>

              {/* Bottom Thumbnails */}
              <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 flex gap-2 overflow-x-auto no-scrollbar">
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setZoomLevel(1);
                    }}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'ring-2 ring-green-500 scale-105 opacity-100'
                        : 'opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
