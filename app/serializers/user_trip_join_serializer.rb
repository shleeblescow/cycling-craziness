class UserTripJoinSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :trip_id
end
