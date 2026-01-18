<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StationIndexAdditional extends Model
{
    use HasFactory;

    protected $table = 'station_index_additional';

    protected $fillable = [
        'similarity',
        'dominance',
        'diversity',
        'total_abundance',
        'number_of_species',
        'conductivity',
        'ratio_cn',
        'turbidity',
        'clay',
        'sand',
        'silt',
        'coarse_sediment',
        'total_organic_dissolved',
        'total_organic_substrate',
        'macrozoobenthos_density',
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
