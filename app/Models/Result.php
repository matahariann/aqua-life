<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $table = 'results';

    protected $fillable = [
        'value',
        'status',
        'conclusion',
        'recommendation',
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
