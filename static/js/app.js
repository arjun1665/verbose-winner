// Main JavaScript for Verbose Winner platform

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all event listeners
    initializeStoryIdeas();
    initializePlotGenerator();
    initializeDialogueGenerator();
    initializePrompts();
});

function initializeStoryIdeas() {
    const generateBtn = document.getElementById('generate-idea-btn');
    const saveBtn = document.getElementById('save-idea-btn');
    const resultDiv = document.getElementById('idea-result');
    const loadingDiv = document.getElementById('idea-loading');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', async function() {
            const genre = document.getElementById('idea-genre').value;
            const style = document.getElementById('idea-style').value;
            const theme = document.getElementById('idea-theme').value;
            
            showLoading(loadingDiv, resultDiv);
            generateBtn.disabled = true;
            
            try {
                const response = await fetch('/generate_idea', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ genre, style, theme })
                });
                
                const data = await response.json();
                displayResult(data.idea, data.timestamp, 'idea');
                
                if (saveBtn) saveBtn.style.display = 'inline-block';
            } catch (error) {
                showError('Failed to generate story idea. Please try again.');
            } finally {
                hideLoading(loadingDiv, resultDiv);
                generateBtn.disabled = false;
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const content = document.getElementById('idea-content').textContent;
            saveToLocalStorage('story-ideas', content);
            showNotification('Story idea saved locally!', 'success');
        });
    }
}

function initializePlotGenerator() {
    const generateBtn = document.getElementById('generate-plot-btn');
    const saveBtn = document.getElementById('save-plot-btn');
    const resultDiv = document.getElementById('plot-result');
    const loadingDiv = document.getElementById('plot-loading');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', async function() {
            const storyIdea = document.getElementById('plot-idea').value;
            const structure = document.getElementById('plot-structure').value;
            
            if (!storyIdea.trim()) {
                showError('Please enter a story idea first.');
                return;
            }
            
            showLoading(loadingDiv, resultDiv);
            generateBtn.disabled = true;
            
            try {
                const response = await fetch('/generate_plot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ story_idea: storyIdea, structure })
                });
                
                const data = await response.json();
                displayResult(data.plot, data.timestamp, 'plot');
                document.getElementById('plot-structure-used').textContent = data.structure;
                
                if (saveBtn) saveBtn.style.display = 'inline-block';
            } catch (error) {
                showError('Failed to generate plot outline. Please try again.');
            } finally {
                hideLoading(loadingDiv, resultDiv);
                generateBtn.disabled = false;
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const content = document.getElementById('plot-content').textContent;
            saveToLocalStorage('plot-outlines', content);
            showNotification('Plot outline saved locally!', 'success');
        });
    }
}

function initializeDialogueGenerator() {
    const generateBtn = document.getElementById('generate-dialogue-btn');
    const saveBtn = document.getElementById('save-dialogue-btn');
    const resultDiv = document.getElementById('dialogue-result');
    const loadingDiv = document.getElementById('dialogue-loading');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', async function() {
            const characters = document.getElementById('dialogue-characters').value;
            const sceneContext = document.getElementById('dialogue-context').value;
            const mood = document.getElementById('dialogue-mood').value;
            
            if (!characters.trim() || !sceneContext.trim()) {
                showError('Please provide both character descriptions and scene context.');
                return;
            }
            
            showLoading(loadingDiv, resultDiv);
            generateBtn.disabled = true;
            
            try {
                const response = await fetch('/generate_dialogue', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        characters, 
                        scene_context: sceneContext, 
                        mood 
                    })
                });
                
                const data = await response.json();
                displayResult(data.dialogue, data.timestamp, 'dialogue');
                document.getElementById('dialogue-mood-used').textContent = data.mood;
                
                if (saveBtn) saveBtn.style.display = 'inline-block';
            } catch (error) {
                showError('Failed to generate dialogue. Please try again.');
            } finally {
                hideLoading(loadingDiv, resultDiv);
                generateBtn.disabled = false;
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const content = document.getElementById('dialogue-content').textContent;
            saveToLocalStorage('dialogues', content);
            showNotification('Dialogue saved locally!', 'success');
        });
    }
}

function initializePrompts() {
    const promptButtons = document.querySelectorAll('[data-prompt-type]');
    
    promptButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const promptType = this.getAttribute('data-prompt-type');
            await generatePrompt(promptType);
        });
    });
}

async function generatePrompt(type) {
    const resultDiv = document.getElementById('prompt-result');
    const loadingDiv = document.getElementById('prompt-loading');
    
    if (loadingDiv) showLoading(loadingDiv, resultDiv);
    
    try {
        const response = await fetch('/get_prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type })
        });
        
        const data = await response.json();
        if (resultDiv) {
            document.getElementById('prompt-content').textContent = data.prompt;
            document.getElementById('prompt-timestamp').textContent = data.timestamp;
            document.getElementById('prompt-type-used').textContent = data.type;
            resultDiv.style.display = 'block';
        }
    } catch (error) {
        showError('Failed to generate prompt. Please try again.');
    } finally {
        if (loadingDiv) hideLoading(loadingDiv, resultDiv);
    }
}

function showLoading(loadingDiv, resultDiv) {
    if (loadingDiv) loadingDiv.style.display = 'block';
    if (resultDiv) resultDiv.style.display = 'none';
}

function hideLoading(loadingDiv, resultDiv) {
    if (loadingDiv) loadingDiv.style.display = 'none';
    if (resultDiv) resultDiv.style.display = 'block';
}

function displayResult(content, timestamp, type) {
    const contentEl = document.getElementById(`${type}-content`);
    const timestampEl = document.getElementById(`${type}-timestamp`);
    
    if (contentEl) {
        contentEl.innerHTML = formatContent(content);
    }
    if (timestampEl) {
        timestampEl.textContent = timestamp;
    }
}

function formatContent(content) {
    // Basic formatting for better readability
    return content
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function saveToLocalStorage(key, content) {
    try {
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({
            content: content,
            timestamp: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem(key, JSON.stringify(existing));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Create and show a toast notification
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
}

// Utility function to copy generated content to other forms
function copyToPlotInput() {
    const ideaContent = document.getElementById('idea-content');
    const plotInput = document.getElementById('plot-idea');
    
    if (ideaContent && plotInput) {
        plotInput.value = ideaContent.textContent;
        showNotification('Story idea copied to plot generator!', 'success');
    }
}

// Add copy button functionality if elements exist
document.addEventListener('DOMContentLoaded', function() {
    const ideaResult = document.getElementById('idea-result');
    if (ideaResult) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn btn-sm btn-outline-primary mt-2';
        copyBtn.innerHTML = '<i class="fas fa-copy me-1"></i>Copy to Plot Generator';
        copyBtn.onclick = copyToPlotInput;
        ideaResult.querySelector('.alert').appendChild(copyBtn);
    }
});