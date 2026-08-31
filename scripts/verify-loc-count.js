const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const EXCLUDE_DIRS = ['node_modules', 'dist', 'coverage', '.git', '.vscode', '.idea'];
const EXTENSIONS = ['.ts', '.js', '.json', '.md', '.yaml', '.yml', 'Dockerfile'];

function countLinesInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.split('\n').length;
  } catch (err) {
    return 0;
  }
}

function traverseDirectory(dirPath) {
  let totalLines = 0;
  let fileCount = 0;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(entry.name)) {
        const { lines, count } = traverseDirectory(fullPath);
        totalLines += lines;
        fileCount += count;
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.includes(ext) || entry.name === 'Dockerfile') {
        const lines = countLinesInFile(fullPath);
        totalLines += lines;
        fileCount++;
      }
    }
  }

  return { lines: totalLines, count: fileCount };
}

const { lines, count } = traverseDirectory(ROOT_DIR);

console.log('====================================================');
console.log(`📊 YUMDROP MICROSERVICES CODEBASE METRICS SUMMARY`);
console.log('====================================================');
console.log(`Total Files Processed : ${count}`);
console.log(`Total Lines of Code   : ${lines.toLocaleString()} LOC`);
console.log('====================================================');

if (lines >= 50000) {
  console.log(`✅ REQUIREMENT MET: Codebase exceeds 50,000 LOC target!`);
  process.exit(0);
} else {
  console.log(`⚠️ TARGET IN PROGRESS: Current LOC is ${lines.toLocaleString()} / 50,000 LOC.`);
}
