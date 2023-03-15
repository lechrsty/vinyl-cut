import { Outlet, Route, Routes } from "react-router-dom"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Welcome to your Dashboard</h1>

                    <Outlet />
                </>
            }>

                
            </Route>
        </Routes>
    )
}