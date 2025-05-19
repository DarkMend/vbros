<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function users()
    {
        return $this->belongsToMany(User::class, 'projects_users', 'project_id', 'user_id')->withPivot('role');
    }

    public function statuses()
    {
        return $this->hasMany(StatusProject::class);
    }
}
