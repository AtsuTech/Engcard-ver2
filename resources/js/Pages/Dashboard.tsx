import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import {Pie} from 'react-chartjs-2'; //chart-js
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';//chart-js

export default function Dashboard({
        auth, 
        all_cards,
        meoryed_card,
    }: 
    PageProps<{
        all_cards:any
        meoryed_card:any,
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
                                <Pie data={data} />
                            </div>
                            <p>{all_cards}/{meoryed_card}</p>
                            <p>{auth.user.name}</p>
                        </section>
                        
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
