class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.integer :creator_id
      t.string :link
      t.string :trip_name
      t.string :location
      t.string :route_photo
      t.integer :total_mileage
      t.integer :total_vert
      t.integer :daily_mileage
      t.integer :est_total_weeks
      t.string :departure_city
      t.string :final_city
      t.string :departure_month
      t.text :about_trip
    end
  end
end
