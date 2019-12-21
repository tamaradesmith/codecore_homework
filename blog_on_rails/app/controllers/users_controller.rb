class UsersController < ApplicationController
  before_action :find_user, only: [:edit, :update, :password, :update, :update_password]
  before_action :authenticate_user!, only: [:edit, :update, :update_password]
  before_action :user_params, only: [:update, :update_password]
  


  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      redirect_to root_path
    else
      render :new 
    end
  end

  def edit

  end
  
  def update
    
    if @user.update user_params

        @current_user = @user
        redirect_to root_path

    else

      render :edit

    end
  end

  

  def password
   
  end
  
  def update_password
   # alert user if current password is not right
   # update if password is right

    if @user&.authenticate params[:user][:current_password]
  
        if @user.update user_params
         redirect_to root_path
      
        end

    else

        flash[:danger] = "password not updated"
        redirect_to edit_password_path 
        
        # edit_password_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
  end
  
  def find_user
    @user = User.find(params[:id])
  end


end
