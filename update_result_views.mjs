import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'resources/js/Pages/Operator/Kelola Station/Result.jsx',
    'resources/js/Pages/Operator/Kelola Station/Edit.jsx',
    'resources/js/Pages/Operator/Hitung Kualitas Air/page.jsx',
    'resources/js/Pages/Operator/History/Result.jsx',
    'resources/js/Pages/Operator/History/Edit.jsx',
    'resources/js/Pages/Member/Hitung Kualitas Air/page.jsx',
    'resources/js/Pages/Member/History/Result.jsx',
    'resources/js/Pages/Member/History/Edit.jsx',
    'resources/js/Pages/Admin/Kelola Station/Result.jsx',
    'resources/js/Pages/Admin/Kelola Station/Edit.jsx',
    'resources/js/Pages/Admin/Hitung Kualitas Air/page.jsx',
    'resources/js/Pages/Admin/History/Result.jsx',
    'resources/js/Pages/Admin/History/Edit.jsx'
];

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Regex to match <ResultView ... bioticFamilies={bioticFamilies} 
        const regex = /(<ResultView\s+[\s\S]*?result=\{result\}\s*)([\s\S]*?)(bioticFamilies=\{bioticFamilies\})/g;
        content = content.replace(regex, (match, p1, p2, p3) => {
            if (p2.includes('geoZones')) return match; // already has it
            return `${p1}${p2}geoZones={geoZones}\n${p2}waterTypes={waterTypes}\n${p2}${p3}`;
        });
        
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${file}`);
    } else {
        console.warn(`File not found: ${fullPath}`);
    }
});
