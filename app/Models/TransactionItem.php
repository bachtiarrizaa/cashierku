<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    protected $fillable = [
        'transaction_id',
        'procedure_id',
        'voucher_id',
        'price',
        'discount',
        'final_price',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }

    public function voucher()
    {
        return $this->belongsTo(Voucher::class);
    }
}
