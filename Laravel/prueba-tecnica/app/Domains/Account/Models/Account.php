<?php

namespace App\Domains\Account\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\AccountFactory;


class Account extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'holder_name',
        'document_number',
        'account_type',
        'balance',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'balance' => 'float',
    ];

    protected static function newFactory()
    {
        return AccountFactory::new();
    }

    // JWTSubject methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }
}
