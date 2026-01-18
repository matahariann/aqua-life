<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StationMainAbiotic extends Model
{
    use HasFactory;

    protected $table = 'station_main_abiotic';

    protected $fillable = [
        'salinity',
        'temperature',
        'dissolved_oxygen',
        'ph',
        'nh3',
        'nh2',
        'ammonia',
        'id_user',
        'id_station',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function station()
    {
        return $this->belongsTo(Station::class, 'id_station', 'id');
    }
}
