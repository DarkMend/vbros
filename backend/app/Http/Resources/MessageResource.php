<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'message' => $this->message,
            'file' => $this->getFileUrl(),
            'fileName' => $this->file_name,
            'project_id' => $this->project_id,
            'user' => new UserResource($this->user),
            'created_at' => $this->created_at
        ];
    }
}
