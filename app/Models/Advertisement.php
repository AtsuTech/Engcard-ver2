<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;

    //protected $primaryKey = 'id'; 

    protected $fillable = [
        'user_id',
        'name',
        'html_code',
        'active'
    ];
}
