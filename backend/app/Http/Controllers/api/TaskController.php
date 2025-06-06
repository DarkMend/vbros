<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'description' => ['required', 'string'],
            'status_project_id' => ['required', 'integer', 'exists:status_projects,id'],
            'completion_time' => ['required', 'date'],
            'user' => ['nullable', Rule::exists('projects_users', 'user_id')->where('project_id', $request->project_id)],
            'project_id' => ['required']
        ], [
            'description.required' => 'Введите заметку',
            'completion_time.date' => 'Неправильный формат даты'
        ]);

        Task::create([
            'description' => $request->description,
            'completion_time' => \Carbon\Carbon::parse($request->completion_time),
            'status_project_id' => $request->status_project_id,
            'project_id' => $request->project_id,
            'user_id' => $request->user ?? null
        ]);

        return response()->json(['message' => 'Задача успешно создана'], 200);
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'description' => ['required', 'string'],
            'status_project_id' => ['required', 'integer', 'exists:status_projects,id'],
            'completion_time' => ['required', 'date'],
            'user' => ['nullable', Rule::exists('projects_users', 'user_id')->where('project_id', $request->project_id)],
        ], [
            'description.required' => 'Введите заметку',
            'completion_time.date' => 'Неправильный формат даты'
        ]);

        $task->update([
            'description' => $request->description,
            'status_project_id' => $request->status_project_id,
            'completion_time' => \Carbon\Carbon::parse($request->completion_time),
            'user_id' => $request->user ?? null
        ]);

        return response()->json(['message' => 'Задача обновлена'], 200);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Задача успешно удалена'], 200);
    }

    public function changeStatus(Request $request, Task $task)
    {
        $request->validate([
            'status_project_id' => ['required', 'exists:status_projects,id']
        ]);

        $task->update([
            'status_project_id' => $request->status_project_id
        ]);

        return response()->json(['message' => 'Cтатус успешно изменен'], 200);
    }
}
