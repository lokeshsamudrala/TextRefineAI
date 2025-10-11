# TextRefine AI

A powerful AI-driven text rephrasing application that transforms your writing to match different styles and tones. Built with React TypeScript frontend and FastAPI Python backend.

## Features

- 4 different writing styles:
  - **General**: Standard rephrasing for clarity
  - **Professional**: Formal, business-appropriate tone
  - **Friendly**: Conversational and approachable tone
  - **Creative**: Expressive and imaginative language
- Dark/light mode support
- Responsive design
- Copy-to-clipboard functionality
- Clean, modern interface

## Project Structure

```
text-rephraser/
├── frontend/              # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── utils/        # API utilities
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── backend/              # FastAPI Python backend
│   ├── main.py          # FastAPI application
│   ├── requirements.txt # Python dependencies
│   ├── start.sh        # Backend startup script
│   └── .venv/          # Virtual environment
├── .env                 # Environment variables
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v16+)
- Python 3.8+
- OpenAI API key

### Setup

1. **Clone and navigate to the project:**
   ```bash
   cd text-rephraser
   ```

2. **Set up environment variables:**
   ```bash
   # Create .env file in the root directory
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

3. **Start the backend:**
   ```bash
   cd backend
   ./start.sh
   ```

   Or manually:
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## API Endpoints

- `GET /` - Health check
- `GET /styles` - Get available rephrasing styles
- `POST /rephrase` - Rephrase text
  ```json
  {
    "text": "Your text here",
    "style": "professional"
  }
  ```

## Development

### Frontend Commands

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Commands

```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload              # Development with hot reload
uvicorn main:app --host 0.0.0.0 --port 8000  # Production
```

## Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Technologies Used

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)

### Backend
- FastAPI (Python web framework)
- OpenAI API (GPT-4o-mini)
- Uvicorn (ASGI server)
- Pydantic (data validation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

MIT License