<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Species extends Model
{
    use HasFactory;

    protected $table = 'species';

    protected $fillable = [
        'name',
        'abundance',
        'taxa_indicator',
        'id_user',
        'id_station',
        'id_family',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function station()
    {
        return $this->belongsTo(Station::class, 'id_station', 'id');
    }

    public function bioticFamily()
    {
        return $this->belongsTo(BioticFamily::class, 'id_family', 'id');
    }
}
