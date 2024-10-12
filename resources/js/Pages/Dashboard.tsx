import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import {Pie,Bar} from 'react-chartjs-2'; //chart-js
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';//chart-js

import {
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
   } from 'chart.js'; 

export default function Dashboard({
        auth, 
        all_cards,
        meoryed_card,
        flashcards,
    }: 
    PageProps<{
        all_cards:any
        meoryed_card:any,
        flashcards:any,
    }>) 
    {

    const memory_rate = ((meoryed_card/all_cards)*100).toFixed(1);

    ChartJS.register(ArcElement, Tooltip, Legend)

    const data = {
        labels: ['暗記済み', '未修得'],
        datasets: [
            {
                //label: '購入数',
                data: [meoryed_card, (all_cards - meoryed_card)],
                backgroundColor: [
                '#FFD700', '#D3D3D3'
                ],
                borderColor: [
                '#FFD700', '#D3D3D3'
                ],
                borderWidth: 1
            }
        ]
    }


    const flashcardHasCards = flashcards[0].cards;

    ChartJS.register(CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend);
    const datae = [
        {
            sector: 'Sector 1',
            count: 20,
        },
        {
            sector: 'Sector 2',
            count: 28,
        },
        {
            sector: 'Sector 3',
            count: 42,
        },
    ];
      
      const options:any = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            afterFit: (scaleInstance:any) => {
              scaleInstance.width = 150;
            },
          },
        },
      };
      
      const chartData = {
        labels: datae?.map((item:any) => item.sector),
        datasets: [
          {
            data: datae?.map((item:any) => item.count),
            backgroundColor: 'rgba(53, 162, 235, 0.8)',
            barThickness: 30,
          },
        ],
      };



    console.log(flashcardHasCards);

    return (
        <CommonLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600">
                            {/* <MdEdit size={26} /> */}
                            <h5 className="font-bold">ダッシュボード</h5>
                        </div> 

                        <section className="p-5">
                            <div className="w-64 border p-2 border-gray-300 rounded-md">
                                <h5>単語修得率:{memory_rate}%</h5>
                                {all_cards != 0 ?
                                    <Pie data={data} />
                                :
                                    <div className="flex items-center justify-center w-full h-[220px] bg-slate-300">
                                        <div className="text-xs">
                                            カードが0枚のため算出できません
                                        </div>
                                    </div>
                                }
                                
                            </div>
                            {/* <p>{all_cards}/{meoryed_card}</p>
                            <p>{auth.user.name}</p> */}
                        </section>

                        <div className='h-64'>
                                    <Bar
                                                                    data={chartData}
                                                                    height={30}
                                                                    options={options}
                                                                    redraw={true}
                                                                />
                        </div>
                        

                        {/* {toal_cards} */}
                        
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
