const fs = require('fs');
const logPath = 'C:/Users/manoj/.gemini/antigravity-ide/brain/2c4b7d3f-d303-4cda-8a08-13a694a25fb0/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf-8').split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    try {
        const data = JSON.parse(line);
        if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
            for (const call of data.tool_calls) {
                if (call.name === 'write_to_file' && call.args.TargetFile && call.args.TargetFile.includes('artist-home.ejs')) {
                    console.log('Found write_to_file at step', data.step_index, 'Content length:', call.args.CodeContent.length);
                }
                if ((call.name === 'multi_replace_file_content' || call.name === 'replace_file_content') && call.args.TargetFile && call.args.TargetFile.includes('artist-home.ejs')) {
                    console.log('Found replace at step', data.step_index);
                }
            }
        }
    } catch(e) {
    }
}
