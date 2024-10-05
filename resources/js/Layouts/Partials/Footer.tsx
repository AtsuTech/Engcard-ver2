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
        <footer className="flex items-center w-full h-96 bg-slate-800 text-white">
            <div className="w-full text-center p-10">
                Engcard@2024-08-31
            </div>
            {advertisements.map((advertisement:any) => (
                // <div>{advertisement.name}</div>
                <div 
                    className="w-fit p-3 ml-auto mr-auto"
                    dangerouslySetInnerHTML={{ __html: advertisement.html_code }} />
            ))}
        </footer>
    );
}
