<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $fillable = [
        'insurance_id',
        'name',
        'type',
        'value',
        'max_discount',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function insurance()
    {
        return $this->belongsTo(Insurance::class);
    }

    public function procedures()
    {
        return $this->belongsToMany(Procedure::class, 'voucher_procedures');
    }
}
