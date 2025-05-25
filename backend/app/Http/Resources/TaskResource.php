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
            'completion_time' => $this->completion_time,
            'project_id' => $this->project_id,
            'status_project_id' => $this->status_project_id,
            'updated_at' => $this->updated_at,
            'user' => new UserWithRoleResource($this->user),
        ];
    }
}
