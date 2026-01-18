<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainAbioticParameter extends Model
{
    use HasFactory;

    protected $table = 'main_abiotic_parameters';

    protected $fillable = [
        'name',
        'initial_value',
        'final_value',
        'weight',
        'id_geo_zone',
        'id_type_water',
    ];

    public function geoZone()
    {
        return $this->belongsTo(GeoZone::class, 'id_geo_zone', 'id');
    }

    public function waterType()
    {
        return $this->belongsTo(WaterType::class, 'id_type_water', 'id');
    }
}
