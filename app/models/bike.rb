class Bike < ApplicationRecord
    belongs_to :user
    has_one_attached :bike_photo_file
end
