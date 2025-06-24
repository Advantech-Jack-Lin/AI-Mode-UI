# AI-Mode-UI (Vue 3 + Bootstrap 5, Mock Streaming, Frontend-Only Demo)

This project is a **frontend-only** demonstration of a dual-panel, real-time AI streaming UI framework, powered by Vue 3 and Bootstrap 5. It features a live chat panel (left) and a dynamically updating artifact panel (right) using a mock API to simulate streaming responses—no backend required!

---

## 🎯 Features

- **Frontend-only:** No backend required; all data and streaming are simulated with mock APIs.
- **Dual-panel UI:** Live chat (streaming token-by-token) and artifacts (cards, tables, etc.), styled with Bootstrap 5.
- **Dynamic artifacts:** Registry pattern allows easy addition of new artifact types (e.g., product cards, file downloads, charts).
- **Theme switch:** Toggle light/dark mode using Bootstrap 5 utility classes.
- **Randomized responses:** Each chat request streams a random scenario from local mock data for realism.
- **Maintainable codebase:** Modern Vue 3 + Vite + TypeScript structure, composables, and clear separation of concerns.
- **Keyword demos:** Include `product` or `file` in your question to stream example product cards or downloadable files.
- **Fresh artifacts:** Each new question replaces previously streamed artifacts for clarity.

---

## 🏗️ Architecture Overview

```text
ClientApp/
├── src/
│   ├── components/
│   │   ├── ChatPanel.vue        # Chat panel (left)
│   │   ├── ArtifactsPane.vue    # Artifacts panel (right)
│   │   ├── ThemeToggle.vue      # Theme switch button
│   │   ├── ProductCard.vue      # Example artifact component
│   │   └── FileDownload.vue     # File download artifact component
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

1. **Install dependencies:**

   ```bash
   cd ClientApp
   npm install
   ```
2. **Run the demo:**

   ```bash
   npm run dev
   ```
3. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser. No backend/server setup required.
4. **Run tests:**

   ```bash
   npm test
   ```

## 📦 Build & Preview

1. **Generate a production build:**

   ```bash
   npm run build
   ```

2. **Preview the build locally:**

   ```bash
   npm run preview
   ```

   Visit [http://localhost:4173](http://localhost:4173) to test the production build.

---

## 🧑‍💻 How to Add Features or Fix Bugs

### 1. **Understand the Data Flow**
- **ChatPanel.vue** (left): Handles user input and displays chat messages.
- **ArtifactsPane.vue** (right): Displays dynamic artifacts (e.g., product cards) based on streaming data.
- **useStreamHub.ts**: Central composable for chat and artifact state, and streaming logic.
- **mockStreamApi.ts**: Simulates streaming responses and artifact updates.
- **artifactRegistry.ts**: Maps artifact IDs to Vue components for rendering in the artifacts pane.

### 2. **Adding a New Artifact Type**
- Create a new Vue component in `src/components/` (e.g., `UserStatsCard.vue`).
- Register it in `artifactRegistry.ts` with a unique key.
- Add a scenario in `mockStreamApi.ts` that emits a frame with `channel: 'artifact', artifactId: 'your_key', value: ...`.
- The new artifact will automatically render in the right panel when streamed.

### 3. **Modifying Streaming or Chat Behavior**
- Update logic in `useStreamHub.ts` to change how chat and artifact data are handled.
- Adjust or add new scenarios in `mockStreamApi.ts` for different streaming behaviors.

### 4. **Styling and Theming**
- All UI uses Bootstrap 5 via CDN (see `index.html`).
- Theme switching is handled in `App.vue` and `ThemeToggle.vue`.
- For custom styles, use scoped CSS in each component or update `style.css` for global changes.

### 5. **Resetting State**
- The "New Chat" button in `ChatPanel.vue` calls `resetAll()` from `useStreamHub.ts` to clear both chat and artifact state.

### 6. **Debugging and Testing**
- All state is managed in the frontend; use browser dev tools and Vue Devtools for inspection.
- No backend or network requests are made—everything is local and mock-driven.

---

## 📝 Contributing

- Keep components focused and reusable.
- Use the registry pattern for new artifact types.
- Keep mock data and scenarios organized in `mock/`.
- Prefer Bootstrap 5 utility classes for layout and theming.
- Test new features by running `npm run dev` and interacting with the UI.

---

## 📚 Further Reading

- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Vite Documentation](https://vitejs.dev/)

---

## 📝 Summary

- 100% frontend-only; no backend needed
- Simulates true streaming (token & artifact) for realistic UX and demo
- Supports unlimited artifact types with registry pattern—just add a component and scenario
- Bootstrap 5 for enterprise-quality, maintainable UI
- Built-in theme switch (light/dark)

This design lets any developer instantly test, customize, or extend dual-panel AI UIs without backend dependencies. Use it as a playground, POC, or for rapid prototyping in your own projects.
