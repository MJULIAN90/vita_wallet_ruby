def history_user(user_id)
  return Transaction.where({ user_id: user_id })
end
