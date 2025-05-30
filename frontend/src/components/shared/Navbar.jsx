import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Briefcase, Building2, Home, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import GeminiChat from './GeminiChat'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold text-white'>DREAM<span className='text-yellow-300'>DESK</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 text-white'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="flex items-center gap-1 hover:text-yellow-300 transition-colors"><Building2 className="w-4 h-4" /> Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="flex items-center gap-1 hover:text-yellow-300 transition-colors"><Briefcase className="w-4 h-4" /> Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="flex items-center gap-1 hover:text-yellow-300 transition-colors"><Home className="w-4 h-4" /> Home</Link></li>
                                    <li><Link to="/jobs" className="flex items-center gap-1 hover:text-yellow-300 transition-colors"><Briefcase className="w-4 h-4" /> Jobs</Link></li>
                                    <li><Link to="/browse" className="flex items-center gap-1 hover:text-yellow-300 transition-colors"><Search className="w-4 h-4" /> Browse</Link></li>
                                    {user && user.role === 'student' && (
                                        <li><Link to="/profile" className="flex items-center gap-1 hover:text-yellow-300 transition-colors"><User2 className="w-4 h-4" /> Profile</Link></li>
                                    )}
                                </>
                            )
                        }
                    </ul>
                    <GeminiChat />
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-yellow-300 text-blue-600 hover:bg-yellow-400">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer border-2 border-yellow-300">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar