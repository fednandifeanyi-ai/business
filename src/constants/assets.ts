import React from 'react';

// Centralized Image Asset Configuration with multi-layer fallback
// Works on Localhost, GitHub Pages (subdirectories), Vercel, Netlify, and Cloud Run

export const ASSET_IMAGES = {
  // Official Brand Logo
  logo: {
    local: './logo.png',
    root: '/logo.png',
    cdn: 'https://i.ibb.co/DHnmvqdM/Whats-App-Image-2026-08-14-at-10-46-34-PM.jpg',
    alt: 'Soft Tech World & AI Automation Official Logo'
  },
  // Official Home Showcase Picture
  homePicture: {
    local: './home-picture.jpg',
    root: '/home-picture.jpg',
    cdn: 'https://i.ibb.co/HTfKYjt9/Whats-App-Image-2026-08-17-at-1-43-26-PM.jpg',
    alt: 'Soft Tech World & AI Automation Home Showcase'
  },
  // Official Flyer / Graphic Design
  flyer: {
    local: './hero-flyer.jpg',
    root: '/hero-flyer.jpg',
    cdn: 'https://i.ibb.co/DHnmvqdM/Whats-App-Image-2026-08-14-at-10-46-34-PM.jpg',
    alt: 'Soft Tech World & AI Automation Official Creative Flyer'
  }
};

/**
 * Universal Image Error Handler
 * If local asset path fails (e.g., GitHub Pages base URL mismatch), 
 * automatically switches to cloud CDN fallback seamlessly.
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackCdnUrl: string
) => {
  const target = e.currentTarget;
  if (target.src !== fallbackCdnUrl) {
    target.src = fallbackCdnUrl;
  }
};
