import { ChangeEvent, useEffect, useState } from 'react'
import '../../global/signUp.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

enum KeyEnum {
  EMAIL,
  PASSWORD
}

interface User {
  email: string
  password: string
}

function signIn () {
  const { saveUserData, getUser } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  })

  const handleChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
    key: KeyEnum
  ) => {
    const value = event.target.value
    switch (key) {
      case KeyEnum.EMAIL:
        setUser({ ...user, email: value })
        break
      case KeyEnum.PASSWORD:
        setUser({ ...user, password: value })
        break
    }
  }

  const signIn = () => {
    const body = JSON.stringify({
      email: user.email,
      password: user.password
    })

    fetch(`http://localhost:1404/login`, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
      .then((data: Response) => {
        if (data.status === 201) {
          data.text().then(userData => {
            const parsedUserData = JSON.parse(userData)
            saveUserData(
              parsedUserData.token as string,
              parsedUserData.userId as string
            )
            getUser()
          })
        } else alert('Email or password invalid')
      })
      .catch(() => {
        alert('Email or password invalid')
      })
  }

  const navigateToSignUp = () => {
    navigate('/signup')
  }

  useEffect(() => {
    document.addEventListener('keypress', keyBoardEvent => {
      if (keyBoardEvent.key === 'Enter') signIn()
    })

    return () => {
      document.addEventListener('keypress', keyBoardEvent => {
        if (keyBoardEvent.key === 'Enter') signIn()
      })
    }
  }, [user])

  return (
    <div>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Sign in
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Enter email and password
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.EMAIL)
                  }}
                  value={user.email}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className={
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 '
                  }
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <div className='mt-2'>
                <input
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.PASSWORD)
                  }}
                  value={user.password}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='password'
                  className={
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 '
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          onClick={navigateToSignUp}
          className='text-sm font-semibold leading-6 text-gray-900'
        >
          Sign up
        </button>
        <button
          onClick={signIn}
          className='rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600'
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default signIn
