import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/home.tsx'
import SignUp from '../pages/SignUp/signUp.tsx'
import Signin from '../pages/Signin/signin.tsx'
import About from '../pages/About/about.tsx'
import Contact from '../pages/Contact/contact.tsx'
import Portfolio from '../pages/Portfolio/portfolio.tsx'
import { useAuth } from '../context/auth/index.tsx'

const authRouter = createBrowserRouter([
  { path: '*', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/portfolio', element: <Portfolio /> },
  { path: '/contact', element: <Contact /> }
])

const noAuthRouter = createBrowserRouter([
  { path: '*', element: <Signin /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/signin', element: <Signin /> }
])

export const Router = () => {
  const {user, isProductionMode} = useAuth()
  
 return <RouterProvider router={user || isProductionMode ? authRouter : noAuthRouter} />

}