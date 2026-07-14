const fs = require('fs');
const logPath = 'C:/Users/manoj/.gemini/antigravity-ide/brain/2c4b7d3f-d303-4cda-8a08-13a694a25fb0/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf-8').split('\n');

let fileContent = fs.readFileSync('views/artist-home.ejs', 'utf-8');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    try {
        const data = JSON.parse(line);
        if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
            for (const call of data.tool_calls) {
                if ((call.name === 'multi_replace_file_content' || call.name === 'replace_file_content') && call.args.TargetFile && call.args.TargetFile.includes('artist-home.ejs')) {
                    if (call.name === 'replace_file_content') {
                        fileContent = fileContent.replace(call.args.TargetContent, call.args.ReplacementContent);
                    } else if (call.name === 'multi_replace_file_content') {
                        for (const chunk of call.args.ReplacementChunks) {
                            fileContent = fileContent.replace(chunk.TargetContent, chunk.ReplacementContent);
                        }
                    }
                }
                if (call.name === 'write_to_file' && call.args.TargetFile && call.args.TargetFile.includes('artist-home.ejs')) {
                    fileContent = call.args.CodeContent;
                }
            }
        }
    } catch(e) {
    }
}

fs.writeFileSync('views/artist-home.ejs.recovered', fileContent);
console.log('Saved recovered file to views/artist-home.ejs.recovered');
