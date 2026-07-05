import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg border',
    md: 'w-10 h-10 rounded-xl border',
    lg: 'w-14 h-14 rounded-2xl border-2',
  };

  const vFontSize = {
    sm: 'text-[24px]',
    md: 'text-[32px]',
    lg: 'text-[44px]',
  };

  const eFontSize = {
    sm: 'text-[8px] mt-[0.5px]',
    md: 'text-[11px] mt-[1px]',
    lg: 'text-[15px] mt-[2px]',
  };

  return (
    <div 
      className={`relative ${sizeClasses[size]} ${className} flex items-center justify-center bg-[#151515] border-[#C9A84C]/45 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden group/logo transition-all duration-300 hover:border-[#C9A84C]/70`}
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
      }}
    >
      {/* Subtle fine metallic grain/texture overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Inner subtle gold highlight rim */}
      <div className="absolute inset-[1px] rounded-[inherit] border border-[#C9A84C]/10 pointer-events-none" />

      {/* Monogram characters */}
      <div className="relative flex items-center justify-center w-full h-full select-none">
        {/* Large outer V with gold gradient shading */}
        <span 
          className={`font-serif font-bold ${vFontSize[size]} text-transparent bg-clip-text bg-gradient-to-b from-[#FAF6F0] via-[#C9A84C] to-[#99772B] tracking-tight leading-none transition-transform duration-300 group-hover/logo:scale-[1.05]`}
          style={{ 
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
          }}
        >
          V
        </span>
        
        {/* Nested E inside the V */}
        <span 
          className={`absolute font-serif font-bold ${eFontSize[size]} text-transparent bg-clip-text bg-gradient-to-b from-[#FAF6F0] via-[#C9A84C] to-[#8C6B21] tracking-wider transition-all duration-300 group-hover/logo:scale-[1.08]`}
          style={{ 
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.6))',
          }}
        >
          E
        </span>
      </div>
    </div>
  );
}
