<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む

class CategoryController extends Controller
{
    //ユーザーごとのカテゴリ一覧
    public function index() 
    {
        //$categories = Category::where('user_id', -1)->orWhere('user_id', Auth::id())->get();
        $categories = Category::Where('user_id', Auth::id())->get();

        return Inertia::render('Category/Index', [
            'categories' => $categories,
        ]);
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
        $category = new Category;
        $category->user_id = Auth::id();
        $category->item = $request->item;;
        $category->save();
    }
 
 
    //編集画面
    public function edit(Request $request) 
    {

    }
 
 
    //更新処理
    public function update(Request $request, Category $category) 
    {
        $category->item = $request->item;
        $category->save();

    }
 
    //削除処理
    public function destroy(Request $request, Category $category)
    {
        $category->delete();
    }
}
