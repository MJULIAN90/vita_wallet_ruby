def validate_login(response, username, password)
  if response == 'No Usuario'
    return { 'Response': 'Usuario no existe' }
  else
    if password == response[:password]
      return { 'Response': response[:id] }
    else
      return { 'Response': 'Clave invalidad' }
    end
  end
end
