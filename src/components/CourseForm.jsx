import React, { useState } from 'react';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        className="bg-white border border-gray-200 rounded-lg p-8 max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Upload Course Content
        </h2>

        {/* Course Name */}
        <div className="mb-6">
          <label
            htmlFor="courseName"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all duration-300"
            placeholder="Enter course name"
            required
          />
        </div>

        {/* Attach Content */}
        <div className="mb-8">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Attach Content (PDF or DOC)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="hidden"  // Hides the default file input
            required
          />
          {/* Custom Button to Trigger File Input */}
          <button
            type="button"
            className="w-full bg-gray-100 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
            onClick={() => document.getElementById('file').click()}
          >
            Choose File
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
