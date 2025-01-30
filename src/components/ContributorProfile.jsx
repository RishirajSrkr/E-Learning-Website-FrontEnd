import React from 'react';

function ContributorProfile({ name, email, uploadedCourses, profileImage, onClick }) {
    return (
      <div className="bg-white dark:bg-bgTwo rounded-xl p-6 shadow-sm shadow-zinc-200 dark:shadow-none">
        <div className="flex items-center space-x-4">
          <img 
            src={profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&fit=crop'} 
            alt={name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black dark:text-white">{name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <span className="block text-2xl font-bold accentColor">
                {uploadedCourses}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Resources</span>
            </div>
          </div>
        </div>
      
        <button
          onClick={onClick}
          className="mt-4 w-full px-4 py-2 text-sm font-medium accentColor bg-zinc-100 dark:bg-zinc-800 rounded-lg"
        >
          View resources
        </button>
      </div>
    );
  }
  
  function ContributorProfileSkeleton() {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4" />
          </div>
        </div>
        <div className="mt-4 h-8 bg-zinc-200 dark:bg-zinc-700 rounded" />
      </div>
    );
  }

export { ContributorProfileSkeleton, ContributorProfile };