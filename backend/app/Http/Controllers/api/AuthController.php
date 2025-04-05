<?php

namespace App\Http\Controllers\api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function create(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => ['required', 'string', 'unique:users'],
                'email' => ['required', 'unique:users', 'email'],
                'password' => ['required', 'confirmed', 'min:6'],
                'password_confirmation' => ['required'],
            ], [
                'name.required' => 'Заполните поле имя',
                'name.string' => 'Имя должно состять из символов',
                'name.unique' => 'Данное имя уже используется',
                'email.required' => 'Заполните поле почты',
                'email.unique' => 'Почта уже используется',
                'email.email' => 'Некорректная почта',
                'password.required' => 'Введите пароль',
                'password.confirmed' => 'Пароли не совпадают',
                'password.min' => 'В пароле должно быть от 6 символов',
                'password_confirmation.required' => 'Введите подтверждение пароля',
            ]);

            DB::transaction(function () use ($data) {
                $user = User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' => Hash::make($data['password']),
                ]);

                Status::create([
                    'name' => 'В обработке',
                    'user_id' => $user->id,
                    'color' => '#FF9D00'
                ]);
                Status::create([
                    'name' => 'В процессе',
                    'user_id' => $user->id,
                    'color' => '#008CFF'
                ]);
                Status::create([
                    'name' => 'Завершено',
                    'user_id' => $user->id,
                    'color' => '#44FF00'
                ]);
            });


            return response()->json(['message' => 'Аккаунт создан'], 200);
        } catch (ValidationException $error) {
            return response()->json(['message' => $error->validator->errors()->first()], 422);
        }
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ], [
            'email.required' => 'Заполните поле почты',
            'password.required' => 'Введите пароль',
        ]);

        if (!Auth::attempt($data)) {
            return response()->json(['message' => 'Неверная почта или пароль'], 401);
        }

        $user = User::query()->where('email', $data['email'])->firstOrFail();
        $token = $user->createToken($user['email'])->plainTextToken;

        return response()->json(['user' => new UserResource($user), 'message' => 'Вы успешно вошли', 'token' => $token], 200);
    }

    public function info()
    {
        $user = User::find(auth()->user()->id);
        return response()->json(['data' => new UserResource($user)], 200);
    }

    public function logout()
    {
        $user = request()->user();
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        return response()->json(['message' => 'Успешно'], 200);
    }
}
