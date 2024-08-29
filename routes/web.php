<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FlashCardController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\WordMeanController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FlashcardFavoriteController;
use App\Http\Controllers\AdvertisementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;//ライブバリデーション

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//暗記画面
Route::get('/memory/{id}',[CardController::class, 'memory_view'])->name('memory');

//クイズ画面
Route::get('/quiz/{id}',[CardController::class, 'quiz'])->name('quiz');

//クイズ結果更新
Route::post('/quiz/memory',[CardController::class, 'memory'])->name('quiz.memory');

//カード閲覧回数記録
Route::post('/view_count',[CardController::class, 'view_count'])->name('view_count');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/profile/photo', [ProfileController::class, 'photo_update'])->name('profile.photo_update');
    Route::post('/profile/update_personal_id', [ProfileController::class, 'update_personal_id'])->middleware([HandlePrecognitiveRequests::class])->name('profile.update_personal_id');

    //単語帳CRUD処理
    Route::resource('/flashcard',FlashCardController::class)
        ->names([
            'index'=>'flashcard.index',
            'show' => 'flashcard.show',
            'create'=>'flashcard.create',
            'store'=>'flashcard.store',
            'edit' => 'flashcard.edit',
            'update'=>'flashcard.update',
            'destroy'=>'flashcard.destroy',
    ])->middleware(['auth']);

    //単語カードCRUD処理
    Route::resource('/card',CardController::class)
        ->names([
            'index'=>'card.index',
            'show' => 'card.show',
            'create'=>'card.create',
            'store'=>'card.store',
            'edit' => 'card.edit',
            'update'=>'card.update',
            'destroy'=>'card.destroy',
    ])->middleware(['auth']);
    Route::put('/card_photo_update', [CardController::class, 'photo_update'])->name('card.photo_update');
    Route::put('/phote_photo_delete', [CardController::class, 'phote_delete'])->name('card.photo_delete');
    Route::post('/card/update', [CardController::class, 'update_with_image'])->name('card.update_with_image');

    //サブの意味CRUD処理
    Route::resource('/wordmean',WordMeanController::class)
        ->names([
            'index'=>'wordmean.index',
            'show' => 'wordmean.show',
            'create'=>'wordmean.create',
            'store'=>'wordmean.store',
            'edit' => 'wordmean.edit',
            'update'=>'wordmean.update',
            'destroy'=>'wordmean.destroy',
    ])->middleware(['auth']);

    //カテゴリCRUD処理
    Route::resource('/category',CategoryController::class)
    ->names([
            'index'=>'category.index',
            'show' => 'category.show',
            'create'=>'category.create',
            'store'=>'category.store',
            'edit' => 'category.edit',
            'update'=>'category.update',
            'destroy'=>'category.destroy',
    ])->middleware(['auth']);

    //お気に入りCRUD処理
    Route::resource('/flashcardfavorite',FlashcardFavoriteController::class)
        ->names([
            'index'=>'flashcardfavorite.index',
            'show' => 'flashcardfavorite.show',
            'create'=>'flashcardfavorite.create',
            'store'=>'flashcardfavorite.store',
            'edit' => 'flashcardfavorite.edit',
            'update'=>'flashcardfavorite.update',
            'destroy'=>'flashcardfavorite.destroy',
    ])->middleware(['auth']);
    Route::post('/flashcardfavorite/delete', [FlashcardFavoriteController::class, 'unfavorite'])->name('flashcardfavorite.delete');


    

});

//管理権限ユーザーのみアクセス可能
Route::middleware('auth','can:admin','verified')->group(function () {
//Route::group(['middleware' => ['auth', 'can:admin']], function () {
	Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    //広告CRUD処理
    Route::get('/admin/advertise', [AdvertisementController::class, 'index'])->name('advertise.index');
    Route::get('/advertise/create', [AdvertisementController::class, 'create'])->name('advertise.create');
    Route::get('/advertise/{id}', [AdvertisementController::class, 'edit'])->name('advertise.edit');
    Route::patch('/advertise/{id}', [AdvertisementController::class, 'update'])->name('advertise.update');
    Route::delete('/advertise/{id}', [AdvertisementController::class, 'destroy'])->name('advertise.destroy');

//})->middleware(['auth', 'verified']);
});

require __DIR__.'/auth.php';
