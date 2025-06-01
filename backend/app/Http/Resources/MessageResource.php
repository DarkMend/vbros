<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'message' => $this->message,
            'file' => $this->getFileUrl(),
            'fileDownloadUrl' => $this->file ? url('api/project-message/download/' . $this->id) : null,
            'fileName' => $this->file_name,
            'projectId' => $this->project_id,
            'user' => new UserResource($this->user),
            'createdAt' => $this->created_at
        ];
    }
}
