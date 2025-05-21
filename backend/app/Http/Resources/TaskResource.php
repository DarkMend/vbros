<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'completionTime' => $this->completion_time,
            'projectId' => $this->project_id,
            'statusProjectId' => $this->status_project_id,
            'user' => new UserWithRoleResource($this->user),
        ];
    }
}
