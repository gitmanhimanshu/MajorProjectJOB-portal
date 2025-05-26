import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="w-full bg-[#FAFAFF] min-h-[80vh] flex items-center">
            <div className="container mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                
                {/* LEFT CONTENT */}
                <div className="space-y-6">
                    <span className="inline-block px-4 py-1 text-sm bg-[#FCE9E2] text-[#F83002] rounded-full font-medium">
                        🚀 Empower Your Career
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                        Find the Perfect <span className="text-[#6A38C2]">Job Match</span><br /> That Fits You
                    </h1>
                    <p className="text-gray-600 text-lg max-w-md">
                        Join thousands of job seekers using our platform to connect with top employers, fast and efficiently.
                    </p>

                    {/* Search Bar */}
                    <div className="flex bg-white border border-gray-300 rounded-xl shadow-sm px-4 py-3 w-full max-w-lg">
                        <Search className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Search roles, skills, or companies"
                            className="flex-1 outline-none text-gray-800"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                        <Button onClick={searchJobHandler} className="ml-4 bg-[#6A38C2] text-white hover:bg-[#5a2caf] px-5 rounded-lg">
                            Search
                        </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 text-sm pt-2">
                        {["Remote", "Design", "Engineering", "Marketing", "Internship"].map(tag => (
                            <span key={tag} className="bg-[#EFEAFF] text-[#6A38C2] px-3 py-1 rounded-full font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT IMAGE / ILLUSTRATION PLACEHOLDER */}
{/* ILLUSTRATION PLACEHOLDER */}
<div className="hidden md:flex justify-center items-center relative">
  <div className="w-full h-[400px] bg-gradient-to-tr from-[#ece9ff] to-[#dcd6f7] rounded-3xl shadow-lg flex items-center justify-center overflow-hidden">
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQQ3d78SVTgVrroPMYA7GGGDQeOGWYtknrw&s"
      alt="Illustration"
      className="h-full w-auto object-contain"
    />
  </div>
</div>

            </div>
        </section>
    );
};

export default HeroSection;
