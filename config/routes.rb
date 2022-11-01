Rails.application.routes.draw do
  resources :bikes
  resources :user_trip_joins
  resources :trips
  resources :users

    get '/hello', to: 'application#hello_world'
  
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }
 
 
end

