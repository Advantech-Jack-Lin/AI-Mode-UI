# AI-Mode-UI Development Instructions

ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.

## Project Overview
AI-Mode-UI is a Vue 3 + Bootstrap 5 frontend-only application that demonstrates a dual-panel AI streaming interface. The left panel handles chat interactions with token-by-token streaming, while the right panel displays dynamic artifacts (products, files, tables, media) using a registry pattern. No backend is required - everything uses mock streaming APIs.

## Quick Setup and Validation

### Bootstrap the repository:
```bash
cd ClientApp
npm install
```

### Build and test (CRITICAL timing information):
```bash
# Build - takes ~1-2 seconds. NEVER CANCEL. Set timeout to 60+ seconds for safety.
npm run build

# Tests - takes ~6 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
npm test
```

### Run the application:
```bash
# Development server - starts on port 5173 (or next available port)
npm run dev

# Production preview - runs on port 4173
npm run preview
```

## Validation Scenarios
ALWAYS test these complete user scenarios after making changes:

### 1. Chat and Streaming Validation
- Open http://localhost:5173 (or the port shown in terminal)
- Type a message containing "product" (e.g., "show me product details")
- Verify: Chat streams token-by-token, product cards appear in right panel
- Type "file" keyword (e.g., "send me files")
- Verify: File download artifacts appear
- Type "table" keyword (e.g., "show table data") 
- Verify: Table component renders
- Type "video" keyword (e.g., "show me a video")
- Verify: Media gallery appears
- Click "New Chat" button
- Verify: All chat and artifacts clear

### 2. Theme Toggle Validation
- Click the theme toggle button (moon/sun icon) in top-right
- Verify: UI switches between light and dark themes
- Verify: All components render correctly in both themes

### 3. Component Registry Validation
- All artifact types automatically render based on artifactId
- Components are mapped in `src/artifactRegistry.ts`

## Working Effectively

### Project Structure (key files to know):
```
ClientApp/
├── src/
│   ├── components/
│   │   ├── ChatPanel.vue          # Left chat panel
│   │   ├── ArtifactsPane.vue      # Right artifacts panel  
│   │   ├── ThemeToggle.vue        # Theme switcher
│   │   ├── ProductCard.vue        # Product artifact component
│   │   ├── FileDownload.vue       # File artifact component
│   │   ├── TableComponent.vue     # Table artifact component
│   │   └── MediaGallery.vue       # Media artifact component
│   ├── artifactRegistry.ts        # Maps artifactId -> Vue component
│   ├── composables/
│   │   └── useStreamHub.ts        # Central state management
│   ├── mock/
│   │   ├── mockStreamApi.ts       # Mock streaming scenarios  
│   │   └── mockdata.json          # Sample product data
│   ├── App.vue                    # Main app component
│   └── main.ts                    # App entry point
├── tests/                         # Vitest test files
├── package.json
└── vite.config.ts
```

### Making Changes:

#### Adding a New Artifact Type:
1. Create Vue component in `src/components/` (e.g., `ChartComponent.vue`)
2. Register it in `src/artifactRegistry.ts`:
   ```typescript
   export const artifactRegistry: Record<string, any> = {
     // existing entries...
     chart_data: ChartComponent,
   };
   ```
3. Add scenario in `src/mock/mockStreamApi.ts` with keyword trigger
4. Test by typing the keyword in chat

#### Modifying Chat/Streaming Behavior:
- Update `src/composables/useStreamHub.ts` for state management changes
- Update `src/mock/mockStreamApi.ts` for new streaming scenarios
- All streaming uses the `StreamFrame` interface

#### Styling Changes:
- Uses Bootstrap 5 via CDN (see `index.html`)
- Theme variables in `src/App.vue` 
- Component-specific styles use scoped CSS
- NO linting configured - validate manually

### Build Timing (CRITICAL):
- **npm install**: ~10-30 seconds (dependency download)
- **npm run build**: ~1-2 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- **npm test**: ~6 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- **npm run dev**: Starts immediately, ~1 second

### Testing:
- Uses Vitest with jsdom environment
- 23 tests across 11 test files
- All tests should pass
- Run `npm test` before committing changes
- NO linting configured - manually check code quality

## Data Flow Understanding
1. **User types message** → `ChatPanel.vue` → `useStreamHub.ts`
2. **Mock API simulates streaming** → `mockStreamApi.ts` sends frames
3. **Chat tokens** → Appended to chat segments in real-time  
4. **Artifact frames** → Trigger component rendering via registry
5. **Components display** → `ArtifactsPane.vue` uses `artifactRegistry.ts`

## Common Commands Reference
```bash
# Working directory - ALWAYS use this:
cd ClientApp

# Install dependencies:
npm install

# Development:
npm run dev              # Start dev server (port 5173+)

# Building:
npm run build           # Production build (~1-2 sec)
npm run preview         # Preview production build (port 4173)

# Testing:
npm test               # Run all tests (~6 seconds)

# Validation:
# 1. Start dev server and test chat with keywords: "product", "file", "table", "video"
# 2. Test theme toggle functionality
# 3. Test "New Chat" button clears state
```

## Important Notes
- **100% frontend-only** - no backend setup required
- **Mock data only** - all responses are simulated locally
- **Bootstrap 5** - uses CDN, prefer utility classes
- **No linting** - manually ensure code quality
- **Registry pattern** - all artifacts auto-render via `artifactRegistry.ts`
- **State management** - centralized in `useStreamHub.ts` composable
- **Keywords trigger demos** - "product", "file", "table", "video" in chat messages
- **Fresh artifacts** - each new chat message replaces previous artifacts

## Troubleshooting
- If port 5173 is busy, Vite automatically tries next available port
- If build fails, ensure you're in `ClientApp/` directory
- All mock data is in `src/mock/` - no external dependencies
- Theme issues: check CSS custom properties in `App.vue`