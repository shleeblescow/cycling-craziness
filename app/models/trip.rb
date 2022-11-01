class Trip < ApplicationRecord
    has_many :user_trip_joins
    has_many :users, through: :user_trip_joins
end
