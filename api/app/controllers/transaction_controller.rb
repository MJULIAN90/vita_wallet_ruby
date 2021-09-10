require_relative '../services/validate_trade.rb'
require_relative '../services/history_user.rb'
require_relative '../services/details_user.rb'

class TransactionController < ApplicationController
  skip_before_action :verify_authenticity_token

  def trade
    response_trade =
      validate_trade(
        params[:user_id],
        params[:type_transaction],
        params[:coin_send],
        params[:coin_receive],
        params[:total_send],
        params[:total_receive],
      )

    render json: response_trade
  end

  def history
    response = history_user(params[:user_id])
    render json: response
  end

  def details
    result = details_user(params[:id])
    render json: result
  end
end
