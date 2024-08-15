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

    //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
    protected $appends = ['uuid'];  

}
