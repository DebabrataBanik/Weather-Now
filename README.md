# Weather Now

A clean, modern weather application that shows current conditions, hourly forecasts and daily forecasts for any location worldwide.

## Features

- **Current Weather**: Temperature, feels like, humidity, wind speed and precipitation.
- **Hourly Forecast**: 24-hour breakdown for the next 7 days.
- **Daily Forecast**: 7-day forecast with high/low temperatures.
- **Location Search**: Search for any city worldwide.
- **Geolocation**: Automatic weather for your current location.
- **Unit Toggle**: Switch between metric (°C, km/h, mm) and imperial (°F, mph, inches)

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- TanStack Query for data fetching and caching
- React Router for navigation
- Open-Meteo API for weather data
- OpenStreetMap Nominatim for geocoding

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## How It Works

The app fetches weather data from the Open-Meteo API, which provides free weather forecasts without requiring an API key. Location data is handled through:

- **Geolocation API** for detecting your current position
- **Nominatim** for reverse geocoding (coordinates → place names)
- **Open-Meteo Geocoding** for searching locations

Weather data is cached for 5 minutes to reduce API calls and improve performance.

## Project Structure

```
src/
├── components/        # React components
    ├──skeleton/       # skeleton UI
    ├──subcomponents/  # reusable components
├── context/          # React context (theme, units)
├── hooks/            # Custom hooks (geolocation, queries)
├── pages/            # Route pages
├── services/         # API calls
├── types/            # TypeScript types
└── utils/            # Helper functions
```
