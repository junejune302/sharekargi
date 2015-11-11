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
  
  def update #課題
    @user = User.find(params[:id])
    if @user.update(user_params)
       redirect_to user_url(@user) ,notice: 'プロフィールを更新しました。'
    else
       flash.now[:alert] = "プロフィールに不備がある為、更新に失敗しました。"
       render 'edit'
    end
  end
  
  
  private

  def user_params
    params.require(:user).permit(:name, :email, :password,
                                 :password_confirmation)
  end
end