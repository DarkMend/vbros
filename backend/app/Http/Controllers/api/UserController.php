<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function avatarChange(Request $request) {
        $user = User::find(auth()->id());

        $request -> validate([
            'avatar' => ['required', 'mimes:jpeg,png,jpg']
        ], [
            'avatar.required' => 'Загрузите изображение',
            'avatar.mimes' => 'Изображение должно быть типа: jpg, jpeg, png',

        ]);

        $image = $request->file('avatar')->store('users.avatars');

        $user->update([
            'avatar' => $image
        ]);

        return response()->json(['message' => 'Вы сменили изображение'], 200);
    }
}
