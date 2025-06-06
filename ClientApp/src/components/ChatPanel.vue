<template>
  <div class="chat-panel">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="new-chat-btn" @click="onNewChat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75V20a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V5a.75.75 0 01.75-.75z"/>
        </svg>
        New Chat
      </div>
    </div>
    
    <!-- Chat Messages -->
    <div class="chat-messages">
      <div v-for="(msg, idx) in chatSegments" :key="idx" class="message-group">
        <div class="message user-message" v-if="idx % 2 === 0">
          <div class="message-avatar">
            <img src="https://ui-avatars.com/api/?name=User&background=6c757d&color=fff&size=28" alt="User" />
          </div>
          <div class="message-content">
            <div class="message-text">{{ msg }}</div>
          </div>
        </div>
        <div class="message assistant-message" v-else>
          <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="message-content">
            <div class="message-text">{{ msg }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Chat Input -->
    <div class="chat-input-area">
      <form @submit.prevent="onSend" class="input-form">
        <div class="input-container">
          <input 
            v-model="input" 
            class="message-input" 
            placeholder="Message AI Mode UI..."
            type="text"
          />
          <button class="send-button" type="submit" :disabled="!input.trim()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2" fill="none"/>
              <polyline points="8 12 12 8 16 12" />
              <line x1="12" y1="8" x2="12" y2="16" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStreamHub } from '../composables/useStreamHub';

const { chatSegments, sendMessage, resetAll } = useStreamHub();
const input = ref('');

function onSend() {
  if (input.value.trim()) {
    sendMessage(input.value);
    input.value = '';
  }
}

function onNewChat() {
  resetAll();
  input.value = '';
}
</script>

<style scoped>
.chat-panel {
  height: 100%;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--app-sidebar-bg);
}

/* Header */
.chat-header {
  padding: 16px;
  border-bottom: 1px solid var(--app-border);
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: var(--app-card-bg);
  border: 1px solid var(--app-border);
  border-radius: 8px;
  color: var(--app-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.new-chat-btn:hover {
  background: var(--app-hover);
  border-color: var(--app-primary);
}

/* Conversation List */
.conversation-list {
  padding: 0 16px;
  border-bottom: 1px solid var(--app-border);
}

.conversation-item {
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
}

.conversation-item:hover {
  background: var(--app-hover);
}

.conversation-item.active {
  background: var(--app-primary);
  color: white;
}

.conversation-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.conversation-preview {
  font-size: 12px;
  opacity: 0.8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Messages */
.chat-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 8px;
}

.message-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--app-card-bg);
  border: 1px solid var(--app-border);
}

.message-avatar img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  background: #e0e0e0;
}

.message-avatar svg {
  color: var(--app-primary);
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-text {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.user-message {
  flex-direction: row-reverse;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: 0;
  max-width: 80%;
}

.user-message .message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-message .message-text {
  background: var(--app-primary);
  color: #fff;
  border-radius: 16px 16px 4px 16px;
  border: none;
  padding: 12px 16px;
  max-width: 100%;
  word-wrap: break-word;
}

.assistant-message {
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 0;
  margin-right: auto;
  max-width: 80%;
}

.assistant-message .message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.assistant-message .message-text {
  background: var(--app-card-bg);
  color: var(--app-text);
  border-radius: 16px 16px 16px 4px;
  border: 1px solid var(--app-border);
  padding: 12px 16px;
  max-width: 100%;
  word-wrap: break-word;
}

/* Input Area */
.chat-input-area {
  padding: 16px;
  border-top: 1px solid var(--app-border);
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.message-input {
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 1px solid var(--app-border);
  border-radius: 24px;
  font-size: 14px;
  background: var(--app-card-bg);
  color: var(--app-text);
  outline: none;
  resize: none;
  transition: border-color 0.2s ease;
}

.message-input:focus {
  border-color: var(--app-primary);
  box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.1);
}

.message-input::placeholder {
  color: var(--app-muted);
}

.send-button {
  position: absolute;
  right: 8px;
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  background: var(--app-primary);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(88,166,255,0.08);
  padding: 0;
}

.send-button:disabled {
  background: var(--app-muted);
  cursor: not-allowed;
}

.send-button:not(:disabled):hover {
  background: var(--app-primary);
  transform: scale(1.05);
}
</style>
