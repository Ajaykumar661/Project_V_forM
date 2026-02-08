# Pixel Art Assets Integration

Your quiz now uses custom SVG-based pixel art assets instead of emoji! This provides better visual consistency and Valentine's theme integration.

## Available Assets

### 1. **PixelHeart** ❤️
A pixelated heart shape in deep pink (#ff1493). Used for:
- Floating background decorations
- Results screen animations

### 2. **PixelStar** ⭐
A pixelated star in light pink (#ffc0cb). Used for:
- Question card corner decorations (bottom corners)

### 3. **PixelSparkle** ✨
A sparkle/plus shape in light pink (#ffc0cb). Used for:
- Question card corner decorations (top corners)
- Floating animations throughout the page
- Results screen corner decorations

### 4. **PixelDiamond** 💎
A diamond shape in hot pink (#ff69b4). Used for:
- Results screen corner decoration (top-left)

### 5. **PixelRose** 🌹
A pixelated rose with green stem. Used for:
- Results screen corner decoration (bottom-left)

### 6. **PixelGift** 🎁
A gift box design in deep pink (#ff1493). Used for:
- Results screen corner decoration (top-right)

### 7. **PixelArrow** ➡️
An arrow pointing right in light pink (#ffb6c1). Used for:
- Button area frame decorations

## How to Use in Your Components

### Import the assets:
```jsx
import { 
  PixelHeart, 
  PixelStar, 
  PixelSparkle, 
  PixelDiamond, 
  PixelRose, 
  PixelGift,
  PixelArrow 
} from "@/components/PixelAssets"
```

### Use them in your JSX:
```jsx
<PixelHeart size={24} className="text-red-500" />
<PixelStar size={16} />
<PixelSparkle size={32} />
```

## Customization

All assets are SVG-based and can be customized:

- **Size**: Pass any pixel value to the `size` prop (default: 24)
- **Color**: Pass Tailwind classes to `className` or modify the SVG `fill` attributes directly
- **Animation**: Wrap in Framer Motion components for any animation effect

## Benefits

✅ **Performance**: Lightweight SVG instead of emoji
✅ **Control**: Fully customizable colors and sizes
✅ **Consistency**: Unified pixelated aesthetic throughout the app
✅ **Scalability**: Works at any size without quality loss
✅ **Licensing**: No licensing concerns with emoji alternatives

## File Location

All pixel assets are defined in: `components/PixelAssets.jsx`

## Current Usage in Quiz

- **Floating decorations**: Mix of PixelHeart, PixelStar, PixelSparkle, PixelDiamond, PixelRose, PixelGift
- **Question card corners**: PixelSparkle (top) and PixelStar (bottom)
- **Button decorations**: PixelArrow (sides)
- **Results screen corners**: PixelDiamond, PixelGift, PixelRose, PixelSparkle
- **Background animations**: PixelHeart floating down

## Future Expansion

You can easily add more pixel assets to `PixelAssets.jsx` by creating new SVG components following the same pattern!
