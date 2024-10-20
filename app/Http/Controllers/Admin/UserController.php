<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;//ストレージ操作
use App\Models\User;//userユーザーのDBを使用

use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class UserController extends Controller
{
    //一覧
    public function index(){

        $all_user = User::all();
        
        return Inertia::render('Admin/User/Index', [
            'all_user' => $all_user,
        ]);        
    }

    //削除
    public function destroy(Request $request){

        $user = User::find($request->id);

        //プロフィール画像削除
        Storage::disk('public')->delete('images/profile/' . $user->profile_photo_path);

        //カード画像をフォルダごと削除
        $directory = 'public/images/card/' . $user->id;
        Storage::deleteDirectory($directory);

        $user->delete();
            
    }

}
