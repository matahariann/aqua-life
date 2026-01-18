<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaterType extends Model
{
    use HasFactory;

    protected $table = 'water_types';

    protected $fillable = [
        'name',
    ];

    public function stations()
    {
        return $this->hasMany(Station::class, 'id_type_water', 'id');
    }

    public function mainAbioticParameters()
    {
        return $this->hasMany(MainAbioticParameter::class, 'id_type_water', 'id');
    }
}
