# 🚀 GitaAI - Quick Reference Guide

## File Overview

### 📱 App Screens (6 Total)

| Screen | File | Purpose |
|--------|------|---------|
| Onboarding | `app/onboarding.tsx` | 3-slide intro + language selection |
| Home | `app/(tabs)/home.tsx` | Main dashboard, daily shloka, mood picker |
| Chat | `app/(tabs)/chat.tsx` | AI chat with Krishna (main feature) |
| Gita | `app/(tabs)/gita.tsx` | Browse 18 chapters & verses |
| Meditate | `app/(tabs)/meditate.tsx` | Meditation guide & audio player |
| Profile | `app/(tabs)/profile.tsx` | User preferences & settings |

### 🧩 Reusable Components

| Component | File | Usage |
|-----------|------|-------|
| Card | `components/Card.tsx` | Wrapper with shadow/border radius |
| ChatBubble | `components/ChatBubble.tsx` | Display chat messages |
| GradientButton | `components/GradientButton.tsx` | Styled button with gradient |

### 🎣 Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| useCustomFonts | `hooks/useCustomFonts.ts` | Load custom fonts |
| useAppLifecycle | `hooks/useAppLifecycle.ts` | Handle app state changes |
| useDarkMode | `hooks/useDarkMode.ts` | Detect dark mode |

### 📊 State & Storage

| Item | File | Purpose |
|------|------|---------|
| Chat Store | `store/chatStore.ts` | Zustand state (messages, limits, language) |
| API Service | `services/apiService.ts` | OpenAI + mock responses |
| Storage Service | `services/storageService.ts` | AsyncStorage helpers |

### 🎨 Constants & Types

| Item | File | Purpose |
|------|------|---------|
| Colors | `constants/colors.ts` | App color palette |
| Gita Data | `constants/gitaData.ts` | 10 Bhagavad Gita verses |
| Types | `types/index.ts` | TypeScript interfaces |

### ⚙️ Configuration

| File | Purpose |
|------|---------|
| `app.json` | Expo configuration |
| `tsconfig.json` | TypeScript settings |
| `package.json` | Dependencies |
| `.env.example` | Environment template |
| `.gitignore` | Git ignore rules |

---

## 🔄 Key Flows

### Chat Flow
```
User Input → handleSendMessage()
  ↓
addMessage() to store (Zustand)
  ↓
sendMessageToAIMock() or sendMessageToAI()
  ↓
Receive response
  ↓
addMessage() - AI response
  ↓
Message persisted to AsyncStorage
```

### Navigation Flow
```
Root (_layout.tsx)
  ↓
Onboarding OR (tabs)
  ↓
(tabs)/_layout.tsx (Bottom Tab Navigation)
  ├── Home Screen
  ├── Chat Screen
  ├── Gita Screen
  ├── Meditate Screen
  └── Profile Screen
```

### State Flow
```
Chat Store (Zustand)
  ├── messages: Message[]
  ├── messageCount: number
  ├── selectedLanguage: Language
  └── (+ methods for update)
     ↓
AsyncStorage (Persisted)
     ↓
Device Local Storage
```

---

## 🎯 Coding Patterns

### Creating a New Screen

1. **Create file**: `app/(tabs)/newscreen.tsx`

```typescript
import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function NewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Screen Title</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: 20 },
  title: { fontSize: 20, fontFamily: 'Poppins-Bold', color: COLORS.text },
});
```

2. **Add to tabs**: Update `app/(tabs)/_layout.tsx`

```typescript
<Tabs.Screen
  name="newscreen"
  options={{
    title: 'New',
    tabBarIcon: ({ color }) => <TabIcon name="icon-name" color={color} />,
  }}
/>
```

### Adding a Component

1. **Create**: `components/MyComponent.tsx`

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface Props {
  title: string;
  onPress?: () => void;
}

export default function MyComponent({ title, onPress }: Props) {
  return <View style={styles.container}>{/* content */}</View>;
}

const styles = StyleSheet.create({
  container: { /* styles */ },
});
```

2. **Use in screen**:

```typescript
import MyComponent from '../../components/MyComponent';

export default function MyScreen() {
  return <MyComponent title="Hello" onPress={() => {}} />;
}
```

### Using Chat Store

```typescript
import { useChatStore } from '../../store/chatStore';

export default function MyComponent() {
  const { messages, addMessage, messageCount } = useChatStore();

  const handleSend = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'My message',
      sender: 'user',
    });
  };

  return (
    // Use messages, messageCount
  );
}
```

---

## 🌐 Environment Setup

### Development
```bash
npm install
npm start
npm run ios/android/web
```

### Production (with Real API)
```bash
# 1. Create .env.local
EXPO_PUBLIC_OPENAI_API_KEY=sk-...

# 2. Update chat.tsx import
import { sendMessageToAI } from '../../services/apiService';

# 3. Restart server
npm start
```

---

## 🔍 Debugging Tips

### Check Console
```bash
# Terminal shows all console.log output
console.log('Debug message');
```

### Check Network Requests
```bash
# In Chrome DevTools (web version)
Network tab → API calls
```

### Check State
```typescript
import { useChatStore } from '../../store/chatStore';

console.log(useChatStore.getState()); // Log entire state
```

### Hot Reload
- Press `r` in terminal to reload app
- Changes apply instantly in Expo Go

---

## 📦 Common Tasks

### Add a New Gita Verse
Edit `constants/gitaData.ts`:
```typescript
{
  chapter: 2,
  verse: 50,
  text: 'Sanskrit text',
  transliteration: 'Transliteration',
  meaning: 'English meaning',
}
```

### Change Colors
Edit `constants/colors.ts`:
```typescript
export const COLORS = {
  primary: '#NEW-COLOR-HEX',
  // ...
};
```

### Update AI Personality
Edit `services/apiService.ts` - system prompt:
```typescript
{
  role: 'system',
  content: 'You are...',
}
```

### Add New UI Element
1. Create component in `components/`
2. Import in screen
3. Use with props
4. Style with COLORS constants

---

## ✅ Pre-Launch Checklist

- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Test all 6 screens
- [ ] Try chat feature (ask Krishna something)
- [ ] Check navigation works
- [ ] Verify no console errors
- [ ] Test on real device if possible
- [ ] Add OpenAI API key (optional)

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | `npm start --clear && rm -rf node_modules && npm install` |
| Module not found | `npm install missing-package` |
| API errors | Check `.env.local` has API key |
| Chat not responding | Verify mock responses work first |
| Build errors | Clear cache: `expo start --clear` |

---

## 📚 Important Files to Know

- **Entry Point**: `index.ts`
- **Root Component**: `App.tsx`
- **Navigation**: `app/_layout.tsx` → `app/(tabs)/_layout.tsx`
- **State**: `store/chatStore.ts`
- **API**: `services/apiService.ts`
- **Colors**: `constants/colors.ts`
- **Types**: `types/index.ts`

---

## 🎓 Learning Resources

- Expo Router: `https://docs.expo.dev/routing/introduction/`
- React Native: `https://reactnative.dev/docs/getting-started`
- Zustand: `https://github.com/pmndrs/zustand`
- TypeScript: `https://www.typescriptlang.org/docs/`

---

## 🚀 You're Ready!

You have a production-grade spiritual AI app ready to go.

```bash
npm install && npm start
```

**Now build something amazing! 🙏**
