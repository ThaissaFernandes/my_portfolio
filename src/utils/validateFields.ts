export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$/

  return passwordRegex.test(password)
}

export const validateEmail = (email: string) => {
  const emailRegex =
    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i

  return emailRegex.test(email.toLowerCase())
}

