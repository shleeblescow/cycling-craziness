class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :name, :age, :hometown, :bio, :bikepacking_method, :profile_pic_file
  
  has_many :trips
  has_many :bikes

  def profile_pic_file
    rails_blob_path(object.profile_pic_file, only_path: true) if object.profile_pic_file.attached?
  end
end
