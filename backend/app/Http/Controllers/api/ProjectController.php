<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectWithUsersResource;
use App\Http\Resources\StatusProjectResource;
use App\Models\Project;
use App\Models\StatusProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    public function getProjects()
    {
        $projects = auth()->user()->projects;
        return response()->json(['data' => ProjectResource::collection($projects)], 200);
    }

    public function getProject(Project $project)
    {
        if (!$project->users()->where('user_id', auth()->id())->exists()) {
            return response()->json(['message' => 'У вас нет такого проекта'], 403);
        }

        $project->load('users');

        return response()->json(['data' => new ProjectWithUsersResource($project)], 200);
    }

    public function getStatuses(Project $project)
    {
        if (!$project->users()->where('user_id', auth()->id())->exists()) {
            return response()->json(['message' => 'Доступ запрещён'], 403);
        }

        $statuses = $project->load([
            'statuses.tasks' => function ($query) {
                $query->orderBy('created_at', 'desc');
            },
            'statuses.tasks.user.projects' => function ($query) use ($project) {
                $query->where('projects.id', $project->id);
            }
        ])->statuses;

        return StatusProjectResource::collection($statuses);
    }

    public function update(Request $request, Project $project)
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

        if (!$request->hasFile('icon')) {
            unset($data['icon']);
            $data['icon'] = $project->icon;
        } else {
            $image = $request->file('icon')->store('projects/icons');

            if ($project->icon && Storage::exists($project->icon)) {
                Storage::delete($project->icon);
            }

            $data['icon'] = $image;
        }

        $project->update($data);

        return response()->json(['message' => 'Проект успешно обновлен'], 200);
    }

    public function destroy(Project $project)
    {
        if ($project->icon && Storage::exists($project->icon)) {
            Storage::delete($project->icon);
        }

        $project->delete();

        return response()->json(['message' => 'Проект успешно удален'], 200);
    }
}
