class UsersController < ApplicationController
  def index
  end


  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to @user, notice: "会員登録が完了しました"
    else
      render 'new'
    end
  end
  
  def show 
   @user = User.find(params[:id])
  end
  
  def edit 
  @user = User.find(params[:id])
  end
  
  
  private

  def user_params
    params.require(:user).permit(:name, :email, :location, :password,
                                 :password_confirmation)
  end
end