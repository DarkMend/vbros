<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'email.unique' => 'Почта уже используется',
            'email.email' => 'Некорректная почта',
            'password.required' => 'Введите пароль',
            'password.confirmed' => 'Пароли не совпадают',
            'password.min' => 'В пароле должно быть от 6 символов',
            'password_confirmation.required' => 'Введите подтверждение пароля',  
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        return response()->json(['message' => 'Аккаунт создан'], 200);
    }

    public function login(Request $request) {
        $data = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ], [
            'email.required' => 'Заполните поле почты',
            'password.required' => 'Введите пароль',
        ]);

        if(!Auth::attempt($data)){
            return response()->json(['message' => 'Неверная почта или пароль'], 401);
        }

        $user = User::query()->where('email', $data['email'])->firstOrFail();
        $token = $user->createToken($user['email'])->plainTextToken;
        
        return response()->json(['user' => new UserResource($user),'message' => 'Вы успешно вошли', 'token' => $token], 200);
    }

    public function info() {
        $user = User::find(auth()->user()->id);
        return response()->json(['data' => new UserResource($user)], 200);
    } 

}
