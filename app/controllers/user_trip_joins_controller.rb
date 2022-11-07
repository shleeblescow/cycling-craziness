class UserTripJoinsController < ApplicationController

    def index
        render json: UserTripJoin.all
    end

    def create
        join = UserTripJoin.create!(user_trip_params)
        render json: join, status: :created
    end

    def destroy
        join = UserTripJoin.find(params[:id])
        join.destroy
        head :no_content
    end

    def show 
        join = Join.find(params[:id])
        render json: join, status: :ok
    end

    private

    def user_trip_params
        params.permit(:user_id, :trip_id)
    end


end
