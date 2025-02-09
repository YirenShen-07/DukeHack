// Document state management
let documentState = {
    content: '',
    currentFont: 'Courier New',
    fontSize: '12pt',
    isDirty: false,
    characters: []
};


// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log("adding listeners");

    // Formatting buttons
    document.querySelectorAll('.format-btn').forEach(button => {
        button.addEventListener('click', (e) => applyFormatting(e.target.textContent));
    });    

    document.querySelector('.play-dialogue').addEventListener('click', playDialogue)
    
    // Navigation buttons
    document.querySelector('.btn-primary').addEventListener('click', createNewScript);
    document.querySelector('.btn-success').addEventListener('click', saveScript);
    document.querySelector('.btn-secondary').addEventListener('click', exportToPDF);
    // document.querySelector('.add-character').addEventListener('click', addCharacterProfile);
    // Font controls
    document.querySelector('.font-select').addEventListener('change', changeFont);
    document.querySelector('.font-size').addEventListener('click', changeFontSize);

    document.addEventListener('click', function(event) {
        const scriptPage = document.querySelector('.script-page');
    
        if (!scriptPage) {
            console.error("Error: .script-page not found!");
            return;
        }
    
        // Check if a valid button was clicked
        let textToInsert = '';
    
        if (event.target.classList.contains('feature-film')) {
            textToInsert = `
            INT./EXT. LOCATION - TIME
    
            Feature films are typically formatted in a three-act structure, with the first 10 to 15 pages being dedicated to setting up the story. Begin by describing the world and introducing any key characters present in the opening scene.  
    
            For example….
    
            The fluorescent light flickered as JAMES(20s) walked down the alleyway. With every step he took, the sound of sweet jazz grew louder.
    
            JAMES
            Without a fail.
    
            Now at the end of the alley, he stands by watching LORENA(30s) from across the street.
            `;
            console.log("Feature Film Clicked");
        } 
        else if (event.target.classList.contains('episode')) {
            textToInsert = `
            INT./EXT. LOCATION - TIME
    
            TV show structures depend on the runtime and genre. Hour-long dramas follow the five-act structure while half-hour sitcoms follow the four-act structure. All shows begin with a teaser, a short scene that sets up the problem the episode is going to follow.  
    
            For example….
    
            The fluorescent light flickered as JAMES(20s) walked down the alleyway. With every step he took, the sound of sweet jazz grew louder.
    
            JAMES
            Without a fail.
    
            Now at the end of the alley, he stands by watching LORENA(30s) from across the street. Stepping on gum, he looks back to see she’s gone.
            `;
            console.log("TV Show Episode Clicked");
        } 
        else if (event.target.classList.contains('rt-film')) {
            textToInsert = `
            INT./EXT. LOCATION - TIME
    
            Short films are typically formatted in a three-act structure, with act 1 being 25% of the story, act 2 50% of the story, and act 3 the remaining 25%. The first five pages are crucial in establishing the world and introducing most key characters.  
    
            For example….
    
            The fluorescent light flickered as JAMES(20s) walked down the alleyway. With every step he took, the sound of sweet jazz grew louder.
    
            JAMES
            Without a fail.
    
            Now at the end of the alley, he stands by watching LORENA(30s) from across the street. She sits at a table with JANE(30s), her best friend.
            `;
            console.log("Short Film Clicked");
        } 
        else if (event.target.classList.contains('stage-play')) {
            textToInsert = `
            INT./EXT. LOCATION - TIME
    
            Plays typically have three acts and have one set location. There is less emphasis on action and more of a focus on dialogue.  
    
            For example….
    
            JAMES(20s) enters the stage. With every step, the sound of sweet jazz grows louder. He enters the bar.
    
            JAMES
            Without a fail.
    
            LORENA
            Thought you weren’t coming.
    
            JAMES
            Thought you weren’t singing.
    
            He sits.
            `;
            console.log("Stage Play Clicked");
        }
    
        // If a valid button was clicked, insert text
        if (textToInsert) {
            scriptPage.innerText = textToInsert.trim(); // Insert text into the script area
        }
    });
    
    // document.addEventListener('click', function(event) {
    //     const scriptPage = document.querySelector('.script-page');

    //     if(!scriptPage.contains(event.target)) {
    //         console.log("Element clicked outside script page");
    //         return;
    //     }   

    //     // Insert text based on element clicked
    //     let textToInsert = ''; // Initialize variable for text insertion
    //     if (event.target.classList.contains('feature-film')) {
    //         textToInsert = `
    //         INT./EXT. LOCATION - TIME
    
    //         Feature films are typically formatted in a three-act structure, with the first 10 to 15 pages being dedicated to setting up the story. Begin by describing the world and introducing any key characters present in the opening scene.  
    
    //         For example….
    
    //         The fluorescent light flickered as JAMES(20s) walked down the alleyway. With every step he took, the sound of sweet jazz grew louder.
    
    //         JAMES
    //         Without a fail.
    
    //         Now at the end of the alley, he stands by watching LORENA(30s) from across the street.
    //         `;
    //         console.log("Feature Film Clicked:", event.target);
    //     }

    
    //     if (event.target.classList.contains('episode')) {
    //         // hereee
    //         console.log("Element clicked hereee:", event.target);
    //     }

    //     if (event.target.classList.contains('rt-film')) {
    //         // hereee
    //         console.log("Element clicked hereee:", event.target);
    //     }

    //     if (event.target.classList.contains('stage-play')) {
    //         // hereee
    //         console.log("Element clicked hereee:", event.target);
    //     }
    // });

});

// Add Character Profile
function addCharacterProfile() {
    const characterName = prompt('Enter character name:');
    if (!characterName) return;
    
    const characterBio = prompt('Enter character bio:');
    const imageUrl = prompt('Enter character image URL:');
    
    documentState.characters.push({ name: characterName, bio: characterBio, image: imageUrl });
    renderCharacterProfiles();
}

function renderCharacterProfiles() {
    const sidebar = document.querySelector('.characters-sidebar');
    sidebar.innerHTML = '<h2 class="sidebar-heading">Characters</h2>';
    documentState.characters.forEach(char => {
        const charElement = document.createElement('div');
        charElement.className = 'character-profile';
        charElement.innerHTML = `
            <img src="${char.image}" alt="${char.name}" class="character-image" />
            <h3>${char.name}</h3>
            <p>${char.bio}</p>
        `;
        sidebar.appendChild(charElement);
    });
}

// AI Voice Acting for Dialogue
function playDialogue() {
    documentState.content = document.querySelector('.script-page').textContent;
    console.log(documentState.content);
    const utterance = new SpeechSynthesisUtterance(documentState.content);

    // TODO: Select a voice based on character
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; 

     // Speak the text
    speechSynthesis.speak(utterance);
}

// Button functions
function createNewScript() {
    if (documentState.isDirty) {
        if (confirm('You have unsaved changes. Create new script anyway?')) {
            clearDocument();
        }
    } else {
        clearDocument();
    }
}

function saveScript() {
    // Simulate saving
    console.log('Saving script...');
    alert('Script saved successfully!');
    documentState.isDirty = false;
}

function exportToPDF() {
    // Simulate PDF export
    console.log('Exporting to PDF...');
    alert('PDF exported successfully!');
}

function changeFont(e) {
    documentState.currentFont = e.target.value;
    document.querySelector('.script-page').style.fontFamily = documentState.currentFont;
}

function changeFontSize() {
    // Toggle between common screenplay font sizes
    const sizes = ['12pt', '14pt', '16pt'];
    let currentIndex = sizes.indexOf(documentState.fontSize);
    documentState.fontSize = sizes[(currentIndex + 1) % sizes.length];
    document.querySelector('.font-size').textContent = documentState.fontSize;
    document.querySelector('.script-page').style.fontSize = documentState.fontSize;
}

// Formatting functions
function applyFormatting(formatType) {
    console.log(formatType);
    const scriptPage = document.querySelector('.script-page');
    const selection = window.getSelection();
    
    if (!selection.toString()) {
        // If no text is selected, create new element
        const newElement = document.createElement('div');
        newElement.className = formatType.toLowerCase().replace(' ', '-');
        newElement.contentEditable = true;
        
        switch(formatType) {
            case 'Scene Heading':
                newElement.textContent = 'INT. LOCATION - TIME';
                break;
            case 'Character':
                newElement.textContent = 'CHARACTER NAME';
                break;
            case 'Dialogue':
                newElement.textContent = 'Character dialogue goes here...';
                break;
            case 'Parenthetical':
                newElement.textContent = '(action)';
                break;
            case 'Action':
                newElement.textContent = 'Action description goes here...';
                break;
            case 'Transition':
                newElement.textContent = 'CUT TO:';
                break;
        }
        
        console.log(newElement)
        scriptPage.appendChild(newElement);
        setCaretToEnd(newElement);
        console.log(scriptPage);
    }
}

// Utility functions
function clearDocument() {
    document.querySelector('.script-page').innerHTML = '';
    documentState.content = '';
    documentState.isDirty = false;
}

function setCaretToEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
}

// Track changes
document.querySelector('.script-page').addEventListener('input', () => {
    documentState.isDirty = true;
    // documentState.content = document.querySelector('.script-page').textContent;
});
