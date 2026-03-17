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
            'name' => 'required|string|max:255',
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

        $isPreview = $request->query('is_preview') == 1 || $request->input('is_preview') == true;
        $isUpdate = !empty($validated['id_history']);

        try {
            if (!$isPreview && !$isUpdate) {
                DB::beginTransaction();
                
                // Create Station
                $station = \App\Models\Station::create([
                    'name' => $validated['name'],
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
        } // Close if (!$isPreview)

        // --- WSM Calculation ---
        $totalScore = 0;
        $maxTotalScore = 0;

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

                $query = \App\Models\MainAbioticParameter::where('name', $dbName);

                if ($data['geo']) $query->where('id_geo_zone', $data['geo']);
                if ($data['water']) $query->where('id_type_water', $data['water']);

                $maxW = (clone $query)->max('weight') ?? 3;
                $maxTotalScore += $maxW;

                $paramObj = (clone $query)->where('initial_value', '<=', $data['val'])
                    ->where('final_value', '>=', $data['val'])->first();
                
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
                if (!isset($validated[$field])) continue;
                $val = $validated[$field];
                $query = \App\Models\AdditionalAbioticParameter::where('name', $dbName);
                
                $maxTotalScore += (clone $query)->max('weight') ?? 3;

                $paramObj = (clone $query)->where('initial_value', '<=', $val)
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
                if (!isset($validated[$field])) continue;
                $val = $validated[$field];
                $query = \App\Models\BioticIndexParameter::where('name', $dbName);
                
                $maxTotalScore += (clone $query)->max('weight') ?? 3;

                $paramObj = (clone $query)->where('initial_value', '<=', $val)
                    ->where('final_value', '>=', $val)
                    ->first();
                
                if ($paramObj) {
                    $totalScore += $paramObj->weight;
                }
            }
            
            // 4. Family Biotic
            if (!empty($validated['families'])) {
                foreach ($validated['families'] as $fam) {
                    if (empty($fam['id_family'])) continue;
                    $familyObj = \App\Models\BioticFamily::find($fam['id_family']);
                    if ($familyObj) {
                        $totalScore += $familyObj->weight;
                        $maxTotalScore += $familyObj->weight;
                    }
                }
            }

            // Determine Status (WSM Normalization)
            if ($maxTotalScore == 0) $maxTotalScore = 1;
            $finalValue = round(($totalScore / $maxTotalScore) * 100, 2);

            $status = $this->getStatus($finalValue);
            $conclusion = $this->getConclusion($status);
            $recommendation = $this->getRecommendation($status);

            if ($isPreview) {
                return redirect()->back()->with('preview_result', [
                    'value' => $finalValue,
                    'status' => $status,
                    'conclusion' => $conclusion,
                    'recommendation' => $recommendation,
                    'total_score' => $totalScore,
                    'max_total_score' => $maxTotalScore,
                ]);
            }

            // Save Result
            if ($isUpdate) {
                $result = \App\Models\Result::find($validated['id_history']);
                if ($result) {
                    $result->update([
                        'value' => $finalValue,
                        'status' => $status,
                        'conclusion' => $conclusion,
                        'recommendation' => $recommendation,
                        'id_user' => Auth::id(), // Or keep original user?
                    ]);

                    // Update Station details if needed
                    $station = \App\Models\Station::find($validated['id_station']);
                    if ($station) {
                        $station->update([
                            'name' => $validated['name'],
                            'id_geo_zone' => $validated['id_geo_zone'],
                            'id_type_water' => $validated['id_type_water'],
                        ]);
                    }

                    // For Abiotics and Biotics, it's complex to update all relationships individually or delete and recreate.
                    // Given the DB structure (snapshot records), the simplest approach is to delete the old snapshots for this station and recreate them.
                    \App\Models\StationMainAbiotic::where('id_station', $station->id)->delete();
                    \App\Models\StationIndexAdditional::where('id_station', $station->id)->delete();
                    \App\Models\Species::where('id_station', $station->id)->delete();

                    // Recreate snapshots using current validated data
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
                }
            } else {
                $result = \App\Models\Result::create([
                    'value' => $finalValue,
                    'status' => $status,
                    'conclusion' => $conclusion,
                    'recommendation' => $recommendation,
                    'id_user' => Auth::id(),
                    'id_station' => $station->id,
                ]);
            }

            if (!$isUpdate) {
                DB::commit();
            }

            return redirect()->back()->with('success', 'Data berhasil disimpan!');

        } catch (\Exception $e) {
            if (!$isPreview && DB::transactionLevel() > 0) {
                DB::rollBack();
            }
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    private function getStatus($val)
    {
        if ($val >= 80) return 'Undisturbed Areas';
        if ($val >= 60) return 'Lightly Disturbed Areas';
        if ($val >= 40) return 'Moderately Disturbed Areas';
        if ($val >= 20) return 'Heavily Disturbed Areas';
        return 'Sangat Buruk';
    }
    
    private function getConclusion($status)
    {
        return match($status) {
            'Undisturbed Areas' => 'Water environment condition is healty, within normal range and undisturbed (Undisturbed Areas)',
            'Lightly Disturbed Areas' => 'Water environment condition is healty, within normal range and lightly disturbed (Lightly Disturbed Areas)',
            'Moderately Disturbed Areas' => 'Water environment condition is moderately disturbed (Moderately Disturbed Areas)',
            'Heavily Disturbed Areas' => 'Water environment condition is heavily disturbed (Heavily Disturbed Areas)',
            default => '-'
        };
    }
    
    private function getRecommendation($status)
    {
        return match($status) {
            'Undisturbed Areas' => 'Keep the carrying capacity environment (environmental carrying capacity) under normal/stable conditions (equilibrium)',
            'Lightly Disturbed Areas' => 'Perform monitoring and control of pollution sources to prevent quality degradation',
            'Moderately Disturbed Areas' => 'Management and mitigation actions are needed to improve water conditions',
            'Heavily Disturbed Areas' => 'Immediately identify and handle the main pollution sources',
            default => '-'
        };
    }
}
