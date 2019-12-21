class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts= Post.all.order(created_at: :desc)
  end

  def show
    @comment = Comment.new
    @comments = @post.comments.order(created_at: :desc) 
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new post_params
    if @post.save
      flash[:notice] = "post created"
      redirect_to post_path(@post)
    else
      render :new
    end
  end

  def edit

  end

  def update
    if @post.update post_params
      redirect_to post_path(@post)
    else
        render :edit
    end
  end

  def destroy
      flash[:notice] = "post deleted"
    @post.destroy
    redirect_to index_posts_path
  end

  private

    def find_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :body)
    end

end
