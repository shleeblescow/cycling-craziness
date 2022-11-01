class CreateBikes < ActiveRecord::Migration[7.0]
  def change
    create_table :bikes do |t|
      t.string :bike_name
      t.string :brand
      t.string :type
      t.string :model
      t.string :bike_photo
      t.integer :user_id
    end
  end
end
