class User < ApplicationRecord
    has_secure_password
    has_many :posts, dependent: :nullify
    has_many :comment, dependent: :nullify

    attr_accessor :current_password

    def full_name
        "#{first_name} #{last_name}"
    end 


end
