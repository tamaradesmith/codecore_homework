Rails.application.routes.draw do
  # get 'posts/index'
  root 'posts#index'
  get '/posts', {to: 'posts#index', as: :index_posts}
  
  get 'posts/new', {to: "posts#new", as: :new_post}
  
  post 'posts/new', {to: 'posts#create', as: :posts}
  get '/posts/:id', {to: 'posts#show', as: :post}

  get 'post/:id/edit', {to: 'posts#edit', as: :edit_post}
  

  patch '/posts/:id', {to: 'posts#update'}

  delete '/posts/:id', {to: 'posts#destroy'}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :posts do
    resources :comments, only:
      [:create, :destroy]
    end


end
