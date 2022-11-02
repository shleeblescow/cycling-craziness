class TripsController < ApplicationController
    
    def index
        render json: Trip.all
    end

    def show 
        trip = Trip.find(params[:id])
        render json: trip, status: :ok
    end


end
