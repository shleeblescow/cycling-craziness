class User < ApplicationRecord
    has_many :user_trip_joins
    has_many :trips, through: :user_trip_joins

    has_many :bikes

    # has_one_attached :profile_pic
    # def profile_pic
    #     Rails.application.routes.url_helpers.url_for(profile_pic) if profile_pic.attached?
    # end

    has_secure_password
end
