import { CardList } from "@/Pages/Card/Partials/CardList";

export default function DataCountSection({
        data,
        sectiontitle,
        unit,
    }: 
    {
        data:number
        sectiontitle:string
        unit:string
    }) 
    {
    console.log(data)
    return (
        <div className="md:relative w-full border border-gray-300 rounded-md shadow-md overflow-hidden">
            <h5 className="bg-yellow-200 w-full p-2 text-slate-700 md:absolute top-0">
                {sectiontitle}
            </h5>
            <div className="flex items-center justify-center h-[70px] md:h-full text-slate-500">
                    <div>
                        <span className='text-4xl md:text-8xl font-bold'>{data}</span>
                        <span className='text-2xl'>{unit}</span>  
                    </div>                    
            </div>
        </div>
    );
}
