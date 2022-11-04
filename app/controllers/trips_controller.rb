class TripsController < ApplicationController
    
    def index
        render json: Trip.all
    end

    def show 
        trip = Trip.find(params[:id])
        render json: trip, status: :ok
    end

    def create
        trip = Trip.create!(trip_params)
        render json: trip, status: :created
    end

    def update
        trip = Trip.find(params[:id])
        trip.update!(trip_params)
        render json: trip, status: :accepted
    end

    private

    def trip_params
        params.permit(:link, :trip_name, :location, :route_photo, :total_mileage, :total_vert, :daily_mileage, :est_total_weeks, :departure_city, :final_city, :departure_month, :about_trip, :creator_id)
    end


end
