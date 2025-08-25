const passwordValidator = (password) => {
  const regex = /^(?=.*[^a-zA-Z0-9\s]).{8,}$/
  if (!regex.test(password)) {
    return false
  }
  return true
}

module.exports = { passwordValidator }