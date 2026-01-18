<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeoZone extends Model
{
    use HasFactory;

    protected $table = 'geo_zones';

    protected $fillable = [
        'name',
    ];

    public function stations()
    {
        return $this->hasMany(Station::class, 'id_geo_zone', 'id');
    }

    public function mainAbioticParameters()
    {
        return $this->hasMany(MainAbioticParameter::class, 'id_geo_zone', 'id');
    }
}
