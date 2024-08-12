<?php

namespace App\Providers;
use Illuminate\Support\Facades\Gate;//コメントアウトされてたら解除します 
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        // 管理者
        Gate::define('admin', function ($user) {
            return ($user->admin_id == 1);
        });

        // 編集者
        Gate::define('public', function ($user) {
            return ($user->admin_id == 2);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
