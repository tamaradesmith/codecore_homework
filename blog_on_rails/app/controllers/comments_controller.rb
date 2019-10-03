class CommentsController < ApplicationController

    def create
        @post = Post.find params[:post_id]
        @comment = Comment.new comment_params
        @comment.user = current_user
        @comment.post = @post
        if @comment.save
            redirect_to post_path(@post),          
            notice: "Post Added"

        else
            @comments = @post.comments.order(created_at: :desc) 
      render 'posts/show'
        end
    end

    def destroy
        @post = Post.find params[:post_id]
        @comment = Comment.find params[:id]
        if can? :crud, @comment
            @comment.destroy
            redirect_to post_path(@post), notice:"comment deleted"
        else
            redirect_to post_path(@post)
        end

    end

    private

    def comment_params
        params.require(:comment).permit(:body)
    end

  
end
 