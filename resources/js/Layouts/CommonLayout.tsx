import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
//import { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';
import Footer from './Partials/Footer';
import { MdDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";


export default function Guest({ children }: PropsWithChildren) {
    const { auth } :any= usePage().props;  
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-amber-400 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-4xl /max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 /bg-teal-800">
                    <div className="flex /justify-between justify-center h-[40px] relative items-center">

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
                                                className="flex items-center py-2 border border-transparent text-sm font-medium text-gray-500 hover:text-gray-700  focus:outline-none transition ease-in-out duration-150"
                                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                            >
                                                {auth.user &&
                                                    <div>
                                                    {auth.user.profile_photo_path != null ?
                                                        <img src={'/storage/images/profile/' + auth.user.profile_photo_path} alt="" className='w-8 h-8 ml-1 rounded-full' />
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
                                        {auth.user.admin_id == 1 &&
                                            <Dropdown.Link href={route('admin.dashboard')}>
                                                管理者ページ
                                            </Dropdown.Link>
                                        }
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            ログアウト
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            :
                                <div>
                                    <div className="flex items-center space-x-3 text-xs">
                                        <Link
                                            href={route('login')}
                                            className="text-slate-600 dark:text-slate-300"
                                        >
                                            ログイン
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="text-white bg-amber-600 hover:bg-amber-900 focus:outline-none focus:ring-0 focus:ring-amber-300 font-medium rounded-full px-2 py-1 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-700 dark:border-gray-700"
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
                                className="inline-flex items-center justify-center p-2 /rounded-md text-white dark:text-gray-500 focus:outline-none dark:focus:text-gray-400 transition duration-150 ease-in-out"
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
                    <div className="absolute top-18 right-0 z-50 w-1/2 h-[calc(100%-40px)] bg-slate-700/95 transition duration-150 ease-in-out">
                        <ul className=" space-y-10 px-4 py-10 text-white h-full">
                            <li>
                                <Link 
                                    href={route('flashcard.create')}
                                    className='flex items-center justify-center text-slate-800 bg-yellow-300 py-2 rounded-full'
                                >
                                    <BiSolidEditAlt size={20} />
                                    つくる
                                </Link>
                            </li>
                            {auth.user &&
                            <li>
                                <Link 
                                    href={route('dashboard')}
                                    className='flex items-center'
                                >
                                    <MdDashboard size={20} />
                                    ダッシュボード
                                </Link>
                            </li>
                            }
                            <li>
                                <Link 
                                    href={route('library')}
                                    className='flex items-center'
                                >
                                    <GiBookshelf size={20} />
                                    ライブラリ
                                </Link>                                    
                            </li>

                            <li>
                                <Link 
                                    href={route('flashcard.index')}
                                    className='flex items-center'
                                >
                                    <GiBookCover size={20} />
                                    単語帳
                                </Link>                                    
                            </li>
                            {auth.user &&
                                <>
                                    <li>
                                        <Link 
                                            href={route('profile.show',{personal_id:auth.user.personal_id})}
                                            className='flex items-center'
                                        >
                                            <FaUserAlt size={20} />
                                            プロフィール
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            href={route('setting')}
                                            className='flex items-center'
                                        >
                                            <RiSettings5Fill size={20} />
                                            設定
                                        </Link>    
                                    </li>
                                    <li>
                                        <Link 
                                            href={route('logout')} method="post"
                                            className='flex items-center'
                                        >
                                            <LuLogOut size={20} />
                                            ログアウト
                                        </Link>                                    
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>

            </nav>

            <div className=" sm:min-h-screen">
                {children}
            </div>
            <Footer />
        </div>
    );
}
