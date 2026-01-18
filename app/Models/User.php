<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use LDAP\Result;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_membership',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function stations()
    {
        return $this->hasMany(Station::class, 'id_user', 'id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'id_user', 'id');
    }

    public function species()
    {
        return $this->hasMany(Species::class, 'id_user', 'id');
    }

    public function stationMainAbiotics()
    {
        return $this->hasMany(StationMainAbiotic::class, 'id_user', 'id');
    }

    public function stationIndexAdditionals()
    {
        return $this->hasMany(StationIndexAdditional::class, 'id_user', 'id');
    }

    public function results()
    {
        return $this->hasMany(Result::class, 'id_user', 'id');
    }
}
