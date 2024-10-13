import { CardList } from "@/Pages/Card/Partials/CardList";

export default function NeedReviewCards({
        cards,
    }: 
    {
        cards:any
    }) 
    {

    return (
        <section className="w-full border border-gray-300 rounded-md shadow-md overflow-hidden">
            <h5 className="bg-yellow-200 w-full p-2 text-slate-700">
            復習が必要な単語
            </h5>
            <div className="p-2">
                {cards.length == 0 ?
                    <div className="flex items-center justify-center w-full h-[40px] text-slate-500">
                        <div className="text-xs">
                            カードが0枚のため算出できません
                        </div>
                    </div>
                :
                    <div className="space-y-2 py-4">
                        {cards.map((card: any) => (
                            // <p key={card.id}
                            //     className="border border-slate-400 px-2 py-1 rounded-md"
                            // >
                            //     {card.word}
                            // </p>
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
