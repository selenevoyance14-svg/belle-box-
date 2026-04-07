# Brand System: Kado
> "Unboxing happiness, delivered monthly."

## 1. Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#FF6B5C` | Main buttons, key actions (Living Coral) |
| **Secondary** | `#FFE4D6` | Background accents, secondary buttons (Peach) |
| **Accent** | `#FFC947` | Highlights, badges, stickers (Warm Yellow) |
| **Background** | `#FFFBF7` | Page background (Cream - NOT White) |
| **Text** | `#3D2E28` | All text (Espresso - NOT Black) |
| **Border** | `#E6D6CE` | UI borders, dividers |

## 2. Typography
*   **Headings:** `Fraunces` (Weights: 600, 700, 800) - Soft, editorial serif.
*   **Body:** `Outfit` (Weights: 400, 500) - Friendly, geometric sans.
*   **Mono:** `Space Mono` - Only for SKU/Pricing.

## 3. Icons
*   **Library:** Phosphor (Filled/Duotone)
*   **Style:** Rounded, filled shapes, no sharp edges.
*   **Key Icons:** `package` (box), `sparkle` (new), `heart` (wishlist).

## 4. UI & Components
| Component | Style | Note |
|-----------|-------|------|
| **Buttons** | Pill shape (Full radius) | Offset shadow (`4px 4px 0px #E6D6CE`) |
| **Cards** | `rounded-2xl` | White bg, 2px border, soft shadow |
| **Inputs** | `rounded-xl` | Thick borders, warm bg on focus |

## 5. Animations
| Trigger | Animation | Feel |
|---------|-----------|------|
| **Hover** | `scale-up` (1.05) | Bouncy & Tactile |
| **Click** | `press-down` (0.95) | Responsive |
| **Load** | `fade-up` | Gentle entry |

## 6. Graphic System
*   **Pattern:** Organic blobs in background (opacity 5%).
*   **Dividers:** Wavy lines or whitespace (no hard straight lines).
*   **Accents:** Hand-drawn squiggles under text.

## 7. Accessibility
```css
*:focus-visible { outline: 3px solid #FFC947; outline-offset: 2px; }
@media (prefers-reduced-motion) { * { animation: none !important; transition: none !important; } }
```
*   Text contrast ratio is AA compliant (Espresso on Cream).
*   Touch targets min 44px (large buttons).

## 8. Don'ts
*   ❌ NEVER use pure black (#000000).
*   ❌ NEVER use sharp corners (0px radius).
*   ❌ NEVER use generic 'Arial' or 'Inter'.
*   ❌ NEVER use cold, tech-blue gradients.