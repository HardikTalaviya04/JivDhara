# GitaAI - Spiritual Life Companion

A modern AI-powered React Native mobile app inspired by the Bhagavad Gita, designed to provide spiritual guidance and wisdom.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up OpenAI API Key** (Optional for production)
```bash
# Create a .env.local file in the root directory
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

If you don't have an API key, the app will use mock responses for demo purposes.

3. **Start the development server**
```bash
npm start
```

4. **Run on your platform**
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 Features

### ✨ Core Features
- **Onboarding**: 3-slide intro with language selection (English, Hindi, Gujarati)
- **Chat Screen**: AI-powered spiritual guidance inspired by Lord Krishna
- **Gita Screen**: Browse all 18 chapters with 700+ verses
- **Meditation**: Audio and guided meditation sessions
- **Daily Wisdom**: Random Bhagavad Gita verse every day
- **Profile**: User preferences, language settings, subscription info
- **Home**: Mood selection, quick actions, daily shloka

### 🎨 Design
- **Premium UI**: Soft gradients (saffron, gold, white tones)
- **Dark Mode Support**: Easy on the eyes
- **Smooth Animations**: Built with React Native Reanimated
- **Responsive Design**: Works on phones, tablets, and web

### 🔐 Features
- ✅ Local message storage
- ✅ Daily message limit (10 free / unlimited premium)
- ✅ Persistent chat history
- ✅ Language preference saving
- ✅ Multiple platform support

## 📁 Project Structure

```
/app                          # Expo Router navigation
  /(tabs)                     # Tab-based routes
    home.tsx                  # Home screen
    chat.tsx                  # Chat screen
    gita.tsx                  # Gita chapters & verses
    meditate.tsx              # Meditation guide
    profile.tsx               # User profile
  onboarding.tsx              # Onboarding flow
  _layout.tsx                 # Root layout

/components                   # Reusable UI components
  Card.tsx                    # Card component
  ChatBubble.tsx              # Chat message bubble
  GradientButton.tsx          # Gradient button

/store                        # Zustand state management
  chatStore.ts                # Chat and app state

/services                     # API & storage services
  apiService.ts               # OpenAI API integration
  storageService.ts           # Local storage helpers

/hooks                        # Custom React hooks
  useCustomFonts.ts           # Font loading
  useAppLifecycle.ts          # App lifecycle
  useDarkMode.ts              # Dark mode detection

/constants                    # App constants
  colors.ts                   # Color palette
  gitaData.ts                 # Gita verses

/types                        # TypeScript types
  index.ts                    # Global types
```

## 🛠️ Tech Stack

- **React Native** - Mobile framework
- **Expo** - Native mobile development
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **Zustand** - State management
- **Axios** - HTTP client
- **React Native Reanimated** - Animations
- **OpenAI API** - AI responses (optional)

## 💻 Development

### Available Scripts

```bash
npm start          # Start dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
npm test           # Run tests
```

### Using Mock AI Responses

By default, the app uses mock responses. For real AI responses, set your OpenAI API key in `.env.local`:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
```

Then update `services/apiService.ts` to use `sendMessageToAI` instead of `sendMessageToAIMock`.

## 🎯 Key Components

### Chat Screen
- AI-powered spiritual guide (Krishna-inspired)
- Suggested prompts for easy conversation
- Message storage with daily limits
- Real-time message count tracker

### Gita Screen
- All 18 chapters with verses
- Sanskrit text with transliteration
- English meanings
- Section list for easy navigation

### Home Screen
- Time-based greetings
- Daily Shloka (random Gita verse)
- Mood selection buttons
- Quick action buttons

### Profile Screen
- User info and stats
- Language selection (English, Hindi, Gujarati)
- Dark mode toggle
- Subscription info
- Settings menu

## 🚀 Deployment

### iOS
```bash
eas build --platform ios
eas submit --platform ios
```

### Android
```bash
eas build --platform android
eas submit --platform android
```

### Web
```bash
npm run web
# Deploy the ./web-build folder to your hosting
```

## 📝 API Integration

### Using OpenAI API

1. Get your API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to `.env.local`:
```
EXPO_PUBLIC_OPENAI_API_KEY=your_key_here
```
3. The app will automatically use real AI responses

### System Prompt
The AI acts as a spiritual guide:
> "You are a wise spiritual guide inspired by Lord Krishna and the Bhagavad Gita. Give practical life advice in simple modern language. Be calm, clear, and helpful."

## 🐛 Troubleshooting

### App Won't Start
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `expo start --clear`

### API Key Issues
- Check key format: should start with `sk-`
- Verify in `.env.local` file
- Restart dev server after adding key

### Navigation Issues
- Ensure auth state is initialized
- Check Expo Router setup
- Verify screen names match routes

## 📚 Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Expo Router](https://expo.github.io/router)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Zustand](https://github.com/pmndrs/zustand)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Built with React Native & Expo
- Images from Expo Assets
- Bhagavad Gita verses from traditional sources
- Inspired by premium spiritual apps like Calm, Insight Timer

---

**Happy coding! May your app bring wisdom to many seekers. 🙏**