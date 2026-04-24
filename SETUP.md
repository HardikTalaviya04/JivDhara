# GitaAI Setup & Configuration Guide

## 🚀 Initial Setup

### 1. Install Dependencies
```bash
npm install
```

If you encounter dependency issues, try:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### 2. Start the Development Server
```bash
npm start
```

This will:
- Start the Expo development server
- Display a terminal UI with various options
- Show a QR code for Expo Go

### 3. Run on Your Device

#### Option A: Expo Go (Easiest for Development)
- Install [Expo Go](https://expo.dev/go) on your phone
- Scan the QR code from terminal
- App opens on your phone immediately

#### Option B: Android Emulator
```bash
npm run android
```
Requires Android Studio with an emulator installed.

#### Option C: iOS Simulator (macOS only)
```bash
npm run ios
```
Requires Xcode installed.

#### Option D: Web Browser
```bash
npm run web
```
Opens the app in a web browser (limited functionality).

---

## 🤖 Configuring OpenAI API (Optional)

### For Production/Real AI Responses

1. **Get your API key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Add to environment**
   - Copy `.env.example` to `.env.local`
   - Paste your key:
   ```bash
   EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key-here
   ```

3. **Update the chat service**
   - Open `services/apiService.ts`
   - Change line in `app/(tabs)/chat.tsx`:
   ```typescript
   // FROM:
   import { sendMessageToAIMock } from '../../services/apiService';

   // TO:
   import { sendMessageToAI } from '../../services/apiService';
   ```

   - Update the handleSendMessage function:
   ```typescript
   const response = await sendMessageToAI(text); // Instead of sendMessageToAIMock
   ```

4. **Restart the dev server**
   ```bash
   npm start
   ```

### Testing Your API Integration
- Open the Chat screen
- Send a test message
- Check the terminal for any API errors
- Verify responses are coming from OpenAI

---

## 📱 Project File Structure

```
GitaAI/
├── app/                          # Main app screens (Expo Router)
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── home.tsx              # Home screen
│   │   ├── chat.tsx              # Chat with AI
│   │   ├── gita.tsx              # Gita verses
│   │   ├── meditate.tsx          # Meditation guide
│   │   ├── profile.tsx           # User profile
│   │   └── _layout.tsx           # Tab layout
│   ├── onboarding.tsx            # 3-slide onboarding
│   └── _layout.tsx               # Root layout
│
├── components/                   # Reusable UI components
│   ├── Card.tsx                  # Styled card wrapper
│   ├── ChatBubble.tsx            # Message bubble
│   └── GradientButton.tsx        # Gradient button
│
├── hooks/                        # Custom React hooks
│   ├── useCustomFonts.ts         # Font loading
│   ├── useAppLifecycle.ts        # App lifecycle
│   └── useDarkMode.ts            # Dark mode detection
│
├── store/                        # State management (Zustand)
│   └── chatStore.ts              # Chat state & messages
│
├── services/                     # API & storage
│   ├── apiService.ts             # OpenAI integration
│   ├── storageService.ts         # Local storage
│   └── mockService.ts            # Demo responses
│
├── constants/                    # App constants
│   ├── colors.ts                 # Color palette
│   └── gitaData.ts               # Gita verses data
│
├── types/                        # TypeScript types
│   └── index.ts                  # Global type definitions
│
├── App.tsx                       # Root component
├── index.ts                      # Entry point
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── .env.example                  # Environment template
└── README.md                     # Main documentation
```

---

## 🎨 Customizing the App

### Change the Color Scheme
Edit `constants/colors.ts`:
```typescript
export const COLORS = {
  primary: '#FF6B35',      // Change saffron color
  secondary: '#9B59B6',    // Change purple
  // ... more colors
};
```

### Add More Gita Verses
Edit `constants/gitaData.ts`:
```typescript
{
  chapter: 2,
  verse: 47,
  text: 'Sanskrit text here',
  transliteration: 'Romanized version',
  meaning: 'English translation',
}
```

### Modify AI Personality
Edit `services/apiService.ts` - update the system prompt:
```typescript
role: 'system',
content: `Your new AI personality description here`
```

### Change UI Fonts
The app uses system fonts by default. To add custom fonts:
1. Place `.ttf` files in `assets/fonts/`
2. Update `app/_layout.tsx` to load them
3. Use in StyleSheets: `fontFamily: 'Poppins-Bold'`

---

## 🐛 Troubleshooting

### App Won't Start
```bash
# Clear cache and reinstall
npm start --clear
rm -rf node_modules
npm install
```

### Module Not Found Errors
```bash
# Common issue with Expo packages
npm install --save expo-linear-gradient
npm install --save @react-native-async-storage/async-storage
```

### API Errors
- Check API key format (should start with `sk-`)
- Verify `.env.local` exists in root directory
- Check rate limits on OpenAI dashboard
- Wait 30 seconds between requests (retry logic)

### Navigation Issues
- Ensure all screen names match in routes
- Check Expo Router is installed
- Clear cache: `expo start --clear`

### Platform-Specific Issues

**Android:**
- Ensure Android SDK is installed
- Update Android build tools
- Clear gradle cache: `rm -rf android/.gradle`

**iOS:**
- Update Xcode to latest version
- Clear derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData/*`
- `rm -rf node_modules && npm install` on first run

### Chat Not Responding
- Check if API key is set correctly
- Verify network connection
- Check OpenAI API status: https://status.openai.com
- Try switching to mock responses temporarily

---

## 📊 Building for Production

### Android
```bash
# Build APK
eas build --platform android

# Build App Bundle (recommended for Play Store)
eas build --platform android --app-bundle

# Submit to Play Store
eas submit --platform android
```

### iOS
```bash
# Build
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Web
```bash
npm run web
# Deploy the ./web-build folder to Vercel, Netlify, etc.
```

---

## 🔐 Security Best Practices

1. **Never commit .env.local to git**
   - Already in `.gitignore`
   - Use `.env.example` for reference

2. **Rotate API keys regularly**
   - If key is ever exposed, regenerate it

3. **Use environment variables**
   - Keep secrets out of code
   - Use `EXPO_PUBLIC_` prefix for public env vars

4. **Rate limiting**
   - Implement on backend for production
   - Current app limits 10 messages/day

5. **Data privacy**
   - Messages stored locally on device
   - No cloud sync by default

---

## 🚢 Deployment Checklist

- [ ] Test on actual device
- [ ] Configure OpenAI API key
- [ ] Update app icon/splash screen
- [ ] Test all navigation flows
- [ ] Verify chat is working
- [ ] Check Gita verses load
- [ ] Test on multiple devices
- [ ] Create app store listings
- [ ] Generate screenshots
- [ ] Write app description
- [ ] Configure privacy policy
- [ ] Build signed APK/IPA
- [ ] Submit to stores
- [ ] Monitor for crashes

---

## 💡 Tips & Tricks

### Faster Development
- Use Expo Go for instant preview
- Hot reload works automatically
- Press `r` in terminal to reload

### Debugging
- Install React Native Debugger
- Use `console.log()` - output shows in terminal
- Check network tab for API calls

### Performance
- Use `React.memo()` for expensive components
- Optimize images before adding
- Lazy load screens with Expo Router

### Testing
- Use device for real performance metrics
- Test on older devices too
- Check both light and dark mode

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [Zustand State Management](https://github.com/pmndrs/zustand)

---

## ❓ FAQ

**Q: Can I use this on web?**
A: Yes! Run `npm run web` but some features may be limited.

**Q: Do I need a real API key to test?**
A: No! The app uses mock responses by default. Real key is optional.

**Q: Can I customize the Gita verses?**
A: Yes! Edit `constants/gitaData.ts` and add your own.

**Q: How do I change the app icon?**
A: Replace files in `assets/` folder and update `app.json`.

**Q: Is it free to use?**
A: Yes! OpenAI API has a free tier. Charges apply after usage.

---

## 🎉 You're All Set!

You now have a fully functional GitaAI app running locally. Happy coding! 🙏
