class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :name
      t.integer :age
      t.string :hometown
      t.text :bio
      t.text :bikepacking_method
    end
  end
end
