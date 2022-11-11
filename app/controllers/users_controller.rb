class UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    def show
        render json: current_user, status: :ok
    end

    def userprofile
        user = User.find(params[:id])
        render json:user
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
        user = User.find(params[:id])
        created_trips = Trip.where(creator_id: user.id)
        render json: created_trips
    end

    def joinedtrips
        user = User.find(params[:id])
        joined_trips = user.trips.where.not(creator_id: user.id)
        render json: joined_trips
    end

    def profilebikes
        user = User.find(params[:id])
        profile_bikes = user.bikes
        render json: profile_bikes
    end

    def funphotos
        user = User.find(params[:id])
        fun_photos = user.user_personal_photos
        render json: fun_photos
    end

    private

    def user_params
        params.permit(:username, :password, :name, :age, :hometown, :bio, :bikepacking_method, :profile_pic_file)
    end

end
