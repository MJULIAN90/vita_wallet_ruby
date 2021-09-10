def validate_trade(
  user_id,
  type_transaction,
  coin_send,
  coin_receive,
  total_send,
  total_receive
)
  balance_user = Balance.find_by(user_id: user_id)

  if coin_receive == 'usd'
    if balance_user[:btc] > total_send
      balance_user[:btc] = balance_user[:btc] - total_send
      balance_user[:usd] = balance_user[:usd] + total_receive
      balance_user.save
      Transaction.create(
        {
          user_id: user_id,
          type_transaction: type_transaction,
          coin_send: coin_send,
          coin_receive: coin_receive,
          total_send: total_send,
          total_receive: total_receive,
        },
      )
      return { 'Response': 'Transaccion Exitosa' }
    else
      return { 'Response': 'Fondos Insuficientes' }
    end

    # aca coin_recive == 'btc'
  else
    if balance_user[:usd] > total_send
      balance_user[:btc] = balance_user[:btc] + total_receive
      balance_user[:usd] = balance_user[:usd] - total_send
      balance_user.save
      Transaction.create(
        {
          user_id: user_id,
          type_transaction: type_transaction,
          coin_send: coin_send,
          coin_receive: coin_receive,
          total_send: total_send,
          total_receive: total_receive,
        },
      )
      return { 'Response': 'Transaccion Exitosa' }
    else
      return { 'Response': 'Fondos Insuficientes' }
    end
  end
end
