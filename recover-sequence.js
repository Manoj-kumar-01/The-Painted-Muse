const fs = require('fs');
const logPath = 'C:/Users/manoj/.gemini/antigravity-ide/brain/2c4b7d3f-d303-4cda-8a08-13a694a25fb0/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf-8').split('\n');

let sequence = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    try {
        const data = JSON.parse(line);
        if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
            for (const call of data.tool_calls) {
                if (call.name === 'run_command' && call.args.CommandLine && call.args.CommandLine.startsWith('node -e')) {
                    sequence.push({ step: data.step_index, cmd: call.args.CommandLine });
                }
            }
        }
    } catch(e) {}
}
sequence.sort((a, b) => a.step - b.step);
let out = '';
for (const s of sequence) {
    out += // Step \n;
    out += s.cmd + '\n\n';
}
fs.writeFileSync('replay.bat', out);
console.log('Saved replay sequence to replay.bat, count: ' + sequence.length);
