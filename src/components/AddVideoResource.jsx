import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from '../config/axiosConfig'
import Input, { TextArea } from './formComponents/Input';
import { useNavigate } from 'react-router-dom';
import { BiErrorCircle } from "react-icons/bi";

function AddVideoResource() {

    const navigate = useNavigate();

    const preDefinedVideoUrl = "https://youtu.be/cRiqZ0j1gEM?si=5wciyQDg8quahfO_";
    const preDefinedVideoDescription = "Guys!! This is by far the best OAuth + Spring Boot video.";


    const [formData, setFormData] = useState({
        videoUrl: preDefinedVideoUrl,
        description: preDefinedVideoDescription,
    })
    const [thumbnailUrl, setThumbnailUrl] = useState("");


    async function handleSubmit() {

        if (thumbnailUrl === "") {
            toast.warning("Please provide a valid YouTube video link")
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/video-resource/create`, formData);

        const { resourceId } = response.data;
        if (resourceId) {
            //resource already exists, navigate to the resource
            navigate(`/video-resource/${resourceId}/redirect`)

        }
        console.log(response.data);

    }



    function handleVideoUrlInputChange(e) {
        setFormData(prev => ({ ...prev, videoUrl: e.target.value }))

    }


    useEffect(() => {
        extractVideoIdFromURL(formData.videoUrl)
    }, [formData.videoUrl])


    function extractVideoIdFromURL(url) {
        const videoIdMatch = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
            const videoId = videoIdMatch[1];
            setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
        } else {
            setThumbnailUrl(''); // Clear thumbnail if invalid URL
        }
    }

    return (
        <div className={`min-h-screen flex items-center justify-center w-full `}>


            <VideoContainer thumbnailUrl={thumbnailUrl} formData={formData} />


            <div className={`flex flex-col gap-6 px-32 w-1/2  `}>

                <input
                    type="text"
                    name='VideoUrl'
                    value={formData.videoUrl == preDefinedVideoUrl ? "" : formData.videoUrl}
                    placeholder={"https://www.youtube.com/watch?v=XXXXXXXXXXX"}
                    onChange={handleVideoUrlInputChange}
                    className='px-6 py-4 outline-none ring-0 border dark:border-darkBorder border-lightBorder bg-transparent rounded-md'
                />


                <TextArea
                    type={"text"}
                    name={"Your Thoughts on This Video"}
                    value={formData.description == preDefinedVideoDescription ? "" : formData.description}
                    placeholder={"Share your opinion, feedback, or any insights about the video..."}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className={"w-full"}
                />

                <div className='flex w-full text-sm'>
                    <button className={` px-4 py-2 w-full rounded-md font-medium border border-darkBorder dark:bg-white bg-black text-white dark:text-black`} onClick={handleSubmit}>Done</button>

                </div>


            </div>


        </div>

    )
}

const VideoContainer = ({ thumbnailUrl, formData }) => {
    return (
        <div className='w-1/2 min-h-screen border-r flex flex-col items-center justify-center border-lightBorder dark:border-darkBorder'>


            <div className='mb-6 w-96 h-56 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-bgTwo p-4 border border-lightBorder dark:border-darkBorder'>
                {
                    !thumbnailUrl &&
                    <div className='flex gap-2 items-center'>
                        <BiErrorCircle className='text-accentColor' />
                        <p className='text-sm'>Oops! Please double check the video link.</p>
                    </div>
                }

                {thumbnailUrl && <img className='rounded-lg border border-lightBorder dark:border-darkBorder' src={thumbnailUrl} />}
            </div>

            <div className='w-96 flex bg-gray-50 dark:bg-bgTwo gap-2 items-start border dark:border-darkBorder border-lightBorder p-6 rounded-md relative min-h-20'>
                <div className='absolute font-medium text-sm bg-accentColor text-black px-3 py-1 rounded-md -top-4'>
                    Your Views
                </div>

                {formData.description}
            </div>



        </div>
    );
}

export default AddVideoResource