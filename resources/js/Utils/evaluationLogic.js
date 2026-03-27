export const getAbioticStatus = (parameter, value, waterTypeName, geoZoneName) => {
    const val = parseFloat(value);
    
    switch(parameter) {
        case 'Salinitas':
            if (waterTypeName === 'Marine') {
                if (val >= 32 && val <= 38) return { status: 'Normal', bobot: 3 };
                if ((val >= 28 && val <= 31) || (val >= 39 && val <= 41)) return { status: 'Mendekati', bobot: 2 };
                if (val < 28 || val > 41) return { status: 'Jauh Dari Normal', bobot: 1 };
            } else if (waterTypeName === 'Freshwater' || waterTypeName === 'Fresh') {
                if (val >= 0 && val <= 0.5) return { status: 'Normal', bobot: 3 };
                if (val >= 0.6 && val <= 4) return { status: 'Mendekati', bobot: 2 };
                if (val > 4) return { status: 'Jauh Dari Normal', bobot: 1 };
            } else if (waterTypeName === 'Estuarine') {
                if (val >= 5 && val <= 25) return { status: 'Normal', bobot: 3 };
                if ((val >= 3 && val <= 4) || (val >= 26 && val <= 30)) return { status: 'Mendekati', bobot: 2 };
                if (val < 3 || val > 30) return { status: 'Jauh Dari Normal', bobot: 1 };
            }
            return { status: '-', bobot: '-' };
            
        case 'Suhu':
            if (geoZoneName === 'Temperate') {
                if (val >= 5 && val <= 22) return { status: 'Normal', bobot: 3 };
                if ((val >= 3 && val <= 4) || (val >= 23 && val <= 25)) return { status: 'Mendekati', bobot: 2 };
                if (val < 3 || val > 25) return { status: 'Jauh Dari Normal', bobot: 1 };
            } else if (geoZoneName === 'Tropical') {
                if (val >= 18 && val <= 28) return { status: 'Normal', bobot: 3 };
                if ((val >= 14 && val <= 18) || (val >= 28 && val <= 32)) return { status: 'Mendekati', bobot: 2 };
                if (val < 14 || val > 32) return { status: 'Jauh Dari Normal', bobot: 1 };
            }
            return { status: '-', bobot: '-' };
            
        case 'DO':
            if (val >= 6 && val <= 13) return { status: 'Normal', bobot: 3 };
            if (val >= 4 && val <= 5.9) return { status: 'Mendekati', bobot: 2 };
            if (val < 4) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'pH':
            if (val >= 7 && val <= 8) return { status: 'Normal', bobot: 3 };
            if ((val >= 5 && val <= 6) || (val > 8 && val <= 9)) return { status: 'Mendekati', bobot: 2 };
            if (val < 5 || val > 9) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'NH3':
        case 'Ammonia':
            if (val >= 0 && val <= 0.02) return { status: 'Normal', bobot: 3 };
            if (val >= 0.03 && val <= 0.05) return { status: 'Mendekati', bobot: 2 };
            if (val > 0.05) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'NH2':
            if (val >= 0 && val <= 0.10) return { status: 'Normal', bobot: 3 };
            if (val >= 0.11 && val <= 0.50) return { status: 'Mendekati', bobot: 2 };
            if (val > 0.50) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        default:
            return { status: '-', bobot: '-' };
    }
};

export const getBioticIndexStatus = (parameter, value) => {
    const val = parseFloat(value);
    
    switch(parameter) {
        case 'Similarity':
            if (val >= 0.7 && val <= 1) return { status: 'Normal', bobot: 10 };
            if (val >= 0.5 && val <= 0.69) return { status: 'Mendekati', bobot: 6 };
            if (val < 0.5) return { status: 'Jauh Dari Normal', bobot: 3 };
            return { status: '-', bobot: '-' };
            
        case 'Dominance':
            if (val < 0.31) return { status: 'Normal', bobot: 10 };
            if (val >= 0.31 && val <= 0.68) return { status: 'Mendekati', bobot: 6 };
            if (val >= 0.69 && val <= 1) return { status: 'Jauh Dari Normal', bobot: 3 };
            return { status: '-', bobot: '-' };
            
        case 'Diversity':
            if (val >= 3 && val <= 4) return { status: 'Normal', bobot: 10 };
            if (val >= 2 && val <= 2.9) return { status: 'Mendekati', bobot: 6 };
            if (val >= 0 && val <= 1.9) return { status: 'Jauh Dari Normal', bobot: 3 };
            return { status: '-', bobot: '-' };
            
        case 'Total Abundance':
            if (val > 1000) return { status: 'Normal', bobot: 10 };
            if (val >= 500 && val <= 999) return { status: 'Mendekati', bobot: 6 };
            if (val < 500) return { status: 'Jauh Dari Normal', bobot: 3 };
            return { status: '-', bobot: '-' };
            
        case 'Number of Species':
            if (val > 100) return { status: 'Normal', bobot: 10 };
            if (val >= 50 && val <= 100) return { status: 'Mendekati', bobot: 6 };
            if (val < 50) return { status: 'Jauh Dari Normal', bobot: 3 };
            return { status: '-', bobot: '-' };
            
        default:
            return { status: '-', bobot: '-' };
    }
};

export const getAdditionalAbioticStatus = (parameter, value) => {
    const val = parseFloat(value);
    
    switch(parameter) {
        case 'Conductivity':
            if (val >= 5 && val <= 10) return { status: 'Normal', bobot: 2 };
            if ((val >= 3 && val <= 5 && val < 5) || (val >= 11 && val <= 50)) return { status: 'Mendekati', bobot: 1.5 };
            // Note: 5 is both Normal and Mendekati according to rules, Normal takes precedence (wait: Mendekati is 3-5? So 5 is normal, <5 is mendekati, wait. Let's precise: normal 5-10, mendekati 3-4? Prompt: Mendekati 3-5 dan 11-50. If 5 is normal, then >4 and <5? Normal 5-10.
            // Using logic:
            if ((val >= 3 && val < 5) || (val >= 11 && val <= 50)) return { status: 'Mendekati', bobot: 1.5 };
            if (val < 3 || val > 50) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'Ratio C/N':
            if (val >= 4 && val <= 10) return { status: 'Normal', bobot: 2 };
            if ((val >= 2 && val <= 3) || (val >= 11 && val <= 20)) return { status: 'Mendekati', bobot: 1.5 };
            if (val < 2 || val > 20) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'Turbidity':
            if (val < 5) return { status: 'Normal', bobot: 2 };
            if (val >= 5 && val <= 100) return { status: 'Mendekati', bobot: 1.5 };
            // Prompt says Mendekati 6-100? If so >= 5 means e.g. 5 is Normal. So <5 Normal. >= 5 to 100 is Mendekati? Prompt: Normal <5. Mendekati 6-100.
            if (val > 100) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: 'Normal', bobot: 2 }; // Fallback? 
            
        case 'Clay':
            if (val >= 10 && val <= 20) return { status: 'Normal', bobot: 2 };
            if (val >= 5 && val < 10) return { status: 'Mendekati', bobot: 1.5 };
            if (val < 5 || val > 20) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'Sand':
            if (val >= 5 && val <= 10) return { status: 'Normal', bobot: 2 };
            if (val >= 11 && val <= 20) return { status: 'Mendekati', bobot: 1.5 };
            if (val < 5 || val > 20) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'Silt':
            if (val >= 50 && val <= 90) return { status: 'Normal', bobot: 2 };
            if (val >= 30 && val < 50) return { status: 'Mendekati', bobot: 1.5 };
            if (val < 30 || val > 90) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'Coarse Sediment':
            if (val >= 30) return { status: 'Normal', bobot: 2 }; // Prompt: >30, assuming >= 30
            if (val >= 10 && val < 30) return { status: 'Mendekati', bobot: 1.5 };
            if (val < 10) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'Total Organic Dissolved':
            if (val >= 0 && val <= 10) return { status: 'Normal', bobot: 2 };
            if (val >= 11 && val <= 25) return { status: 'Mendekati', bobot: 1.5 };
            if (val > 25) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'Total Organic Substrate':
            if (val >= 0 && val <= 5) return { status: 'Normal', bobot: 2 };
            if (val > 5 && val <= 15) return { status: 'Mendekati', bobot: 1.5 }; // Prompt: 5-15.
            if (val > 15) return { status: 'Jauh Dari Normal', bobot: 1 };
            return { status: '-', bobot: '-' };
            
        case 'Macrozoobenthos Density':
            if (val > 500) return { status: 'Normal', bobot: 2 };
            if (val >= 101 && val <= 500) return { status: 'Mendekati', bobot: 1.5 };
            if (val <= 100) return { status: 'Jauh Dari Normal', bobot: 1 }; // Prompt: <100, assuming <= 100 to catch 100
            return { status: '-', bobot: '-' };
            
        default:
            return { status: '-', bobot: '-' };
    }
};
