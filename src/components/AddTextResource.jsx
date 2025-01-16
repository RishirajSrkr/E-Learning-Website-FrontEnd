import React, { useContext, useEffect, useRef, useState } from 'react'
import { MdDelete } from "react-icons/md";
import axios from '../config/axiosConfig'
import { IoCloseSharp } from "react-icons/io5";
import { toast } from 'sonner'
import SecondaryButton from './formComponents/SecondaryButton'
import { CourseCard } from './CourseCard'
import { AuthContext } from '../context/AuthContext'
import { MdUpload } from "react-icons/md";
import { WindowWidthContext } from '../context/WindowWidthContext'
import { useNavigate } from 'react-router-dom';
import { TbLoader2 } from "react-icons/tb";

function AddTextResource() {

  const ref = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { loggedInUser } = useContext(AuthContext)
  const { isMobile } = useContext(WindowWidthContext);

  //restricting the user to delete a chapter if only one chapter is left
  const [deleteButtonDisable, isDeleteButtonDisable] = useState(false);
  //image preview
  const [previewImage, setPreviewImage] = useState(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(false)


  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    courseCategory: "",
    courseImage: "https://via.placeholder.com/150",
    chapters: [
      {
        chapterContent: "",
        chapterTitle: "",
        videoLink: "",
      }
    ]
  });




  useEffect(() => {
    // If it's the initial load, skip and mark it as loaded
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return;
    }
    // Scroll into view on updates after initial load
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [formData.chapters]);

  function handleAddChapterClick() {

    setFormData((prev) => (
      { ...prev, chapters: [...prev.chapters, { chapterTitle: "", chapterContent: "", videoLink: "" }] }
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
  }, [formData.chapters, isInitialLoad])



  function handleDeleteChapterClick(deleteChapterIndex) {

    const newChapters = formData.chapters.filter((_, index) => index != deleteChapterIndex)
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

  function handleChange_Image(e) {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, courseImage: file }));

    //set preview image url
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
    else {
      setPreviewImage(null)
    }

  }




  async function handleSubmitClick(e) {
    e.preventDefault();

    // Creating a FormData object to send data with image
    const formDataWithImage = new FormData();

    const courseDto = {
      courseName: formData.courseTitle,
      courseDescription: formData.courseDescription,
      courseCategory: formData.courseCategory,
    }

    formDataWithImage.append("courseDto", JSON.stringify(courseDto));

    if (formData.courseImage) {
      formDataWithImage.append("file", formData.courseImage);
    }
    
    formDataWithImage.append("chapters", JSON.stringify(formData.chapters))



    try {
      setIsLoading(true)

      console.log("Course data :: ", formDataWithImage);
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/course/create`, formDataWithImage);


      if (response.status === 200) {

        //show the success toast
        toast.success("Course added")

        navigate("/dashboard")

        //reset the form only if course was successfully added
        setFormData({
          courseTitle: "",
          courseCategory: "",
          courseDescription: "",
          courseImage: null,
          chapters: [
            {
              chapterContent: "",
              chapterTitle: "",
              videoLink: "",
            }
          ]
        })

        // also clear the preview image if course added successfully
        setPreviewImage(null)

      }


    }

    catch (e) {
      if (e.response && e.response.status == 429) {
        toast.error("You can create a course only once a day.");
      }
      else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.log("error while creating course : ", e);

    }
    finally {
      setIsLoading(false)
    }

  }




  return (

    <div className='flex flex-col py-16'>



      <div className='flex '>

        <div className=' sm:py-14 px-10 w-full sm:w-4/6'>



          <div className='flex flex-col gap-6 mb-8'>
            <div className='flex w-full gap-10'>



              <div className='w-3/5 flex flex-col items-start justify-center gap-2 '>
                <label className='' htmlFor="courseTitle">Course Name</label>
                <input type="text"
                  name='courseTitle'
                  className='pr-6 pl-0 py-0 pt-3 w-full bg-transparent outline-none border-b pb-1 border-lightBorder dark:border-darkBorder  focus:ring-0 placeholder-subtextColor'
                  value={formData.courseTitle}
                  placeholder='Spring Boot & Spring Security'
                  onChange={(e) => handleChange_Other(e)}
                />

              </div>

              <div className='w-2/5 flex flex-col items-start justify-center gap-2'>
                <label className=' ' htmlFor="courseCategory">Category</label>
                <input type="text"
                  name='courseCategory'
                  className='pr-6 pl-0 py-0 pt-3 w-full bg-transparent pb-1 border-b border-lightBorder dark:border-darkBorder outline-none focus:ring-0 placeholder-subtextColor'
                  value={formData.courseCategory}
                  placeholder='Java, Spring Boot, Spring Security'
                  onChange={(e) => handleChange_Other(e)}
                />

              </div>

            </div>

            <div className='w-full flex flex-col items-start justify-center gap-2'>
              <label className='' htmlFor="courseDescription">Course Description</label>
              <input type="text"
                name='courseDescription'
                className='pr-6 pl-0 py-0 pt-3 w-full bg-transparent pb-1  border-b border-lightBorder dark:border-darkBorder outline-none focus:ring-0 placeholder-subtextColor '
                value={formData.courseDescription}
                placeholder='Learn Spring Boot & Spring Security in 12 hours. Topics covered : Redis, JUnit, Kafka etc.'
                onChange={(e) => handleChange_Other(e)}
              />
            </div>



            {/* New Course Image Upload Field */}

            {/* Preview Image */}
            {previewImage && (
              <div className='my-4'>
                <p className=''>Image Preview:</p>
                <img src={previewImage} alt="Course Preview" className='w-64 h-40 object-cover rounded' />
              </div>
            )}


            <input ref={fileInputRef}
              type="file"
              id='courseImage'
              accept='image/*'
              className='hidden'
              onChange={handleChange_Image} />

            <div
              onClick={() => fileInputRef.current.click()}
              className='border border-dashed border-lightBorder h-20 flex justify-center items-center cursor-pointer'>
              <MdUpload size={24} />
            </div>


          </div>



          {
            formData.chapters.map((chapter, index) => (

              <div key={index} className='relative dark:bg-black bg-white border border-lightBorder dark:border-darkBorder rounded-xl flex flex-col p-8 gap-6 mb-6'>

                <div className='flex flex-col gap-2'>
                  <label className='' htmlFor="chapterTitle">Chapter Title</label>

                  <input type="text"
                    name='chapterTitle'
                    className='pr-6 pl-0 py-0 pt-3 w-full bg-transparent outline-none pb-1 border-b border-lightBorder dark:border-darkBorder  focus:ring-0 placeholder-subtextColor'
                    placeholder='Introduction to Spring Boot.'
                    value={chapter.chapterTitle}
                    onChange={(e) => handleChange_Chapter(e, index)}
                  />

                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-white' htmlFor="chapterContent">Chapter Content</label>
                  <input type="text"
                    name='chapterContent'
                    className='pr-6 pl-0 py-0 pt-3 w-full bg-transparent outline-none border-b pb-1 border-lightBorder dark:border-darkBorder  focus:ring-0 placeholder-subtextColor'
                    placeholder='Spring Boot is an open-source Java framework used for programming standalone, production-grade Spring-based applications with a bundle of libraries that make project startup and management easier.'
                    value={chapter.chapterContent}
                    onChange={(e) => handleChange_Chapter(e, index)}
                  />

                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-white' htmlFor="chapterContent">Video Link</label>
                  <input type="text"
                    name='videoLink'
                    className='pr-6 pl-0 py-0 pt-3 w-full bg-transparent outline-none border-b pb-1 border-lightBorder dark:border-darkBorder  focus:ring-0 placeholder-subtextColor'
                    placeholder='https://youtu.be/example_video_url'
                    value={chapter.videoLink}
                    onChange={(e) => handleChange_Chapter(e, index)}
                  />

                </div>






                {/* ------------ delete chapter ----------- */}

                <button
                  className={`${deleteButtonDisable ? 'cursor-not-allowed opacity-10' : ''} absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black w-10 h-10 flex justify-center items-center rounded-full`}
                  onClick={() => handleDeleteChapterClick(index)}
                  disabled={deleteButtonDisable}
                ><MdDelete /></button>

              </div>
            ))
          }


          <SecondaryButton
            text={"New Chapter"}
            onClick={handleAddChapterClick}
            classname={"bg-black dark:bg-white text-white dark:text-black py-2"}
          />



          <button
            type='submit'
            className={`fixed bottom-24 right-4 sm:bottom-10 text-sm sm:right-10 mt-10 bg-black dark:bg-white rounded-full text-white dark:text-black w-36 h-10 flex justify-center items-center font-medium ${!formData.courseTitle || !formData.courseDescription || !formData.courseCategory || !formData.courseImage || !formData.chapters ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={handleSubmitClick}
            disabled={!formData.courseTitle || !formData.courseDescription || !formData.courseCategory || !formData.courseImage || !formData.chapters}
          >{isLoading ? <div className='flex items-center gap-2'><TbLoader2 className='animate-spin' />Creating</div> : "Create Course"}</button>


          <div ref={ref}></div>

        </div>




        {

          !isMobile && <div className='w-2/6 border-l  border-lightBorder dark:border-darkBorder pt-6 px-4 flex justify-center '>

            <CourseCard
              imageUrl={`${formData.courseImage == "https://via.placeholder.com/150" ? "https://via.placeholder.com/150" : URL.createObjectURL(formData.courseImage)}`}
              title={`${formData.courseTitle ? formData.courseTitle : "Spring Boot & Spring Security"}`}
              instructor={loggedInUser}
              description={`${formData.courseDescription ? formData.courseDescription : "Learn Spring Boot & Spring Security in 12 hours. Topics covered : Redis, JUnit, Kafka etc."}`}
              showCTA={true}
              text={"Enroll"}
              vote={0}
            />
          </div>

        }

      </div>

    </div>
  )
}

export default AddTextResource