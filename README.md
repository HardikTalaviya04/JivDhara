# JivDhara

A basic React Native Expo project with TypeScript.

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- For Android development: Android Studio
- For iOS development: Xcode (macOS only)

### Installation

1. Clone or navigate to the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

   **Note:** If you encounter disk space issues, please free up space on your device before running this command.

### Running the App

- Start the development server:

  ```bash
  npm start
  ```

- Run on specific platforms:

  ```bash
  npm run android  # For Android
  npm run ios      # For iOS (macOS required)
  npm run web      # For web
  ```

This will open the Expo Developer Tools in your browser. You can then use the Expo Go app on your phone to scan the QR code and run the app, or run it in an emulator/simulator.

## Project Structure

- `App.tsx`: Main app component
- `assets/`: Static assets like images
- `app.json`: Expo configuration
- `package.json`: Dependencies and scripts

## Troubleshooting

- If `npm install` fails due to disk space, clear some space and try again.
- Ensure Expo CLI is installed globally.
- For Android/iOS development, set up the respective development environments as per Expo documentation.

For more information, visit the [Expo documentation](https://docs.expo.dev/).