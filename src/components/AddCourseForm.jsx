import React, { useEffect, useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from '../config/axiosConfig'
import GoBack from '../components/GoBack'

function AddCourseForm() {


  const [formSubmitted, isFormSubmitted] = useState(false);


  //restricting the user to delete a chapter if only one chapter is left
  const [deleteButtonDisable, isDeleteButtonDisable] = useState(false);


  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    courseCategory: "",
    chapters: [
      {
        chapterContent: "",
        chapterTitle: ""
      }
    ]
  });

  const ref = useRef();
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" })
  }, [formData.chapters])


  function handleAddChapterClick() {

    setFormData((prev) => (
      { ...prev, chapters: [...prev.chapters, { chapterTitle: "", chapterContent: "" }] }
    ))
  }


  //cannot delete if only one chapter is remaining in the chapters array.
  useEffect(() => {
    if (formData.chapters.length <= 1) {
      isDeleteButtonDisable(true)
    }
    else {
      isDeleteButtonDisable(false)
    }
  }, [formData.chapters])

  function handleDeleteChapterClick(deleteChapterIndex) {

    const newChapters = formData.chapters.filter((chapter, index) => index != deleteChapterIndex)



    setFormData(prev => ({ ...prev, chapters: newChapters }))
  }


  function handleChange_Chapter(e, index) {
    const newChapters = [...formData.chapters];
    newChapters[index][e.target.name] = e.target.value;

    setFormData((prev) => ({ ...prev, chapters: newChapters }))
  }


  function handleChange_Other(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmitClick(e) {
    e.preventDefault();
    isFormSubmitted(true);


    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/course/create`, formData, { withCredentials: true });

      const data = await response.data;
      console.log(data);


    }
    catch (e) {
      console.log("error while creating course : ", e);

    }


    setFormData({
      courseTitle: "",
      courseCategory: "",
      courseDescription: "",
      chapters: [
        {
          chapterContent: "",
          chapterTitle: ""
        }
      ]
    })
    console.log(formData);


  }


  return (
    <div ref={ref} className='py-32 px-20  bg-bgColorOne'>

      <GoBack
        text={"Go Back"}
        goWhere={"/"}
        classname={"bg-bgColorThree pl-4 pr-5 py-2 rounded-full"}
      />

      {/* ----------- show form submitted popup ------------ */}
      {
        formSubmitted && (

          <div className='fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 z-20 w-1/3 h-1/3 bg-bgColorTwo flex justify-center items-center rounded-xl border border-gray-800'>
            <p className='w-2/3 text-white text-center text-xl'>Your course has been successfully submitted and is under review. We will notify you once it's approved and made publicly available.</p>
            <button name='popup' className='p-1 rounded-md absolute bg-buttonGradient top-4 right-4'><IoCloseSharp size={20} color='white' onClick={() => isFormSubmitted(prev => !prev)} /></button>

          </div>
        )
      }


      {/* ------------- some banner (notice, new feature launch etc) ----------------- */}

      {/* {popupVisible && (<div className='-ml-10 z-10 border border-r-0 border-y-0 border-l-4 border-yellow-500 bg-bgColorTwo pl-6 pr-4 py-3 w-fit text-sm fixed top-8 flex justify-between items-center gap-4 shadow-xl shadow-bgColorOne'>
        <p className='text-white'>After submission, your course will be reviewed before it is made publicly available.
        </p>
        <button name='popup' className='bg-yellow-500  '><IoCloseSharp size={16} onClick={() => isPopupVisible(prev => !prev)} /></button>
      </div>
      )} */}


      <div className='flex flex-col gap-6 mb-8'>
        <div className='flex w-full gap-10'>

          <div className='w-3/5 flex flex-col items-start justify-center gap-2'>
            <label className='text-white' htmlFor="courseTitle">Course Name</label>
            <input type="text"
              name='courseTitle'
              className='pr-6 pl-0 py-0 pt-3 w-full text-white bg-transparent border-none focus:border-none focus:ring-0'
              value={formData.courseTitle}
              placeholder='Spring Boot & Spring Security'
              onChange={(e) => handleChange_Other(e)}
            />
            <div className='line-1'></div>
          </div>

          <div className='w-2/5 flex flex-col items-start justify-center gap-2'>
            <label className=' text-white' htmlFor="courseCategory">Course Category</label>
            <input type="text"
              name='courseCategory'
              className='pr-6 pl-0 py-0 pt-3 w-full text-white bg-transparent border-none focus:border-none focus:ring-0'
              value={formData.courseCategory}
              placeholder='Java, Spring Boot, Spring Security'
              onChange={(e) => handleChange_Other(e)}
            />
            <div className='line-1'></div>
          </div>

        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
          <label className='text-white' htmlFor="courseDescription">Course Description</label>
          <input type="text"
            name='courseDescription'
            className='pr-6 pl-0 py-0 pt-3 w-full text-white bg-transparent border-none focus:border-none focus:ring-0'
            value={formData.courseDescription}
            placeholder='Learn Spring Boot & Spring Security in 12 hours. Topics covered : Redis, JUnit, Kafka etc.'
            onChange={(e) => handleChange_Other(e)}
          />
          <div className='line-1'></div>
        </div>



      </div>

      {
        formData.chapters.map((chapter, index) => (

          <div key={index} className='relative bg-bgColorOne border border-gray-800 rounded-xl flex flex-col p-8 gap-6 mb-6'>

            <div className='flex flex-col gap-2'>
              <label className='text-white' htmlFor="chapterTitle">Chapter Title</label>

              <input type="text"
                name='chapterTitle'
                className='pr-6 pl-0 py-0 pt-3 w-full text-white bg-transparent border-none focus:border-none focus:ring-0'
                placeholder='Introduction to Spring Boot.'
                value={chapter.chapterTitle}
                onChange={(e) => handleChange_Chapter(e, index)}
              />
              <div className='line-1'></div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-white' htmlFor="chapterContent">Chapter Content</label>
              <input type="text"
                name='chapterContent'
                className='pr-6 pl-0 py-0 pt-3 w-full text-white bg-transparent border-none focus:border-none focus:ring-0'
                placeholder='Spring Boot is an open-source Java framework used for programming standalone, production-grade Spring-based applications with a bundle of libraries that make project startup and management easier.'
                value={chapter.chapterContent}
                onChange={(e) => handleChange_Chapter(e, index)}
              />
              <div className='line-1'></div>
            </div>



            {/* ------------ delete chapter ----------- */}

            <button
              className={`${deleteButtonDisable ? 'cursor-not-allowed opacity-10' : ''} absolute top-4 right-4 text-gray-400 bg-bgColorTwo w-10 h-10 flex justify-center items-center rounded-full`}
              onClick={() => handleDeleteChapterClick(index)}
              disabled={deleteButtonDisable}
            ><MdDelete /></button>

          </div>
        ))
      }

      <button
        className=' bg-bgColorTwo text-gray-400 px-6 py-3 rounded-full font-semibold active:scale-90 transition-all'
        onClick={handleAddChapterClick}
      >Add New Chapter</button>



      <button
        ref={ref}
        type='submit'
        className={`fixed bottom-10 right-10 mt-10 bg-buttonGradient rounded-full text-white px-10 py-3 font-semibold ${!formData.courseTitle || !formData.courseCategory || !formData.courseDescription ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={handleSubmitClick}
        disabled={!formData.courseTitle || !formData.courseCategory || !formData.courseDescription}
      >Submit</button>



    </div>
  )
}

export default AddCourseForm