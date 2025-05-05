<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domains\Account\Models\Account;

class AccountSeeder extends Seeder
{
    public function run(): void
    {
        Account::factory()->count(10)->create();
    }
}
