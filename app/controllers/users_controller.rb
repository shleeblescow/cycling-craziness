class UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    def show 
        render json: @current_user, status: :ok
    end
    
    def index
        render json: User.all
    end

    def create
        user = User.create!(user_params)
        profile = Profile.create(user_id: user.id)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password_digest, :name, :age, :hometown, :bio, :bikepacking_method)
    end
end
