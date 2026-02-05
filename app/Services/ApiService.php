<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ApiService
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.rs_api.base_url');
    }

    private function getToken(): string
    {
        return Cache::remember('rs_api_token', 86000, function () {
            $response = Http::post(
                "{$this->baseUrl}/auth",
                [
                    'email' => config('services.rs_api.email'),
                    'password' => config('services.rs_api.password'),
                ]
            );

            if (! $response->successful()) {
                throw new \Exception('Failed to authenticate RS API');
            }

            return $response->json('access_token');
        });
    }

    private function client()
    {
        return Http::withToken($this->getToken());
    }

    public function getInsurances(): array
    {
        $response = $this->client()->get("{$this->baseUrl}/insurances");

        return $response->json()['insurances'];
    }

    public function getProcedures(): array
    {
        return $this->client()
            ->get("{$this->baseUrl}/procedures")
            ->json('procedures');
    }

    public function getProcedurePrices(string $procedureId): array
    {
        return $this->client()
            ->get("{$this->baseUrl}/procedures/{$procedureId}/prices")
            ->json('prices');
    }
}
