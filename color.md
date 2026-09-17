# Hungry Howie's - Color Palette & Style Guide

This document contains all extracted color codes, CSS variables, hex codes, RGBA values, and usage guidelines for the **Hungry Howie's** web application.

---

## 🎨 1. CSS Custom Properties (`:root` Variables)

```css
:root {
    /* Brand Primary Reds */
    --primary-red: #ED1C24;
    --deep-red: #B5121B;
    --bright-red: #F21D2B;

    /* Brand Accents & Yellows */
    --brand-yellow: #FFD400;
    --warm-yellow: #FFC400;

    /* Dark Mode & Charcoal Surfaces */
    --deep-charcoal: #171717;
    --charcoal-mid: #1A1A1A;
    --cream: #F8F6F0;

    /* Shadows & Glow Effects */
    --shadow-dark: rgba(0, 0, 0, 0.8);
    --shadow-light: rgba(0, 0, 0, 0.3);
    --glow-red: rgba(237, 28, 36, 0.35);
    --glow-red-soft: rgba(237, 28, 36, 0.15);
}
```

---

## 🔴 2. Brand & Primary Reds

| Color Name | Hex Code | RGB Equivalent | Usage / Application |
| :--- | :--- | :--- | :--- |
| **Primary Brand Red** | `#ED1C24` | `rgb(237, 28, 36)` | Main Brand Accent, Primary CTA Buttons, Highlights |
| **Deep Red** | `#B5121B` | `rgb(181, 18, 27)` | Button Hover / Gradient End, Dark Accent |
| **Bright Red** | `#F21D2B` | `rgb(242, 29, 43)` | Hero Section Text & Glowing Text Effects |
| **Crimson / Dark Red** | `#B71C1C` | `rgb(183, 28, 28)` | Hover States & Deep Accent Borders |
| **Alert Red** | `#C62828` | `rgb(198, 40, 40)` | Badge Borders, Warnings |
| **Error Red** | `#D32F2F` | `rgb(211, 47, 47)` | Error Messages & Discount Tags |
| **Spicy Red / Coral** | `#E53935` | `rgb(229, 57, 53)` | Spicy Flavor Badges |
| **Soft Input Red** | `#FF4444` | `rgb(255, 68, 68)` | Form Validation Input Highlight |

---

## 🟡 3. Yellows, Golds & Warm Accents

| Color Name | Hex Code | RGB Equivalent | Usage / Application |
| :--- | :--- | :--- | :--- |
| **Brand Yellow** | `#FFD400` | `rgb(255, 212, 0)` | Star Ratings, Secondary Highlights, Pricing Badges |
| **Warm Yellow** | `#FFC400` | `rgb(255, 196, 0)` | Hover accent on yellow buttons |
| **Gold Metallic** | `#D4AF37` | `rgb(212, 175, 55)` | VIP / Gold Special Offer Borders |
| **Amber Orange** | `#FFB300` | `rgb(255, 179, 0)` | Spicy / Special Offer Tags |
| **Bright Lemon** | `#FDD835` | `rgb(253, 216, 53)` | Bright Text Badges |
| **Sunburst Yellow** | `#FFEB3B` | `rgb(255, 235, 59)` | Highlight Icons |
| **Soft Cream Yellow**| `#FFF59D` | `rgb(255, 245, 157)`| Light Card Highlights |

---

## 🖤 4. Dark Neutrals & Surface Colors

| Color Name | Hex Code | RGB Equivalent | Usage / Application |
| :--- | :--- | :--- | :--- |
| **Ultra Dark Charcoal** | `#0A0A0A` | `rgb(10, 10, 10)` | Footer Background, Deep Modal Overlays |
| **Pure Charcoal** | `#111111` | `rgb(17, 17, 17)` | Alternative Background Panels |
| **Deep Charcoal** | `#171717` | `rgb(23, 23, 23)` | Primary Application Page Background |
| **Mid Charcoal** | `#1A1A1A` | `rgb(26, 26, 26)` | Navigation Header, Menu Cards |
| **Card Surface Dark** | `#222222` | `rgb(34, 34, 34)` | Product Card Backgrounds |
| **Elevated Dark** | `#2C2C2C` | `rgb(44, 44, 44)` | Modals, Dropdowns, Hover Backgrounds |
| **Warm Cocoa Dark** | `#3E2723` | `rgb(62, 39, 35)` | Rich Category Cards |
| **Primary Text Dark** | `#333333` | `rgb(51, 51, 51)` | Body Text on Light Surfaces |

---

## ⚪ 5. Light Neutrals & Off-Whites

| Color Name | Hex Code | RGB Equivalent | Usage / Application |
| :--- | :--- | :--- | :--- |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | High-Contrast Headings, Primary Card Text |
| **Warm Cream** | `#F8F6F0` | `rgb(248, 246, 240)` | Light Section Backgrounds |
| **Soft Off-White** | `#FAF7F2` | `rgb(250, 247, 242)` | Card Inner Backgrounds |
| **Light Ivory** | `#F0ECE6` | `rgb(240, 236, 230)` | Secondary Text Background |
| **Cool White** | `#F8F8F8` | `rgb(248, 248, 248)` | Subtly Shaded Input Fields |
| **Subtle Divider Gray**| `#E0E0E0` | `rgb(224, 224, 224)`| Border Lines & Card Outlines |
| **Muted Text Gray** | `#999999` | `rgb(153, 153, 153)`| Secondary Metadata, Captions |

---

## 🟢 6. Functional & Specialty Colors

| Category | Hex Code | RGB Equivalent | Usage / Application |
| :--- | :--- | :--- | :--- |
| **Vegetarian Green** | `#4CAF50` | `rgb(76, 175, 80)` | Veg Item Icons & Badges |
| **Dark Green Accent**| `#2E7D32` | `rgb(46, 125, 50)` | Success Toast Notifications |
| **Deep Forest Green**| `#1B5E20` | `rgb(27, 94, 32)` | Eco-friendly / Fresh Labels |
| **Warm Flame Orange**| `#EF6C00` | `rgb(239, 108, 0)` | Hot & Spicy Badges |

---

## 💧 7. Transparencies, Shadows & Overlays (RGBA)

```css
/* Glassmorphism Navigation Bar */
background: rgba(26, 26, 26, 0.95);

/* Navigation Scrolled State */
background: rgba(26, 26, 26, 0.98);

/* Header Overlay on Dark Theme */
background: rgba(23, 23, 23, 0.85);

/* Red Glow Effects */
box-shadow: 0 4px 15px rgba(237, 28, 36, 0.25);
box-shadow: 0 8px 25px rgba(237, 28, 36, 0.35);

/* Dark Image Gradient Overlay */
background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
```

---

## 📑 8. Complete Master Hex Code Registry

Here is the complete sorted list of all 77 unique hex codes found in the project repository:

```text
#0A0A0A, #111111, #171717, #1A1A1A, #1B5E20, #222222, #2C2C2C, #2E7D32, #333333, #3E2723,
#43A047, #444444, #4CAF50, #4E342E, #555555, #5D4037, #666666, #777777, #7A7571, #80DEEA,
#81C784, #8D6E63, #999999, #9A0007, #A1887F, #B2DFDB, #B5121B, #B71C1C, #BF360C, #C62828,
#CCCCCC, #CFD8DC, #D32F2F, #D4AF37, #D7CCC8, #D84315, #E0C4C4, #E0D6C8, #E0E0E0, #E0F2F1,
#E0F7FA, #E53935, #E5C4C4, #E8E2DA, #EBE5DF, #ECEFF1, #ED1C24, #EF6C00, #F0ECE6, #F21D2B,
#F44336, #F57F17, #F8F6F0, #F8F8F8, #FAF7F2, #FB8C00, #FBC02D, #FCE8E8, #FDD835, #FDF0F0,
#FDF3F3, #FF4444, #FF8F00, #FFB300, #FFC400, #FFD400, #FFD54F, #FFEB3B, #FFFFFF, #FFF176,
#FFF59D, #FFF5F5, #FFF9F9, #FFFDE7
```
