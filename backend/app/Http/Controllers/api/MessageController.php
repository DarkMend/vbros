<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Events\NewProjectMessage;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

        broadcast(new NewProjectMessage(new MessageResource($message)))->toOthers();

        return response()->json([
            'message' => 'Сообщение успешно отправлено'
        ], 201);
    }

    public function downloadFile(Message $message)
    {
        if (!$message->file || !Storage::exists($message->file)) {
            return response()->json(['message' => 'Нет такого файла'], 404);
        }

        return Storage::download($message->file, $message->file_name, [
            'Content-Type' => 'application/octet-stream',
            'Content-Disposition' => 'attachment; filename="' . $message->file_name . '"'
        ]);
    }
}
