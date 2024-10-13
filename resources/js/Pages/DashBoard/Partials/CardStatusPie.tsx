import {Pie} from 'react-chartjs-2'; //chart-js
import {
    ArcElement, 
    Chart as ChartJS,
    Legend, 
    Tooltip
} from 'chart.js';//chart-js

export default function CardStatusPie({
        all_cards,
        meoryed_card,
    }: 
    {
        all_cards:any
        meoryed_card:any,
    }) 
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
        <div className="w-full /h-64 border /border-gray-300 rounded-md shadow-md overflow-hidden">
            <h5 className="bg-yellow-200 w-full p-2 text-slate-700">
                単語修得率<span className='font-extrabold bg-slate-100 p-1 rounded-md mx-2'>{all_cards  == 0 ? 0 : memory_rate  }%</span>
            </h5>
            <div className="w-full">
                <div className="p-2 w-[250px] mx-auto">
                    {all_cards != 0 ?
                        <Pie data={data} />
                    :
                        <div className="flex items-center justify-center w-full h-[220px] text-slate-500">
                            <div className="text-xs">
                                カードが0枚のため算出できません
                            </div>
                        </div>
                    }                
                </div>
            </div>

        </div>
    );
}
