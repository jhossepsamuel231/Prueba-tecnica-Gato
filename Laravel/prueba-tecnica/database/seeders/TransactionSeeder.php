<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domains\Transaction\Models\Transaction;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        Transaction::factory()->count(20)->create();
    }
}
