import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const EmployeeRegister = (props) => {
    const [employee, setEmployee] = useState({ "account_type": "employee" })
    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
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
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{ serverFeedback }</div>
                <button className="button--close"
                    onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Welcome to the team</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateEmployee}
                        type="text" id="first_name" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateEmployee}
                        type="text" id="last_name" className="form-control"
                        placeholder="Enter your last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateEmployee}
                        type="text" id="username" className="form-control"
                        placeholder="Enter your username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input onChange={updateEmployee}
                        type="text"
                        id="bio"
                        className="form-control"
                        placeholder="Bio" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateEmployee}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateEmployee}
                        type="password"
                        id="password"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="image_url"> Profile Image </label>
                    <input onChange={updateEmployee}
                        type="text"
                        id="image_url"
                        className="form-control"
                        placeholder="insert image url" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

