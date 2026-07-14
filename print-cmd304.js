const fs = require('fs');
const logPath = 'C:/Users/manoj/.gemini/antigravity-ide/brain/2c4b7d3f-d303-4cda-8a08-13a694a25fb0/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf-8').split('\n');
for (const line of lines) {
    if(!line) continue;
    try {
        const d = JSON.parse(line);
        if (d.step_index === 304 && d.tool_calls) {
            console.log(d.tool_calls[0].args.CommandLine);
        }
    } catch(e){}
}
