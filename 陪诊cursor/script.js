// Mental Status Display Wall - JavaScript

class MentalStatusWall {
    constructor() {
        this.currentStatus = 0;
        this.statuses = [
            {
                text: "Good ✔",
                description: "Feeling pretty good today! Ready to tackle whatever comes my way.",
                bodyClass: "status-good",
                buttonClass: "status-good"
            },
            {
                text: "So-so 🧟‍♀️",
                description: "Meh, could be better. At least I'm not completely broken... yet.",
                bodyClass: "status-soso",
                buttonClass: "status-soso"
            },
            {
                text: "Chaos 🌀",
                description: "Everything is spinning and I'm trying to catch up with my own thoughts!",
                bodyClass: "status-chaos",
                buttonClass: "status-chaos"
            },
            {
                text: "Crashed 🧨",
                description: "System failure. Please reboot brain. Error 404: Sanity not found.",
                bodyClass: "status-crashed",
                buttonClass: "status-crashed"
            }
        ];

        this.identities = [
            "A dreamer stuck in 149 Regiment",
            "Escaping reality through side projects",
            "Professional overthinker",
            "Chaos coordinator",
            "Digital nomad with commitment issues",
            "Creative procrastinator",
            "Code poet with imposter syndrome",
            "Reality escape artist",
            "Professional daydreamer",
            "Chaos theory practitioner",
            "Digital hermit with social anxiety",
            "Creative chaos engineer",
            "Reality distortion field generator",
            "Professional time waster",
            "Digital nomad without the nomad part"
        ];

        this.broadcasts = [
            "Thoughts float like clouds in a digital sky",
            "Reality is just a social construct we all agreed to",
            "Time is an illusion, deadlines are real",
            "Chaos is just order waiting to be discovered",
            "The best code is the code you don't have to write",
            "Reality check: you're reading this on a screen",
            "Thoughts are like butterflies, beautiful but hard to catch",
            "The universe is made of stories, not atoms",
            "Chaos theory: a butterfly flaps its wings and my code breaks",
            "Digital dreams in analog reality",
            "The mind is like a browser with too many tabs open",
            "Reality is overrated, imagination is underrated",
            "Thoughts are like popcorn, they pop when you least expect it",
            "The best ideas come at 3 AM when you should be sleeping",
            "Chaos is just creativity in disguise"
        ];

        this.wishes = [
            "Build something amazing",
            "Learn to fly (metaphorically)",
            "Find the perfect coffee",
            "Understand quantum physics",
            "Write a novel in a weekend",
            "Master the art of time management",
            "Learn to play the ukulele",
            "Visit every country in the world",
            "Invent something useful",
            "Become a morning person",
            "Learn to cook like a chef",
            "Master the art of small talk",
            "Find inner peace",
            "Learn to dance",
            "Write a hit song"
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadWishes();
        this.updateStatus();
    }

    bindEvents() {
        // Mental status button
        const statusBtn = document.getElementById('mentalStatusBtn');
        statusBtn.addEventListener('click', () => this.cycleStatus());

        // Tab navigation
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Refresh buttons
        const refreshIdentityBtn = document.getElementById('refreshIdentityBtn');
        refreshIdentityBtn.addEventListener('click', () => this.refreshIdentity());

        const refreshBroadcastBtn = document.getElementById('refreshBroadcastBtn');
        refreshBroadcastBtn.addEventListener('click', () => this.refreshBroadcast());

        // Wish box
        const addWishBtn = document.getElementById('addWishBtn');
        addWishBtn.addEventListener('click', () => this.addWish());

        const wishInput = document.getElementById('wishInput');
        wishInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.addWish();
            }
        });

        // Wish list items (for deletion)
        this.updateWishList();
    }

    cycleStatus() {
        this.currentStatus = (this.currentStatus + 1) % this.statuses.length;
        this.updateStatus();
        
        // Add some fun effects
        const statusBtn = document.getElementById('mentalStatusBtn');
        statusBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            statusBtn.style.transform = 'scale(1)';
        }, 150);
    }

    updateStatus() {
        const status = this.statuses[this.currentStatus];
        const statusText = document.getElementById('statusText');
        const statusDescription = document.getElementById('statusDescription');
        const statusBtn = document.getElementById('mentalStatusBtn');
        const body = document.body;

        // Update text
        statusText.textContent = status.text;
        statusDescription.textContent = status.description;

        // Update classes
        body.className = status.bodyClass;
        statusBtn.className = `status-button ${status.buttonClass}`;

        // Add some animation
        statusBtn.style.animation = 'none';
        statusBtn.offsetHeight; // Trigger reflow
        statusBtn.style.animation = null;
    }

    switchTab(tabId) {
        // Update tab buttons
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => btn.classList.remove('active'));

        const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
        activeBtn.classList.add('active');

        // Update tab panels
        const tabPanels = document.querySelectorAll('.tab-panel');
        tabPanels.forEach(panel => panel.classList.remove('active'));

        const activePanel = document.getElementById(tabId);
        activePanel.classList.add('active');

        // Special handling for wish box
        if (tabId === 'wish-box') {
            this.updateWishList();
        }
    }

    refreshIdentity() {
        const identityText = document.getElementById('identityText');
        const newIdentity = this.getRandomItem(this.identities);
        
        // Add fade effect
        identityText.style.opacity = '0';
        setTimeout(() => {
            identityText.textContent = newIdentity;
            identityText.style.opacity = '1';
        }, 200);
    }

    refreshBroadcast() {
        const broadcastText = document.getElementById('broadcastText');
        const newBroadcast = this.getRandomItem(this.broadcasts);
        
        // Add fade effect
        broadcastText.style.opacity = '0';
        setTimeout(() => {
            broadcastText.textContent = newBroadcast;
            broadcastText.style.opacity = '1';
        }, 200);
    }

    addWish() {
        const wishInput = document.getElementById('wishInput');
        const wish = wishInput.value.trim();
        
        if (wish) {
            this.wishes.push(wish);
            this.saveWishes();
            this.updateWishList();
            wishInput.value = '';
            
            // Add some feedback
            const addWishBtn = document.getElementById('addWishBtn');
            addWishBtn.textContent = '✨ Wish Added!';
            setTimeout(() => {
                addWishBtn.textContent = '✨ Add Wish';
            }, 1000);
        }
    }

    updateWishList() {
        const wishList = document.getElementById('wishList');
        wishList.innerHTML = '';
        
        this.wishes.forEach((wish, index) => {
            const li = document.createElement('li');
            li.textContent = wish;
            li.addEventListener('click', () => this.removeWish(index));
            li.title = 'Click to remove this wish';
            wishList.appendChild(li);
        });
    }

    removeWish(index) {
        this.wishes.splice(index, 1);
        this.saveWishes();
        this.updateWishList();
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    saveWishes() {
        localStorage.setItem('mentalStatusWishes', JSON.stringify(this.wishes));
    }

    loadWishes() {
        const savedWishes = localStorage.getItem('mentalStatusWishes');
        if (savedWishes) {
            this.wishes = JSON.parse(savedWishes);
        }
    }

    // Fun utility methods
    addRandomEffect() {
        const effects = [
            () => this.addConfetti(),
            () => this.addGlitch(),
            () => this.addBounce(),
            () => this.addSpin()
        ];
        
        const randomEffect = this.getRandomItem(effects);
        randomEffect();
    }

    addConfetti() {
        // Simple confetti effect
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = this.getRandomItem(colors);
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = 'confettiFall 2s linear forwards';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 2000);
            }, i * 50);
        }
    }

    addGlitch() {
        const title = document.querySelector('.title');
        title.style.animation = 'glitch 0.3s ease-in-out';
        setTimeout(() => {
            title.style.animation = '';
        }, 300);
    }

    addBounce() {
        const container = document.querySelector('.container');
        container.style.animation = 'bounce 0.5s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    }

    addSpin() {
        const statusBtn = document.getElementById('mentalStatusBtn');
        statusBtn.style.animation = 'spin 1s linear';
        setTimeout(() => {
            statusBtn.style.animation = '';
        }, 1000);
    }
}

// Add some additional CSS animations
const additionalStyles = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const mentalStatusWall = new MentalStatusWall();
    
    // Add some fun Easter eggs
    let clickCount = 0;
    const title = document.querySelector('.title');
    
    title.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            mentalStatusWall.addRandomEffect();
            clickCount = 0;
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case '1':
                mentalStatusWall.switchTab('who-am-i');
                break;
            case '2':
                mentalStatusWall.switchTab('brain-broadcast');
                break;
            case '3':
                mentalStatusWall.switchTab('wish-box');
                break;
            case ' ':
                e.preventDefault();
                mentalStatusWall.cycleStatus();
                break;
            case 'r':
                if (e.ctrlKey) {
                    e.preventDefault();
                    mentalStatusWall.refreshIdentity();
                }
                break;
        }
    });
    
    // Add some console fun
    console.log('🧠 Mental Status Wall loaded!');
    console.log('💡 Try clicking the title 5 times for a surprise!');
    console.log('⌨️  Keyboard shortcuts: 1-3 for tabs, Space for status, Ctrl+R for new identity');
});

// Online Office Simulator - JavaScript

class OfficeSimulator {
    constructor() {
        this.sounds = {};
        this.activeSounds = new Set();
        this.masterVolume = 0.7;
        this.sessionStartTime = Date.now();
        this.audioContext = null;
        
        // Sound configurations
        this.soundConfigs = {
            typing: {
                name: 'Light Typing',
                description: 'Gentle keyboard clatter',
                icon: 'fas fa-keyboard',
                defaultVolume: 0.6,
                loop: true,
                // Placeholder URLs - replace with actual audio files
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            },
            printer: {
                name: 'Printer',
                description: 'Whirring and paper sounds',
                icon: 'fas fa-print',
                defaultVolume: 0.5,
                loop: true,
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            },
            watercooler: {
                name: 'Water Cooler',
                description: 'Gurgling and bubbles',
                icon: 'fas fa-tint',
                defaultVolume: 0.4,
                loop: true,
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            },
            humming: {
                name: 'Coworker Humming',
                description: 'Quiet background humming',
                icon: 'fas fa-music',
                defaultVolume: 0.3,
                loop: true,
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            },
            snacks: {
                name: 'Snack Crunching',
                description: 'Chips and seeds',
                icon: 'fas fa-cookie-bite',
                defaultVolume: 0.45,
                loop: true,
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            },
            phone: {
                name: 'Phone Ringing',
                description: 'Occasional rings',
                icon: 'fas fa-phone',
                defaultVolume: 0.55,
                loop: false,
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            },
            ac: {
                name: 'Air Conditioner',
                description: 'Constant hum',
                icon: 'fas fa-wind',
                defaultVolume: 0.35,
                loop: true,
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            },
            coughing: {
                name: 'Manager Coughing',
                description: 'From the next room',
                icon: 'fas fa-user',
                defaultVolume: 0.25,
                loop: false,
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            }
        };

        // Daily quotes from annoying coworkers
        this.dailyQuotes = [
            "Did you get my email from last week?",
            "Can you just quickly look at this?",
            "I know it's Friday, but...",
            "This should only take 5 minutes",
            "Have you seen my stapler?",
            "Can we have a quick sync?",
            "I'm not sure if you're busy, but...",
            "This is probably a stupid question, but...",
            "Can you help me with something real quick?",
            "I hate to bother you, but...",
            "This is urgent, but not urgent urgent",
            "Can you review this when you have a chance?",
            "I'm sure you're swamped, but...",
            "This is probably above my pay grade, but...",
            "Can we touch base on this?",
            "I'm not trying to micromanage, but...",
            "This might be a dumb question, but...",
            "Can you just take a quick look?",
            "I know you're probably busy, but...",
            "This shouldn't take too long"
        ];

        this.init();
    }

    async init() {
        this.initAudioContext();
        this.bindEvents();
        this.updateSessionTime();
        this.loadSounds();
        this.updateStatus();
        
        // Start session timer
        setInterval(() => this.updateSessionTime(), 1000);
    }

    async initAudioContext() {
        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume audio context on user interaction
            document.addEventListener('click', () => {
                if (this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
            }, { once: true });
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    bindEvents() {
        // Master volume control
        const masterVolumeSlider = document.getElementById('masterVolume');
        const volumeValue = document.getElementById('volumeValue');
        
        masterVolumeSlider.addEventListener('input', (e) => {
            this.masterVolume = e.target.value / 100;
            volumeValue.textContent = `${e.target.value}%`;
            this.updateAllSoundVolumes();
        });

        // Sound toggles
        document.querySelectorAll('.sound-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const soundId = e.target.closest('.sound-card').dataset.sound;
                this.toggleSound(soundId);
            });
        });

        // Individual volume controls
        document.querySelectorAll('.sound-volume').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const soundId = e.target.dataset.sound;
                const volume = e.target.value / 100;
                this.setSoundVolume(soundId, volume);
                
                // Update label
                const label = e.target.nextElementSibling;
                label.textContent = `${e.target.value}%`;
            });
        });

        // Quick action buttons
        document.getElementById('playAllBtn').addEventListener('click', () => this.playAllSounds());
        document.getElementById('stopAllBtn').addEventListener('click', () => this.stopAllSounds());
        document.getElementById('randomBtn').addEventListener('click', () => this.randomMix());

        // New quote button
        document.getElementById('newQuoteBtn').addEventListener('click', () => this.newQuote());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.randomMix();
                    break;
                case 'Escape':
                    this.stopAllSounds();
                    break;
            }
        });
    }

    async loadSounds() {
        for (const [soundId, config] of Object.entries(this.soundConfigs)) {
            try {
                await this.loadSound(soundId, config);
            } catch (error) {
                console.warn(`Failed to load sound ${soundId}:`, error);
                this.showSoundError(soundId);
            }
        }
    }

    async loadSound(soundId, config) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            
            audio.addEventListener('canplaythrough', () => {
                this.sounds[soundId] = {
                    audio: audio,
                    config: config,
                    volume: config.defaultVolume,
                    isPlaying: false
                };
                resolve();
            });

            audio.addEventListener('error', () => {
                reject(new Error(`Failed to load audio for ${soundId}`));
            });

            // Set audio properties
            audio.loop = config.loop;
            audio.volume = config.defaultVolume * this.masterVolume;
            
            // Load the audio
            audio.src = config.url;
        });
    }

    toggleSound(soundId) {
        if (!this.sounds[soundId]) return;

        const sound = this.sounds[soundId];
        const button = document.querySelector(`[data-sound="${soundId}"] .sound-toggle`);
        const card = document.querySelector(`[data-sound="${soundId}"]`);

        if (sound.isPlaying) {
            this.stopSound(soundId);
        } else {
            this.playSound(soundId);
        }

        // Update UI
        this.updateSoundButton(button, sound.isPlaying);
        this.updateSoundCard(card, sound.isPlaying);
        this.updateStatus();
    }

    playSound(soundId) {
        if (!this.sounds[soundId]) return;

        const sound = this.sounds[soundId];
        
        try {
            sound.audio.currentTime = 0;
            sound.audio.play();
            sound.isPlaying = true;
            this.activeSounds.add(soundId);
        } catch (error) {
            console.warn(`Failed to play sound ${soundId}:`, error);
        }
    }

    stopSound(soundId) {
        if (!this.sounds[soundId]) return;

        const sound = this.sounds[soundId];
        
        try {
            sound.audio.pause();
            sound.audio.currentTime = 0;
            sound.isPlaying = false;
            this.activeSounds.delete(soundId);
        } catch (error) {
            console.warn(`Failed to stop sound ${soundId}:`, error);
        }
    }

    setSoundVolume(soundId, volume) {
        if (!this.sounds[soundId]) return;

        const sound = this.sounds[soundId];
        sound.volume = volume;
        sound.audio.volume = volume * this.masterVolume;
    }

    updateAllSoundVolumes() {
        for (const [soundId, sound] of Object.entries(this.sounds)) {
            sound.audio.volume = sound.volume * this.masterVolume;
        }
    }

    playAllSounds() {
        for (const soundId of Object.keys(this.soundConfigs)) {
            if (!this.sounds[soundId]?.isPlaying) {
                this.playSound(soundId);
                this.updateSoundButton(
                    document.querySelector(`[data-sound="${soundId}"] .sound-toggle`),
                    true
                );
                this.updateSoundCard(
                    document.querySelector(`[data-sound="${soundId}"]`),
                    true
                );
            }
        }
        this.updateStatus();
    }

    stopAllSounds() {
        for (const soundId of Object.keys(this.soundConfigs)) {
            if (this.sounds[soundId]?.isPlaying) {
                this.stopSound(soundId);
                this.updateSoundButton(
                    document.querySelector(`[data-sound="${soundId}"] .sound-toggle`),
                    false
                );
                this.updateSoundCard(
                    document.querySelector(`[data-sound="${soundId}"]`),
                    false
                );
            }
        }
        this.updateStatus();
    }

    randomMix() {
        this.stopAllSounds();
        
        // Randomly select 3-5 sounds to play
        const soundIds = Object.keys(this.soundConfigs);
        const numSounds = Math.floor(Math.random() * 3) + 3; // 3-5 sounds
        const selectedSounds = this.shuffleArray(soundIds).slice(0, numSounds);

        selectedSounds.forEach(soundId => {
            setTimeout(() => {
                this.playSound(soundId);
                this.updateSoundButton(
                    document.querySelector(`[data-sound="${soundId}"] .sound-toggle`),
                    true
                );
                this.updateSoundCard(
                    document.querySelector(`[data-sound="${soundId}"]`),
                    true
                );
            }, Math.random() * 1000); // Stagger the start times
        });

        this.updateStatus();
    }

    updateSoundButton(button, isPlaying) {
        if (!button) return;

        const icon = button.querySelector('i');
        const text = button.querySelector('.toggle-text');

        if (isPlaying) {
            icon.className = 'fas fa-stop';
            text.textContent = 'Stop';
            button.classList.add('playing');
        } else {
            icon.className = 'fas fa-play';
            text.textContent = 'Play';
            button.classList.remove('playing');
        }
    }

    updateSoundCard(card, isPlaying) {
        if (!card) return;

        if (isPlaying) {
            card.classList.add('playing');
        } else {
            card.classList.remove('playing');
        }
    }

    updateStatus() {
        const activeSoundsElement = document.getElementById('activeSounds');
        activeSoundsElement.textContent = this.activeSounds.size;
    }

    updateSessionTime() {
        const elapsed = Date.now() - this.sessionStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('sessionTime').textContent = timeString;
    }

    newQuote() {
        const quoteElement = document.getElementById('dailyQuote');
        const newQuote = this.getRandomQuote();
        
        // Add fade effect
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = `"${newQuote}"`;
            quoteElement.style.opacity = '1';
        }, 200);
    }

    getRandomQuote() {
        return this.dailyQuotes[Math.floor(Math.random() * this.dailyQuotes.length)];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    showSoundError(soundId) {
        const card = document.querySelector(`[data-sound="${soundId}"]`);
        if (card) {
            card.classList.add('error');
        }
    }

    // Utility method to create a simple tone for testing
    createTestTone(frequency = 440, duration = 1000) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }
}

// Initialize the simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new OfficeSimulator();
    
    // Add some console fun
    console.log('🏢 Office Simulator loaded!');
    console.log('💡 Try pressing Space for a random mix!');
    console.log('⌨️  Press Escape to stop all sounds');
    
    // Add Easter egg
    let clickCount = 0;
    const title = document.querySelector('.title');
    
    title.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            simulator.createTestTone(523.25, 500); // C5 note
            clickCount = 0;
        }
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause all sounds when page is hidden
        const simulator = window.simulator;
        if (simulator) {
            simulator.stopAllSounds();
        }
    }
});

// Medical Escort Service Landing Page - JavaScript

class MedicalEscortLanding {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.indicators = [];
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        
        this.init();
    }

    init() {
        this.initCarousel();
        this.initMobileNavigation();
        this.initSmoothScrolling();
        this.initScrollEffects();
        this.startAutoPlay();
    }

    // Carousel functionality
    initCarousel() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.indicator');
        
        // Previous button
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        // Next button
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause autoplay on hover
        const carousel = document.getElementById('heroCarousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Mobile navigation functionality
    initMobileNavigation() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (mobileMenuToggle && mobileNav) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuToggle.classList.toggle('active');
                mobileNav.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                    mobileMenuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                }
            });
        }
    }

    // Smooth scrolling for navigation links
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = 70; // Fixed header height
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Scroll effects
    initScrollEffects() {
        // Header scroll effect
        const header = document.querySelector('.header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove header shadow based on scroll position
            if (scrollTop > 50) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }

            // Hide/show header on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        });

        // Active navigation link highlighting
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Form handling (for future use)
    initForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Add form submission logic here
                console.log('Form submitted:', form);
            });
        });
    }

    // Button click handlers
    initButtonHandlers() {
        // Hero CTA buttons
        const heroCtaButtons = document.querySelectorAll('.hero-cta');
        heroCtaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const buttonText = button.textContent.trim();
                
                switch(buttonText) {
                    case '立即预约':
                        this.scrollToSection('services');
                        break;
                    case '了解更多':
                        this.scrollToSection('services');
                        break;
                    case '联系我们':
                        this.scrollToSection('contact');
                        break;
                    default:
                        console.log('CTA button clicked:', buttonText);
                }
            });
        });

        // Service buttons
        const serviceButtons = document.querySelectorAll('.service-btn');
        serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Service button clicked');
                // Add service button logic here
            });
        });

        // Product buttons
        const productButtons = document.querySelectorAll('.product-btn');
        productButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Product button clicked');
                // Add product button logic here
            });
        });

        // Login button
        const loginButton = document.querySelector('.login-btn');
        if (loginButton) {
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Login button clicked');
                // Add login logic here
            });
        }
    }

    scrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const headerHeight = 70;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Performance optimization
    initLazyLoading() {
        // Lazy load images (for future use)
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Analytics and tracking (for future use)
    trackEvent(eventName, eventData = {}) {
        // Add analytics tracking here
        console.log('Event tracked:', eventName, eventData);
    }

    // Error handling
    handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        // Add error reporting logic here
    }
}

// Initialize the landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        const landingPage = new MedicalEscortLanding();
        
        // Initialize additional features
        landingPage.initForms();
        landingPage.initButtonHandlers();
        landingPage.initLazyLoading();
        
        // Make it globally accessible for debugging
        window.medicalEscortLanding = landingPage;
        
        console.log('🏥 Medical Escort Landing Page loaded successfully!');
        
    } catch (error) {
        console.error('Failed to initialize landing page:', error);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause autoplay when page is hidden
        if (window.medicalEscortLanding) {
            window.medicalEscortLanding.pauseAutoPlay();
        }
    } else {
        // Resume autoplay when page is visible
        if (window.medicalEscortLanding) {
            window.medicalEscortLanding.startAutoPlay();
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Debounce resize events for performance
    const debouncedResize = () => {
        // Add resize handling logic here
        console.log('Window resized');
    };
    
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(debouncedResize, 250);
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (window.medicalEscortLanding) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                window.medicalEscortLanding.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                window.medicalEscortLanding.nextSlide();
                break;
            case 'Escape':
                // Close mobile menu
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                const mobileNav = document.getElementById('mobileNav');
                if (mobileMenuToggle && mobileNav) {
                    mobileMenuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                }
                break;
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Track page load
    if (window.medicalEscortLanding) {
        window.medicalEscortLanding.trackEvent('page_load', {
            loadTime: performance.now()
        });
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (window.medicalEscortLanding) {
            if (diff > 0) {
                // Swipe left - next slide
                window.medicalEscortLanding.nextSlide();
            } else {
                // Swipe right - previous slide
                window.medicalEscortLanding.prevSlide();
            }
        }
    }
} 