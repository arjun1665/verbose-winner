import os
import json
import random
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from dotenv import load_dotenv
import openai
from datetime import datetime
from demo_responses import get_demo_response

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-in-production')

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Story genres and writing styles for customization
STORY_GENRES = [
    'Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Thriller', 
    'Horror', 'Adventure', 'Drama', 'Comedy', 'Historical Fiction',
    'Western', 'Dystopian', 'Utopian', 'Cyberpunk', 'Steampunk'
]

WRITING_STYLES = [
    'Descriptive', 'Minimalist', 'Stream of consciousness', 'Dialogue-heavy',
    'Action-packed', 'Contemplative', 'Humorous', 'Dark', 'Whimsical',
    'Gritty', 'Poetic', 'Straightforward', 'Experimental'
]

PLOT_STRUCTURES = {
    'Three-Act Structure': {
        'acts': ['Setup', 'Confrontation', 'Resolution'],
        'description': 'Classic Hollywood structure with clear beginning, middle, and end'
    },
    'Hero\'s Journey': {
        'acts': ['Ordinary World', 'Call to Adventure', 'Refusal of the Call', 'Meeting the Mentor', 
                'Crossing the Threshold', 'Tests and Allies', 'Approach to the Inmost Cave', 
                'The Ordeal', 'Reward', 'The Road Back', 'Resurrection', 'Return with Elixir'],
        'description': 'Joseph Campbell\'s monomyth structure'
    },
    'Save the Cat': {
        'acts': ['Opening Image', 'Theme Stated', 'Setup', 'Catalyst', 'Debate', 'Break into Two',
                'B Story', 'Fun and Games', 'Midpoint', 'Bad Guys Close In', 'All Is Lost',
                'Dark Night of the Soul', 'Break into Three', 'Finale', 'Final Image'],
        'description': 'Blake Snyder\'s detailed beat sheet structure'
    }
}

def get_ai_response(prompt, max_tokens=500, temperature=0.8, response_type="general", **kwargs):
    """Get response from OpenAI API with error handling and demo mode fallback"""
    try:
        if not openai.api_key or openai.api_key.startswith('your_'):
            # Demo mode - return pre-written responses
            return get_demo_response(response_type, **kwargs)
        
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        return response.choices[0].text.strip()
    except Exception as e:
        # Fallback to demo mode on any error
        return get_demo_response(response_type, **kwargs)

@app.route('/')
def index():
    """Main landing page"""
    return render_template('index.html', genres=STORY_GENRES, styles=WRITING_STYLES)

@app.route('/profile')
def profile():
    """User profile page for setting creative preferences"""
    return render_template('profile.html', 
                         genres=STORY_GENRES, 
                         styles=WRITING_STYLES,
                         user_profile=session.get('user_profile', {}))

@app.route('/save_profile', methods=['POST'])
def save_profile():
    """Save user creative preferences"""
    profile = {
        'name': request.form.get('name', ''),
        'preferred_genres': request.form.getlist('genres'),
        'writing_style': request.form.get('writing_style', ''),
        'voice_description': request.form.get('voice_description', ''),
        'favorite_authors': request.form.get('favorite_authors', ''),
        'themes': request.form.get('themes', '')
    }
    session['user_profile'] = profile
    flash('Profile saved successfully!', 'success')
    return redirect(url_for('profile'))

@app.route('/generate_idea', methods=['POST'])
def generate_idea():
    """Generate story ideas based on user preferences"""
    data = request.get_json()
    genre = data.get('genre', random.choice(STORY_GENRES))
    style = data.get('style', random.choice(WRITING_STYLES))
    theme = data.get('theme', '')
    
    # Get user profile for personalization
    user_profile = session.get('user_profile', {})
    voice_context = ""
    if user_profile.get('voice_description'):
        voice_context = f"Writing style preference: {user_profile['voice_description']}. "
    if user_profile.get('favorite_authors'):
        voice_context += f"Influenced by authors like: {user_profile['favorite_authors']}. "
    
    prompt = f"""Generate a unique and compelling story idea for a {genre} story. 
    {voice_context}
    The story should have a {style} writing style.
    {f'Theme to incorporate: {theme}' if theme else ''}
    
    Please provide:
    1. A captivating title
    2. A brief premise (2-3 sentences)
    3. Main character description
    4. Central conflict
    5. Unique twist or hook
    
    Make it original and engaging:"""
    
    idea = get_ai_response(prompt, max_tokens=400, temperature=0.9, response_type="story_idea", genre=genre, style=style)
    
    return jsonify({
        'idea': idea,
        'genre': genre,
        'style': style,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/generate_plot', methods=['POST'])
def generate_plot():
    """Generate plot outline based on story structure"""
    data = request.get_json()
    story_idea = data.get('story_idea', '')
    structure = data.get('structure', 'Three-Act Structure')
    
    user_profile = session.get('user_profile', {})
    voice_context = ""
    if user_profile.get('voice_description'):
        voice_context = f"Maintain this writing voice: {user_profile['voice_description']}. "
    
    structure_info = PLOT_STRUCTURES.get(structure, PLOT_STRUCTURES['Three-Act Structure'])
    
    prompt = f"""Create a detailed plot outline using the {structure} structure for this story idea:
    {story_idea}
    
    {voice_context}
    
    Structure: {structure_info['description']}
    
    Please break down the plot into these sections:
    {', '.join(structure_info['acts'])}
    
    For each section, provide:
    - What happens in this part
    - Key scenes or beats
    - Character development
    - How it connects to the overall story
    
    Make it detailed enough to guide writing but flexible enough for creative freedom:"""
    
    plot = get_ai_response(prompt, max_tokens=800, temperature=0.7, response_type="plot", structure=structure)
    
    return jsonify({
        'plot': plot,
        'structure': structure,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/generate_dialogue', methods=['POST'])
def generate_dialogue():
    """Generate dialogue based on character descriptions and scene context"""
    data = request.get_json()
    characters = data.get('characters', '')
    scene_context = data.get('scene_context', '')
    mood = data.get('mood', 'neutral')
    
    user_profile = session.get('user_profile', {})
    voice_context = ""
    if user_profile.get('voice_description'):
        voice_context = f"Dialogue style: {user_profile['voice_description']}. "
    
    prompt = f"""Write a dialogue scene with the following parameters:
    
    Characters: {characters}
    Scene context: {scene_context}
    Mood/Tone: {mood}
    {voice_context}
    
    Requirements:
    - Each character should have a distinct voice and speaking pattern
    - Include appropriate action lines and scene description
    - The dialogue should feel natural and advance the story
    - Show character personality through speech patterns
    - Include subtext and emotional depth
    
    Write the dialogue scene:"""
    
    dialogue = get_ai_response(prompt, max_tokens=600, temperature=0.8, response_type="dialogue", characters=characters)
    
    return jsonify({
        'dialogue': dialogue,
        'characters': characters,
        'scene_context': scene_context,
        'mood': mood,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/writing_prompts')
def writing_prompts():
    """Page with creative writing prompts and exercises"""
    return render_template('prompts.html')

@app.route('/get_prompt', methods=['POST'])
def get_prompt():
    """Generate creative writing prompts"""
    data = request.get_json()
    prompt_type = data.get('type', 'general')
    
    user_profile = session.get('user_profile', {})
    genres = user_profile.get('preferred_genres', ['General'])
    
    prompts_by_type = {
        'character': f"Create a compelling character prompt for {random.choice(genres)} fiction",
        'setting': f"Generate an intriguing setting prompt for {random.choice(genres)} stories", 
        'conflict': f"Develop a central conflict prompt for {random.choice(genres)} narratives",
        'dialogue': f"Write a dialogue exercise prompt for {random.choice(genres)} characters",
        'general': f"Create an inspiring writing prompt for {random.choice(genres)} fiction"
    }
    
    ai_prompt = f"""{prompts_by_type.get(prompt_type, prompts_by_type['general'])}.
    
    Make it:
    - Specific enough to spark creativity
    - Open-ended enough for interpretation
    - Engaging and thought-provoking
    - Suitable for a 500-1000 word response
    
    Provide the writing prompt:"""
    
    prompt = get_ai_response(ai_prompt, max_tokens=200, temperature=0.9, response_type="prompt", type=prompt_type)
    
    return jsonify({
        'prompt': prompt,
        'type': prompt_type,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/structures')
def structures():
    """Page showing different plot structures"""
    return render_template('structures.html', structures=PLOT_STRUCTURES)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)