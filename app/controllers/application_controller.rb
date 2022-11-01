class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    include ActionController::Cookies
    
    before_action :authorized_user

    def hello_world
      session[:count] = (session[:count] || 0) + 1
      render json: { count: session[:count] }
    end

    def current_user
        @current_user = User.find_by(id: session[:user_id])
        @current_user
    end

    def authorized_user  
        return render json: { error: "Not authorized" }, status: :unauthorized unless current_user
    end

    private

    def render_unprocessable_entity(invalid)
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end 

     def render_not_found(error)
        render json: {errors: {error.model => "Not Found"}}, status: :not_found
    end 


end
