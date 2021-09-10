def price_btc
  response = URI('https://api.coindesk.com/v1/bpi/currentprice.json')
  result = Net::HTTP.get(response)
  price = JSON.parse(result)
  json = { 'response': price['bpi']['USD']['rate_float'] }
  return json
end
