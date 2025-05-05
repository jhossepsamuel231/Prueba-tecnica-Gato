<?php

namespace App\Domains\Transaction\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\TransactionFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'type',
        'amount',
        'description',
        'destination_account_id',
    ];

    protected $casts = [
        'amount' => 'float',
    ];

    public static function newFactory(): TransactionFactory
    {
        return TransactionFactory::new();
    }
}
