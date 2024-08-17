import { Link, useForm, usePage } from '@inertiajs/react';


export default function FinishButton({uuid}:{uuid:string}) {
    return(
        <Link href={route('flashcard.show',uuid)} className="block w-full">
            終了
        </Link>
    );
}