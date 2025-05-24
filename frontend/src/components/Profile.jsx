import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, User2, Mail, Phone, Briefcase, FileText, LogOut, X, Plus, Trash2 } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.profile?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills || [],
        resume: user?.profile?.resume || "",
        profilePhoto: user?.profile?.profilePhoto || ""
    });
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                setLoading(true);
                const res = await axios.post(`${USER_API_END_POINT}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    setInput({ ...input, profilePhoto: res.data.url });
                    toast.success("Profile photo updated successfully");
                }
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const changeResumeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                setLoading(true);
                const res = await axios.post(`${USER_API_END_POINT}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    setInput({ ...input, resume: res.data.url });
                    toast.success("Resume updated successfully");
                }
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const addSkillHandler = () => {
        if (skill.trim()) {
            setInput({ ...input, skills: [...input.skills, skill.trim()] });
            setSkill("");
        }
    };

    const removeSkillHandler = (index) => {
        const updatedSkills = input.skills.filter((_, i) => i !== index);
        setInput({ ...input, skills: updatedSkills });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${USER_API_END_POINT}/update`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                            <p className="text-gray-500 mt-1">Manage your account information</p>
                        </div>
                        <Button 
                            onClick={logoutHandler} 
                            variant="destructive" 
                            className="flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </Button>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-8">
                        <div className="flex items-start gap-8">
                            <div className="w-32 h-32 relative">
                                <img
                                    src={input.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                                    alt="profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-blue-100"
                                />
                                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                    <User2 className="w-4 h-4" />
                                </label>
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
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
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            type="text"
                                            name="phoneNumber"
                                            value={input.phoneNumber}
                                            onChange={changeEventHandler}
                                            className="pl-10"
                                            placeholder="+91 8080808080"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Bio</Label>
                                    <Textarea
                                        name="bio"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        placeholder="Tell us about yourself..."
                                        className="resize-none"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>

                        {user?.role === 'student' && (
                            <>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium">Skills</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                value={skill}
                                                onChange={(e) => setSkill(e.target.value)}
                                                placeholder="Add a skill"
                                                className="w-48"
                                            />
                                            <Button
                                                type="button"
                                                onClick={addSkillHandler}
                                                className="flex items-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" /> Add
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {input.skills?.map((skill, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="flex items-center gap-1 px-3 py-1"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkillHandler(index)}
                                                    className="hover:text-red-500"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-sm font-medium">Resume</Label>
                                    <div className="flex items-center gap-4">
                                        {input.resume ? (
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                                <a
                                                    href={input.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View Resume
                                                </a>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setInput({ ...input, resume: "" })}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={changeResumeHandler}
                                                        className="hidden"
                                                    />
                                                    <Button type="button" variant="outline" className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4" />
                                                        Upload Resume
                                                    </Button>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {user?.appliedJobs?.length > 0 && (
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium">Applied Jobs</Label>
                                        <div className="grid gap-4">
                                            {user.appliedJobs.map((job) => (
                                                <div
                                                    key={job._id}
                                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                                >
                                                    <div>
                                                        <h3 className="font-medium">{job.title}</h3>
                                                        <p className="text-sm text-gray-500">{job.company.name}</p>
                                                    </div>
                                                    <Badge variant="secondary">
                                                        {new Date(job.createdAt).toLocaleDateString()}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex justify-end">
                            {loading ? (
                                <Button disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving changes...
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                    Save Changes
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;