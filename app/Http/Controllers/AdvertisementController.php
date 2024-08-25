<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Advertisement;//広告モデル


class AdvertisementController extends Controller
{
    //一覧
    public function index() 
    {
        $advertisements = Advertisement::all();
        return Inertia::render('Admin/Advertisement/Index', [
            'advertisements' => $advertisements,
        ]);
    }


    //詳細画面
    public function show(Request $request) 
    {

    }


    //新規作成画面
    public function create() 
    {
        return Inertia::render('Admin/Advertisement/Create');
    }

    //保存処理
    public function store(Request $request)
    {
        $advertisement = new Advertisement;
        $advertisement->fill($request->all())->save();
        return Redirect::route('advertise.index');
    }


    //編集画面
    public function edit(Request $request) 
    {
        $advertisement = Advertisement::find($request->id);
        return Inertia::render('Admin/Advertisement/Edit', [
            'advertisement' => $advertisement,
        ]);

    }


    //更新処理
    public function update(Request $request) 
    {
        $advertisement = Advertisement::find($request->id);
        $advertisement->update($request->all());
        return Redirect::route('advertise.index');
    }

    //削除処理
    public function destroy(Request $request)
    {
        $advertisement = Advertisement::find($request->id);
        $advertisement->delete();
    }

}
