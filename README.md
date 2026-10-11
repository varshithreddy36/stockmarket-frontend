# Stock Market Tracker Frontend

## Overview

This dashboard gives users a modern stock-tracking experience with searchable ticker lookup, recent-market summaries, interactive historical charts, and a movable watchlist.

## Features

- Stock search using ticker symbols
- Historical chart ranges: 1D, 1W, 1M, 3M, 6M, 1Y, and 5Y
- Latest price, absolute change, percentage change, open, high, low, previous close, and volume summary
- Watchlist with target-price updates and removals
- Recent search history
- Loading and error states for a production-grade UX

## Technologies

- React
- Vite
- Axios
- Recharts
- Lucide React

## Prerequisites

- Node.js 18+
- npm 9+

## Local setup

1. Install dependencies:
   - npm install
2. Copy the environment sample:
   - cp .env.example .env
3. Set the backend URL if needed:
   - VITE_API_BASE_URL=http://localhost:8080/api
4. Start the dev server:
   - npm run dev

## Production build

- npm run build
- Output is written to dist/

## Testing

- npm run build
- npm run lint

## Deployment

Deploy the dist folder to a static host such as Vercel or Netlify. Set VITE_API_BASE_URL to the deployed backend URL before building.

## Known limitations

- Watchlist persistence is shared or local-development scoped until authentication and per-user authorization are implemented.
- Live market data requires a valid stock API key and upstream provider access.
