<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Events\NewProjectMessage;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Project;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Project $project)
    {
        $message = Message::with('user')->where('project_id', $project->id)->orderBy('created_at', 'asc')->get();
        return MessageResource::collection($message);
    }

    public function store(Request $request, Project $project)
    {
        $data = $request->validate([
            'message' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'max:20480']
        ]);

        if (empty($request->message) && !$request->hasFile('file')) {
            return response()->json(['message' => 'Введите сообщение или выберите файл'], 422);
        };

        if ($request->hasFile('file')) {
            unset($data['file']);
            $data['file'] = $request->file('file')->store('projects/chat');
            $data['file_name'] = $request->file('file')->getClientOriginalName();
        };

        $message = Message::create([
            'message' => $request->message,
            'file' => $data['file'] ?? null,
            'file_name' => $data['file_name'] ?? null,
            'project_id' => $project->id,
            'user_id' => auth()->id()
        ]);

        $message->load('user');

        NewProjectMessage::dispatch($message);

        return response()->json([
            'message' => 'Сообщение успешно отправлено'
        ], 201);
    }
}
