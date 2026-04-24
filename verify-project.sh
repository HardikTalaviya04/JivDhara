#!/bin/bash

echo "🙏 GitaAI Project Structure Verification"
echo "========================================"
echo ""

# Check main directories
echo "✓ Checking directory structure..."
dirs=("app" "components" "hooks" "store" "services" "constants" "types")
for dir in "${dirs[@]}"; do
  if [ -d "$dir" ]; then
    echo "  ✓ $dir/"
  else
    echo "  ✗ $dir/ (MISSING)"
  fi
done

echo ""
echo "✓ Checking key files..."
files=("App.tsx" "index.ts" "package.json" "app.json" "tsconfig.json" ".env.example" "README.md" "SETUP.md")
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (MISSING)"
  fi
done

echo ""
echo "✓ Checking screen files..."
screens=("app/onboarding.tsx" "app/(tabs)/_layout.tsx" "app/(tabs)/home.tsx" "app/(tabs)/chat.tsx" "app/(tabs)/gita.tsx" "app/(tabs)/meditate.tsx" "app/(tabs)/profile.tsx")
for screen in "${screens[@]}"; do
  if [ -f "$screen" ]; then
    echo "  ✓ $screen"
  else
    echo "  ✗ $screen (MISSING)"
  fi
done

echo ""
echo "✓ Checking components..."
components=("components/Card.tsx" "components/ChatBubble.tsx" "components/GradientButton.tsx")
for comp in "${components[@]}"; do
  if [ -f "$comp" ]; then
    echo "  ✓ $comp"
  else
    echo "  ✗ $comp (MISSING)"
  fi
done

echo ""
echo "✓ Checking services..."
services=("services/apiService.ts" "services/storageService.ts" "services/mockService.ts")
for svc in "${services[@]}"; do
  if [ -f "$svc" ]; then
    echo "  ✓ $svc"
  else
    echo "  ✗ $svc (MISSING)"
  fi
done

echo ""
echo "========================================"
echo "✓ Project structure verification complete!"
echo ""
echo "📝 Next steps:"
echo "  1. npm install"
echo "  2. npm start"
echo "  3. Scan QR code with Expo Go"
echo ""
echo "🚀 Happy coding! 🎉"
