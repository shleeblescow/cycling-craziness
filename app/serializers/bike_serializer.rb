class BikeSerializer < ActiveModel::Serializer
  attributes :id, :bike_name, :brand, :bike_type, :model, :bike_photo, :user_id
  belongs_to :user
end
