<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\HistoryController;
use App\Http\Controllers\api\NoteController;
use App\Http\Controllers\api\ProjectController;
use App\Http\Controllers\api\StatusController;
use App\Http\Controllers\api\StatusProjectController;
use App\Http\Controllers\api\TaskController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\MessageController;
use Illuminate\Support\Facades\Broadcast;
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
    Route::get('/user/info/{user}', 'infoUser');
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

    Route::controller(NoteController::class)->prefix('note')->group(function () {
        Route::post('/store', 'store');
        Route::put('/{note}/update', 'update');
        Route::delete('/{note}/delete', 'destroy');
        Route::put('/{note}/changeStatus', 'changeStatus');
    });

    Route::controller(ProjectController::class)->prefix('project')->group(function () {
        Route::post('/createProject', 'store');
        Route::get('/personal-projects', 'getProjects');
        Route::get('/personal-project/{project}', 'getProject');
        Route::get('/personal-project/{project}/statuses', 'getStatuses');
        Route::post('/update/{project}', 'update');
        Route::delete('/delete/{project}', 'destroy');
        Route::delete('/{project}/exit', 'exitProject');
        Route::post('/{project}/user', 'deleteUser');
    });

    Route::controller(ProjectController::class)->prefix('projects')->group(function () {
        Route::post('/{project}/join', 'joinProject');
    });

    Route::controller(StatusProjectController::class)->prefix('status-project')->group(function () {
        Route::post('/store', 'store');
        Route::put('/update/{statusProject}', 'update');
        Route::delete('/delete/{statusProject}', 'destroy');
    });

    Route::controller(TaskController::class)->prefix('task')->group(function () {
        Route::post('/create', 'store');
        Route::put('/update/{task}', 'update');
        Route::delete('/delete/{task}', 'destroy');
        Route::put('/change-status/{task}', 'changeStatus');
    });

    Route::controller(MessageController::class)->prefix('project-message')->group(function () {
        Route::get('/{project}/messages', 'index');
        Route::post('/{project}/store', 'store');
        Route::get('/download/{message}', 'downloadFile');
    });

    Route::controller(HistoryController::class)->prefix('history')->group(function () {
        Route::get('/personal-histories', 'index');
    });
});
