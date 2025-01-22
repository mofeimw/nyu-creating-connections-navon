const test = {
    isDemo: false,
    currentTrial: 0,
    totalTrials: 20,
    trialData: [],
    currentTarget: '',
    currentStimulus: null,
    startTime: null,

    generateTrial() {
        // select one target letter randomly
        this.currentTarget = letters[Math.floor(Math.random() * letters.length)];
        
        // randomly decide if trial should contain target
        const shouldContainTarget = Math.random() < 0.5;
        
        if (shouldContainTarget) {
            // use target letter in either global or local position
            const otherLetters = letters.filter(l => l !== this.currentTarget);
            const otherLetter = otherLetters[Math.floor(Math.random() * otherLetters.length)];
            const isGlobal = Math.random() < 0.5;
            
            this.currentStimulus = {
                global: isGlobal ? this.currentTarget : otherLetter,
                local: isGlobal ? otherLetter : this.currentTarget,
                containsTarget: true,
                targetPosition: isGlobal ? 'Global' : 'Local'
            };
        } else {
            // use non-target letters
            const availableLetters = letters.filter(l => l !== this.currentTarget);
            const global = availableLetters[Math.floor(Math.random() * availableLetters.length)];
            const local = availableLetters[Math.floor(Math.random() * availableLetters.length)];
            this.currentStimulus = {
                global,
                local,
                containsTarget: false,
                targetPosition: 'Absent'
            };
        }
        return this.currentStimulus;
    },

    showTrial() {
        const stimulus = this.generateTrial();
        display.updateTargetInfo(`Target letter: ${this.currentTarget}`);
        display.createNavonFigure(stimulus.global, stimulus.local);
        this.startTime = Date.now();
    },

    // start demo test
    startDemo() {
        this.isDemo = true;
        this.currentTrial = 0;
        this.trialData = [];
        
        // set up demo trial
        this.currentTarget = 'H';
        this.currentStimulus = {
            global: 'S',
            local: 'H',
            containsTarget: true,
            targetPosition: 'Local'
        };

        display.showSection('test-area');
        display.showDemoInstructions();
        display.createNavonFigure(this.currentStimulus.global, this.currentStimulus.local);
        this.startTime = Date.now();
    },

    // start test
    startTest() {
        this.isDemo = false;
        this.totalTrials = parseInt(document.getElementById('trialCount').value);
        this.totalTrials = Math.min(Math.max(this.totalTrials, 5), 100);
        
        this.currentTrial = 0;
        this.trialData = [];
        
        display.showSection('test-area');
        display.resetResponseButtons();
        this.showTrial();
    },

    // handle responses and update data accordingly
    handleResponse(response) {
        const endTime = Date.now();
        const reactionTime = endTime - this.startTime;

        if (this.isDemo) {
            const correct = response === this.currentStimulus.containsTarget;
            display.showDemoFeedback(correct);
            return;
        }

        this.trialData.push({
            trial: this.currentTrial + 1,
            target: this.currentTarget,
            global: this.currentStimulus.global,
            local: this.currentStimulus.local,
            targetPosition: this.currentStimulus.targetPosition,
            containsTarget: this.currentStimulus.containsTarget,
            response: response,
            correct: response === this.currentStimulus.containsTarget,
            reactionTime: reactionTime
        });

        if (this.currentTrial < this.totalTrials - 1) {
            this.currentTrial++;
            this.showTrial();
        } else {
            results.showResults(this.trialData);
        }
    },

    // return to starting instruction page
    returnToStart() {
        display.showSection('instructions');
        display.resetResponseButtons();
    }
};
