const fs = require('fs');
const cp = require('child_process');
const logPath = 'C:/Users/manoj/.gemini/antigravity-ide/brain/2c4b7d3f-d303-4cda-8a08-13a694a25fb0/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf-8').split('\n');

// start from current views
try { fs.copyFileSync('views/artist-home.ejs', 'views/artist-home-test.ejs'); } catch(e){}

let sequence = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    try {
        const data = JSON.parse(line);
        if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
            for (const call of data.tool_calls) {
                if (call.name === 'run_command' && call.args.CommandLine && call.args.CommandLine.startsWith('node -e')) {
                    // modify the command to operate on artist-home-test.ejs
                    let cmd = call.args.CommandLine.replace(/views\/artist-home\.ejs/g, 'views/artist-home-test.ejs');
                    sequence.push({ step: data.step_index, cmd: cmd });
                }
            }
        }
    } catch(e) {}
}

sequence.sort((a, b) => a.step - b.step);

console.log('Running ' + sequence.length + ' scripts...');
for (const s of sequence) {
    try {
        console.log('Running step ' + s.step);
        cp.execSync(s.cmd, {stdio: 'ignore'});
    } catch (err) {
        console.error('Error at step ' + s.step, err.message);
    }
}
console.log('Finished recreating artist-home-test.ejs!');
