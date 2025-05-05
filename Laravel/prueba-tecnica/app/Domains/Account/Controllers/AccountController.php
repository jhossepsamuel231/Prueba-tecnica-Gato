<?php

namespace App\Domains\Account\Controllers;

use App\Domains\Account\Models\Account;
use App\Domains\Account\Requests\StoreAccountRequest;
use Illuminate\Http\JsonResponse;
use App\Http\Responses\ApiResponse;

class AccountController
{
    /**
     * @OA\Post(
     *     path="/api/accounts",
     *     tags={"Cuentas"},
     *     summary="Crea una nueva cuenta",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"holder_name", "document_number", "account_type", "email", "password"},
     *             @OA\Property(property="holder_name", type="string"),
     *             @OA\Property(property="document_number", type="string"),
     *             @OA\Property(property="account_type", type="string", enum={"SAVINGS", "CHECKING"}),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Cuenta creada correctamente"
     *     )
     * )
     */
    public function store(StoreAccountRequest $request): JsonResponse
    {
        $account = Account::create($request->validated());
        return ApiResponse::success('Cuenta creada correctamente', $account, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/accounts",
     *     tags={"Cuentas"},
     *     summary="Lista todas las cuentas",
     *     @OA\Response(
     *         response=200,
     *         description="Lista de cuentas"
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $accounts = Account::all();
        return ApiResponse::success('Lista de cuentas', $accounts);
    }

    /**
     * @OA\Get(
     *     path="/api/accounts/{id}",
     *     tags={"Cuentas"},
     *     summary="Muestra una cuenta por ID",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(
     *         response=200,
     *         description="Cuenta encontrada"
     *     )
     * )
     */
    public function show(int $id): JsonResponse
    {
        $account = Account::findOrFail($id);
        return ApiResponse::success('Cuenta encontrada', $account);
    }
}
