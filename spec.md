# App Specification: EcoBlue (Gamified Recycling App)

## 1. Project Overview
A React Native (Expo) mobile application focused on environmental sustainability. Users earn points by scanning/uploading photos of recyclables. Points are used to "grow" a virtual in-app tree and redeem items from a catalog. The app features a map for drop-off points and a leaderboard.

## 2. Tech Stack & Libraries
- **Framework:** React Native (Expo SDK 50+)
- **Navigation:** React Navigation (Bottom Tab & Stack)
- **Styling:** StyleSheet (Flexbox), Standard React Native Components.
- **State Management:** Zustand (for points, user level, tree stage).
- **Maps:** react-native-maps.
- **Icons:** phosphor-react-native (use "Fill" or "Duotone" weight for cute look).

## 3. Design System & UI/UX Direction
**Core Aesthetic:** "Cute," "Playful," "Clean," and "Approachable."
- **Shapes:** Heavy use of `borderRadius` (20-30px) for cards and buttons. Avoid sharp edges.
- **Typography:** Use a rounded sans-serif font system (e.g., mimic Nunito or Poppins styles).
- **Vibe:** Cheerful but professional.

### Color Palette (Strict Adherence)
Based on the provided blue palette:
- **Background (Main):** `#BDE8F5` (Very Light Blue) - Use for app background to keep it airy.
- **Primary Accent:** `#4988C4` (Soft Blue) - Use for active buttons, progress bars.
- **Secondary Accent:** `#1C4D8D` (Medium Blue) - Use for cards, distinct headers.
- **Text/Darkest:** `#0F2854` (Deep Navy) - Use for main text, headings, and active tab icons for high contrast.
- **White:** `#FFFFFF` - Use for card backgrounds to make them pop against the `#BDE8F5` background.

## 4. Navigation Structure (Bottom Tab)
1.  **Home (Tree & Dashboard)**
2.  **Scan (Camera Action)**
3.  **Map (Drop-off Locations)**
4.  **Shop (Catalog)**
5.  **Profile (Leaderboard included here or separate)**

## 5. Detailed Screen Specifications

### A. Home Screen (Gamification Central)
* **Header:** Welcome user + Current Points Display (Pill shape, cute icon).
* **Main Visual (The Tree):**
    * Center of the screen.
    * Dynamic image based on `treeStage` state:
        * Stage 1: Seed/Sprout (0-100 pts)
        * Stage 2: Sapling (100-500 pts)
        * Stage 3: Young Tree (500-1000 pts)
        * Stage 4: Big Oak Tree (1000+ pts)
    * *UX Note:* Add a progress bar below the tree showing "XP to next stage."
* **Stats Card:** "Total Trash Recycled," "CO2 Saved."
* **Leaderboard Preview:** A small card showing "You are Rank #5" with a button to view full leaderboard.

### B. Scan Screen (Action)
* **Layout:** Full-screen camera view or large "Upload/Scan" button.
* **UX:**
    * Button: Large, circular shutter button at the bottom (Color: `#1C4D8D`).
    * Overlay: A rounded frame in the center to guide user where to place the object.
    * **Post-Scan Flow:** Show a "Success" modal with confetti animation (mockup), displaying "+50 Points!" and a cute recycling illustration.

### C. Map Screen (Drop-off Points)
* **Component:** `MapView` (Google Maps style).
* **Markers:** Custom custom marker images (e.g., a little recycle bin icon in `#0F2854`).
* **Bottom Sheet/Card:** When a marker is clicked, show a floating card at the bottom with details: "Central Bank Sampah," "Open 8AM - 5PM," and a "Get Directions" button.

### D. Catalog Screen (Redeem)
* **Layout:** Masonry or Grid layout (2 columns).
* **Item Card:**
    * White background, rounded corners (20px).
    * Image of product.
    * Price in Points (e.g., "500 Pts").
    * "Redeem" button (Color: `#4988C4`).
* **Categories:** Horizontal scroll pills at the top (e.g., "Vouchers," "Eco Goods," "Donations").

### E. Leaderboard (Gamification)
* **Design:** List view.
* **Top 3:** Display the top 3 users specially at the top (Podium style illustration).
* **List Items:** Rows showing Rank #, Avatar, Name, and Total Points.
* **User Highlight:** Fix the current user's rank at the bottom of the screen if they are scrolling.

## 6. Data Model (Mock Data for UI)
* **User:** `{ id, name, points, treeStage }`
* **Products:** `[{ id, name, cost, image }]`
* **Locations:** `[{ id, lat, long, name, description }]`
