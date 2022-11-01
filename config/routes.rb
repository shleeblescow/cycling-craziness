Rails.application.routes.draw do
  resources :bikes
  resources :user_trip_joins
  resources :trips
  resources :users

  post '/login', to: 'sessions#create'
  delete '/logout', to:'sessions#delete' 
  get '/authorized_user', to: 'users#show'


  # get '*path',
  #     to: 'fallback#index',
  #     constraints: ->(req) { !req.xhr? && req.format.html? }
 
 
end

