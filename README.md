 

 

 





# DeepVista Chatbot

A simple AI chatbot with Python FastAPI backend and vanilla JavaScript frontend.

## What This Does

 

## Project Files

```
deepvista-chatbot/
├── backend/                   # Python backend
│   ├── app/
│   │   ├── main.py           # FastAPI app (all endpoints here)
│   │   ├── models.py         # Request/response models
│   │   └── services/
│   │       └── openai_service.py    # Talks to OpenAI API
│   ├── requirements.txt      # Python packages needed
│   └── .env                  # OpenAI API key (already set up)
├── frontend/                 # Web interface
│   ├── index.html           # Chat UI
│   ├── style.css            # Styling
│   └── script.js            # Handles chat logic
└── README.md                # This file
```

## Running (high level)

This repository contains a FastAPI backend and a static frontend. For submission the details have been simplified — see the project structure above. If you need to run the project locally, the backend listens on port 8000 and the frontend is a static site.

## How to Use

1. **Chat**: Type any message and get AI responses

Note: This repository is a project that focuses on the chat feature only.

## What Each File Does

### Backend Files
`app/main.py` - The main API with two endpoints:
  - `GET /health` - Check if server is running
  - `POST /chat` - Send message, get AI response
- `app/models.py` - Defines what data looks like (requests/responses)
- `app/services/openai_service.py` - Sends requests to OpenAI API
 
- `requirements.txt` - List of Python packages to install
- `.env` - Contains the OpenAI API key (already configured)

### Frontend Files
- `index.html` - The chat interface structure
- `style.css` - Makes it look nice
- `script.js` - Handles sending messages and displaying responses

## API Endpoints

```bash
# Check health
curl http://localhost:8000/health

# Send chat message
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

 
```

## Technologies Used

**Backend**: FastAPI (Python web framework), OpenAI API
**Frontend**: HTML, CSS, JavaScript (no frameworks)

## Notes

 - The OpenAI API key is already in the `.env` file
- Only the basic chat feature is implemented in this simplified version

## AI Tools Used and Prompt History

This project allowed the use of AI coding assistants (for example: GitHub Copilot, Claude Code, Cursor). When AI tools were used during development, the prompts and a record of usage are stored in `AI_PROMPTS.md`.

If you used an AI assistant while editing this repository, list the tool(s) you used and include your prompts in `AI_PROMPTS.md` as required for submission transparency.

## API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/` | GET | API information and available endpoints |
| `/health` | GET | Health check endpoint |
| `/chat` | POST | Send message and receive AI response |
 

### Example API Usage

**Chat Endpoint**:
```bash
curl -X POST "http://localhost:8000/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "What is machine learning?"}'
```

 

## Key Features Demonstrated

### Basic AI Chatbot Feature
-- FastAPI backend with RESTful design
-- OpenAI GPT integration for AI responses
-- CORS configuration for frontend access
-- Input validation (length limits, empty message handling)
-- Comprehensive error handling with HTTP status codes
-- Environment variables for secure API key management
-- Modern responsive frontend interface
-- Real-time chat with message history
-- Loading states and error messaging
-- Accessibility features and semantic HTML

 

## Technologies Used

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
 - **OpenAI API**: GPT-3.5-turbo for AI responses
- **Pydantic**: Data validation and serialization
- **python-dotenv**: Environment variable management
 
- **uvicorn**: ASGI web server

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox/Grid, animations
- **Vanilla JavaScript**: No frameworks for maximum compatibility
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Inter font family for clean typography

## Configuration

The application uses environment variables for configuration:

```env
OPENAI_API_KEY=your_openai_api_key_here
ENVIRONMENT=development
HOST=0.0.0.0
PORT=8000
```

## Testing

### Backend API Testing
```bash
# Test health endpoint
curl http://localhost:8000/health

# Test chat functionality
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Test OpenAI connection
cd backend && python test_openai.py
```

### Frontend Testing
1. Open http://localhost:8080 in your browser
2. Try sending various messages
3. Test chat functionality
4. Test responsive design on mobile devices

 

## AI Tools Used

This project was developed with assistance from **GitHub Copilot** for:
- Code completion and suggestions
- API endpoint implementation patterns  
- Frontend JavaScript functionality
- Error handling best practices
- CSS styling and responsive design
- Documentation and code comments

All AI-generated code was reviewed, tested, and customized for this specific application.

## Production Considerations

For production deployment, consider:
- Use environment-specific configuration
- Implement proper logging and monitoring
- Add rate limiting for API endpoints
- Use a production WSGI server (Gunicorn)
- Serve frontend through Nginx or CDN
- Add authentication and user management
- Implement caching where beneficial (e.g., repeated prompts or frequently requested data)
- Add comprehensive unit and integration tests
## Development Notes

- **Code Quality**: Focused on clean, readable, and maintainable code
- **Error Handling**: Comprehensive error handling throughout the stack
- **User Experience**: Prioritized smooth interactions and clear feedback
- **API Design**: RESTful principles with proper HTTP status codes
- **Security**: Input validation and secure environment variable handling
- **Documentation**: Comprehensive inline comments and external documentation


## Project Completion

This repository contains an AI chatbot project implemented with FastAPI and a lightweight frontend. It demonstrates a practical chat application using OpenAI for responses and a responsive, accessible UI.

**Key Focus Areas**:
- Problem-solving approach and clean architecture
- User experience and interface design
- Proper error handling and edge cases
- Code quality and documentation
- API design and integration patterns

---

*Developed by Louis - October 2025*
