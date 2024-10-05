import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
//import { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';
import Footer from './Partials/Footer';

export default function Guest({ children }: PropsWithChildren) {
    const { auth } :any= usePage().props;  
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-amber-400 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 /bg-teal-800">
                    <div className="flex /justify-between justify-center h-12 relative items-center">

                        <div className="absolute sm:left-0 flex">
                            <div className="shrink-0 flex items-center w-20">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>
                        </div>

                        <div className="/h-16 hidden space-x-10 sm:-my-px sm:ms-10 /bg-white sm:flex">
                            {auth.user &&
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    ダッシュボード
                                </NavLink>
                            }
                            <NavLink href={route('library')} active={route().current('library')}>
                                ライブラリ
                            </NavLink>

                            <NavLink href={route('flashcard.create')} active={route().current('flashcard.create')}>
                                つくる
                            </NavLink>
                            <NavLink href={route('flashcard.index')} active={route().current('flashcard.index')}>
                                単語帳
                            </NavLink>
                        </div>

                        <div className="absolute right-0 hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                            {auth.user ? 
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center /px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                            >
                                                {auth.user &&
                                                    <div>
                                                    {auth.user.profile_photo_path != null ?
                                                        <img src={'/storage/images/profile/' + auth.user.profile_photo_path} alt="s" className='w-8 h-8 ml-1 rounded-full' />
                                                    :
                                                        <div className="flex items-center justify-center w-8 h-8 ml-1 rounded-full text-white bg-slate-900">
                                                            {auth.user.name.substr(0,1)}
                                                        </div>
                                                    } 
                                                    </div>
                                                }
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {/* <div className="px-4">{user.name}</div> */}
                                        {/* <Dropdown.Link href={route('profile.edit')}>プロフィール</Dropdown.Link> */}
                                        <Dropdown.Link href={route('profile.show',{personal_id:auth.user.personal_id})}>
                                            プロフィール
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('setting')}>
                                            設定
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            :
                                <div>
                                    <div className="flex items-center space-x-3 text-xs">
                                        <Link
                                            href={route('login')}
                                            className="text-slate-600"
                                        >
                                            ログイン
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="text-white bg-amber-600 hover:bg-amber-900 focus:outline-none focus:ring-0 focus:ring-amber-300 font-medium rounded-full px-2 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                        >
                                            新規登録
                                        </Link>
                                    </div>
                                </div>
                            }
                            </div>
                        </div>

                        {/* スマホ時ユーザーアイコン */}
                        {auth.user &&
                            <div className="absolute left-0 sm:hidden">
                                {auth.user.profile_photo_path != null ?
                                    <img src={'/storage/images/profile/' + auth.user.profile_photo_path} alt="s" className='w-8 h-8 ml-1 rounded-full' />
                                :
                                    <div className="flex items-center justify-center w-8 h-8 ml-1 rounded-full text-white bg-slate-900">
                                        {auth.user.name.substr(0,1)}
                                    </div>
                                } 
                            </div>
                        }

                        {/* スマホ時メニューボタン */}
                        <div className="/-me-2 /flex absolute right-0 items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white dark:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 focus:outline-none dark:focus:bg-gray-900 dark:focus:text-gray-400 transition duration-150 ease-in-out"
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

                {/* スマホ時メニュー */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="absolute top-18 right-0 z-50 w-1/2 h-screen bg-slate-700/95 transition duration-150 ease-in-out">
                        <ul className="space-y-8 pl-4 py-3 text-white">
                            {auth.user &&
                            <li>
                                <Link href={route('dashboard')}>
                                    ダッシュボード
                                </Link>
                            </li>
                            }
                            <li>
                                <Link href={route('library')}>
                                    ライブラリ
                                </Link>                                    
                            </li>
                            <li>
                                <Link href={route('flashcard.create')}>
                                    つくる
                                </Link>
                            </li>
                            <li>
                                <Link href={route('flashcard.index')}>
                                    単語帳
                                </Link>                                    
                            </li>
                            {auth.user &&
                                <>
                                    <li>
                                        <Link href={route('profile.show',{personal_id:auth.user.personal_id})}>
                                            プロフィール
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('setting')}>
                                            設定
                                        </Link>    
                                    </li>
                                    <li>
                                        <Link href={route('logout')}>
                                            ログアウト
                                        </Link>                                    
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>

            </nav>

            <div className="/flex /w-full">
                {children}
                {/* <div className="w-16 h-screen bg-slate-400"></div>
                <div className="w-full">
                    
                </div> */}
            </div>
            <Footer />
        </div>
    );
}
