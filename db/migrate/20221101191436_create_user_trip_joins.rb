class CreateUserTripJoins < ActiveRecord::Migration[7.0]
  def change
    create_table :user_trip_joins do |t|
      t.integer :user_id
      t.integer :trip_id
    end
  end
end
