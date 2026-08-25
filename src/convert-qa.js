// src/convert-qa.js
const fs = require('fs');
const path = require('path');

// 项目根目录（src 的上一级）
const rootDir = path.resolve(__dirname, '..');
const inputFile = path.join(rootDir, 'qa_data.txt');
const outputFile = path.join(rootDir, 'src', 'data', 'qa.js');

// 检查输入文件是否存在
if (!fs.existsSync(inputFile)) {
  console.error('❌ 错误：找不到 qa_data.txt，请确保它放在项目根目录（与 src 同级）');
  process.exit(1);
}

// 读取并解析
const content = fs.readFileSync(inputFile, 'utf-8');
const entries = content.split(/\n\s*\n/);
const qaList = [];

for (const entry of entries) {
  const lines = entry.split('\n');
  let q = '', k = '', a = '';
  for (const line of lines) {
    if (line.startsWith('Q:')) q = line.replace('Q:', '').trim();
    else if (line.startsWith('K:')) k = line.replace('K:', '').trim();
    else if (line.startsWith('A:')) a = line.replace('A:', '').trim();
  }
  if (q && a) {
    qaList.push({
      keywords: k ? k.split(',').map(s => s.trim()) : [],
      q,
      a
    });
  }
}

// 确保输出目录存在
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 写入文件
const output = `// 由 src/convert-qa.js 自动生成，请勿手动修改\n// 数据来源：qa_data.txt（共 ${qaList.length} 条）\nexport const QA_DATA = ${JSON.stringify(qaList, null, 2)};\n`;

fs.writeFileSync(outputFile, output);
console.log(`✅ 成功生成 ${qaList.length} 条问答数据 -> ${outputFile}`);
