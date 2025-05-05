<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domains\Transaction\Models\Transaction;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        $type = $this->faker->randomElement(['DEPOSIT', 'WITHDRAWAL', 'TRANSFER']);
        $accountId = $this->faker->numberBetween(1, 5);
        $destinationId = $type === 'TRANSFER' ? $this->faker->numberBetween(1, 5) : null;

        // Asegurarse de que no se transfiera a sí mismo
        if ($type === 'TRANSFER' && $destinationId === $accountId) {
            $destinationId = $accountId + 1;
        }

        return [
            'account_id' => $accountId,
            'type' => $type,
            'amount' => $this->faker->randomFloat(2, 10, 500),
            'description' => $this->faker->sentence(),
            'destination_account_id' => $destinationId,
        ];
    }
}
