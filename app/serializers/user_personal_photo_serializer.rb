class UserPersonalPhotoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :user_id, :fun_photo_file

  def fun_photo_file
    rails_blob_path(object.fun_photo_file, only_path: true) if object.fun_photo_file.attached?
  end
end
