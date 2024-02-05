
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ChangePassword() {
  const { login,currentUser, updatePassword} = useAuth()
  const [error, setError] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) =>{
    event.preventDefault()

    const email = currentUser.email;
    const password = event.target.password.value;   
    const passwordNew = event.target.passwordNew.value;
    const passwordConfirm = event.target.confirmPassword.value;   

    if(passwordNew != passwordConfirm) {
      return setError('Passwords do not match')
    }

    try{
      setError('')
      setLoading(true)
    await login(email,password)
    await updatePassword(passwordNew)

      navigate('/account')
    } catch{
      setError(`Failed to log in`)
    }
    setLoading(false)
  }
  return (
    <div className='flex flex-col items-center pt-12 pb-12 p-4 sm:bg-white rounded-[10px] sm:w-[70vw] sm:shadow-sm text-2xl sm:text-3xl max-w-[500px]'>
      <div className='mb-8'>
        <h2 className='text-center mb-14 text-4xl '>Cambiar Contraseña</h2>
        {error && <h1>{error}</h1>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <fieldset className='mb-6'>
              <label className='block text-left'>
                <h1 className='mb-2 text-xl'>Contraseña Actual</h1>
                <input className=' border-2 border-black/25 rounded-[10px] h-14 p-6' type='password' name='password' required/>
              </label>
            </fieldset>
            <fieldset className='mb-6'>
              <label >
                <h1 className='mb-2 text-xl'>Contraseña Nueva</h1>
                <input className='border-2 border-black/25 rounded-[10px] h-14 p-6' type='password' name='passwordNew' required/>
              </label>
            </fieldset>
            <fieldset className='mb-6'>
              <label >
                <h1 className='mb-2 text-xl'>Confirmar Contraseña Nueva</h1>
                <input className='border-2 border-black/25 rounded-[10px] h-14 p-6' type='password' name='confirmPassword' required/>
              </label>
            </fieldset>
          </div>
            <button disabled={loading} className='w-full bg-blue-200 rounded-lg h-14'>Cambiar Contraseña</button>
        </form>
      </div>
      <div className='text-lg text-blue-600'>
        <Link to='/forgot-password'>¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  )
} 