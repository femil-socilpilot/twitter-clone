import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LogIn from '../features/auth/containers/LogInContainer'
import SignUp from '../features/auth/containers/SignUpContainer'
import ChangePassword from '../features/auth/pages/ChangePassword'
import ForgotPassword from '../features/auth/pages/ForgotPassword'
import Home from '../features/home/pages/Home'
import DefaultLayout from '../layouts/default/DefaultLayout'

const AppRoutes = () => {
    const navigate = useNavigate()
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />} >
                <Route index element={<Home />} />
                <Route path="/signup" element={<SignUp navigate={navigate} />} />
                <Route path="/login" element={<LogIn navigate={navigate} />} />
                <Route path="/forgot-password" element={<ForgotPassword navigate={navigate} />} />
                <Route path="/forgot-password/:id" element={<ChangePassword navigate={navigate} />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes