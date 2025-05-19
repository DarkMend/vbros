<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getIconUrl()
    {
        if (!$this->icon) {
            return null;
        }

        return Storage::url($this->icon);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'projects_users', 'project_id', 'user_id')->withPivot('role');
    }

    public function statuses()
    {
        return $this->hasMany(StatusProject::class);
    }
}
