<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class ProcedurePrice extends Model
{
    protected $table = 'procedure_prices';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'procedure_id',
        'unit_price',
        'start_date',
        'end_date',
    ];

    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }

    /**
     * Harga tindakan yang berlaku pada tanggal tertentu (default hari ini).
     */
    public static function getCurrentPricesForProcedures(?string $date = null): \Illuminate\Support\Collection
    {
        $date = $date ?? Carbon::today()->format('Y-m-d');
        return static::with('procedure')
            ->whereDate('start_date', '<=', $date)
            ->whereDate('end_date', '>=', $date)
            ->orderByDesc('start_date')
            ->get()
            ->unique('procedure_id')
            ->keyBy('procedure_id');
    }
}
