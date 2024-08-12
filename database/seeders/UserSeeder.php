<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;//書き忘れ注意
use Carbon\Carbon;//現在日時取得

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        //現在日時取得
        $now = Carbon::now();

        //管理人ユーザーを作成
        User::create([
            'name' => 'Engcard',
            'email' => 'admin@admin.com',
            'email_verified_at' => $now,
            'password' => bcrypt('admin0123'),
            'admin_id' => 1,
            'personal_id' => 'admin-0-Engcarg',
            'comment' => 'すべてのアクセス権限を持つ管理者用のアカウントです'
        ]);
    }
}
