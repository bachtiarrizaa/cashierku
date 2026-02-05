<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Insurance;
use App\Services\ApiService;

class SyncInsurances extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-insurances';

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
        $this->info('Syncing insurances...');

        $insurances = $api->getInsurances();

        foreach ($insurances as $insurance) {
            Insurance::updateOrCreate(
                ['id' => $insurance['id']],
                ['name' => $insurance['name']]
            );
        }

        $this->info('Insurances synced successfully.');

        return Command::SUCCESS;
    }
}
