class TripSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :creator_id, :link, :trip_name, :location, :route_photo, :total_mileage, :total_vert, :daily_mileage, :est_total_weeks, :departure_city, :final_city, :departure_month, :about_trip, :trip_photo_file
  has_many :users

  def trip_photo_file
    rails_blob_path(object.trip_photo_file, only_path: true) if object.trip_photo_file.attached?
  end
end
