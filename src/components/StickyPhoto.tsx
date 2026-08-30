import React from 'react';

interface StickyPhotoProps {
  /** Path/URL to the photo. Leave undefined to show a placeholder. */
  src?: string;
  alt?: string;
  caption?: string;
  rotate?: number;
  /** 'md' (default, used for the About photo) or 'lg' (used for project thumbnails). */
  size?: 'md' | 'lg';
}

export default function StickyPhoto({
  src,
  alt = 'Photo of Mehaavarshini',
  caption = "that's me!",
  rotate = -6,
  size = 'md',
}: StickyPhotoProps) {
  const widthClass = size === 'lg' ? 'w-64 sm:w-80' : 'w-56 sm:w-64';

  return (
    <div
      className={`relative ${widthClass} shrink-0 select-none transition-transform duration-500 ease-out hover:rotate-0 hover:scale-105`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* washi tape */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-7 bg-amber-200/80 border border-amber-300/60 shadow-sm z-20"
        style={{ transform: 'rotate(-3deg)' }}
      />

      {/* card */}
      <div className="bg-[#fdf6e9] rounded-sm shadow-[0_18px_35px_-10px_rgba(0,0,0,0.6)] p-3 pb-6 relative z-10">
        <div className="w-full aspect-[4/5] bg-slate-200 overflow-hidden rounded-[2px] flex items-center justify-center">
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-slate-200 text-slate-400 text-xs font-medium gap-2 px-4 text-center">
              <span className="text-3xl">📷</span>
              your photo goes here
            </div>
          )}
        </div>
        <p className="mt-3 text-center font-script text-2xl text-slate-800 leading-none">
          {caption}
        </p>
      </div>
    </div>
  );
}
