class UserTripJoinsController < ApplicationController

    def index
        render json: UserTripJoin.all
    end

end
