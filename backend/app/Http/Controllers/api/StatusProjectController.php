<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\StatusProject;
use Illuminate\Http\Request;

class StatusProjectController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:240'],
            'color' => ['required', 'string'],
            'project_id' => ['required'],
        ], [
            'name.required' => 'Введите название',
            'name.color' => 'Выберите цвет',
            'name.max' => 'Слишком большое название статуса'
        ]);

        StatusProject::create([
            'name' => $request->name,
            'color' => $request->color,
            'project_id' => $request->project_id
        ]);

        return response()->json(['message' => 'Статус добавлен успешно'], 200);
    }

    public function update(Request $request, StatusProject $statusProject)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:240'],
            'color' => ['required', 'string'],
        ], [
            'name.required' => 'Введите название',
            'name.color' => 'Выберите цвет',
            'name.max' => 'Слишком большое название статуса'
        ]);

        $statusProject->update([
            'name' => $request->name,
            'color' => $request->color,
        ]);

        return response()->json(['message' => 'Статус успешно обновлен'], 200);
    }

    public function destroy(StatusProject $statusProject)
    {
        $statusProject->delete();
        return response()->json(['message' => 'Статус успешно удален'], 200);
    }
}
