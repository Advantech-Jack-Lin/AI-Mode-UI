// Core data types for the application
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Product {
  id: string; // Changed from number to string to match mockdata.json
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  stock?: string;
}

export interface FileDownload {
  name: string;
  url: string;
  size?: string;
  type?: string;
}

export interface TableData {
  [key: string]: string | number;
}

export interface MediaItem {
  type: 'video' | 'image' | 'audio';
  url: string;
  title?: string;
  description?: string;
}

// Stream frame types
export interface StreamFrame {
  channel: 'chat' | 'artifact';
  delta?: string;
  isFinal?: boolean;
  artifactId?: string;
  op?: 'replace' | 'append' | 'remove';
  value?: any;
}

// Artifact data types
export type ArtifactData = {
  prod_cards?: Product[];
  file_list?: FileDownload[];
  table_data?: TableData[];
  media_gallery?: MediaItem[];
  // Allow arbitrary artifact types for extensibility and testing
  [key: string]: any;
};

// Component registry type
export type ArtifactRegistry = Record<keyof ArtifactData, any>;

// Theme types
export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  colors: {
    primary: string;
    background: string;
    text: string;
    border: string;
    cardBackground: string;
    sidebarBackground: string;
    headerBackground: string;
    muted: string;
    hover: string;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  state: LoadingState;
  data?: T;
  error?: AppError;
}