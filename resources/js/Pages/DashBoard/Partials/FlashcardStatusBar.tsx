import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import {Bar} from 'react-chartjs-2'; //chart-js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'; //chart-js
import { useState } from 'react';
import { TbBackground } from "react-icons/tb";

export default function FlashcardStatusBar({
        flashcards,
    }: 
    {
        flashcards:any,
    }) 
    {

    //const flashcardHasCards = flashcards[0].cards;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const all_flashcards:number = flashcards.length;

    //現在の選択
    const [current,setCurrent] = useState(1);

    //一度に表示する最大数
    const [pagenationMax,setPagenationMax] = useState(5);
    const [inputPagenationMax,setInputPagenationMax]  = useState(0);

    var pagenations = [];
    let i = 1;
    while (i <= Math.ceil(flashcards.length/pagenationMax)) { 
        pagenations.push(i);
        i++; // iをインクリメントして、無限ループを防ぐ
    }
    //console.log(pagenations);
    
    //グラフに渡すデータ
    var data:any = [];

    flashcards = flashcards.filter((card:any,index:number) => index >= ((current*pagenationMax)-pagenationMax)  && index <= (current*pagenationMax)-1 )
    flashcards.map((flashcard:any) => {
        var all_cards:number = flashcard.cards.length;//全てのカード数
        var memory_cards:number  = flashcard.cards.filter((card:any) => card.memory == true).length;//暗記済みカード数
        var memory_rate = (memory_cards/all_cards)*100//暗記率
        data.push(
            {
                sector: flashcard.title,
                count: memory_rate,
            },
        );
    });
    


    //console.log(array)
      
    const options:any = {
        indexAxis: 'y', //ここでグラフの向きを変える
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context:any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        // パーセンテージ表示に'%'を追加
                        //label += context.raw + '%' ;
                        const value = context.raw;
                        label += isNaN(value) || value === 0 ? '0%' : value + '%';
                        return label;
                    },
                },
            },
        },

        scales: {
            y: {
                ticks: {
                    display:true,
                },
                grid: {
                    display: false,
                },
                // afterFit: (scaleInstance:any) => {
                //     scaleInstance.width = 210;
                // },
            },

            x:{
                max:100,//最大値
            }
        },
    };
      
    const chartData = {
        labels: data?.map((item:any) => item.sector),
        datasets: [
            {
                data: data?.map((item:any) => item.count),
                backgroundColor: '#FFD700',
                barThickness: 20,
            },
        ],
    };


    // const flashcardHasCards = flashcards[0].cards;
    // console.log(flashcardHasCards);

    return (
        <section className='w-full border border-gray-300 rounded-md shadow-md overflow-hidden'>
            <h5 className="bg-yellow-200 w-full p-2 text-slate-700">
                各単語帳の暗記率
            </h5>

            {/* <div>
                <input type="number" onChange={(e:any)=> setInputPagenationMax(e.target.value)} />
                <button onClick={()=>setPagenationMax(inputPagenationMax)}>disp</button>
            </div> */}


            <div className="px-2 py-5">

                {flashcards.length != 0 ?
                    <>
                        <div className="flex items-center w-fit /bg-slate-500 mx-auto">
                            <div className="w-[40px] /bg-teal-300 flex items-center justify-center text-slate-400">
                            {current != 1 &&
                                <button onClick={()=>setCurrent(current - 1)}>
                                    <MdNavigateBefore size={26} />
                                </button>
                            }
                            </div>
                            {pagenationMax < all_flashcards &&
                                <ul className="flex space-x-6">
                                    {pagenations.map((pagenation) =>(
                                        <li 
                                        className={
                                            'block font-bold ' +
                                            (current === pagenation
                                                ? 'text-amber-400'
                                                : 'text-slate-400') 
                                        }
                                        onClick={()=>setCurrent(pagenation)}>{pagenation}</li>
                                    ))}                
                                </ul>
                            }
                            <div className="w-[40px] /bg-teal-300 flex items-center justify-center text-slate-400">
                            {current != pagenations.length &&
                                <button onClick={()=>setCurrent(current + 1)}>
                                    <MdNavigateNext size={26} />
                                </button>
                            }
                            </div>
                        </div>
                    
                        <div className="w-full h-64 ">
                            
                            <Bar
                                data={chartData}
                                height={30}
                                options={options}
                                redraw={true}
                            />

                        </div>  
                    </> 
                    :
                    
                    <div className="flex items-center justify-center w-full h-[200px] text-slate-500">
                        <div className="text-xs">
                            カードが0枚のため算出できません
                        </div>
                    </div>
                }                   
            </div>
            

      
        </section>

    );
}
