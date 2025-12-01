# Horse Shelter Management App - React Native

This is a React Native mobile application for managing a horse shelter. The app provides features for tracking horses, health records, feeding schedules, and more.

## Features

- **Dashboard**: Overview of shelter statistics and recent activity
- **Horse Roster**: Browse and search all horses in the shelter
- **Horse Profile**: Detailed information about individual horses including medical history, feeding schedule, and care notes
- **Health Records**: Track veterinary visits, treatments, and vaccinations
- **Feeding Schedule**: Daily feeding tracker with progress monitoring

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (will be installed automatically)
- For iOS: Xcode (Mac only)
- For Android: Android Studio

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

This will start the Expo development server. You can then:
- Press `i` to open in iOS Simulator (Mac only)
- Press `a` to open in Android Emulator
- Scan the QR code with the Expo Go app on your physical device

## Running on Different Platforms

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## Project Structure

```
├── App.tsx                 # Main app component with navigation
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx     # Dashboard screen
│   │   ├── HorseRoster.tsx  # Horse roster screen
│   │   ├── HorseProfile.tsx # Individual horse profile
│   │   ├── HealthRecords.tsx # Health records screen
│   │   ├── FeedingSchedule.tsx # Feeding schedule screen
│   │   ├── ui/              # Reusable UI components
│   │   └── figma/           # Image components
│   └── ...
├── package.json
└── app.json                 # Expo configuration
```

## Technologies Used

- **React Native**: Mobile app framework
- **Expo**: Development platform and tooling
- **React Navigation**: Navigation library
- **TypeScript**: Type safety
- **Expo Vector Icons**: Icon library

## Notes

- The app uses mock data for demonstration purposes
- Images are loaded from external URLs (Unsplash)
- Navigation is handled using React Navigation with bottom tabs and stack navigation

## Development

The app is built with Expo, which provides a streamlined development experience. Hot reloading is enabled by default, so changes will appear immediately in your development environment.
