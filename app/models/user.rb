class User < ApplicationRecord
    has_many :user_trip_joins
    has_many :trips, through: :user_trip_joins

    has_many :bikes
end
