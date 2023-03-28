import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const EmployeeRegister = (props) => {
    const [employee, setEmployee] = useState({ "account_type": "employee" })
    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const navigate = useNavigate()

    // State for Employee code
    const [expectedCode, setExpectedCode] = useState("123")

    // State for entered Employee code
    const [employeeCode, setEmployeeCode] = useState("")

    // State to hide "upload" button if clicked
    const [uploadClicked, setUploadClicked] = useState(false)

    // Cloudinary image upload
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

    const uploadImage = () => {
        setUploadClicked(true)
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "vinylcut")
        setLoading(true)


        // Make Axios post request
        axios
            .post("https://api.cloudinary.com/v1_1/dmilofp0z/image/upload", formData)
            .then((response) => {
                setImage(response.data.secure_url)
                setLoading(false)
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        // Check to see if inputted code is correct
        if (employeeCode.toLowerCase() !== expectedCode.toLowerCase()) {
            setFeedback("Invalid code. Please enter the correct code to register.")
            return
        }

        const updatedEmployee = { ...employee, image_url: image }

        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEmployee)

        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                return res.json().then((json) => {
                    throw new Error(JSON.stringify(json))
                });
            })
            .then(createdUser => {
                localStorage.setItem("vinylcut", JSON.stringify(createdUser))
                navigate("/login")
            })
            .catch(error => {
                setFeedback(JSON.parse(error.message).message)
            })
    }

    useEffect(() => {
        if (serverFeedback !== "") {
            conflictDialog.current.showModal()
        }
    }, [serverFeedback])

    const updateEmployee = (evt) => {
        const copy = { ...employee }
        copy[evt.target.id] = evt.target.value
        setEmployee(copy)
    }


    return (
        <main>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{serverFeedback}</div>
                <button className="button--close"
                    onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form onSubmit={handleRegister}>
                <h1>Welcome to the team</h1>

                <fieldset>
                    <div>
                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            <img src={image} />
                        )}
                        <input
                            type="file"
                            id="image_url"
                            onChange={(event) => {
                                setImage(event.target.files[0])
                                setUploadClicked(false)
                            }} />
                        {!uploadClicked && (
                            <button onClick={uploadImage}>Upload image</button>
                        )}
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateEmployee}
                        type="text" id="first_name"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateEmployee}
                        type="text" id="last_name"
                        placeholder="Enter your last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateEmployee}
                        type="text" id="username"
                        placeholder="Enter your username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input onChange={updateEmployee}
                        type="text"
                        id="bio"
                        placeholder="Bio" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateEmployee}
                        type="email"
                        id="email"
                        placeholder="Email address" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateEmployee}
                        type="password"
                        id="password"
                        required />
                </fieldset>

                <fieldset>
                    <label htmlFor="employeeCode"> Employee Code </label>
                    <input type="text" id="employeeCode" required value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value.trim())} />
                </fieldset>

                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

