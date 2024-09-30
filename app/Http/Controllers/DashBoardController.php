<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth; //Authファサード
use App\Models\Card;//カードモデル


class DashBoardController extends Controller
{
    //ダッシュボードTOP画面
    public function dashboard_data(Request $request)
    {
        $all_cards = Card::where("user_id" , Auth::id())->get();

        $meoryed_card = Card::where("user_id" , Auth::id())->where('memory', true)->get();

        return Inertia::render('Dashboard', [
            'all_cards' => $all_cards->count(),
            'meoryed_card' => $meoryed_card->count(),
        ]);
    }
}
