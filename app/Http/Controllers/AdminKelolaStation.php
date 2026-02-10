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
    
        // Ambil data station dengan pagination
        $stations = Station::with([
            'waterType:id,name',
            'geoZone:id,name',
            'user:id,name,email,role,is_membership',
        ])
        ->orderBy('created_at', 'desc')
        ->paginate($perPage)
        ->withQueryString();
    
        // Ambil data untuk dropdown
        $waterTypes = WaterType::orderBy('name')->get(['id', 'name']);
        $geoZones = GeoZone::orderBy('name')->get(['id', 'name']);
        $users = User::orderBy('name')->get(['id', 'name', 'email']);
        
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
            'stations' => $stations,
            'waterTypes' => $waterTypes,
            'geoZones' => $geoZones,
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_type_water' => 'required|exists:water_types,id',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_user' => 'required|exists:users,id',
        ], [
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
            'id_type_water' => 'required|exists:water_types,id',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_user' => 'required|exists:users,id',
        ], [
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
}
