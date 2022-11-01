class BikeSerializer < ActiveModel::Serializer
  attributes :id, :bike_name, :brand, :type, :model, :bike_photo, :user_id
end
