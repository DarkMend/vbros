<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserWithRoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $projectId = $request->route('project')?->id ??
            $request->input('project_id') ??
            $this->pivot->project_id;

        // Находим конкретную связь с текущим проектом
        $projectRole = $this->projects
            ->firstWhere('id', $projectId)
            ?->pivot
            ?->role ?? null;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->getAvatarUrl(),
            'role' => $projectRole,
        ];
    }
}
