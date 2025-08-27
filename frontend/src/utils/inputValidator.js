export const passwordValidator = (password) => {
  const regex = /^(?=.*[^a-zA-Z0-9\s]).{8,}$/
  return regex.test(password)
}