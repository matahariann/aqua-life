<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdditionalAbioticParameter extends Model
{
    use HasFactory;

    protected $table = 'additional_abiotic_parameters';

    protected $fillable = [
        'name',
        'initial_value',
        'final_value',
        'weight',
    ];
}
