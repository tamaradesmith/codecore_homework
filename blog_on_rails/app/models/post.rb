class Post < ApplicationRecord

    has_many :comments, dependent: :destroy
    
    validates :title, presence: true, uniqueness: { case_sensitive: false }   
    validates:body, presence: {message: "Please add a message"}, length: {minimum: 50}
end


# The title column must be present and unique.
# The body column must be present and contain at least 50 characters.