<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BioticFamily extends Model
{
    use HasFactory;

    protected $table = 'biotic_families';

    protected $fillable = [
        'name',
        'weight',
    ];

    public function species()
    {
        return $this->hasMany(Species::class, 'id_family', 'id');
    }
}
