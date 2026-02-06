<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'transaction_number',
        'patient_name',
        'user_id',
        'insurance_id',
        'payment_method',
        'payment_status',
        'total_amount',
        'total_discount',
        'final_amount',
        'paid_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function insurance()
    {
        return $this->belongsTo(Insurance::class);
    }

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }
}
