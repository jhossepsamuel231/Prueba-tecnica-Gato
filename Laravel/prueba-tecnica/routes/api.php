<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Account\Controllers\AccountController;
use App\Domains\Transaction\Controllers\TransactionController;
use App\Http\Controllers\AuthController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:api')->get('/me', [AuthController::class, 'me']);
});

Route::prefix('accounts')->group(function () {
    Route::get('/', [AccountController::class, 'index']);
});


Route::middleware('auth:api')->group(function () {

    Route::prefix('accounts')->group(function () {
        Route::post('/', [AccountController::class, 'store']);
        Route::get('/{id}', [AccountController::class, 'show']);
    });

    Route::prefix('transactions')->group(function () {
        Route::post('/deposit', [TransactionController::class, 'deposit']);
        Route::post('/withdraw', [TransactionController::class, 'withdraw']);
        Route::post('/transfer', [TransactionController::class, 'transfer']);
        Route::get('/{accountId}', [TransactionController::class, 'listByAccount']);
    });

});
