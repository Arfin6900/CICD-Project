const fs = require('fs');
const path = './src/config/config.js';

// Function to check if a line is commented
const isCommented = (line) => {
    return line.trim().startsWith('//');
};

try {
    const fileContent = fs.readFileSync(path, 'utf8');
    const lines = fileContent.split('\n');
    let baseUrl = null;

    // Loop through each line in the file
    for (let line of lines) {
        if (!isCommented(line) && line.includes('baseUrl')) {
            // Extract the value of baseUrl
            const match = line.match(/baseUrl\s*=\s*['"`](.*?)['"`]/);
            if (match) {
                baseUrl = match[1];
                break;
            }
        }
    }

    if (baseUrl && baseUrl.includes('localhost')) {
        console.log('baseUrl includes localhost.');
        process.exit(1); // exit with failure
    } else if (baseUrl) {
        console.log('baseUrl does not include localhost.');
        process.exit(0); // exit with success
    } else {
        console.log('baseUrl not found.');
        process.exit(1); // exit with failure if baseUrl not found
    }
} catch (err) {
    console.error('Error reading the file:', err);
    process.exit(1); // exit with failure if there's an error
}
