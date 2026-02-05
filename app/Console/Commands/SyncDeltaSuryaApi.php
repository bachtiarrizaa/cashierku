<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncDeltaSuryaApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-delta-surya-api';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync master data from RS Delta Surya API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Syncing RS Delta Surya data...');

        $this->call('app:sync-insurances');
        $this->call('app:sync-procedures');
        $this->call('app:sync-procedure-prices');

        $this->info('RS Delta Surya data synced successfully');

        return Command::SUCCESS;
    }
}
