<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insurance extends Model
{
    protected $table = 'insurances';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'name'];
}
