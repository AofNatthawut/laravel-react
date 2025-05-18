<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThaiMovie extends Model
{
    protected $fillable = ['title', 'description', 'director', 'year', 'image'];
    
}