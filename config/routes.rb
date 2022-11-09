Rails.application.routes.draw do
  resources :bikes
  resources :user_trip_joins
  resources :trips
  resources :users

  post '/login', to: 'sessions#create'
  delete '/logout', to:'sessions#delete' 
  get '/authorized_user', to: 'users#show'
  get '/userprofile/:id', to: 'users#userprofile'

  get '/createdtrips/:id', to:'users#createdtrips'
  get '/joinedtrips/:id', to:'users#joinedtrips'
  get '/profilebikes/:id', to:'users#profilebikes'

  # gona need a custom route for getting that users bikes me thinks (ew did i really just that?  gross)

  # get '*path',
  #     to: 'fallback#index',
  #     constraints: ->(req) { !req.xhr? && req.format.html? }
 
 
end



# resources :tickets, only: [:create]
# resources :users, only: [:show, :create]
# # resources :cast_members
# resources :productions, only: [ :index, :show, :create, :update, :destroy]
# # Custome Route
# post '/login', to: 'sessions#create'
# delete '/logout', to:'sessions#delete' 
# get '/authorized_user', to: 'users#show'