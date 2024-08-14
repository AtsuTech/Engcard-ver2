<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;//ストレージ操作
use App\Models\Access;//登録ユーザーのDBを使用
use App\Models\Card;//カードモデル
use App\Models\WordMean;//サブの意味モデル

class CardController extends Controller
{
    //ユーザーごとのカードの一覧
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
        // $flashcard = Flashcard::find($request->flashcard);
        
        // return Inertia::render('Flashcard/Show', [
        //     'flashcard' => $flashcard,
        // ]);
    }


    //新規作成画面
    public function create() 
    {
        //単語帳のアクセス権限管理データ取得
        //$accesses = Access::all();

        // return Inertia::render('Flashcard/Create', [
        //     'accesses' => $accesses,
        // ]);
    }

    //新規保存処理
    public function store(Request $request)
    {
        //カード画像保存先パス作成
        $directory = 'public/images/card/' . Auth::id() . '/' . $request->flashcard_id;

        //画像ファイル受け取り
        $image = $request->file('img_path');

        //画像ファイルの有無判定
        if($image != null){
            //画像ファイルがあれば、public下ディレクトにファイル保存
            $path = $image->store($directory);
            //DBにファイル名を保存
            $img_path = basename($path);

            //reactからアクセスできるように権限付与
            system('chmod -R 755 storage');
        }elseif($image == null){
            //画像ファイルが無ければ、DBにファイル名をnullで保存
            $img_path = null;
        }

        //DB新規保存処理
        $id = Card::insertGetId([
            "flashcard_id" => $request->flashcard_id,
            "user_id" => Auth::id(),
            "img_path" => $img_path,
            "category_id" => $request->integer('category_id'),
            "word" => $request->word,
            "word_mean" => $request->word_mean,
            "sentence" => empty($request->sentence) ? "" : $request->sentence,
            "sentence_mean" => empty($request->sentence_mean) ? "" : $request->sentence_mean,
            "memory" => false,
            "check" => false,
            "correct_count" => 0,
            "incorrect_count" => 0,
            "view_count" => 0,
            "link" => empty($request->link) ? "" : $request->link,
            "created_at" =>  \Carbon\Carbon::now(), 
            "updated_at" => \Carbon\Carbon::now(),  
        ]);

        //サブの意味を保存
        if(!empty($request->sub_means)){
            // JSON文字列を配列に変換
            $sub_means_array = json_decode($request->sub_means, true);

            // 配列として適切にアクセスできることを確認した後に、ループを実行
            foreach ($sub_means_array as $sub_mean) {
                // 記入があものだけ保存する
                if($sub_mean['word_mean'] != ""){
                    $sub_word_means = new WordMean;
                    $sub_word_means->card_id = $id;
                    $sub_word_means->category_id = (int)$sub_mean['category_id'];
                    $sub_word_means->word_mean = $sub_mean['word_mean'];
                    $sub_word_means->save();
                }
            }
        }

    }
}
