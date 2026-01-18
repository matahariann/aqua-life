<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    protected $table = 'stations';

    protected $fillable = [
        'id_type_water',
        'id_geo_zone',
        'id_user',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function geoZone()
    {
        return $this->belongsTo(GeoZone::class, 'id_geo_zone', 'id');
    }

    public function waterType()
    {
        return $this->belongsTo(WaterType::class, 'id_type_water', 'id');
    }

    public function species()
    {
        return $this->hasMany(Species::class, 'id_station', 'id');
    }

    public function stationMainAbiotics()
    {
        return $this->hasMany(StationMainAbiotic::class, 'id_station', 'id');
    }

    public function stationIndexAdditionals()
    {
        return $this->hasMany(StationIndexAdditional::class, 'id_station', 'id');
    }

    public function results()
    {
        return $this->hasMany(Result::class, 'id_station', 'id');
    }
}
