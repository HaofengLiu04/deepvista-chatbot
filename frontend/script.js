// Configuration
const API_BASE_URL = 'http://localhost:8000';

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const chatForm = document.getElementById('chatForm');
const sendButton = document.getElementById('sendButton');
const loadingContainer = document.getElementById('loadingContainer');
const charCount = document.getElementById('charCount');
const statusIndicator = document.getElementById('statusIndicator');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeModal = document.getElementById('closeModal');
const dismissError = document.getElementById('dismissError');

// State
let isProcessing = false;
let conversationHistory = [];

// Utility Functions
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = 'flex';
}

function hideError() {
    errorModal.style.display = 'none';
}

function updateStatus(status, text) {
    const statusDot = statusIndicator.querySelector('.status-dot');
    const statusText = statusIndicator.querySelector('.status-text');
    
    statusDot.style.background = status === 'connected' ? '#4caf50' : 
                                  status === 'processing' ? '#ff9800' : '#f44336';
    statusText.textContent = text;
}

// Chat-only application

function updateCharCount() {
    const count = messageInput.value.length;
    charCount.textContent = `${count}/2000`;
    
    if (count > 1800) {
        charCount.className = 'char-count error';
    } else if (count > 1500) {
        charCount.className = 'char-count warning';
    } else {
        charCount.className = 'char-count';
    }
}

// Message Creation Functions
function createMessageElement(content, isUser, timestamp) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${isUser ? 'user-avatar' : 'bot-avatar'}`;
    avatar.innerHTML = `<i class="fas fa-${isUser ? 'user' : 'robot'}"></i>`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    
    messageBubble.textContent = content;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = formatTime(timestamp);
    
    messageContent.appendChild(messageBubble);
    messageContent.appendChild(messageTime);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    return messageDiv;
}

// Chat-only application

// API Functions
async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            updateStatus('connected', 'Connected');
            return true;
        } else {
            updateStatus('error', 'Service Unavailable');
            return false;
        }
    } catch (error) {
        updateStatus('error', 'Connection Failed');
        return false;
    }
}

async function sendChatMessage(message) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send message');
    }
    
    return await response.json();
}

// Chat-only application

// UI Functions
function showLoading() {
    loadingContainer.style.display = 'block';
    scrollToBottom();
}

function hideLoading() {
    loadingContainer.style.display = 'none';
}

function addMessage(content, isUser) {
    const timestamp = new Date();
    const messageElement = createMessageElement(content, isUser, timestamp);
    
    // Remove welcome message when first real message is added
    const welcomeMessage = chatMessages.querySelector('.welcome-message');
    if (welcomeMessage && conversationHistory.length === 0) {
        welcomeMessage.remove();
    }
    
    chatMessages.appendChild(messageElement);
    scrollToBottom();
    
    // Add to conversation history
    conversationHistory.push({
        content,
        isUser,
        timestamp
    });
}

function setProcessing(processing) {
    isProcessing = processing;
    sendButton.disabled = processing;
    messageInput.disabled = processing;
    
    if (processing) {
        updateStatus('processing', 'Processing...');
        showLoading();
    } else {
        updateStatus('connected', 'Connected');
        hideLoading();
    }
}

// Main Message Processing
async function handleMessage(message) {
    if (!message.trim()) return;
    
    try {
        setProcessing(true);
        
        // Add user message to chat
        addMessage(message, true);

        // Regular chat message
        const response = await sendChatMessage(message);
        addMessage(response.response, false);
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
        addMessage('Sorry, I encountered an error processing your message. Please try again.', false);
    } finally {
        setProcessing(false);
    }
}

// Chat-only application

// Auto-resize textarea
function autoResize() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
}

// Event Listeners
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (isProcessing) return;
    
    const message = messageInput.value.trim();
    if (!message) return;
    
    messageInput.value = '';
    updateCharCount();
    autoResize();
    
    await handleMessage(message);
});

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

messageInput.addEventListener('input', () => {
    updateCharCount();
    autoResize();
});

// Modal event listeners
closeModal.addEventListener('click', hideError);
dismissError.addEventListener('click', hideError);

// Close modal when clicking outside
errorModal.addEventListener('click', (e) => {
    if (e.target === errorModal) {
        hideError();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    updateCharCount();
    
    // Check backend health
    const isHealthy = await checkHealth();
    if (!isHealthy) {
        showError('Unable to connect to the backend service. Please ensure the server is running on http://localhost:8000');
    }
    
    // Focus on input
    messageInput.focus();
});

// Periodic health check
setInterval(checkHealth, 30000); // Check every 30 seconds