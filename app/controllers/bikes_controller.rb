class BikesController < ApplicationController

    def index
        render json: Bike.all
    end

    def show 
        bike = Bike.find(params[:id])
        render json: bike, status: :ok
    end

    def create
        bike = Bike.create!(bike_params)
        render json: bike, status: :created
    end

    def update
        bike = Bike.find(params[:id])
        bike.update!(bike_params)
        render json: bike, status: :accepted
    end

    def destroy
        bike = Bike.find(params[:id])
        bike.destroy
        head :no_content
    end

    private

    def bike_params
        params.permit(:bike_name, :brand, :type, :model, :bike_photo, :user_id)
    end
end
