import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CardStatusPie from './Partials/CardStatusPie';
import DataCountSection from './Partials/DataCountSection';
import FlashcardStatusBar from './Partials/FlashcardStatusBar';
import NeedReviewCards from './Partials/NeedReviewCards';
import LessViewCards from './Partials/LessViewCards';
import { MdDashboard } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

export default function Index({
        auth, 
        all_cards,
        meoryed_card,
        flashcards,
        need_review_cards,
        less_review_cards,
    }: 
    PageProps<{
        all_cards:any
        meoryed_card:any,
        flashcards:any,
        need_review_cards:any,
        less_review_cards:any,
    }>) 
    {
        console.log(need_review_cards)
    return (
        <CommonLayout>
            <Head title="ダッシュボード" />

            <div className="py-0 sm:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600">
                            <MdDashboard size={26} />
                            <h5 className="font-bold">ダッシュボード</h5>
                        </div> 

                        <div className='p-5 '>

                            <section className=" /bg-black md:flex md:space-x-4 md:space-y-0 space-y-4 mb-4">
                                <CardStatusPie all_cards={all_cards} meoryed_card={meoryed_card} />
                                <DataCountSection data={flashcards.length} sectiontitle="単語帳総数" unit="冊" />
                                <DataCountSection data={all_cards} sectiontitle="カード総数" unit="枚" />
                            </section>
                            
                            <FlashcardStatusBar flashcards={flashcards} />

                            <section className='md:flex md:space-x-3 py-4 space-y-4 md:space-y-0 '>
                                <NeedReviewCards cards={need_review_cards} />
                                <LessViewCards cards={less_review_cards} />
                            </section>

                        </div>

                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
