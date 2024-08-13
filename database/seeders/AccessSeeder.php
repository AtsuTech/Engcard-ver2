<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Access;

class AccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Access::create([
            'type' => 0,
            'name' => '非公開',
            'description' => 'あなただけが閲覧できます',
        ]);

        Access::create([
            'type' => 1,
            'name' => '公開',
            'description' => '全ユーザーに公開されます',
        ]);
    }
}
