
import React from 'react';
import { Template } from './types';
import { 
    WandIcon, 
    BrushIcon, 
    SparklesIcon, 
    ClapperboardIcon, 
    StarIcon, 
    CameraIcon,
    PencilIcon,
    CrownIcon,
    FeatherIcon,
    FilmIcon,
    CpuIcon,
    MoonIcon,
    PlusCircleIcon
} from './components/icons/Icons';

export const TEMPLATES: Template[] = [
  {
    id: 'custom',
    name: 'Custom',
    prompt: '', // This will be user-defined
    icon: <PlusCircleIcon />,
  },
  {
    id: 'pro_enhance',
    name: 'Pro Enhance',
    prompt: 'Perform a professional photo enhancement on this image. Improve lighting, color balance, and sharpness to make the subject look their best in a clean, polished style.',
    icon: <PencilIcon />,
  },
  {
    id: 'cartoon',
    name: 'Cartoonify',
    prompt: 'Turn this image into a colorful, friendly cartoon character, while keeping the facial likeness of the original person. Give it bold outlines, simplified features, and a playful expression.',
    icon: <SparklesIcon />,
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    prompt: 'Give this image a dramatic, cinematic look. Apply a teal and orange color grade, add a slight vignette, and enhance the lighting to make it feel like a still from a blockbuster movie.',
    icon: <ClapperboardIcon />,
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    prompt: "Reimagine the person in this photo as a high-fantasy character (like an elf, mage, or warrior). Change their clothing to fantasy-style attire, and place them in an enchanted setting with mystical elements. Crucially, maintain the person's original facial features.",
    icon: <WandIcon />,
  },
  {
    id: 'van_gogh',
    name: 'Van Gogh',
    prompt: 'Transform this image into a painting in the style of Vincent van Gogh. Emphasize swirling brushstrokes and a vibrant, expressive color palette.',
    icon: <BrushIcon />,
  },
  {
    id: 'pixel_art',
    name: 'Pixel Art',
    prompt: "Convert this image into 16-bit pixel art. Simplify the shapes and color palette to resemble a character from a classic video game, ensuring the character's face is still recognizable from the original photo.",
    icon: <StarIcon />,
  },
  {
    id: '80s',
    name: '80s Style',
    prompt: "Transform the person in this photo to look like they are in a classic 1980s photo booth session, but keep their facial features recognizable. Change their hairstyle to a popular 80s style (like a big perm or mullet) and update their clothing to 80s fashion (e.g., neon windbreaker, acid-wash jeans). The background should be a simple, classic 80s photo booth style, like a solid color or a subtle pattern common in that era.",
    icon: <FilmIcon />,
  },
  {
    id: 'gentle_glow',
    name: 'Gentle Glow',
    prompt: 'Give this image a gentle, ethereal glow. Soften the focus slightly, enhance the highlights with a warm, soft light, and create a dreamy, peaceful atmosphere.',
    icon: <FeatherIcon />,
  },
  {
    id: 'kingdom',
    name: 'Kingdom',
    prompt: "Transform the person in this photo into royalty from a fantasy kingdom. Keep their facial features recognizable, but dress them in elegant, regal attire befitting a king, queen, prince, or princess. Place them in a majestic castle or throne room setting and give the image a grand, painted quality.",
    icon: <CrownIcon />,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    prompt: 'Transform the person in this photo into a cyberpunk character. Keep their original face, but add futuristic cybernetic enhancements and stylish high-tech clothing. Place them in a dark, neon-lit, high-tech city environment.',
    icon: <CpuIcon />,
  },
  {
    id: 'vintage',
    name: 'Vintage',
    prompt: 'Make this image look like a vintage photograph from the 1950s. Apply a sepia tone, add a subtle film grain texture, and slightly fade the colors.',
    icon: <CameraIcon />,
  },
  {
    id: 'gothic_noir',
    name: 'Gothic Noir',
    prompt: 'Reimagine the person in this image with a gothic noir aesthetic. Keep their face recognizable, but dress them in dark, elegant, vintage clothing suitable for a mystery film. Use a monochrome or heavily desaturated color palette, high contrast, dramatic shadows, and a mysterious, moody atmosphere.',
    icon: <MoonIcon />,
  },
];
