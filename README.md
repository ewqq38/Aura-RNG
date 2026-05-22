# 🌌 Aura RNG - Cosmic Fate Roller

> **Roll to discover your cosmic fate...**

A stunning, high-performance random number generator with a cosmic aesthetic. Experience the thrill of fate as you roll for legendary auras with beautiful animations and particle effects.

## ✨ Features

### 🎨 **Cosmic Aesthetic**
- 🌟 Animated starfield with 100+ twinkling stars
- 🌠 Dynamic shooting star effects
- 🌌 Floating nebula backgrounds with smooth animations
- 💫 Neon cyan & magenta glow effects throughout
- ✧ Professional typography with animated gradients

### ⚡ **Advanced Mechanics**
- 🎰 35-card rolling mechanism with physics-based animation
- 📊 Weighted probability distribution for 6 rarity tiers
- 🎯 Smooth cubic-bezier easing for realistic motion
- 💥 Particle burst effects on rare drops
- 🔄 Dynamic calculation for perfect card alignment

### 🎮 **Interactive Features**
- 🖱️ Beautiful gradient button with shine animation
- ⌨️ Keyboard support (ENTER or SPACE to roll)
- 📱 Fully responsive mobile design
- 🎚️ Glowing center indicator that pulses
- 📈 Real-time statistics tracking
- 💾 LocalStorage persistence

### 🚀 **Performance**
- ⚡ 60 FPS smooth animations
- 🎯 Canvas-optimized starfield
- 📦 No external dependencies
- 🔧 Modular, maintainable code
- 📄 ~15KB total size

## 🎯 Rarity Tiers

| Tier | Name | Chance | Color | Effect |
|------|------|--------|-------|--------|
| 0 | COMMON | 50% | Gray | — |
| 1 | RARE | 30% | Blue | — |
| 2 | EPIC | 12% | Purple | — |
| 3 | LEGENDARY | 5% | Gold | 💥 Shake + Particles |
| 4 | MYTHIC | 1.8% | Magenta | 💥 Shake + Particles |
| 5 | DIVINE | 1.2% | Cyan | 💥 Shake + Particles |

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Fork or clone this repository
2. Enable GitHub Pages in repository settings (Settings → Pages)
3. Visit `https://yourusername.github.io/Aura-RNG`

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/ewqq38/Aura-RNG.git
cd Aura-RNG

# Open in browser
open index.html
# or
python -m http.server 8000
# then visit http://localhost:8000
```

### Option 3: Live Preview
Simply download the files and open `index.html` in any modern browser.

## 🎮 How to Use

1. **Click the "ROLL FATE" button** or press **ENTER/SPACE**
2. Watch as the cards spin smoothly
3. Your result appears at the center indicator
4. Track your stats in real-time
5. Your data persists across sessions!

## 🎨 Customization

### Modify Rarity Chances
Edit `script.js` in the `AURAS` array:
```javascript
const AURAS = [
  { name: "COMMON", color: "#888888", chance: 50, rarity: 0 },
  { name: "RARE", color: "#3388ff", chance: 30, rarity: 1 },
  // ... more tiers
];
```

### Change Colors
Update the `color` field for each aura or modify `style.css`:
```css
.divine { 
  color: #00ffff; 
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5); 
}
```

### Adjust Animation Speed
Modify these constants in `script.js`:
```javascript
const CONFIG = {
  ANIMATION_DURATION: 4000,  // milliseconds
  NUM_CARDS: 35,              // number of cards in rotation
  PARTICLE_COUNT: 25,         // particles per burst
  // ...
};
```

### Customize Background
Edit nebula effects in `style.css`:
```css
.nebula-1 {
  background: radial-gradient(circle, #00ffff, transparent);
  animation: float 15s ease-in-out infinite;
}
```

## 🛠️ Technical Stack

- **HTML5** - Semantic markup with canvas support
- **CSS3** - Advanced animations, gradients, backdrop filters
- **JavaScript ES6** - Modular architecture, no dependencies
- **Canvas API** - High-performance starfield rendering
- **LocalStorage** - Persistent statistics

## 📊 Code Architecture

```
Aura-RNG/
├── index.html          # Semantic HTML structure
├── style.css           # 700+ lines of cosmic styling
├── script.js           # 400+ lines of modular JS
│   ├── CONFIG          # Centralized configuration
│   ├── STATE           # State management
│   ├── Starfield       # Canvas starfield class
│   ├── ParticleSystem  # Particle burst effects
│   ├── AURA functions  # Rarity & rolling logic
│   ├── Display functions
│   └── Event handlers
└── README.md           # Documentation
```

## ✨ Key Classes & Functions

### `Starfield` Class
- Canvas-based animated starfield renderer
- Twinkling star effects with individual phases
- Shooting star generation and physics

### `ParticleSystem` Class
- Radial burst particle creation
- Physics-based animation with gravity
- Automatic cleanup on completion

### Core Functions
- `getRandomAura()` - Weighted probability selection
- `performRoll()` - Main roll logic and animation orchestration
- `saveStats()` / `loadStats()` - LocalStorage persistence
- `getRarityDescription()` - Dynamic rarity text

## 🎨 Animation Features

### CSS Animations
- **Gradient Text** - Smooth color shifting (4s cycle)
- **Glow Pulses** - UI element breathing effect
- **Button Shine** - Animated light sweep across button
- **Camera Shake** - Rare drop feedback
- **Fade Transitions** - Smooth entrance/exit effects

### JavaScript Animations
- **Starfield Twinkling** - Per-star phase-based opacity
- **Shooting Stars** - Velocity-based trajectory
- **Particle Physics** - Gravity and velocity decay
- **Card Scrolling** - Cubic-bezier easing (0.15, 0.8, 0.15, 1)

## 📱 Responsive Design

- **Desktop** - Full cosmic experience with all effects
- **Tablet** - Optimized layout with reduced particle count
- **Mobile** - Touch-friendly with scaled animations
- **Accessibility** - Respects `prefers-reduced-motion` preference

## 🌐 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Optimal performance |
| Firefox | ✅ Full | Great performance |
| Safari | ✅ Full | Works great |
| Edge | ✅ Full | Full support |
| Mobile Safari | ✅ Full | Responsive design |
| Mobile Chrome | ✅ Full | Touch optimized |

## 🔧 Performance Tips

1. **Reduce Star Count** - Lower `STAR_COUNT` in CONFIG for older devices
2. **Disable Particles** - Comment out `ParticleSystem.createBurst()` call
3. **Simplify Background** - Remove one or more `.nebula` elements
4. **Static Mode** - Remove animation classes from CSS

## 🚀 Future Enhancements

- [ ] Sound effects for rolls
- [ ] Multiple game modes (Daily Spin, Streak Counter)
- [ ] Leaderboard system
- [ ] Custom theme selector
- [ ] Dark/Light mode toggle
- [ ] Export statistics
- [ ] Animation quality settings

## 📝 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

- **Design Inspiration** - Cosmic/cyberpunk aesthetics
- **Physics Simulation** - Custom particle system
- **Starfield** - Canvas-based rendering with twinkling effects
- **Created by** - @ewqq38

## 🎁 Tips for Best Experience

1. **Full Screen** - Maximize your browser for immersive experience
2. **Dark Room** - The glow effects shine better in dim lighting
3. **Fast Refresh Rate Monitor** - 60Hz+ for smoothest animations
4. **Modern Browser** - Use latest Chrome, Firefox, or Safari

## 💬 Feedback & Support

- Found a bug? Create an issue on GitHub
- Want to contribute? Pull requests welcome!
- Have ideas? Suggest features in discussions

---

**✧ Powered by Cosmic Forces ✧**

*Roll to discover your cosmic fate...*
