class BikeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :bike_name, :brand, :bike_type, :model, :bike_photo, :user_id, :bike_photo_file
  belongs_to :user

  def bike_photo_file
    rails_blob_path(object.bike_photo_file, only_path: true) if object.bike_photo_file.attached?
  end
end
