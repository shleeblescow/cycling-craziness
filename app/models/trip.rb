class Trip < ApplicationRecord
    has_many :user_trip_joins, dependent: :destroy
    has_many :users, through: :user_trip_joins

    has_one_attached :trip_photo_file

    validates :link, :trip_name, :location, :total_mileage, :total_vert, :daily_mileage, :est_total_weeks, :departure_city, :final_city, :departure_month, :about_trip, presence: :true
end
