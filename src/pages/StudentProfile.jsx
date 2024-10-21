import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaBook, FaGraduationCap, FaStar } from 'react-icons/fa';

const StudentProfile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('details');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        setUsers(AllUsersData);
    }, []);

    useEffect(() => {
        const filteredUser = users.filter(user => user.id === parseInt(id, 10));
        if (filteredUser.length === 1) {
            setUser(filteredUser[0]);
        }
    }, [id, users]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white p-8">
            <div className="bg-white rounded-lg w-full max-w-2xl border border-gray-300 flex" style={{ height: "400px" }}>
                {/* Tab Navigation */}
                <div className="flex flex-col border-r border-gray-300 p-4 w-1/4">
                    <button
                        className={`py-2 px-4 rounded-lg text-gray-800 transition-all duration-300 ${activeTab === 'details' ? 'bg-gray-100' : ''}`}
                        onClick={() => handleTabChange('details')}
                    >
                        Details
                    </button>
                    <button
                        className={`py-2 px-4 rounded-lg text-gray-800 transition-all duration-300 ${activeTab === 'courses' ? 'bg-gray-100' : ''}`}
                        onClick={() => handleTabChange('courses')}
                    >
                        Courses
                    </button>
                    <button
                        className={`py-2 px-4 rounded-lg text-gray-800 transition-all duration-300 ${activeTab === 'skills' ? 'bg-gray-100' : ''}`}
                        onClick={() => handleTabChange('skills')}
                    >
                        Skills
                    </button>
                    <button
                        className={`py-2 px-4 rounded-lg text-gray-800 transition-all duration-300 ${activeTab === 'statement' ? 'bg-gray-100' : ''}`}
                        onClick={() => handleTabChange('statement')}
                    >
                        Statement
                    </button>
                </div>

                {/* Profile Content */}
                <div className="p-4 w-3/4">
                    {/* Tab Content */}
                    {activeTab === 'details' && (
                        <div className="flex gap-2 flex-col">
                            <div className="flex items-center p-4 rounded-lg bg-white border border-gray-300">
                                <FaUser className="text-indigo-500 mr-2" />
                                <span className="text-gray-800">{user.name}</span>
                            </div>
                            <div className="flex items-center p-4 rounded-lg bg-white border border-gray-300">
                                <FaEnvelope className="text-indigo-500 mr-2" />
                                <span className="text-gray-800">{user.email}</span>
                            </div>
                            <div className="flex items-center p-4 rounded-lg bg-white border border-gray-300">
                                <FaBook className="text-indigo-500 mr-2" />
                                <span className="text-gray-800">{user.major}</span>
                            </div>
                            <div className="flex items-center p-4 rounded-lg bg-white border border-gray-300">
                                <FaStar className="text-indigo-500 mr-2" />
                                <span className="text-gray-800">GPA: <strong className="text-gray-900">{user.gpa}</strong></span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div>
                            <div className="flex flex-col space-y-2">
                                {user.courses && user.courses.map((course, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-white border border-gray-300">
                                        <span className="text-gray-800">{course}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div>
                            <div className="flex flex-col space-y-2">
                                <div className="p-4 rounded-lg bg-white border border-gray-300">
                                    <span className="font-semibold text-gray-800">Technical:</span>
                                    <ul className="list-disc pl-6 text-gray-800">
                                        {user.skills && user.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                                {/* You can add more skills categories if needed */}
                            </div>
                        </div>
                    )}

                    {activeTab === 'statement' && (
                        <div className="mb-4">
                            <p className="text-gray-800">{user.bio}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
