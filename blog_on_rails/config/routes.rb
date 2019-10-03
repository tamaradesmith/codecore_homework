Rails.application.routes.draw do

  root 'posts#index'

  
  get 'sessions/new'

  get 'posts/index'
  get '/posts', {to: 'posts#index', as: :index_posts}
  
  get 'posts/new', {to: "posts#new", as: :new_post}
  
  post 'posts/new', {to: 'posts#create', as: :posts}
  get '/posts/:id', {to: 'posts#show', as: :post}

  get 'post/:id/edit', {to: 'posts#edit', as: :edit_post}
  

  patch '/posts/:id', {to: 'posts#update'}

  delete '/posts/:id', {to: 'posts#destroy'}

  resources :posts do
    resources :comments, only:
      [:create, :destroy]
    end
    
    get '/user/:id/password', to: 'users#password', as: :edit_password
    
    patch '/user/:id/password', to: "users#update_password", as: :update_password
    
    resources :users, shallow: true, only: [:new, :create, :edit, :update] 
    
    
    

    resources :sessions, only: [:new, :create] do
      delete :destroy, on: :collection
    end
end
