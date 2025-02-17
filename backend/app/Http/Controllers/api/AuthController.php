<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function create(Request $request) {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'unique:users', 'email'],
            'password' => ['required', 'confirmed', 'min:6'],
            'password_confirmation' => ['required'],
        ], [
            'name.required' => 'Заполните поле имя',
            'name.string' => 'Имя должно состять из символов',
            'email.required' => 'Заполните поле почты',
            'email.uniqure:users' => 'Почта уже используется',
            'email.email' => 'Некорректная почта',
            'password.required' => 'Введите пароль',
            'password.confirmed' => 'Пароли не совпадают',
            'password.min:6' => 'В пароле должно быть от 6 символов',
            'password_confirmation.required' => 'Введите подтверждение пароля',  
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        return response()->json(['message' => 'Аккаунт создан'], 200);
    }
}
