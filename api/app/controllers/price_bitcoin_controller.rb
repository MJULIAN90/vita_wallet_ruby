require 'net/http'
require_relative '../services/price_btc.rb'

class PriceBitcoinController < ApplicationController
  def price
    response = price_btc
    render json: response
  end
end
