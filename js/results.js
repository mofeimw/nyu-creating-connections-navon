const results = {
    calculateStats(trialData) {
        // overall stats
        const accuracy = (trialData.filter(t => t.correct).length / trialData.length) * 100;
        const avgRT = trialData.reduce((sum, t) => sum + t.reactionTime, 0) / trialData.length;

        // categorize trials
        const globalTrials = trialData.filter(t => t.targetPosition === 'Global');
        const localTrials = trialData.filter(t => t.targetPosition === 'Local');
        const absentTrials = trialData.filter(t => t.targetPosition === 'Absent');

        // calculate category accuracies
        const globalAccuracy = globalTrials.length ? 
              (globalTrials.filter(t => t.correct).length / globalTrials.length) * 100 : 0;
        const localAccuracy = localTrials.length ? 
              (localTrials.filter(t => t.correct).length / localTrials.length) * 100 : 0;
        const absentAccuracy = absentTrials.length ? 
              (absentTrials.filter(t => t.correct).length / absentTrials.length) * 100 : 0;

        // calculate category reaction times
        const globalRT = globalTrials.length ? 
              globalTrials.reduce((sum, t) => sum + t.reactionTime, 0) / globalTrials.length : 0;
        const localRT = localTrials.length ? 
              localTrials.reduce((sum, t) => sum + t.reactionTime, 0) / localTrials.length : 0;
        const absentRT = absentTrials.length ? 
              absentTrials.reduce((sum, t) => sum + t.reactionTime, 0) / absentTrials.length : 0;

        return {
            overall: { accuracy, avgRT },
            global: { trials: globalTrials.length, accuracy: globalAccuracy, avgRT: globalRT },
            local: { trials: localTrials.length, accuracy: localAccuracy, avgRT: localRT },
            absent: { trials: absentTrials.length, accuracy: absentAccuracy, avgRT: absentRT }
        };
    },

    // show general stats
    showResults(trialData) {
        const stats = this.calculateStats(trialData);
        display.showSection('results');
        
        document.getElementById('results').innerHTML = `
            <h2>Test Results</h2>
            <div class="summary-stats">
                <h3>Overall Performance</h3>
                <p>Total Trials: ${trialData.length}</p>
                <p>Overall Accuracy: ${stats.overall.accuracy.toFixed(1)}%</p>
                <p>Average Response Time: ${(stats.overall.avgRT / 1000).toFixed(3)} seconds</p>
                
                <h3>Global Target Performance</h3>
                <p>Trials: ${stats.global.trials}</p>
                <p>Accuracy: ${stats.global.accuracy.toFixed(1)}%</p>
                <p>Average Response Time: ${(stats.global.avgRT / 1000).toFixed(3)} seconds</p>

                <h3>Local Target Performance</h3>
                <p>Trials: ${stats.local.trials}</p>
                <p>Accuracy: ${stats.local.accuracy.toFixed(1)}%</p>
                <p>Average Response Time: ${(stats.local.avgRT / 1000).toFixed(3)} seconds</p>

                <h3>Target Absent Performance</h3>
                <p>Trials: ${stats.absent.trials}</p>
                <p>Accuracy: ${stats.absent.accuracy.toFixed(1)}%</p>
                <p>Average Response Time: ${(stats.absent.avgRT / 1000).toFixed(3)} seconds</p>
            </div>

            <table class="results-table">
                <thead>
                    <tr>
                        <th>Trial</th>
                        <th>Target</th>
                        <th>Large Letter</th>
                        <th>Small Letters</th>
                        <th>Target Position</th>
                        <th>Response</th>
                        <th>Correct</th>
                        <th>Time (s)</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.generateTrialRows(trialData)}
                </tbody>
            </table>
            <div class="button-container">
                <button class="button" onclick="test.returnToStart()">Try Again</button>
            </div>
        `;
    },

    // show trail specific data
    generateTrialRows(trialData) {
        return trialData.map(trial => `
            <tr>
                <td>${trial.trial}</td>
                <td>${trial.target}</td>
                <td>${trial.global}</td>
                <td>${trial.local}</td>
                <td>${trial.targetPosition}</td>
                <td>${trial.response ? 'Yes' : 'No'}</td>
                <td class="${trial.correct ? 'trial-correct' : 'trial-incorrect'}">
                    ${trial.correct ? '✓' : '✗'}
                </td>
                <td>${(trial.reactionTime / 1000).toFixed(3)}</td>
            </tr>
        `).join('');
    }
};
