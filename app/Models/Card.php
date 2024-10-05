<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class Card extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'flashcard_id',
    //     'img_path',
    //     'category_id',
    //     'word',
    //     'word_mean',
    //     'sentence',
    //     'sentence_mean',
    //     'link',
    // ];

    //サブの意味とリレーション
    public function wordmeans(){
        return  $this->HasMany('App\Models\WordMean');
    }

    //アクセサリを使いuuidをカラムに追加する
    public function getUuidAttribute()
    {
        $hashids = new Hashids('', 10); 
        $uuid = $hashids->encode($this->id); 
        return $uuid;
    }

    //アクセサリを使いカテゴリをカラムに追加する
    public function getCategoryAttribute()
    {
        $category = Category::find($this->category_id,'item');
        if($this->category_id == 1){
            //category_id = 1(設定なし)の時はnullを返す。フロントエンドでnullの時は表示しない条件付きレンダリングに対応させる
            $category['item'] = null;
        }
        return  $category['item'];
    }

    //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
    protected $appends = ['uuid','category'];  

}
