<?php

namespace App\Console\Commands;

use App\Models\Procedure;
use App\Services\ApiService;
use Illuminate\Console\Command;

class SyncProcedures extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-procedures';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(ApiService $api): int
    {
        $this->info('Syncing procedures...');

        $procedures = $api->getProcedures();

        foreach ($procedures as $procedure) {
            Procedure::updateOrCreate(
                ['id' => $procedure['id']],
                ['name' => $procedure['name']]
            );
        }

        $this->info('Procedures synced successfully.');

        return Command::SUCCESS;
    }
}
