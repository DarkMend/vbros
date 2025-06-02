<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoryResource extends JsonResource
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
            'userId' => $this->user_id,
            'projectName' => $this->project_name,
            'projectIcon' => $this->getIconUrl(),
            'startProject' => $this->start_project,
            'finishProject' => $this->finish_project ?? null
        ];
    }
}
