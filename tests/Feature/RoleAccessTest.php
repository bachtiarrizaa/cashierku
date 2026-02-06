<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Seed roles
        $this->seed(\Database\Seeders\RoleSeeder::class);
    }

    public function test_admin_can_access_admin_dashboard()
    {
        $role = Role::where('name', 'admin')->first();
        $user = User::factory()->create(['role_id' => $role->id]);

        $response = $this->actingAs($user)->get(route('admin.dashboard'));

        $response->assertStatus(200);
    }

    public function test_cashier_cannot_access_admin_dashboard()
    {
        $role = Role::where('name', 'cashier')->first();
        $user = User::factory()->create(['role_id' => $role->id]);

        $response = $this->actingAs($user)->get(route('admin.dashboard'));

        $response->assertStatus(403);
    }

    public function test_cashier_can_access_cashier_dashboard()
    {
        $role = Role::where('name', 'cashier')->first();
        $user = User::factory()->create(['role_id' => $role->id]);

        $response = $this->actingAs($user)->get(route('cashier.dashboard'));

        $response->assertStatus(200);
    }

    public function test_marketing_can_access_marketing_dashboard()
    {
        $role = Role::where('name', 'marketing')->first();
        $user = User::factory()->create(['role_id' => $role->id]);

        $response = $this->actingAs($user)->get(route('marketing.dashboard'));

        $response->assertStatus(200);
    }

    public function test_dashboard_redirects_admin_to_admin_dashboard()
    {
        $role = Role::where('name', 'admin')->first();
        $user = User::factory()->create(['role_id' => $role->id]);

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response->assertRedirect(route('admin.dashboard'));
    }
}
