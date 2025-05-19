<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\StatusProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'icon' => ['mimes:jpeg,png,jpg,svg']
        ], [
            'name.required' => 'Введите имя',
            'name.string' => 'Имя должно состоять из символов',
            'description.required' => 'Введите описание',
            'description.string' => 'Описание должно состоять из символов',
            'icon.mimes' => 'Неправильный формат изображения'
        ]);

        if ($request->hasFile('icon')) {
            unset($data['icon']);
            $icon = $request->file('icon')->store('projects/icons');
            $data['icon'] = $icon;
        }

        DB::transaction(function () use ($data) {
            $project = Project::create($data);

            $project->users()->attach(auth()->id(), ['role' => 'creator']);

            StatusProject::create([
                'name' => 'В обработке',
                'color' => '#FF9D00',
                'project_id' => $project->id
            ]);

            StatusProject::create([
                'name' => 'В процессе',
                'color' => '#008CFF',
                'project_id' => $project->id

            ]);

            StatusProject::create([
                'name' => 'Завершено',
                'color' => '#44FF00',
                'project_id' => $project->id

            ]);
        });

        return response()->json(['message' => 'Проект успешно создан'], 200);
    }
}
