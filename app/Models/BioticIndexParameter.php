<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BioticIndexParameter extends Model
{
    use HasFactory;

    protected $table = 'biotic_index_parameters';

    protected $fillable = [
        'name',
        'initial_value',
        'final_value',
        'weight',
    ];
}
