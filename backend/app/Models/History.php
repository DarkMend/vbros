<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class History extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getIconUrl()
    {
        if (!$this->project_icon) {
            return null;
        }
        return Storage::url($this->project_icon);
    }
}
