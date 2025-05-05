<?php

namespace App\Domains\Account\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccountRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'holder_name' => 'required|string|max:100',
            'document_number' => 'required|string|unique:accounts,document_number',
            'account_type' => 'required|in:SAVINGS,CHECKING',
            'balance' => 'nullable|numeric|min:0',
        ];
    }
}
