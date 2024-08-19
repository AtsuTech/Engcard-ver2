<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Card;//カードの総数のアクセサリに使用
use App\Models\FlashcardFavorite;//お気に入りの総数のアクセサリに使用
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class Flashcard extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','title','access'];

    //Cara Modelリレーション
    public function cards()
    {
        return $this->hasMany('App\Models\Card');
    }

    //User Modelリレーション
    // public function user() {
    //     return $this->belongsToMany('App\Models\User');
    // }

    //日付の表示形式を変換
    protected $casts = [
        'created_at' => 'datetime:Y年n月j日',
        'updated_at' => 'datetime:Y年n月j日',
    ];

    //アクセサリを使いuuidをカラムに追加する
    public function getUuidAttribute()
    {
        $hashids = new Hashids('', 10); 
        $uuid = $hashids->encode($this->id); 
        return $uuid;
    }

    //アクセサリを使いカードの総数をカラムに追加する
    public function getCardlengthAttribute()
    {
        $cards = Card::where('flashcard_id','=',$this->id)->get();
        return $cards->count();
    }

    //アクセサリを使いお気に入りの総数をカラムに追加する
    public function getFavoriteAttribute()
    {
        $cards = FlashcardFavorite::where('flashcard_id','=',$this->id)->get();
        return $cards->count();
    }

    //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
    protected $appends = ['uuid','cardlength','favorite'];   
}
