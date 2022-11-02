class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :age, :hometown, :bio, :bikepacking_method
  has_many :trips
end
