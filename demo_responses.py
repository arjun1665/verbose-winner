"""
Demo mode for Verbose Winner when OpenAI API is not available
"""

def get_demo_response(prompt_type, **kwargs):
    """Return demo responses for different types of content generation"""
    
    if 'story_idea' in prompt_type.lower():
        return """**Title: The Memory Thief**

**Premise:** In a world where memories can be extracted and traded like currency, Maya discovers she has the rare ability to steal memories simply by touching objects. When she accidentally absorbs the memories of a murdered scientist, she becomes the target of a powerful corporation that will stop at nothing to silence her.

**Main Character:** Maya Chen, a 23-year-old antiquities appraiser who has always felt disconnected from the world around her. She thought her ability to sense the history of objects was just intuition, until she realizes she's actually absorbing fragments of memories left behind.

**Central Conflict:** Maya must decide whether to use her dangerous gift to expose a conspiracy that threatens the very nature of human memory and identity, knowing it could cost her life and the memories that make her who she is.

**Unique Twist:** The memories Maya steals don't just show her the past—they begin to change her personality and skills, making her question which thoughts and abilities are truly her own."""

    elif 'plot' in prompt_type.lower():
        structure = kwargs.get('structure', 'Three-Act Structure')
        return f"""**Plot Outline - {structure}**

**Act 1 - Setup:**
- Open with Maya at her antique shop, demonstrating her uncanny ability to know the history of objects
- Introduce her isolated lifestyle and fear of close relationships due to overwhelming "intuition"
- A mysterious client brings her a vintage camera belonging to Dr. Elena Vasquez, a recently deceased neuroscientist
- Maya touches the camera and experiences a violent memory fragment - Elena's murder
- She realizes her gift is real and dangerous when corporate agents arrive asking about Elena's research

**Act 2 - Confrontation:**
- Maya learns Elena was developing technology to permanently transfer memories between minds
- She discovers Elena hid crucial research data in various objects around the city
- As Maya tracks down these items, she absorbs more of Elena's memories and scientific knowledge
- The corporation, Mneme Industries, realizes Maya has Elena's memories and sends hunters after her
- Maya's personality begins shifting as Elena's memories integrate with her own consciousness
- She must learn to control her ability while staying ahead of corporate assassins

**Act 3 - Resolution:**
- Maya discovers Mneme Industries plans to use Elena's research to control human consciousness on a global scale
- She must choose between destroying Elena's research to stay hidden or exposing the conspiracy publicly
- Final confrontation at Mneme's headquarters where Maya uses absorbed memories to outmaneuver them
- Maya learns to balance her gift with her own identity, using it to help solve cold cases
- She opens her mind to relationships, no longer afraid of the memories others carry"""

    elif 'dialogue' in prompt_type.lower():
        return """**Scene: Maya confronts Dr. Reeves at Mneme Industries**

MAYA stood in the gleaming lobby of Mneme Industries, her hands shaking slightly as she approached the reception desk. The memories she'd absorbed from Elena's research notes burned in her mind like foreign thoughts.

RECEPTIONIST: (Looking up with practiced smile) Can I help you?

MAYA: I need to see Dr. Reeves. Tell him it's about Elena Vasquez.

The receptionist's smile faltered for just a moment—barely perceptible, but Maya caught it.

RECEPTIONIST: I'm sorry, Dr. Reeves doesn't take unscheduled appointments. If you'd like to—

MAYA: (Interrupting, her voice carrying Elena's scientific authority) Tell him Maya Chen is here, and I have Elena's complete memory transfer protocol.

The receptionist hesitated, then picked up her phone. Maya could hear her whispering urgently.

DR. REEVES emerged from the elevator minutes later—a tall man in an expensive suit with cold, calculating eyes.

DR. REEVES: Ms. Chen. I understand you have something that belongs to us.

MAYA: (Standing straighter, Elena's memories giving her confidence) Elena's research belongs to humanity, not to your corporate machine.

DR. REEVES: (Chuckling softly) Elena was naive. She never understood the commercial applications of her work. But you... you're different. You've experienced the memories firsthand, haven't you?

Maya's blood ran cold. He knew about her ability.

MAYA: How long have you been watching me?

DR. REEVES: Long enough to know that you're far more valuable than Elena ever was. You're not just a scientist studying memory transfer—you're a living demonstration of it."""

    elif 'prompt' in prompt_type.lower():
        prompt_type = kwargs.get('type', 'general')
        prompts = {
            'character': "Write about a character who discovers they can taste emotions in the food they eat. How does this ability change their relationship with cooking, eating, and the people around them? What happens when they taste something unexpected in a meal prepared by someone they trust?",
            
            'setting': "Describe a library that exists between dimensions, where books write themselves and the stories within can bleed into reality. What kind of librarian works there? What rules must visitors follow? What happens when someone tries to check out a book that isn't finished writing itself yet?",
            
            'conflict': "Two time travelers from different eras meet in present day, but they're both trying to prevent the same historical disaster—and their methods are completely incompatible. Neither can return to their own time until the problem is resolved, but working together might make things worse.",
            
            'dialogue': "Write a conversation between a superhero and their nemesis who are forced to share an elevator for 20 floors during a citywide power outage. They can't use their powers, they're both late for important appointments, and they slowly realize they have more in common than they thought.",
            
            'general': "A small town's weather has been controlled by the same family for generations through an ancient pact. Write about the day someone discovers this secret and must decide whether to expose it, knowing it could destroy the town's perfect climate—and the family's legacy."
        }
        return prompts.get(prompt_type, prompts['general'])
    
    else:
        return "Demo mode: This is a sample AI response. Connect your OpenAI API key to get real AI-generated content tailored to your preferences."