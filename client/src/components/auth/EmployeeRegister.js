import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const EmployeeRegister = (props, { handleModal }) => {
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
                navigate("/")
                handleModal() // close the modal
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
                {(!uploadClicked && !image) ? (
                    null // show nothing
                ) : (
                    (!uploadClicked && image) ? (
                        <div className="login-placeholder-icon">
                            <i className="upload-icon"></i>
                        </div> // show the icon when choose file is clicked
                    ) : (
                        <>
                            {loading ? (
                                <div className="loading-bar">
                                    <div className="loading-progress"></div>
                                </div>
                            ) : (
                                <img className='login-uploaded-image' src={image} /> // show the image when the upload button is clicked
                            )}
                        </>
                    )
                )}
                <label
                    htmlFor="image_url"
                    className="login-custom-file-upload"
                >Choose file</label>
                <input
                    name="image_url"
                    id="image_url"
                    required autoFocus
                    type="file"
                    onChange={(event) => {
                        setImage(event.target.files[0])
                        setUploadClicked(false)
                    }}
                />
                {!uploadClicked && (
                    <button className="button small" onClick={uploadImage}>Upload image</button>
                )}
            </div>
                </fieldset>

                <fieldset>
                    <input onChange={updateEmployee}
                        type="text" id="first_name"
                        placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <input onChange={updateEmployee}
                        type="text" id="last_name"
                        placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <input onChange={updateEmployee}
                        type="text" id="username"
                        placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <textarea onChange={updateEmployee}
                        className="bio"
                        type="text"
                        id="bio"
                        placeholder="A short bio" required />
                </fieldset>
                <fieldset>
                    <input onChange={updateEmployee}
                        type="email"
                        id="email"
                        placeholder="Email address" required />
                </fieldset>

                <fieldset>
                    <input onChange={updateEmployee}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required />
                </fieldset>

                <fieldset>
                    <input type="text" id="employeeCode" placeholder="Employee code" required value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value.trim())} />
                </fieldset>

                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

