import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
//import { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';

export default function Footer({ }: {}) {
    const { advertisements } :any= usePage().props;  
    return (
        <footer className="bg-slate-800 dark:bg-slate-700 text-white">
            <div className="w-full text-center p-1 bg-slate-900">
                <p>© Engcard</p>
            </div>
            <div className='flex justify-center text-sm space-x-3 p-3 /mx-2 '>
                <Link href={route('privacy.policy')}>
                    プライバシーポリシー
                </Link>
                <Link href={route('terms.of.service')}>
                    利用規約
                </Link>
            </div>
            <div className="flex items-center w-full /h-[700px] bg-slate-800 dark:bg-slate-700 text-white">
                <div className='w-full'>
                    {advertisements.map((advertisement:any) => (
                        // <div>{advertisement.name}</div>
                        <div 
                            className="w-fit p-3 mx-auto"
                            dangerouslySetInnerHTML={{ __html: advertisement.html_code }} />
                    ))}                     
                </div>
            </div>
        </footer>
    );
}
