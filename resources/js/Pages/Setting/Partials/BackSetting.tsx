import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { MdNavigateNext } from "react-icons/md";

export default function BacKSetting() {
    return (
        <div className="flex items-center mr-2">
            <Link href={route('setting')} className="underline">
                {/* <AiFillSetting size={26} /> */}
                <span>設定</span>
            </Link>
            <MdNavigateNext />
        </div>
    );
}
