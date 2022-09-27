import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Feedback from './components/Feedback'
import Loggito from './utils/Loggito.js'
import Context from './utils/Context'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'



  function App() {
    const logger = new Loggito('App')

    const [feedback, setFeedback] = useState({ message: null, level: null })
    const navigate = useNavigate()

    const handleNavigationToRegister = () => {
        navigate('register')

        logger.debug('navigate to register')
    }

    const handleNavigationToLogin = () => {
        navigate('login')

        logger.debug('navigate to login')
    }

    const handleNavigationToHome = () => {
        navigate('/')

        logger.debug('navigate to home')
    }

    const handleLogoutClick = () => {
        delete sessionStorage.token

        handleNavigationToLogin()
    }

    const handleAcceptFeedback = () => {
        const feedback = { message: null, level: null }

        setFeedback(feedback)

        logger.debug('setFeedback', feedback)
    }

    const handleFeedback = feedback => {
        setFeedback(feedback)

        logger.debug('setFeedback', feedback)
    }

    logger.info('return')

    

    return <Context.Provider value={{ handleFeedback }}>
        <div className="App">
            <Routes>
                <Route path="login" element={sessionStorage.token ? <Navigate to="/" /> : <LoginPage onLinkClick={handleNavigationToRegister} onLogIn={handleNavigationToHome} />} />
                <Route path="register" element={sessionStorage.token ? <Navigate to="/" /> : <RegisterPage onLinkClick={handleNavigationToLogin} />} />
               
                <Route path="/*" element={sessionStorage.token ? <HomePage onLogoutClick={handleLogoutClick} /> : <Navigate to="login" />} />
            </Routes>

            {feedback.message && <Feedback level={feedback.level} message={feedback.message} onClick={handleAcceptFeedback} />}
        </div>
    </Context.Provider>
}

export default App






