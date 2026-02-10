<?php

namespace App\Http\Controllers;

use App\Models\GeoZone;
use App\Models\MainAbioticParameter;
use App\Models\AdditionalAbioticParameter;
use App\Models\WaterType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminKelolaBobot extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $perPage = $request->input('per_page', 10);
        $allowedPerPage = [5, 10, 25, 50, 100];
        if (!in_array($perPage, $allowedPerPage)) {
            $perPage = 10;
        }

        $mainAbioticParameters = MainAbioticParameter::with([
            'geoZone:id,name',
            'waterType:id,name',
        ])
            ->orderBy('id')
            ->paginate($perPage)
            ->withQueryString();

        $additionalAbioticParameters = AdditionalAbioticParameter::orderBy('id')
            ->paginate($perPage)
            ->withQueryString();

        $geoZones = GeoZone::orderBy('name')->get(['id', 'name']);
        $waterTypes = WaterType::orderBy('name')->get(['id', 'name']);

        return Inertia::render("Admin/Kelola Bobot/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                ]
            ],
            'mainAbioticParameters' => $mainAbioticParameters,
            'additionalAbioticParameters' => $additionalAbioticParameters,
            'geoZones' => $geoZones,
            'waterTypes' => $waterTypes,
        ]);
    }

    public function storeMainAbiotic(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_type_water' => 'required|exists:water_types,id',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
            'id_geo_zone.required' => 'Zona geografis harus dipilih',
            'id_geo_zone.exists' => 'Zona geografis tidak valid',
            'id_type_water.required' => 'Tipe air harus dipilih',
            'id_type_water.exists' => 'Tipe air tidak valid',
        ]);

        MainAbioticParameter::create($validated);

        return redirect()->back()->with('success', 'Parameter main abiotic berhasil ditambahkan');
    }

    public function updateMainAbiotic(Request $request, MainAbioticParameter $parameter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_type_water' => 'required|exists:water_types,id',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
            'id_geo_zone.required' => 'Zona geografis harus dipilih',
            'id_geo_zone.exists' => 'Zona geografis tidak valid',
            'id_type_water.required' => 'Tipe air harus dipilih',
            'id_type_water.exists' => 'Tipe air tidak valid',
        ]);

        $parameter->update($validated);

        return redirect()->back()->with('success', 'Parameter main abiotic berhasil diupdate');
    }

    public function destroyMainAbiotic(MainAbioticParameter $parameter)
    {
        $parameter->delete();
        return redirect()->back()->with('success', 'Parameter main abiotic berhasil dihapus');
    }

    public function storeAdditionalAbiotic(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        AdditionalAbioticParameter::create($validated);

        return redirect()->back()->with('success', 'Parameter additional abiotic berhasil ditambahkan');
    }

    public function updateAdditionalAbiotic(Request $request, AdditionalAbioticParameter $parameter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        $parameter->update($validated);

        return redirect()->back()->with('success', 'Parameter additional abiotic berhasil diupdate');
    }

    public function destroyAdditionalAbiotic(AdditionalAbioticParameter $parameter)
    {
        $parameter->delete();
        return redirect()->back()->with('success', 'Parameter additional abiotic berhasil dihapus');
    }
}
