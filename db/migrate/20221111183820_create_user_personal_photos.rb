class CreateUserPersonalPhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :user_personal_photos do |t|
      t.integer :user_id
    end
  end
end
