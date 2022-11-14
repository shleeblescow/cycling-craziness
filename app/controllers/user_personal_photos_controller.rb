class UserPersonalPhotosController < ApplicationController

    def index
        render json: UserPersonalPhoto.all
    end

    def show 
        fun_photo = UserPersonalPhoto.find(params[:id])
        render json: fun_photo, status: :ok
    end

    def create
        fun_photo = UserPersonalPhoto.create!(fun_photo_params)
        render json: fun_photo, status: :created
    end

    def destroy
        fun_photo = UserPersonalPhoto.find(params[:id])
        fun_photo.destroy
        head :no_content
    end

    private

    def fun_photo_params
        params.permit(:user_id, :fun_photo_file, :photo_caption)
    end
end
