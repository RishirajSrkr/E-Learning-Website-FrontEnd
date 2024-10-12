import React, { useState } from 'react'
import Input from '../components/formComponents/Input'

function UserProfile() {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    function handleChange(e) {
        const {value, name} = e.target;
        setFormData(prev => ({...prev, [name]: value}))
    }

    //when user clicks reload, we will save the updated username or password in database.
    function handleReloadButton(e){
        e.preventDefault();
        //formData must have the updated username or password, send it to db
        //logic to update db entry ....
    }
    return (
        <div className='h-screen bg-bgColorOne pt-32 pb-10 flex gap-20 justify-between px-20'>

            <Input
                totalWidth={"w-1/2"}
                className={""}
                type={"text"}
                name={"username"}
                value={formData.username}
                placeholder={"your username"}
                onChange={(e) => handleChange(e)}
                reloadButtonShowOrHide={true}
                onClick={(e) => handleReloadButton(e)}
            />

            <Input
                totalWidth={"w-1/2"}
                className={""}
                type={"text"}
                name={"password"}
                value={formData.password}
                placeholder={"your password"}
                onChange={(e) => handleChange(e)}
                reloadButtonShowOrHide={true}
                onClick={(e) => handleReloadButton(e)}
            />


        </div>
    )
}

export default UserProfile