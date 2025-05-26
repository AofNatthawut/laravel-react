<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $fillable = [
        'employee_name',
        'leave_type',
        'start_date',
        'end_date',
        'reason',
        'days_requested',
        'days_left',
        'status',
    ];
}
