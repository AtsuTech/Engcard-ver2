<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Redirect;
// use Inertia\Inertia;
use App\Models\WordMean;//サブの意味モデル
//use App\Models\Card;//カードモデル

//use Hashids\Hashids;//idをランダムでユニークな文字列に変換


class WordMeanController extends Controller
{
    //
    //
    public function index() 
    {
        // $flashcards = Flashcard::where('user_id', '=' , Auth::id())->get();

        // return Inertia::render('Flashcard/Index', [
        //     'flashcards' => $flashcards,
        // ]);
    }


    //詳細画面
    public function show(Request $request) 
    {
        //ハッシュ化されたuuidをデコード
        // $hashids = new Hashids('', 10); 
        // $id = $hashids->decode($request->flashcard)[0];//※配列で帰ってくる

        // $flashcard = Flashcard::find($id);
        
        // return Inertia::render('Flashcard/Show', [
        //     'flashcard' => $flashcard,
        // ]);
    }


    //新規作成画面
    public function create() 
    {
        //

    }

    //保存処理
    public function store(Request $request)
    {
        $wordmean = new WordMean;
        $wordmean->card_id = (int)$request->card_id;
        $wordmean->category_id = (int)$request->category_id;
        $wordmean->word_mean = $request->word_mean;
        $wordmean->save();

        //idハッシュ化
        // $hashids = new Hashids('', 10); 
        // $id = $hashids->encode( $wordmean->card_id);

        // return Redirect::route('card.edit', ['card' => $id]);
    }


    //編集画面
    public function edit(Request $request) 
    {

    }


    //更新処理
    public function update(Request $request, WordMean $wordmean) 
    {
        $wordmean->category_id = $request->category_id;
        $wordmean->word_mean = $request->word_mean;
        $wordmean->save();
    }

    //削除処理
    public function destroy(Request $request, WordMean $wordmean)
    {
        $wordmean->delete();
    }
 
}
