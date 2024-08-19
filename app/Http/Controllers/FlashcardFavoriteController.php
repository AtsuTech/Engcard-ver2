<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\FlashcardFavorite;
// use App\Models\Access;//アクセスモデル
// use App\Models\Category;//カテゴリモデル
// use App\Models\Flashcard;//単語帳モデル
// use App\Models\Card;//単語帳モデル
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class FlashcardFavoriteController extends Controller
{
    //自分のお気に入りの一覧取得
    public function index() 
    {
        $favolites = FlashcardFavorite::where('user_id',$id)->get();
        return response()->json($favolite);
    }


    //詳細画面
    public function show(Request $request) 
    {

    }


    //新規作成画面
    public function create() 
    {

    }

    //保存処理
    public function store(Request $request)
    {
        $favolites = new FlashcardFavorite;

        //ハッシュ化されたuuidをデコード
        //$hashids = new Hashids('', 10); 
        //$id = $hashids->decode($request->flashcard_id)[0];//※配列で帰ってくる

        //すでにお気に入りされていないか確認。
        $check = FlashcardFavorite::where('flashcard_id',$request->flashcard_id)->where('user_id', Auth::id())->get();
        if(!$check->isNotEmpty()){
            $favorite = new FlashcardFavorite();
            $favorite->user_id = Auth::id();
            $favorite->flashcard_id = $request->flashcard_id;
            $favorite->save();
        }
        // return Redirect::route('flashcard.edit', ['flashcard' => $id]);
    }


    //編集画面
    public function edit(Request $request) 
    {
        
    }

    //更新処理
    public function update(Request $request, Flashcard $flashcard) 
    {

    }

    //お気に入りを削除
    public function unfavorite(Request $request) 
    {
        FlashcardFavorite::where('flashcard_id',$request->flashcard_id)->where('user_id', Auth::id())->delete();
    }

    

    //削除処理
    public function destroy(Request $request, FlashcardFavorite $flashcardfavorite)
    {
        $flashcardfavorite->delete();
    }
}
