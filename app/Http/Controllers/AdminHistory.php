<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Result;

class AdminHistory extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $histories = Result::with(['station.geoZone', 'station.waterType', 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render("Admin/History/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                ]
            ],
            'histories' => $histories,
        ]);
    }

    public function result($id)
    {
        $user = Auth::user();
        
        $result = Result::with([
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
                    'taxa_indicator' => $species->family->taxa_indicator ?? '',
                ];
            })->toArray(),
        ];

        return Inertia::render("Admin/History/Result", [
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
        
        $result = Result::with([
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
                    'taxa_indicator' => $species->family->taxa_indicator ?? '',
                ];
            })->toArray(),
        ];

        return Inertia::render("Admin/Hitung Kualitas Air/page", [
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
}
