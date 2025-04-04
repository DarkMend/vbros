<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\NoteController;
use App\Http\Controllers\api\StatusController;
use App\Http\Controllers\api\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/notes', [NoteController::class, 'index']);

Route::middleware('guest')->controller(AuthController::class)->group(function () {
    Route::post('/auth/reg', 'create');
    Route::post('/auth/login', 'login');
});

Route::middleware('auth:sanctum')->controller(AuthController::class)->group(function () {
    Route::get('/auth/info', 'info');
    Route::post('/auth/logout', 'logout');
});

Route::middleware('auth:sanctum')->controller(UserController::class)->prefix('user')->group(function () {
    Route::post('/changeAvatar', 'avatarChange');
    Route::post('/changeName', 'changeName');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(StatusController::class)->prefix('status')->group(function () {
        Route::get('/all-personal', 'allPersonalStatuses');
        Route::post('/store', 'store');
        Route::post('/update/{status}', 'update');
        Route::delete('/delete/{status}', 'destroy');
    });
});
