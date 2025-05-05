<?php

namespace App\Domains\Transaction\Controllers;

use App\Domains\Transaction\Models\Transaction;
use App\Domains\Transaction\Requests\DepositRequest;
use App\Domains\Transaction\Requests\WithdrawRequest;
use App\Domains\Transaction\Requests\TransferRequest;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Domains\Account\Models\Account;
use Illuminate\Support\Facades\DB;

class TransactionController
{
    /**
     * @OA\Post(
     *     path="/api/transactions/deposit",
     *     summary="Realiza un depósito en una cuenta",
     *     tags={"Transacciones"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"account_id", "amount", "description"},
     *             @OA\Property(property="account_id", type="integer"),
     *             @OA\Property(property="amount", type="number"),
     *             @OA\Property(property="description", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Depósito realizado"),
     *     @OA\Response(response=500, description="Error al depositar")
     * )
     */
    public function deposit(DepositRequest $request): JsonResponse
    {
        $account = Account::findOrFail($request->account_id);

        DB::beginTransaction();
        try {
            $account->balance += $request->amount;
            $account->save();

            $transaction = Transaction::create([
                'account_id' => $account->id,
                'type' => 'DEPOSIT',
                'amount' => $request->amount,
                'description' => $request->description,
            ]);

            DB::commit();
            return ApiResponse::success('Depósito realizado', $transaction, 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return ApiResponse::error('Error al depositar', ['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/transactions/withdraw",
     *     summary="Realiza un retiro de una cuenta",
     *     tags={"Transacciones"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"account_id", "amount", "description"},
     *             @OA\Property(property="account_id", type="integer"),
     *             @OA\Property(property="amount", type="number"),
     *             @OA\Property(property="description", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Retiro realizado"),
     *     @OA\Response(response=400, description="Saldo insuficiente"),
     *     @OA\Response(response=500, description="Error al retirar")
     * )
     */
    public function withdraw(WithdrawRequest $request): JsonResponse
    {
        $account = Account::findOrFail($request->account_id);

        if ($account->balance < $request->amount) {
            return ApiResponse::error('Saldo insuficiente', null, 400);
        }

        DB::beginTransaction();
        try {
            $account->balance -= $request->amount;
            $account->save();

            $transaction = Transaction::create([
                'account_id' => $account->id,
                'type' => 'WITHDRAWAL',
                'amount' => $request->amount,
                'description' => $request->description,
            ]);

            DB::commit();
            return ApiResponse::success('Retiro realizado', $transaction, 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return ApiResponse::error('Error al retirar', ['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/transactions/transfer",
     *     summary="Realiza una transferencia entre cuentas",
     *     tags={"Transacciones"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"account_id", "destination_account_id", "amount", "description"},
     *             @OA\Property(property="account_id", type="integer"),
     *             @OA\Property(property="destination_account_id", type="integer"),
     *             @OA\Property(property="amount", type="number"),
     *             @OA\Property(property="description", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Transferencia realizada"),
     *     @OA\Response(response=400, description="Saldo insuficiente"),
     *     @OA\Response(response=500, description="Error al transferir")
     * )
     */
    public function transfer(TransferRequest $request): JsonResponse
    {
        $origin = Account::findOrFail($request->account_id);
        $destination = Account::findOrFail($request->destination_account_id);

        if ($origin->balance < $request->amount) {
            return ApiResponse::error('Saldo insuficiente para transferir', null, 400);
        }

        DB::beginTransaction();
        try {
            $origin->balance -= $request->amount;
            $origin->save();

            $destination->balance += $request->amount;
            $destination->save();

            $transaction = Transaction::create([
                'account_id' => $origin->id,
                'destination_account_id' => $destination->id,
                'type' => 'TRANSFER',
                'amount' => $request->amount,
                'description' => $request->description,
            ]);

            DB::commit();
            return ApiResponse::success('Transferencia realizada', $transaction, 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return ApiResponse::error('Error al transferir', ['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/transactions/{accountId}",
     *     summary="Lista las transacciones de una cuenta",
     *     tags={"Transacciones"},
     *     @OA\Parameter(
     *         name="accountId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Lista de transacciones")
     * )
     */
    public function listByAccount(int $accountId): JsonResponse
    {
        $transactions = Transaction::where('account_id', $accountId)
            ->orWhere('destination_account_id', $accountId)
            ->orderByDesc('created_at')
            ->get();

        return ApiResponse::success('Transacciones de la cuenta', $transactions);
    }
}