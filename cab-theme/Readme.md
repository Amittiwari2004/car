Here's your updated `README.md` with the file structure reflecting exactly what’s in your project:

```md
# 🚗 CarFinder

CarFinder is a modern, theme-aware car listing app built with **Next.js App Router**, **Tailwind CSS**, and **TypeScript**. It allows users to filter cars by brand, fuel type, and seating capacity, with pagination and dark mode support.

## 🔥 Features

- 🌙 Dark/light theme toggle
- 🔍 Filter cars by:
  - Brand
  - Fuel type
  - Minimum seating capacity
- ⏳ Loading spinner for async fetch
- 🧱 Paginated car listing (6 per page)
- ⚡ Built with:
  - `next/navigation`
  - `next-themes`
  - Type-safe components using TypeScript
  - Tailwind CSS styling

## 🧠 Tech Stack

- **Frontend:** React + Next.js (App Router)
- **Styling:** Tailwind CSS
- **Theming:** `next-themes`
- **Data Fetching:** Custom API (`fetchCars()`)

## 🛠️ Installation

```bash
git clone https://github.com/your-username/car-finder.git
cd car-finder
npm install
```

### 👟 Run locally

```bash
npm run dev
```

> Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```bash
.
├── public/
│   └── win10.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── cars/
│   │   │       └── route.ts
│   │   ├── car/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── wishlist/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── home-server.tsx
│   │   ├── layout.tsx
│   ├── components/
│   │   ├── CarCard.tsx
│   │   ├── CarFilters.tsx
│   │   ├── CarList.tsx
│   │   ├── CarPageClient.tsx
│   │   ├── Pagination.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── useThemeStore.tsx
│   │   └── WishlistButton.tsx
│   ├── lib/
│   │   └── api.ts
│   └── types/
│       ├── car.d.ts
│       └── daisyui.d.ts
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
└── postcss.config.mjs
```

## 🧪 Dummy Input (for testing)

```json
{
  "brand": "Tesla",
  "fuelType": "Electric",
  "seatingCapacity": 5
}
```

## 🙋‍♂️ Author

Made with 💻 by [@ASHISH](https://github.com/ASHISH26940)

