class UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    def show 
        render json: @current_user, status: :ok
    end
    
    def index
        render json: User.all
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def createdtrips
        created_trips = Trip.where(creator_id: @current_user.id)
        render json: created_trips
    end

    def joinedtrips
        joined_trips = @current_user.trips.where.not(creator_id: @current_user.id)
        render json: joined_trips
    end

    private

    def user_params
        params.permit(:username, :password, :name, :age, :hometown, :bio, :bikepacking_method)
    end
end
