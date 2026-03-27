<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\User;
use App\Models\WaterType;
use App\Models\GeoZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminKelolaStation extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
    
        // Ambil jumlah data per halaman dari request, default 10
        $perPage = $request->input('per_page', 10);
    
        // Validasi jumlah data per halaman
        $allowedPerPage = [5, 10, 25, 50, 100];
        if (!in_array($perPage, $allowedPerPage)) {
            $perPage = 10;
        }
    
        // Ambil data history semua user dengan pagination
        $histories = \App\Models\Result::with(['station.geoZone', 'station.waterType', 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();
        
        // Kirim data ke view
        return Inertia::render("Admin/Kelola Station/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                ]
            ],
            'histories' => $histories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'id_type_water' => 'required|exists:water_types,id',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_user' => 'required|exists:users,id',
        ], [
            'name.required' => 'Nama station harus diisi',
            'id_type_water.required' => 'Tipe air harus dipilih',
            'id_type_water.exists' => 'Tipe air tidak valid',
            'id_geo_zone.required' => 'Zona geografis harus dipilih',
            'id_geo_zone.exists' => 'Zona geografis tidak valid',
            'id_user.required' => 'Pengguna harus dipilih',
            'id_user.exists' => 'Pengguna tidak valid',
        ]);
    
        Station::create($validated);
    
        return redirect()->back()->with('success', 'Station berhasil ditambahkan');
    }

    public function update(Request $request, Station $station)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'id_type_water' => 'required|exists:water_types,id',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_user' => 'required|exists:users,id',
        ], [
            'name.required' => 'Nama station harus diisi',
            'id_type_water.required' => 'Tipe air harus dipilih',
            'id_type_water.exists' => 'Tipe air tidak valid',
            'id_geo_zone.required' => 'Zona geografis harus dipilih',
            'id_geo_zone.exists' => 'Zona geografis tidak valid',
            'id_user.required' => 'Pengguna harus dipilih',
            'id_user.exists' => 'Pengguna tidak valid',
        ]);

        $station->update($validated);

        return redirect()->back()->with('success', 'Station berhasil diupdate');
    }

    public function destroy(Station $station)
    {
        $station->delete();
        return redirect()->back()->with('success', 'Station berhasil dihapus');
    }

    public function result($id)
    {
        $user = Auth::user();
        
        $result = \App\Models\Result::with([
            'station.geoZone', 
            'station.waterType', 
            'station.stationMainAbiotics', 
            'station.stationIndexAdditionals', 
            'station.species.family'
        ])->findOrFail($id);

        // Format data for ResultView
        $station = $result->station;
        $mainAbiotic = $station->stationMainAbiotics; // Assuming hasOne or getting first if it's hasMany
        // if it's hasMany we might need ->first(), but let's assume it returns a single model or collection.
        // Actually, if it's named plural it might be a collection.
        if ($mainAbiotic instanceof \Illuminate\Database\Eloquent\Collection) {
            $mainAbiotic = $mainAbiotic->first();
        }
        
        $indexAdditional = $station->stationIndexAdditionals;
        if ($indexAdditional instanceof \Illuminate\Database\Eloquent\Collection) {
            $indexAdditional = $indexAdditional->first();
        }

        $data = [
            'id' => $station->id,
            'name' => $station->name,
            'id_geo_zone' => $station->id_geo_zone,
            'id_type_water' => $station->id_type_water,
            
            // Map Main Abiotics
            'ph' => $mainAbiotic->ph ?? '',
            'temperature' => $mainAbiotic->temperature ?? '',
            'dissolved_oxygen' => $mainAbiotic->dissolved_oxygen ?? '',
            'salinity' => $mainAbiotic->salinity ?? '',
            'nh3' => $mainAbiotic->nh3 ?? '',
            'nh2' => $mainAbiotic->nh2 ?? '',
            'ammonia' => $mainAbiotic->ammonia ?? '',

            // Map Additional Abiotics & Indexes
            'conductivity' => $indexAdditional->conductivity ?? '',
            'ratio_cn' => $indexAdditional->ratio_cn ?? '',
            'turbidity' => $indexAdditional->turbidity ?? '',
            'clay' => $indexAdditional->clay ?? '',
            'sand' => $indexAdditional->sand ?? '',
            'silt' => $indexAdditional->silt ?? '',
            'coarse_sediment' => $indexAdditional->coarse_sediment ?? '',
            'total_organic_dissolved' => $indexAdditional->total_organic_dissolved ?? '',
            'total_organic_substrate' => $indexAdditional->total_organic_substrate ?? '',
            'macrozoobenthos_density' => $indexAdditional->macrozoobenthos_density ?? '',
            
            'similarity' => $indexAdditional->similarity ?? '',
            'dominance' => $indexAdditional->dominance ?? '',
            'diversity' => $indexAdditional->diversity ?? '',
            'total_abundance' => $indexAdditional->total_abundance ?? '',
            'number_of_species' => $indexAdditional->number_of_species ?? '',

            // Map Families
            'families' => $station->species->map(function($species) {
                return [
                    'id_family' => $species->id_family,
                    'name' => $species->name ?? 'Unknown',
                    'abundance' => $species->abundance,
                    'taxa_indicator' => $species->taxa_indicator,
                ];
            })->toArray(),
        ];

        return Inertia::render("Admin/Kelola Station/Result", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ],
            'result' => $result,
            'data' => $data,
            'geoZones' => \App\Models\GeoZone::all(),
            'waterTypes' => \App\Models\WaterType::all(),
            'bioticFamilies' => \App\Models\BioticFamily::all(),
        ]);
    }

    public function edit($id)
    {
        $user = Auth::user();
        
        $result = \App\Models\Result::with([
            'station.geoZone', 
            'station.waterType', 
            'station.stationMainAbiotics', 
            'station.stationIndexAdditionals', 
            'station.species.family'
        ])->findOrFail($id);

        $station = $result->station;
        $mainAbiotic = $station->stationMainAbiotics;
        if ($mainAbiotic instanceof \Illuminate\Database\Eloquent\Collection) {
            $mainAbiotic = $mainAbiotic->first();
        }
        
        $indexAdditional = $station->stationIndexAdditionals;
        if ($indexAdditional instanceof \Illuminate\Database\Eloquent\Collection) {
            $indexAdditional = $indexAdditional->first();
        }

        $initialData = [
            'id_history' => $result->id,
            'id_station' => $station->id,
            'name' => $station->name,
            'id_geo_zone' => $station->id_geo_zone,
            'id_type_water' => $station->id_type_water,
            
            'ph' => $mainAbiotic->ph ?? '',
            'temperature' => $mainAbiotic->temperature ?? '',
            'dissolved_oxygen' => $mainAbiotic->dissolved_oxygen ?? '',
            'salinity' => $mainAbiotic->salinity ?? '',
            'nh3' => $mainAbiotic->nh3 ?? '',
            'nh2' => $mainAbiotic->nh2 ?? '',
            'ammonia' => $mainAbiotic->ammonia ?? '',

            'conductivity' => $indexAdditional->conductivity ?? '',
            'ratio_cn' => $indexAdditional->ratio_cn ?? '',
            'turbidity' => $indexAdditional->turbidity ?? '',
            'clay' => $indexAdditional->clay ?? '',
            'sand' => $indexAdditional->sand ?? '',
            'silt' => $indexAdditional->silt ?? '',
            'coarse_sediment' => $indexAdditional->coarse_sediment ?? '',
            'total_organic_dissolved' => $indexAdditional->total_organic_dissolved ?? '',
            'total_organic_substrate' => $indexAdditional->total_organic_substrate ?? '',
            'macrozoobenthos_density' => $indexAdditional->macrozoobenthos_density ?? '',
            
            'similarity' => $indexAdditional->similarity ?? '',
            'dominance' => $indexAdditional->dominance ?? '',
            'diversity' => $indexAdditional->diversity ?? '',
            'total_abundance' => $indexAdditional->total_abundance ?? '',
            'number_of_species' => $indexAdditional->number_of_species ?? '',

            'families' => $station->species->map(function($species) {
                return [
                    'id_family' => $species->id_family,
                    'name' => $species->name ?? 'Unknown',
                    'abundance' => $species->abundance,
                    'taxa_indicator' => $species->taxa_indicator,
                ];
            })->toArray(),
        ];

        return Inertia::render("Admin/Kelola Station/Edit", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                ]
            ],
            'geoZones' => \App\Models\GeoZone::all(),
            'waterTypes' => \App\Models\WaterType::all(),
            'bioticFamilies' => \App\Models\BioticFamily::all(),
            'initialData' => $initialData
        ]);
    }

    public function updateHistory(Request $request, $id)
    {
        $validated = $request->validate([
            'id_history' => 'required',
            'id_station' => 'required',
            'name' => 'required|string|max:255',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_type_water' => 'required|exists:water_types,id',
            
            // Main Abiotic
            'ph' => 'nullable|numeric',
            'temperature' => 'nullable|numeric',
            'dissolved_oxygen' => 'nullable|numeric',
            'salinity' => 'nullable|numeric',
            'nh3' => 'nullable|numeric',
            'nh2' => 'nullable|numeric',
            'ammonia' => 'nullable|numeric',

            // Additional Abiotic
            'conductivity' => 'nullable|numeric',
            'ratio_cn' => 'nullable|numeric',
            'turbidity' => 'nullable|numeric',
            'clay' => 'nullable|numeric',
            'sand' => 'nullable|numeric',
            'silt' => 'nullable|numeric',
            'coarse_sediment' => 'nullable|numeric',
            'total_organic_dissolved' => 'nullable|numeric',
            'total_organic_substrate' => 'nullable|numeric',
            'macrozoobenthos_density' => 'nullable|numeric',

            // Biotic Index
            'similarity' => 'nullable|numeric',
            'dominance' => 'nullable|numeric',
            'diversity' => 'nullable|numeric',
            'total_abundance' => 'nullable|numeric',
            'number_of_species' => 'nullable|numeric',

            // Biotic Families
            'families' => 'nullable|array',
            'families.*.id_family' => 'nullable|exists:biotic_families,id',
            'families.*.name' => 'nullable|string',
            'families.*.abundance' => 'nullable|numeric',
            'families.*.taxa_indicator' => 'nullable|numeric',
        ]);

        $isPreview = $request->query('is_preview') == 1 || $request->input('is_preview') == true;

        try {
            // --- WSM Calculation ---
            $totalScore = 0;
            $maxTotalScore = 0;

            // 1. Calculate Main Abiotic
            $mainParams = [
                'ph' => ['val' => $validated['ph'] ?? null, 'geo' => null, 'water' => null],
                'temperature' => ['val' => $validated['temperature'] ?? null, 'geo' => $validated['id_geo_zone'] ?? null, 'water' => null],
                'dissolved_oxygen' => ['val' => $validated['dissolved_oxygen'] ?? null, 'geo' => null, 'water' => null],
                'salinity' => ['val' => $validated['salinity'] ?? null, 'geo' => null, 'water' => $validated['id_type_water'] ?? null],
                'nh3' => ['val' => $validated['nh3'] ?? null, 'geo' => null, 'water' => null],
                'nh2' => ['val' => $validated['nh2'] ?? null, 'geo' => null, 'water' => null],
                'ammonia' => ['val' => $validated['ammonia'] ?? null, 'geo' => null, 'water' => null],
            ];

            foreach ($mainParams as $name => $data) {
                if ($data['val'] === null || $data['val'] === '') continue;

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

            // 2. Calculate Additional Abiotic
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

            // Determine Status
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

            // Real DB Update
            \Illuminate\Support\Facades\DB::beginTransaction();
            
            $result = \App\Models\Result::findOrFail($id);
            $result->update([
                'value' => $finalValue,
                'status' => $status,
                'conclusion' => $conclusion,
                'recommendation' => $recommendation,
                'id_user' => Auth::id(),
            ]);

            $station = \App\Models\Station::findOrFail($validated['id_station']);
            $station->update([
                'name' => $validated['name'],
                'id_geo_zone' => $validated['id_geo_zone'],
                'id_type_water' => $validated['id_type_water'],
            ]);

            // Recreate snapshot variables
            \App\Models\StationMainAbiotic::where('id_station', $station->id)->delete();
            \App\Models\StationIndexAdditional::where('id_station', $station->id)->delete();
            \App\Models\Species::where('id_station', $station->id)->delete();

            \App\Models\StationMainAbiotic::create([
                'id_station' => $station->id,
                'id_user' => Auth::id(),
                'ph' => $validated['ph'] ?? null,
                'temperature' => $validated['temperature'] ?? null,
                'dissolved_oxygen' => $validated['dissolved_oxygen'] ?? null,
                'salinity' => $validated['salinity'] ?? null,
                'nh3' => $validated['nh3'] ?? null,
                'nh2' => $validated['nh2'] ?? null,
                'ammonia' => $validated['ammonia'] ?? null,
            ]);
            
            \App\Models\StationIndexAdditional::create([
                'id_station' => $station->id,
                'id_user' => Auth::id(),
                'conductivity' => $validated['conductivity'] ?? null,
                'ratio_cn' => $validated['ratio_cn'] ?? null,
                'turbidity' => $validated['turbidity'] ?? null,
                'clay' => $validated['clay'] ?? null,
                'sand' => $validated['sand'] ?? null,
                'silt' => $validated['silt'] ?? null,
                'coarse_sediment' => $validated['coarse_sediment'] ?? null,
                'total_organic_dissolved' => $validated['total_organic_dissolved'] ?? null,
                'total_organic_substrate' => $validated['total_organic_substrate'] ?? null,
                'macrozoobenthos_density' => $validated['macrozoobenthos_density'] ?? null,
                'similarity' => $validated['similarity'] ?? null,
                'dominance' => $validated['dominance'] ?? null,
                'diversity' => $validated['diversity'] ?? null,
                'total_abundance' => $validated['total_abundance'] ?? null,
                'number_of_species' => $validated['number_of_species'] ?? null,
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

            \Illuminate\Support\Facades\DB::commit();

            return redirect()->back()->with('success', 'Perubahan Data Historis berhasil disimpan!');
            
        } catch (\Throwable $e) {
            if (!$isPreview && \Illuminate\Support\Facades\DB::transactionLevel() > 0) {
                \Illuminate\Support\Facades\DB::rollBack();
            }
            \Illuminate\Support\Facades\Log::error('History Update Error: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine() . "\n" . $e->getTraceAsString());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    private function getStatus($val)
    {
        if ($val >= 55.51) return 'Undisturbed Areas';
        if ($val >= 37.01) return 'Lightly Disturbed Areas';
        if ($val >= 18.51) return 'Moderately Disturbed Areas';
        return 'Heavily Disturbed Areas';
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
