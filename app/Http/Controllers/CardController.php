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
use App\Models\Category;//カテゴリモデル
use App\Models\Card;//カードモデル
use App\Models\WordMean;//サブの意味モデル
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

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

    //編集画面
    public function edit(Request $request)
    {
        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($request->card)[0];//※配列で帰ってくる

        //Reactのコンテキストで単語帳編集コンポーネントから孫コンポーネントにカテゴリのデータ渡す
        $categories = Category::where('user_id', -1)->orWhere('user_id', Auth::id())->get();

        $card = Card::find($id);
        //$card = Card::with('wordmeans')->findOrFail($id);

        $wordmeans = WordMean::where('card_id', $id)->get();

        return Inertia::render('Card/Edit', [
            'categories' => $categories,
            'card' => $card,
            'wordmeans' => $wordmeans,
        ]);
    }

    //更新処理
    public function update(Request $request, Card $card) 
    {


        $card->word = $request->word;
        $card->word_mean = $request->word_mean;
        // $card->img_path = $request->img_path;
        //$card->category_id = $request->integer('category_id');
        $card->category_id = $request->category_id;
        $card->sentence = $request->sentence;
        $card->sentence_mean = $request->sentence_mean;
        $card->link = $request->link;
        $card->save();

        //return Redirect::route('card.edit', ['card' => $request->uuid]);

    }

    //削除処理
    public function destroy(Request $request, Card $card)
    {
        //$flashcard->delete();
    }

    //画像更新
    public function photo_update(Request $request)
    {
        $card = Card::find($request->id);

        //カード画像保存先パス
        $directory = 'public/images/card/' . Auth::id() . '/' . $card->flashcard_id;


        $image = $request->file('img_path');
        if($image != null){

            //すでに画像がある場合は画像ファイル削除する
            if($card->img_path != null || $card->img_path != ""){
                $delete_target = '/images/card/' . Auth::id() . '/' . $card->flashcard_id . '/';
                Storage::disk('public')->delete($delete_target . $card->img_path);
            }
            
            $path = $image->store($directory);
            $card->img_path = '/storage/images/card/' . Auth::id() . '/' . $card->flashcard_id . '/' . basename($path);
        }elseif($image == null){
            $card->img_path = null;
        }

        $card->save();
    }

    //画像削除
    public function phote_delete(Request $request){

        $card = Card::find($request->id);

        $img_path = str_replace('/storage', '', $card->img_path);
        Storage::disk('public')->delete($img_path);

        //Storage::disk('public')->delete('/images/card/' . Auth::id() . '/' . $card->flashcard_id . '/' . $card->img_path);
        $card->img_path = null;
        $card->save();
    }



}
