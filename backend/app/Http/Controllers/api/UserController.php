<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

        if($user->avatar && Storage::exists($user->avatar)){
            Storage::delete($user->avatar);
        }

        $image = $request->file('avatar')->store('users/avatars');

        $user->update([
            'avatar' => $image
        ]);

        return response()->json(['message' => 'Вы сменили изображение'], 200);
    }
}
