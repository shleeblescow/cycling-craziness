class AddCaptionColumnToPhotos < ActiveRecord::Migration[7.0]
  def change
    add_column :user_personal_photos, :photo_caption, :text
  end
end
