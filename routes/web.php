<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FlashCardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/profile/photo', [ProfileController::class, 'photo_update'])->name('profile.photo_update');

    //単語帳CRUD処理
    Route::resource('/flashcard',FlashCardController::class)
        ->names([
            'index'=>'flashcard.index',
            'create'=>'flashcard.create',
            'store'=>'flashcard.store',
            'edit' => 'flashcard.edit',
            'update'=>'flashcard.update',
            'destroy'=>'flashcard.destroy',
    ])->middleware(['auth']);

});

Route::group(['middleware' => ['auth', 'can:admin']], function () {
	Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->middleware(['auth', 'verified'])->name('admin.dashboard');
});

require __DIR__.'/auth.php';
