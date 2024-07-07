import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

const TOKEN = 'token_key'
const USER_ID = 'user_id_key'

interface AuthData {
  isProductionMode: boolean
  userId: string | null
  user: User | null
  saveUserData: (token: string, userId: string) => void
  getUserData: ()=> {userId: string | null; token: string | null}
  getUser: () => void
  signout: () => void
}

interface User {
  id: string;
  name: string;
  email: string;
  street: string;
  neighborhood: string;
  number: string;
  state: string;
  city: string;
}

const IS_PRODUCTION_MODE = true

const AuthContext = createContext<AuthData>({} as AuthData)

const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const getUser = () => {
    const {token, userId} = getUserData()

    if (!token || !userId) return;

    fetch(`http://localhost:1404/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, }

    })
      .then((data: Response) => {
        if (data.status === 200) {
          data.text().then(userData => {
            const parsedUserData = JSON.parse(userData)
            setUser(parsedUserData)
          })
        }
      })
      .catch(() => {
      })
  }

  const saveUserData = (token: string, userId: string) => {
    localStorage.setItem(TOKEN, token)
    localStorage.setItem(USER_ID, userId)
    setUserId(userId)
  }
  
  const getUserData = ()=>({
    userId: localStorage.getItem(USER_ID), 
    token: localStorage.getItem(TOKEN)
  })

  const signout = ()=>{
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(USER_ID)
    setUserId(null)
    setUser(null)
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <AuthContext.Provider value={{isProductionMode: IS_PRODUCTION_MODE, user, userId, saveUserData, getUserData, getUser, signout }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within and auth provider')

  return context
}

export {
  useAuth,
  AuthProvider
}
