def balance_user(user_id)
  balance_User = Balance.find_by({ user_id: user_id })

  return(
    { 'response': { 'usd': balance_User[:usd], 'btc': balance_User[:btc] } }
  )
end
