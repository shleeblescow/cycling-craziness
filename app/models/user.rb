class User < ApplicationRecord
    has_many :user_trip_joins
    has_many :trips, through: :user_trip_joins

    has_many :bikes
    has_many :user_personal_photos

    has_one_attached :profile_pic_file

    has_secure_password
end
