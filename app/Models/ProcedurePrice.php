<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
