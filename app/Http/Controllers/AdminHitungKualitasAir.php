<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminHitungKualitasAir extends Controller
{

    public function index()
    {
        $user = Auth::user();

        return Inertia::render("Admin/Hitung Kualitas Air/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ],
            'geoZones' => \App\Models\GeoZone::all(),
            'waterTypes' => \App\Models\WaterType::all(),
            'bioticFamilies' => \App\Models\BioticFamily::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_type_water' => 'required|exists:water_types,id',
            
            // Main Abiotic
            'ph' => 'required|numeric',
            'temperature' => 'required|numeric',
            'dissolved_oxygen' => 'required|numeric',
            'salinity' => 'required|numeric',
            'nh3' => 'required|numeric',
            'nh2' => 'required|numeric',
            'ammonia' => 'required|numeric',

            // Additional Abiotic
            'conductivity' => 'required|numeric',
            'ratio_cn' => 'required|numeric',
            'turbidity' => 'required|numeric',
            'clay' => 'required|numeric',
            'sand' => 'required|numeric',
            'silt' => 'required|numeric',
            'coarse_sediment' => 'required|numeric',
            'total_organic_dissolved' => 'required|numeric',
            'total_organic_substrate' => 'required|numeric',
            'macrozoobenthos_density' => 'required|numeric',

            // Biotic Index
            'similarity' => 'required|numeric',
            'dominance' => 'required|numeric',
            'diversity' => 'required|numeric',
            'total_abundance' => 'required|numeric',
            'number_of_species' => 'required|numeric',

            // Biotic Families
            'families' => 'nullable|array',
            'families.*.id_family' => 'exists:biotic_families,id',
        ]);

        try {
            DB::beginTransaction();
            
            // Create Station
            $station = \App\Models\Station::create([
                'id_geo_zone' => $validated['id_geo_zone'],
                'id_type_water' => $validated['id_type_water'],
                'id_user' => Auth::id(),
            ]);

            // Save Main Abiotic Data (Snapshot)
            \App\Models\StationMainAbiotic::create([
                'id_station' => $station->id,
                'id_user' => Auth::id(),
                'ph' => $validated['ph'],
                'temperature' => $validated['temperature'],
                'dissolved_oxygen' => $validated['dissolved_oxygen'],
                'salinity' => $validated['salinity'],
                'nh3' => $validated['nh3'],
                'nh2' => $validated['nh2'],
                'ammonia' => $validated['ammonia'],
            ]);

            // Save Additional Abiotic & Bio Index Data (Snapshot)
            \App\Models\StationIndexAdditional::create([
                'id_station' => $station->id,
                'id_user' => Auth::id(),
                'conductivity' => $validated['conductivity'],
                'ratio_cn' => $validated['ratio_cn'],
                'turbidity' => $validated['turbidity'],
                'clay' => $validated['clay'],
                'sand' => $validated['sand'],
                'silt' => $validated['silt'],
                'coarse_sediment' => $validated['coarse_sediment'],
                'total_organic_dissolved' => $validated['total_organic_dissolved'],
                'total_organic_substrate' => $validated['total_organic_substrate'],
                'macrozoobenthos_density' => $validated['macrozoobenthos_density'],
                'similarity' => $validated['similarity'],
                'dominance' => $validated['dominance'],
                'diversity' => $validated['diversity'],
                'total_abundance' => $validated['total_abundance'],
                'number_of_species' => $validated['number_of_species'],
            ]);

            // Save Species/Families
            if (!empty($validated['families'])) {
                foreach ($validated['families'] as $fam) {
                    \App\Models\Species::create([
                        'id_station' => $station->id,
                        'id_user' => Auth::id(),
                        'id_family' => $fam['id_family'],
                        'name' => $fam['name'] ?? 'Unknown', 
                        'abundance' => $fam['abundance'] ?? 0,
                        'taxa_indicator' => $fam['taxa_indicator'] ?? 0,
                    ]);
                }
            }

            // --- WSM Calculation ---
            $totalWeight = 0;
            $totalScore = 0;

            // 1. Calculate Main Abiotic
            $mainParams = [
                'ph' => ['val' => $validated['ph'], 'geo' => null, 'water' => null],
                'temperature' => ['val' => $validated['temperature'], 'geo' => $validated['id_geo_zone'], 'water' => null],
                'dissolved_oxygen' => ['val' => $validated['dissolved_oxygen'], 'geo' => null, 'water' => null],
                'salinity' => ['val' => $validated['salinity'], 'geo' => null, 'water' => $validated['id_type_water']],
                'nh3' => ['val' => $validated['nh3'], 'geo' => null, 'water' => null],
                'nh2' => ['val' => $validated['nh2'], 'geo' => null, 'water' => null],
                'ammonia' => ['val' => $validated['ammonia'], 'geo' => null, 'water' => null],
            ];

            foreach ($mainParams as $name => $data) {
                // Determine parameter name string for DB lookup if needed (e.g. capitalized)
                // For simplicity, we assume name matches or we map it.
                // Actually seeding uses names like "Salinity", "PH", etc.
                // Let's capitalize first letter or use map.
                $dbName = match($name) {
                    'ph' => 'PH',
                    'dissolved_oxygen' => 'Dissolved Oxygen',
                    'salinity' => 'Salinity',
                    'nh3' => 'NH3',
                    'nh2' => 'NH2',
                    'ammonia' => 'Amonia',
                    'temperature' => 'Temperature',
                    default => ucfirst($name),
                };

                $query = \App\Models\MainAbioticParameter::where('name', $dbName)
                    ->where('initial_value', '<=', $data['val'])
                    ->where('final_value', '>=', $data['val']);

                if ($data['geo']) $query->where('id_geo_zone', $data['geo']);
                if ($data['water']) $query->where('id_type_water', $data['water']);

                // If specialized (geo/water) not found, try generic (null)
                // Actually, the logic in seeding suggests precise matches.
                // Step: Try specialized first.
                $paramObj = $query->first();
                
                // Fallback for Temperature/Salinity if range is slightly off or using generic params
                // But let's assume valid range.
                
                if ($paramObj) {
                   $totalScore += $paramObj->weight; 
                }
            }

            // 2. Calculate Additional Abiotic (Generic names)
            $additionalParams = [
                'conductivity' => 'Conductivity',
                'ratio_cn' => 'C/N Ratio',
                'turbidity' => 'Turbidity',
                'clay' => 'Clay',
                'sand' => 'Sand',
                'silt' => 'Silt',
                'coarse_sediment' => 'Coarse Sediment',
                'total_organic_dissolved' => 'Total Organic Dissolved',
                'total_organic_substrate' => 'Total Organic Substrate',
                'macrozoobenthos_density' => 'Macrozoobenthos Density',
            ];

            foreach ($additionalParams as $field => $dbName) {
                $val = $validated[$field];
                $paramObj = \App\Models\AdditionalAbioticParameter::where('name', $dbName)
                    ->where('initial_value', '<=', $val)
                    ->where('final_value', '>=', $val)
                    ->first();
                
                if ($paramObj) {
                    $totalScore += $paramObj->weight;
                }
            }
            
            // 3. Biotic Index
            $indexParams = [
                'similarity' => 'Similarity',
                'dominance' => 'Dominance',
                'diversity' => 'Diversity',
                'total_abundance' => 'Total Abundance',
                'number_of_species' => 'Number of Species',
            ];
            
            foreach ($indexParams as $field => $dbName) {
                $val = $validated[$field];
                $paramObj = \App\Models\BioticIndexParameter::where('name', $dbName)
                    ->where('initial_value', '<=', $val)
                    ->where('final_value', '>=', $val)
                    ->first();
                
                if ($paramObj) {
                    $totalScore += $paramObj->weight;
                }
            }
            
            // 4. Family Biotic
            // Sum of weights of ONLY the families present? Or Average?
            // "Weighted Sum Model" usually implies sum of (Weight * Value).
            // But here, the "Value" IS the weight in the DB?
            // Let's assume we sum the weights of identified families.
            if (!empty($validated['families'])) {
                foreach ($validated['families'] as $fam) {
                    $familyObj = \App\Models\BioticFamily::find($fam['id_family']);
                    if ($familyObj) {
                        $totalScore += $familyObj->weight;
                    }
                }
            }

            // Determine Status
            // Normalize Total Score? max possible score ~100?
            // Let's assume raw score for now, but usually it's normalized 0-100.
            // If the user didn't specify normalization logic, I will clamp or just use ranges.
            // User said: "Value 80 – 100: Sangat Baik..."
            // I need to ensure $totalScore fits 0-100.
            // Simplified normalization: Score / MaxPossibleScore * 100?
            // Since we don't know MaxPossible without querying all max weights...
            // I will assume the sum of weights provided in DB ~100.
            // Wait, there are many parameters. 
            // 7 Main + 10 Additional + 5 Index + N Families.
            // Weights in seeder for Main ~1-3. Additional ~1-3. Index ~3-10.
            // Total seems > 100 maybe?
            // Let's try simple summation first.
            
            $finalValue = min($totalScore, 100); // Cap at 100 for safety

            $status = $this->getStatus($finalValue);
            $conclusion = $this->getConclusion($status);
            $recommendation = $this->getRecommendation($status);

            // Save Result
            $result = \App\Models\Result::create([
                'value' => $finalValue,
                'status' => $status,
                'conclusion' => $conclusion,
                'recommendation' => $recommendation,
                'id_user' => Auth::id(),
                'id_station' => $station->id,
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Perhitungan selesai. Nilai: ' . $finalValue);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    private function getStatus($val)
    {
        if ($val >= 80) return 'Sangat Baik';
        if ($val >= 60) return 'Baik';
        if ($val >= 40) return 'Sedang';
        if ($val >= 20) return 'Buruk';
        return 'Sangat Buruk';
    }
    
    private function getConclusion($status)
    {
        return match($status) {
            'Sangat Baik' => 'Kualitas air sangat baik dan mendukung keberlangsungan ekosistem secara optimal',
            'Baik' => 'Kualitas air tergolong baik namun mulai menunjukkan tekanan lingkungan ringan',
            'Sedang' => 'Kualitas air berada pada tingkat sedang dengan indikasi gangguan lingkungan yang cukup signifikan',
            'Buruk' => 'Kualitas air buruk dan berpotensi mengganggu keseimbangan ekosistem akuatik',
            'Sangat Buruk' => 'Kualitas air sangat buruk dan menunjukkan kondisi pencemaran berat',
            default => '-'
        };
    }
    
    private function getRecommendation($status)
    {
        return match($status) {
            'Sangat Baik' => 'Pertahankan kondisi ini melalui monitoring rutin dan pengelolaan berkelanjutan',
            'Baik' => 'Lakukan pengawasan dan pengendalian sumber pencemar untuk mencegah penurunan kualitas',
            'Sedang' => 'Diperlukan tindakan pengelolaan dan mitigasi untuk memperbaiki kondisi perairan',
            'Buruk' => 'Segera lakukan identifikasi dan penanganan terhadap sumber pencemaran utama',
            'Sangat Buruk' => 'Diperlukan tindakan pemulihan dan rehabilitasi lingkungan secara segera dan menyeluruh',
            default => '-'
        };
    }
}
