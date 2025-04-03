<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatusResource;
use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function allPersonalStatuses()
    {
        $statuses = Status::where('user_id', auth()->id())->get();
        return response()->json(['data' => StatusResource::collection($statuses)], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'color' => ['required'],
        ], [
            'name.required' => 'Введите название',
            'name.color' => 'Выберите цвет'

        ]);

        Status::create([
            'name' => $request->name,
            'color' => $request->color,
            'user_id' => auth()->id(),
        ]);

        return response()->json(['message' => 'Успешно'], 200);

    }
}
