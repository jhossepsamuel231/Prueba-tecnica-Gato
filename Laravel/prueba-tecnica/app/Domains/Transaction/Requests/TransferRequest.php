<?php

namespace App\Domains\Transaction\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'account_id' => 'required|exists:accounts,id',
            'destination_account_id' => 'required|exists:accounts,id|different:account_id',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
        ];
    }
}
