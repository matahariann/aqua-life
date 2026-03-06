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
}
