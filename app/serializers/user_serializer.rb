class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :name, :age, :hometown, :bio, :bikepacking_method
end
