# Verbose Winner - AI-Powered Writing Platform

A comprehensive platform that helps writers generate story ideas, plots, or dialogue using AI while maintaining their unique creative voice.

## Features

- **Story Ideas Generator**: Generate compelling story concepts based on genre, style, and themes
- **Plot Outline Generator**: Create detailed plot structures using proven narrative frameworks
- **Dialogue Generator**: Write authentic character dialogue with scene context
- **Creative Writing Prompts**: Break through writer's block with AI-generated prompts
- **User Profile System**: Customize AI suggestions to match your unique writing voice
- **Plot Structure Guide**: Learn and apply different narrative structures

## Quick Start

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Run the Application**
   ```bash
   python app.py
   ```

4. **Open in Browser**
   Visit `http://localhost:5000`

## Configuration

Create a `.env` file with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
FLASK_SECRET_KEY=your_secret_key_here
FLASK_ENV=development
```

## Usage

### Setting Up Your Profile
1. Visit the Profile page
2. Fill in your writing preferences, style, and influences
3. Save your profile to get personalized AI suggestions

### Generating Content
1. **Story Ideas**: Select genre and style, optionally add themes
2. **Plot Outlines**: Enter a story idea and choose a structure template
3. **Dialogue**: Describe characters and scene context for realistic conversations

### Using Writing Prompts
- Click on different prompt types (General, Character, Setting, Conflict, Dialogue)
- Use the exercises section for daily writing practice
- Save prompts locally for later use

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: Bootstrap 5, Vanilla JavaScript
- **AI Integration**: OpenAI API
- **Styling**: Custom CSS with responsive design

## Features Overview

### Core Generators
- **Story Ideas**: AI-generated concepts with customizable parameters
- **Plot Outlines**: Structured using Three-Act, Hero's Journey, or Save the Cat
- **Dialogue**: Context-aware character conversations

### Writing Tools
- Creative writing prompts by type
- Daily writing exercises
- Plot structure guides and tutorials
- Character development prompts

### Personalization
- User profile system for creative preferences
- Style and voice customization
- Genre and theme preferences
- Author influence integration

## Development

The application uses a modular structure:
- `app.py`: Main Flask application with all routes
- `templates/`: HTML templates using Jinja2
- `static/css/`: Custom styles and responsive design
- `static/js/`: Client-side JavaScript for interactivity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the functionality
5. Submit a pull request

## License

This project is open source and available under the MIT License. 
