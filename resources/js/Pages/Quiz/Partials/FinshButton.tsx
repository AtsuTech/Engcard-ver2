import { Link, useForm, usePage } from '@inertiajs/react';
import { RxCross2 } from "react-icons/rx";

export default function FinishButton({uuid}:{uuid:string}) {
    return(
        <Link href={route('flashcard.show',uuid)} className="block w-fit">
            <RxCross2 size={25} />
        </Link>
    );
}