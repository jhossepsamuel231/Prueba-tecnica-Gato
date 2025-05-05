<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domains\Account\Models\Account;
use Illuminate\Support\Facades\Hash;

class AccountFactory extends Factory
{
    protected $model = Account::class;

    public function definition(): array
    {
        return [
            'holder_name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password123'), 
            'document_number' => $this->faker->unique()->numerify('########'),
            'account_type' => $this->faker->randomElement(['SAVINGS', 'CHECKING']),
            'balance' => $this->faker->randomFloat(2, 0, 10000),
        ];
    }
}
