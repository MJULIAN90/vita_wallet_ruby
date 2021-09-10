require_relative '../services/checkUser.rb'
require_relative '../services/validate_login.rb'
require_relative '../services/validate_create.rb'
require_relative '../services/balance.rb'

class UserController < ApplicationController
  skip_before_action :verify_authenticity_token

  def login
    response = checkUser (params[:username])

    response_user =
      validate_login(response, params[:username], params[:password])

    render json: response_user
  end

  def create
    response = checkUser (params[:username])

    response_created =
      validate_create(response, params[:username], params[:password])

    render json: response_created
  end

  def balance
    balance_User = balance_user(params[:user_id])

    render json: balance_User
  end
end
