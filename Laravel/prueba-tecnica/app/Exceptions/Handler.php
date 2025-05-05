<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Http\Responses\ApiResponse;

class Handler extends ExceptionHandler
{
    protected $dontReport = [];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Captura errores de autenticación lanzados desde el middleware (como 'auth:api').
     */
    protected function unauthenticated($request, AuthenticationException $exception)
{
    return ApiResponse::error('No autenticado', null, 401);
}


    /**
     * Renderiza todas las excepciones de la app en respuestas JSON si se requiere.
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            return \App\Http\Responses\ApiResponse::error('No autenticado', null, 401);
        }

        if ($request->expectsJson()) {
            if ($exception instanceof NotFoundHttpException) {
                return ApiResponse::error('Ruta no encontrada', null, 404);
            }

            if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return ApiResponse::error('Recurso no encontrado', null, 404);
            }

            if ($exception instanceof ValidationException) {
                return ApiResponse::error('Error de validación', $exception->errors(), 422);
            }

            return ApiResponse::error(
                'Error interno del servidor',
                ['exception' => $exception->getMessage()],
                500
            );
        }

        return parent::render($request, $exception);
    }


    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
        });
    }
}
