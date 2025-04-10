<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index() {
        return response()->json(['data' => NoteResource::collection(Note::all()), 'message' => 'Нормик'], 200);
    }

    public function store(Request $request){
        $request->validate([
            'description' => ['required', 'string'],
            'status_id' => ['required', 'integer', 'exists:statuses,id'],
            'date' => ['required', 'date'],
        ], [
            'description.required' => 'Введите заметку',
            'date.date' => 'Неправильный формат даты'
        ]);

        Note::create([
            'description' => $request->description,
            'status_id' => $request->status_id,
            'user_id' => auth()->id(),
            'date' => \Carbon\Carbon::parse($request->date),
        ]);

        return response()->json(['message' => 'Успех'], 200);
    }

    public function update(Request $request, Note $note){
        $request -> validate([
            'description' => ['required', 'string'],
            'status_id' => ['required', 'integer', 'exists:statuses,id'],
            'date' => ['required', 'date'],
        ], 
        [
            'description.required' => 'Введите заметку',
            'date.date' => 'Неправильный формат даты'
        ]);

        $note->update([
            'description' => $request->description,
            'status_id' => $request->status_id,
            'date' => \Carbon\Carbon::parse($request->date),
        ]);

        return response()->json(['message' => 'Успех'], 200);
    }
}
