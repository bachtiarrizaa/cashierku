<?php

namespace App\Console\Commands;

use App\Models\Procedure;
use App\Models\ProcedurePrice;
use App\Services\ApiService;
use Illuminate\Console\Command;

class SyncProcedurePrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-procedure-prices';

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
        $this->info('Syncing procedure prices...');

        $procedures = Procedure::all();

        foreach ($procedures as $procedure) {
            $this->line("Fetching prices for: {$procedure->name}");

            $prices = $api->getProcedurePrices($procedure->id);

            foreach ($prices as $price) {
                ProcedurePrice::firstOrCreate(
                    ['id' => $price['id']],
                    [
                        'procedure_id' => $procedure->id,
                        'unit_price'   => $price['unit_price'],
                        'start_date'   => $price['start_date']['value'],
                        'end_date'     => $price['end_date']['value'],
                    ]
                );
            }
        }

        $this->info('Procedure prices synced successfully.');

        return Command::SUCCESS;
    }
}
