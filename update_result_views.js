const fs = require('fs');
const path = require('path');

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
        // Check if geoZones is already passed to prevent double injection
        if (content.includes('geoZones={geoZones}') && content.includes('<ResultView')) {
            // But wait, there might be PrintReport which already has geoZones={geoZones}.
            // So we strictly check if ResultView lacks them.
        }
        
        // Regex to match <ResultView ... bioticFamilies={bioticFamilies} 
        const regex = /(<ResultView\s+[\s\S]*?result=\{result\}\s*)([\s\S]*?)(bioticFamilies=\{bioticFamilies\})/g;
        content = content.replace(regex, (match, p1, p2, p3) => {
            if (p2.includes('geoZones')) return match; // already has it
            return `$1\n${p2}geoZones={geoZones}\n${p2}waterTypes={waterTypes}\n${p2}bioticFamilies={bioticFamilies}`;
        });
        
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${file}`);
    } else {
        console.warn(`File not found: ${fullPath}`);
    }
});
