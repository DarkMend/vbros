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
        
    }
}
