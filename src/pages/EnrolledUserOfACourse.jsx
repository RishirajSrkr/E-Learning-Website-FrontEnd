import React, { useEffect } from 'react'
import axios from '../config/axiosConfig'
import { useParams } from 'react-router-dom'

function EnrolledUserOfACourse() {

    const { courseId } = useParams();

    useEffect(() => {

        (async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/${courseId}/enrolled-users`);
            const data = response.data;
            console.log(data);


        })();
    }, [])
    return (
        <div className='min-h-screen bg-bgOne'>

            <p className='text-white'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam incidunt ipsam vitae, eligendi error harum expedita consequatur at cum sed? Eum quo perferendis, cupiditate ad provident in impedit architecto quidem!

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eaque harum blanditiis, labore earum totam doloribus adipisci beatae voluptas excepturi veritatis rerum sapiente magnam quas delectus quae repudiandae molestiae repellendus sit! Cum esse eos, porro temporibus non quas rerum iusto libero. Sit, odio rem libero pariatur maiores quibusdam hic enim neque vero molestiae consequatur labore necessitatibus voluptate minima iusto voluptatum eius suscipit modi alias incidunt aliquid nesciunt ab. Mollitia incidunt vitae ratione debitis, voluptatum corrupti architecto illum veritatis quod numquam asperiores dignissimos maxime, unde omnis in! Aperiam, ea consequatur fugiat minima facere eaque corporis rem, sequi placeat modi id obcaecati aut vitae ex harum quam laudantium omnis nesciunt est sint reiciendis. Cupiditate obcaecati delectus enim, sapiente suscipit officiis aspernatur, ducimus facilis tempora voluptate pariatur ipsa unde laudantium similique. Mollitia omnis facere repudiandae sequi laboriosam amet nam non at ipsum cumque debitis sit quisquam, impedit recusandae velit quas illo, delectus hic esse labore similique voluptas tempora odio cum! Sed temporibus, fugit nulla aspernatur non, amet sint ipsam placeat laudantium explicabo voluptate quod distinctio aliquid at cupiditate? Iusto odio repudiandae non officia aut, vel commodi laudantium labore fuga repellendus soluta molestias voluptates ex deleniti dolorum, reiciendis unde similique maiores esse iste dolorem? Voluptate doloremque neque cupiditate eius harum veritatis hic deleniti asperiores reprehenderit, tempore temporibus suscipit iure excepturi, ratione odio, fugiat iusto porro accusantium quibusdam voluptates debitis dolor! Temporibus nesciunt nobis unde praesentium, assumenda libero omnis quo reprehenderit maxime illo magni inventore voluptate, quos dignissimos facilis vel at officiis placeat similique, amet velit reiciendis. Excepturi sint quidem quo amet officiis aliquam adipisci recusandae impedit sapiente dolorum fuga esse natus, vitae sed, quisquam placeat mollitia incidunt! Quae eligendi recusandae ea exercitationem sed quo dolorum, rerum unde minus voluptatibus ipsa nisi saepe blanditiis ab nulla dolorem similique asperiores soluta id repellat quia. Minus, fugit?
            </p>
        </div>
    )
}

export default EnrolledUserOfACourse