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
use App\Models\FlashcardFavorite;//お気に入りの総数のアクセサリに使用
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class FlashCardController extends Controller
{

    public function library_index()
    {
        $flashcards = Flashcard::orderBy('created_at','desc')->with(['user'])->with(['access'])->where('access_id',"=",2)->take(5)->get();
        $hi_watch_flashcards = Flashcard::orderBy('viewed_count','desc')->with(['user'])->with(['access'])->where('access_id',"=",2)->where('viewed_count',"!=",0)->take(5)->get();

        return Inertia::render('Library/Index', [
            'flashcards' => $flashcards,
            'hi_watch_flashcards' => $hi_watch_flashcards,
        ]);
    }

    //ユーザーごとの単語帳一覧
    public function index() 
    {
        $flashcards = Flashcard::where('user_id', '=' , Auth::id())->with(['user'])->with(['access'])->get();

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
        $flashcard = Flashcard::with(['cards.wordmeans'])->with(['user'])->findOrFail($id);
        $favorites = FlashcardFavorite::where('flashcard_id',$id)->get();
        $has_favorite = FlashcardFavorite::where('flashcard_id',$id)->where('user_id', Auth::id())->get();
        
        return Inertia::render('Flashcard/Show', [
            'flashcard' => $flashcard,
            'favorites' => $favorites,
            'has_favorite' => $has_favorite,
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

        //$flashcard = Flashcard::find($id);
        $flashcard = Flashcard::with(['cards.wordmeans'])->findOrFail($id);
        $cards = Card::where('flashcard_id','=',$id)->with(['wordmeans'])->get();

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

    //閲覧されたカウント処理
    public function viewed_count(Request $request)
    {
        $flashcard = Flashcard::find($request->id);
        $flashcard->viewed_count = $flashcard->viewed_count +1;
        $flashcard->save();
    }

    //自分が見たカウント処理
    public function viewing_count(Request $request)
    {
        $flashcard = Flashcard::find($request->id);
        $flashcard->viewing_count = $flashcard->viewing_count +1;
        $flashcard->save();
    }

    //削除処理
    public function destroy(Request $request, Flashcard $flashcard)
    {
        $flashcard->delete();
    }

}
