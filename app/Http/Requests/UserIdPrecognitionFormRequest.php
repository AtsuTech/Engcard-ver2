<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserIdPrecognitionFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //個人のバリデーション
            'personal_id' => ['required', 'min:10', 'max:15', 'unique:users,personal_id'],
        ];
    }

    public function messages()
    {
        return [
            'personal_id.required' => '入力必須です。',
            'personal_id.max' => '15文字以内で入力をしてください。',
            'personal_id.unique' => 'この個人IDは既に使用されています。',
        ];
    }
}
