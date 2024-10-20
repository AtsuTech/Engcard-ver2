import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';

export default function Admin({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="/min-h-screen bg-gray-100 dark:bg-gray-900">

            <div className="flex w-full">
                <aside className='w-64 h-screen bg-slate-600'>
                    <div className="h-16 flex items-center justify-center border-b border-b-white">
                        <div className="text-2xl text-white">
                            Encard-Admin
                        </div>
                    </div>
                    <div className=''>
                        <ul className="p-2 space-y-4 text-center text-white">
                            <li>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href={route('user.index')} active={route().current('user.index')}>
                                    ユーザー管理
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href={route('advertise.index')} active={route().current('advertise.index')}>
                                    アフィリエイト広告
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="w-full bg-white">
                    <nav className="block bg-slate-400 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                        <div className="/max-w-7xl /mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-end /justify-between h-16">
                                <div className="hidden sm:flex sm:items-center sm:ms-6">
                                    <div className="ms-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {user.name}
                                                        {user.profile_photo_path != null ?
                                                            <img src={'/storage/images/profile/' + user.profile_photo_path} alt="" className='w-8 h-8 ml-1 rounded-full' />
                                                        :
                                                            <div className="flex items-center justify-center w-8 h-8 ml-1 rounded-full text-white bg-slate-900">
                                                                {user.name.substr(0,1)}
                                                            </div>
                                                        } 

                                                        <svg
                                                            className="ms-2 -me-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-me-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                    >
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path
                                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                            </div>

                            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                        {user.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav> 

                    {header && (
                        <header className="bg-slate-200 dark:bg-gray-800 py-3 px-2 /shadow /border-b /border-b-zinc-600 mx-2 my-2 rounded-md">
                            <div className="">{header}</div>
                        </header>
                    )} 

                    <main className="p-2">{children}</main>

                </div>
            </div>



        </div>
    );
}
