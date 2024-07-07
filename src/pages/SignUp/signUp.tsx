import { ChangeEvent, useMemo, useState } from 'react'
import '../../global/signUp.css'
import { validateEmail, validatePassword } from '../../utils/validateFields'
import { useNavigate } from 'react-router-dom'

enum KeyEnum {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  CONFIRMED_EMAIL,
  PASSWORD,
  CONFIRMED_PASSWORD,
  CEP,
  CITY,
  STATE,
  STREET,
  NEIGHBORHOOD,
  NUMBER
}

interface User {
  firstName: string
  lastName: string
  email: string
  confirmedEmail: string
  password: string
  confirmedPassword: string
}

interface Address {
  cep: string
  city: string
  state: string
  street: string
  neighborhood: string
  number: string
}

function App () {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    confirmedEmail: '',
    password: '',
    confirmedPassword: ''
  })

  const [address, setAddress] = useState<Address>({
    cep: '',
    city: '',
    state: '',
    street: '',
    neighborhood: '',
    number: ''
  })

  const {
    emailBorderClass,
    confimedEmailBorderClass,
    passwordBorderClass,
    confimedPasswordBorderClass
  } = useMemo(() => {
    const isInvalidEmail = user.email && !validateEmail(user.email)
    const isInvalidPassword = user.password && !validatePassword(user.password)

    return {
      emailBorderClass: isInvalidEmail ? 'ring-red-600' : 'ring-gray-300',
      confimedEmailBorderClass:
        user.email !== user.confirmedEmail ? 'ring-red-600' : 'ring-gray-300',
      passwordBorderClass: isInvalidPassword ? 'ring-red-600' : 'ring-gray-300',
      confimedPasswordBorderClass:
        user.password !== user.confirmedPassword
          ? 'ring-red-600'
          : 'ring-gray-300'
    }
  }, [user])

  const handleChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
    key: KeyEnum
  ) => {
    const value = event.target.value
    switch (key) {
      case KeyEnum.FIRST_NAME:
        setUser({ ...user, firstName: value })
        break
      case KeyEnum.LAST_NAME:
        setUser({ ...user, lastName: value })
        break
      case KeyEnum.EMAIL:
        setUser({ ...user, email: value })
        break
      case KeyEnum.CONFIRMED_EMAIL:
        setUser({ ...user, confirmedEmail: value })
        break
      case KeyEnum.PASSWORD:
        setUser({ ...user, password: value })
        break
      case KeyEnum.CONFIRMED_PASSWORD:
        setUser({ ...user, confirmedPassword: value })
        break
      case KeyEnum.CEP:
        getAddressByCep(value)
        setAddress({ ...address, cep: value })
        break
      case KeyEnum.CITY:
        setAddress({ ...address, city: value })
        break
      case KeyEnum.STATE:
        setAddress({ ...address, state: value })
        break
      case KeyEnum.NEIGHBORHOOD:
        setAddress({ ...address, neighborhood: value })
        break
      case KeyEnum.NUMBER:
        setAddress({ ...address, number: value })
        break
    }
  }

  const createUser = () => {
    const body = JSON.stringify({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      password: user.password,
      ...address
    })

    fetch(`http://localhost:1404/user`, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
      .then((data: Response) => {
        if (data.status === 201) alert('Created user successfully')
        else alert('User was not created successfully')
      })
      .catch(() => {
        alert('User was not created successfully')
      })
  }

  const navigateToSignIn = ()=>{
    navigate("/signIn")
  }

  const getAddressByCep = (cep: string) => {
    if (cep.length === 8)
      fetch(`http://localhost:1404/address/${cep}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not okay')
          return response.json()
        })
        .then(data => {
          setAddress({
            cep,
            city: data.localidade,
            state: data.uf,
            street: data.logradouro,
            neighborhood: data.bairro,
            number: address.number
          })
        })
        .catch(error => {
          console.error(error)
        })
  }

  return (
    <div>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Personal Information
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Use a permanent address where you can receive mail.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='first-name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                First name
              </label>
              <div className='mt-2'>
                <input
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.FIRST_NAME)
                  }}
                  value={user.firstName}
                  type='text'
                  name='first-name'
                  id='first-name'
                  autoComplete='given-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='last-name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Last name
              </label>
              <div className='mt-2'>
                <input
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.LAST_NAME)
                  }}
                  value={user.lastName}
                  type='text'
                  name='last-name'
                  id='last-name'
                  autoComplete='family-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

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
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ' +
                    emailBorderClass
                  }
                />
              </div>
            </div>
            <div className='sm:col-span-3'>
              <label
                htmlFor='email2'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Retype email address
              </label>
              <div className='mt-2'>
                <input
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.CONFIRMED_EMAIL)
                  }}
                  value={user.confirmedEmail}
                  id='email2'
                  name='email2'
                  type='email'
                  autoComplete='email2'
                  className={
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ' +
                    confimedEmailBorderClass
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
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ' +
                    passwordBorderClass
                  }
                />
              </div>
            </div>
            <div className='sm:col-span-3'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Retype password
              </label>
              <div className='mt-2'>
                <input
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.CONFIRMED_PASSWORD)
                  }}
                  value={user.confirmedPassword}
                  id='password2'
                  name='password2'
                  type='password'
                  autoComplete='password2'
                  className={
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ' +
                    confimedPasswordBorderClass
                  }
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='street-address'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Street address
              </label>
              <div className='mt-2'>
                <input
                  value={address.street}
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.STREET)
                  }}
                  type='text'
                  name='street-address'
                  id='street-address'
                  autoComplete='street-address'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='city'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                City
              </label>
              <div className='mt-2'>
                <input
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.CITY)
                  }}
                  value={address.city}
                  id='city'
                  name='city'
                  type='texy'
                  autoComplete='city'
                  className={
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ' +
                    emailBorderClass
                  }
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='neighborhood'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Neighborhood
              </label>
              <div className='mt-2'>
                <input
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.NEIGHBORHOOD)
                  }}
                  value={address.neighborhood}
                  id='neighborhood'
                  name='neighborhood'
                  type='text'
                  autoComplete='neighborhood'
                  className={
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ' +
                    emailBorderClass
                  }
                />
              </div>
            </div>

            <div className='sm:col-span-2 sm:col-start-1'>
              <label
                htmlFor='number'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Number
              </label>
              <div className='mt-2'>
                <input
                  value={address.number}
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.NUMBER)
                  }}
                  type='text'
                  name='number'
                  id='number'
                  autoComplete='number'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='region'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                State / Province
              </label>
              <div className='mt-2'>
                <input
                  value={address.state}
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.STATE)
                  }}
                  type='text'
                  name='region'
                  id='region'
                  autoComplete='address-level1'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='postal-code'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                ZIP / Postal code
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='postal-code'
                  id='postal-code'
                  onChange={event => {
                    handleChangeValue(event, KeyEnum.CEP)
                  }}
                  autoComplete='postal-code'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          onClick={navigateToSignIn}
          className='text-sm font-semibold leading-6 text-gray-900'
        >
          Sign in
        </button>
        
        <button
          onClick={createUser}
          className='rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600'
        >
          Sign up
        </button>
      </div>
    </div>
  )
}

export default App
