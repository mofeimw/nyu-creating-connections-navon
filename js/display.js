const display = {
    // create and display a Navon figure
    createNavonFigure(global, local) {
        const navonDisplay = document.getElementById('navon-display');
        navonDisplay.innerHTML = '';
        const pattern = letterPatterns[global];

        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                const cell = document.createElement('div');
                cell.className = 'navon-cell';
                cell.textContent = pattern[i][j] ? local : '';
                navonDisplay.appendChild(cell);
            }
        }
    },

    // show/hide different sections of the interface
    showSection(sectionId) {
        const sections = ['instructions', 'test-area', 'results'];
        sections.forEach(section => {
            document.getElementById(section).style.display = 
                section === sectionId ? 'block' : 'none';
        });
    },

    // update the target information display
    updateTargetInfo(text) {
        document.getElementById('target-info').textContent = text;
    },

    // show demo instructions
    showDemoInstructions() {
        document.getElementById('target-info').innerHTML = `
            <div class="demo-instructions">
                <h3>Demo Trial</h3>
                <p>Target letter: H</p>
                <p>Look at both the large letter shape and the small letters.</p>
                <p>Click "Yes" if you see H anywhere, "No" if you don't.</p>
            </div>
        `;
    },

    // show demo feedback
    showDemoFeedback(correct) {
        document.getElementById('target-info').innerHTML = `
            <div class="demo-instructions">
                <h3>Demo Complete</h3>
                <p>Your answer was ${correct ? 'correct!' : 'incorrect.'}</p>
                <p>The large letter was 'S' made of small 'H's.</p>
                <p>Since 'H' was present, the correct answer was "Yes".</p>
                <button class="button" onclick="test.returnToStart()">Return to Start</button>
            </div>
        `;
        document.getElementById('response-buttons').style.display = 'none';
    },

    // reset response buttons display
    resetResponseButtons() {
        document.getElementById('response-buttons').style.display = 'flex';
    }
};
