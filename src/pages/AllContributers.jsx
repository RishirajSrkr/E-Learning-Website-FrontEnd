import React, { useEffect, useState } from 'react';
import { ContributorProfile, ContributorProfileSkeleton } from '../components/ContributorProfile';
import axios from '../config/axiosConfig';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { Search, Users, BookOpen, Award } from 'lucide-react';

function AllContributers() {
    const [users, setUsers] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState({});

    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchAllContributors() {
        try {
          setIsLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/public/contributors`);
          setUsers(response.data);
        } catch (e) {
          console.error("Error fetching contributors", e);
        } finally {
          setIsLoading(false);
        }
      }
      fetchAllContributors();
    }, []);
  


    useEffect(() => {
      const filtered = Object.keys(users || {})
        .filter(key => users[key].name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(key => users[key]);
      setFilteredUsers(filtered);
    }, [searchQuery, users]);
  

    const stats = {
      totalContributors: Object.keys(users).length,
      totalCourses: Object.values(users).reduce((acc, user) => acc + (user.uploadedCourses), 0),
     
    };

    function handleViewCourses(email, name){
        const query = email.split('@')[0];
        navigate(`/all-resources?q=${query}&name=${name}`)        
    }

  
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="pt-20 bg-zinc-50 dark:bg-bgOneLight border-b dark:border-darkBorder border-lightBorder">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Thank You to Our <br /> <span className='text-accentColor'>Amazing Contributors.</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
                Our platform thrives because of the dedication and knowledge <br /> shared by our community members.
              </p>
            </div>
  
            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-2">
              <div className=" shadow-sm dark:shadow-none shadow-zinc-200 bg-white dark:bg-bgTwo backdrop-blur-lg rounded-lg px-6 py-8">
                <div className="flex items-center justify-center space-x-2">
                  <Users className="h-8 w-8 " />
                  <span className="text-4xl font-bold ">{stats.totalContributors}</span>
                </div>
                <p className="mt-2 text-sm text-center">Active Contributors</p>
              </div>
              <div className=" shadow-sm dark:shadow-none shadow-zinc-200 bg-white dark:bg-bgTwo backdrop-blur-lg rounded-lg px-6 py-8">
                <div className="flex items-center justify-center space-x-2">
                  <BookOpen className="h-8 w-8 " />
                  <span className="text-4xl font-bold ">{stats.totalCourses}</span>
                </div>
                <p className="mt-2 text-sm  text-center">Courses Created</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 ">
          <div className="relative w-full max-w-xl mx-auto ">
            <input
              type="text"
              placeholder="Search contributors..."
              className="w-full h-16 px-6 py-4 text-black dark:text-white bg-white dark:bg-bgThree rounded-xl shadow-sm shadow-zinc-200 dark:shadow-none border border-accentColor pl-14 focus:ring-0 focus:outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5" />
          </div>
        </div>
  
        {/* Contributors Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                <ContributorProfileSkeleton />
                <ContributorProfileSkeleton />
                <ContributorProfileSkeleton />
                <ContributorProfileSkeleton />
              </>
            ) : searchQuery ? (
              filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <ContributorProfile key={index} {...user} onClick={() => handleViewCourses(user.email, user.name)} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    No contributors found matching "{searchQuery}"
                  </p>
                </div>
              )
            ) : (
              Object.keys(users).map((key) => (
                <ContributorProfile key={key} {...users[key]} onClick={() => handleViewCourses(users[key].email, users[key].name)} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default AllContributers;
