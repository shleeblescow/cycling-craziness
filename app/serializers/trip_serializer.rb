class TripSerializer < ActiveModel::Serializer
  attributes :id, :creator_id, :link, :trip_name, :location, :route_photo, :total_mileage, :total_vert, :daily_mileage, :est_total_weeks, :departure_city, :final_city, :departure_month, :about_trip
end
