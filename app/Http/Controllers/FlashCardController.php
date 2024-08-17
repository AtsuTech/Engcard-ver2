<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Access;//アクセスモデル
use App\Models\Category;//カテゴリモデル
use App\Models\Flashcard;//単語帳モデル
use App\Models\Card;//単語帳モデル
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class FlashCardController extends Controller
{
    //ユーザーごとの単語帳一覧
    public function index() 
    {
        $flashcards = Flashcard::where('user_id', '=' , Auth::id())->get();

        return Inertia::render('Flashcard/Index', [
            'flashcards' => $flashcards,
        ]);
    }


    //詳細画面
    public function show(Request $request) 
    {
        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($request->flashcard)[0];//※配列で帰ってくる

        //$flashcard = Flashcard::find($id)->with(['cards']);
        $flashcard = Flashcard::with(['cards.wordmeans'])->findOrFail($id);
        
        return Inertia::render('Flashcard/Show', [
            'flashcard' => $flashcard,
        ]);
    }


    //新規作成画面
    public function create() 
    {
        //単語帳のアクセス権限管理データ取得
        $accesses = Access::all();

        return Inertia::render('Flashcard/Create', [
            'accesses' => $accesses,
        ]);
    }

    //保存処理
    public function store(Request $request)
    {
        $id = Flashcard::insertGetId([
            "user_id" => Auth::id(),
            "title" => $request->title,
            "access_id" => $request->access_id,
            "description" => $request->description,
            "created_at" =>  \Carbon\Carbon::now(), 
            "updated_at" => \Carbon\Carbon::now(),  
        ]);
        
        //idハッシュ化
        $hashids = new Hashids('', 10); 
        $id = $hashids->encode($id);
        
        return Redirect::route('flashcard.edit', ['flashcard' => $id]);
    }


    //編集画面
    public function edit(Request $request) 
    {
        //単語帳のアクセス権限管理データ取得
        $accesses = Access::all();

        //Reactのコンテキストで単語帳編集コンポーネントから孫コンポーネントにカテゴリのデータ渡す
        $categories = Category::where('user_id', -1)->orWhere('user_id', Auth::id())->get();

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($request->flashcard)[0];//※配列で帰ってくる

        $flashcard = Flashcard::find($id);
        $cards = Card::where('flashcard_id','=',$id)->get();

        return Inertia::render('Flashcard/Edit', [
            'accesses' => $accesses,
            'categories' => $categories,
            'flashcard' => $flashcard,
            'cards' => $cards,
        ]);
    }


    //更新処理
    public function update(Request $request, Flashcard $flashcard) 
    {
        $flashcard->title = $request->title;
        $flashcard->access_id = $request->access_id;
        $flashcard->description = $request->description;
        $flashcard->save();

        return Redirect::route('flashcard.edit', ['flashcard' => $flashcard->uuid]);

    }

    //削除処理
    public function destroy(Request $request, Flashcard $flashcard)
    {
        $flashcard->delete();
    }

}
