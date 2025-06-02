<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HistoryResource;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index()
    {
        return HistoryResource::collection(auth()->user()->histories);
    }
}
