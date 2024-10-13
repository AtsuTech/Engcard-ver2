<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth; //Authファサード
use App\Models\Flashcard;//単語帳モデル
use App\Models\Card;//カードモデル


class DashBoardController extends Controller
{
    //ダッシュボードTOP画面
    public function dashboard_data(Request $request)
    {
        //全てのカード
        $all_cards = Card::where("user_id" , Auth::id())->get();

        //暗記済みカード
        $meoryed_card = Card::where("user_id" , Auth::id())->where('memory', true)->get();

        //単語帳(カードもリレーション);
        $flashcards = Flashcard::where("user_id" , Auth::id())->with(['cards'])->get();

        //正解率が低い単語帳
        // $need_review_flashcards = Flashcard::withCount(['cards' => function ($query) {
        //     $query->where('memory', false);
        // }])->get();
        // dd($need_review_flashcards);

        $need_review_cards = Card::where("user_id" , Auth::id())->where('memory', '=', false)->orderBy('incorrect_count','desc')->with(['wordmeans'])->get()->take(6);

        $less_review_cards = Card::where("user_id" , Auth::id())->orderBy('view_count','asc')->with(['wordmeans'])->get()->take(6);
        
        return Inertia::render('DashBoard/Index', [
            'all_cards' => $all_cards->count(),
            'meoryed_card' => $meoryed_card->count(),
            'flashcards' => $flashcards,
            // 'need_review_flashcards' => $need_review_flashcards
            'need_review_cards' => $need_review_cards,
            'less_review_cards' => $less_review_cards,
        ]);
    }
}
