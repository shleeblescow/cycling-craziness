class UserSerializer < ActiveModel::Serializer
  # include JSONAPI::Serializer
  # attributes :id, :username, :name, :age, :hometown, :bio, :bikepacking_method, :profile_pic_url
  attributes :id, :username, :name, :age, :hometown, :bio, :bikepacking_method
  has_many :trips
end
