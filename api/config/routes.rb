Rails
  .application
  .routes
  .draw do
    get '/price' => 'price_bitcoin#price'

    post '/user/login' => 'user#login'
    post '/user/create' => 'user#create'
    post '/user/balance' => 'user#balance'

    post '/transaction/trade' => 'transaction#trade'
    post '/history' => 'transaction#history'
    post '/details' => 'transaction#details'
  end
