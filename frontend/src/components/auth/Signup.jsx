import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, Mail, Lock, User2, Building2, Phone } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        role: "",
        phoneNumber: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        setInput({ ...input, role: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                            <p className="text-gray-500 mt-2">Join DREAM DESK today</p>
                        </div>
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Full Name</Label>
                                <div className="relative">
                                    <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="text"
                                        name="fullname"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        className="pl-10"
                                        placeholder="Himanshu"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="pl-10"
                                        placeholder="himanshu@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="tel"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="pl-10"
                                        placeholder="+91 1234567890"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        className="pl-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Sign up as</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">
                                            <div className="flex items-center gap-2">
                                                <User2 className="w-4 h-4" />
                                                Student
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="recruiter">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4" />
                                                Recruiter
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {loading ? (
                                <Button className="w-full" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                    Create Account
                                </Button>
                            )}
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup