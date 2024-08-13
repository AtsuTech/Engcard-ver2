<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Access;//登録ユーザーのDBを使用
use App\Models\Flashcard;


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
        $flashcard = Flashcard::find($request->flashcard);
        
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
        
        //idをハッシュ化
        //$hashids = new Hashids('', 10); 
        //$id = $hashids->encode($id);
        
        return Redirect::route('flashcard.edit', ['flashcard' => $id]);
    }


    //編集画面
    public function edit(Request $request) 
    {
        //単語帳のアクセス権限管理データ取得
        $accesses = Access::all();

        $flashcard = Flashcard::find($request->flashcard);

        return Inertia::render('Flashcard/Edit', [
            'accesses' => $accesses,
            'flashcard' => $flashcard,
        ]);
    }


    //更新処理
    public function update(Request $request, Flashcard $flashcard) 
    {
        $flashcard->title = $request->title;
        $flashcard->access_id = $request->access_id;
        $flashcard->description = $request->description;
        $flashcard->save();

        return Redirect::route('flashcard.edit', ['flashcard' => $flashcard->id]);

    }

    //削除処理
    public function destroy(Request $request, Flashcard $flashcard)
    {
        $flashcard->delete();
    }

}
