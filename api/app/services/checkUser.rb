def checkUser(user)
  response = User.find_by(username: user)

  if response == nil
    return 'No Usuario'
  else
    return response
  end
end
