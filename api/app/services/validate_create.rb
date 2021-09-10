def validate_create(response, username, password)
  if response == 'No Usuario'
    status =
      User.create({ username: params[:username], password: params[:password] })
    saldo = Balance.create({ btc: 0.1, usd: 1000, user_id: status.id })
    return { 'Response': 'Usuario Creado' }
  else
    return { 'Response': 'Usuario Existe' }
  end
end
