import { CardList } from "@/Pages/Card/Partials/CardList";

export default function LessViewCards({
        cards,
    }: 
    {
        cards:any
    }) 
    {

    return (
        <section className="w-full border border-gray-300 rounded-md shadow-md overflow-hidden">
            <h5 className="bg-yellow-200 w-full p-2 text-slate-700">
                閲覧が少ない単語
            </h5>
            <div className="p-2">
                {cards.length == 0 ?
                    <div>
                    <p>カードが0枚のため表示できません</p> 
                    </div>
                :
                    <div className="space-y-2 py-4">
                        {cards.map((card: any) => (
                            <CardList 
                                id ={card.id}
                                uuid ={card.uuid}
                                memory ={card.memory}
                                word ={card.word}
                                word_mean ={card.word_mean}
                                category ={card.category}
                                sub_word_mean={card.wordmeans}
                                sentence={card.sentence}
                                sentence_mean={card.sentence_mean}
                                link={card.link}
                                user_id ={card.user_id}
                                flashcard_id ={card.flashcard_id}
                                img_path ={card.img_path}
                            /> 
                        ))}                    
                    </div>
                }
            </div>
        </section>
    );
}
