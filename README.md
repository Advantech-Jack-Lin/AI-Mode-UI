# AI-Mode-UI (Vue 3 + Bootstrap 5, Mock Streaming, Frontend-Only Demo)

A **frontend-only** demonstration of a modern AI streaming interface that you can run instantly without any backend setup. Built with Vue 3 and Bootstrap 5, this project showcases a dual-panel chat UI with real-time streaming responses and dynamic artifact rendering.

## ✨ What You'll Experience

- **Live Chat Streaming**: Watch AI responses appear token-by-token, just like ChatGPT
- **Dynamic Artifacts**: See products, files, tables, and media cards appear in real-time
- **Zero Setup**: Clone, install, run—no databases, APIs, or servers needed
- **Interactive Demo**: Try keywords like "product", "file", "table", or "video" to see different content types

---

## 🎯 Features

### Core Functionality
- **100% Frontend**: No backend, database, or API setup required
- **Real-time Streaming**: Token-by-token chat responses with realistic timing
- **Dual-Panel Interface**: Chat on the left, dynamic artifacts on the right
- **Multiple Content Types**: Product cards, file downloads, tables, and media galleries

### User Experience  
- **Light/Dark Theme**: Toggle between themes with Bootstrap 5 styling
- **Fresh Content**: Each question clears previous artifacts for clarity
- **Keyword Triggers**: Type specific words to see different artifact examples
- **Responsive Design**: Works seamlessly across different screen sizes

### Developer Features
- **Modern Stack**: Vue 3 + Vite + TypeScript + Bootstrap 5
- **Extensible Architecture**: Registry pattern for easy artifact type additions  
- **Composable Logic**: Clean separation of concerns with Vue composables
- **Mock API**: Realistic streaming simulation without external dependencies
- **Comprehensive Tests**: Full test suite with Vitest

---

## 🏗️ Architecture Overview

```text
ClientApp/
├── src/
│   ├── components/
│   │   ├── ChatPanel.vue        # Chat panel (left)
│   │   ├── ArtifactsPane.vue    # Artifacts panel (right)
│   │   ├── ThemeToggle.vue      # Theme switch button
│   │   ├── ProductCard.vue      # Example product card component
│   │   ├── FileDownload.vue     # File download artifact component
│   │   ├── TableComponent.vue   # Table artifact component
│   │   └── MediaGallery.vue     # Media gallery artifact component
│   ├── artifactRegistry.ts      # artifactId/type → Vue component registry
│   ├── composables/
│   │   └── useStreamHub.ts      # Streaming logic (mock API integration)
│   ├── mock/
│   │   ├── mockStreamApi.ts     # Mock streaming scenarios
│   │   └── mockdata.json        # Product/artifact mock data
│   ├── App.vue, main.ts         # App entry and setup
│   └── ...
```

---

## 🚀 Quick Start

Get the demo running in under 2 minutes:

### Step 1: Clone and Install
```bash
git clone <repository-url>
cd AI-Mode-UI/ClientApp
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open and Explore
1. Visit [http://localhost:5173](http://localhost:5173) in your browser
2. Type any message to see streaming responses
3. Try these keywords for different artifacts:
   - **"product"** → Product cards with pricing
   - **"file"** → Downloadable file list  
   - **"table"** → Data table with sorting
   - **"video"** → Media gallery with videos

### Step 4: Run Tests (Optional)
```bash
npm test
```

That's it! No database setup, no API keys, no backend configuration needed.

## 📦 Production Build

Ready to deploy? Build the production version:

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The build outputs to `dist/` and can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

---

## 🧑‍💻 Development Guide

### Understanding the Architecture

The app follows a clean, modular structure:

| Component | Purpose |
|-----------|---------|
| **ChatPanel.vue** | Left panel - handles user input and chat display |
| **ArtifactsPane.vue** | Right panel - renders dynamic artifacts |  
| **useStreamHub.ts** | Central state management and streaming logic |
| **mockStreamApi.ts** | Simulates realistic streaming responses |
| **artifactRegistry.ts** | Maps artifact types to Vue components |

### Adding New Artifact Types

Want to display a new type of content? Here's how:

1. **Create the Component**
   ```bash
   # Create your new artifact component
   touch src/components/MyNewArtifact.vue
   ```

2. **Register the Component**
   ```typescript
   // In artifactRegistry.ts
   import MyNewArtifact from './components/MyNewArtifact.vue';
   
   export const artifactComponents = {
     // ... existing artifacts
     my_new_type: MyNewArtifact
   };
   ```

3. **Add Mock Scenario**
   ```typescript
   // In mockStreamApi.ts
   if (lower.includes('my-keyword')) {
     scenario.push({
       delayMs: 120, 
       frame: { 
         channel: 'artifact', 
         artifactId: 'my_new_type', 
         op: 'replace', 
         value: myData 
       }
     });
   }
   ```

### Customizing Streaming Behavior

- **Chat Logic**: Modify `useStreamHub.ts` to change how messages are processed
- **Response Timing**: Adjust delays in `mockStreamApi.ts` scenarios  
- **State Management**: All data flows through reactive Vue refs in `useStreamHub.ts`

### Styling and Theming

- **Bootstrap 5**: All components use Bootstrap utility classes
- **Theme Toggle**: Handled automatically by `App.vue` and `ThemeToggle.vue`
- **Custom Styles**: Add scoped CSS to individual components
- **Global Styles**: Update `style.css` for app-wide changes

### Testing Your Changes

- **Unit Tests**: Run `npm test` to ensure functionality
- **Manual Testing**: Use `npm run dev` and interact with the UI
- **Browser DevTools**: All state is frontend-only, easy to debug
- **Vue Devtools**: Install the browser extension for component inspection

---

## 📝 Contributing

We welcome contributions! Here are some guidelines:

### Code Style
- **Components**: Keep them focused and reusable
- **Artifacts**: Use the registry pattern for new types
- **Styling**: Prefer Bootstrap 5 utility classes
- **Organization**: Keep mock data in the `mock/` directory

### Testing
- Run `npm test` before submitting changes
- Add tests for new artifact types
- Test manually with `npm run dev`

### Pull Requests
- Include a clear description of changes
- Test across light and dark themes
- Ensure responsive design works on mobile

---

## 📚 Further Reading

- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Vite Documentation](https://vitejs.dev/)

---

## 🎉 Why This Project?

Perfect for:
- **🚀 Rapid Prototyping**: Test AI interface ideas without backend complexity  
- **📚 Learning**: Study modern Vue 3 patterns and streaming UI techniques
- **🎨 Demos**: Show clients or stakeholders how AI interfaces could work
- **⚡ Quick Start**: Need an AI chat interface foundation? Start here

### Key Benefits
✅ **Zero Infrastructure** - Just clone and run  
✅ **Production Ready** - Built with enterprise-grade tools  
✅ **Fully Extensible** - Add new features in minutes  
✅ **Well Tested** - Comprehensive test suite included  
✅ **Modern Stack** - Latest Vue 3, TypeScript, and Bootstrap 5

Ready to build the next generation of AI interfaces? Start here and extend it to match your vision!
