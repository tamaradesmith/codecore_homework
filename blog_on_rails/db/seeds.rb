# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Post.destroy_all
Comment.destroy_all
# Users.destroy_all

NUM_USER = 15
NUM_POSTS = 50
PASSWORD = 'hudson'


# NUM_USERS.times do
#     first_name = Faker::Name.first_name
#     last_name = Faker::Name.last_name
#         User.create(
#             first_name: first_name,
#             last_name: last_name,
#             email: "#{first_name}.#{last_name}@example.com",
#             password: PASSWORD
#         )
# end

# users = User.all

NUM_POSTS.times do
    created_at = Faker::Date.backward(days: 365)
    body = Faker::Movies::HitchhikersGuideToTheGalaxy.quote + " || " + Faker::Movies::HitchhikersGuideToTheGalaxy.quote
    p =Post.create(
        title: Faker::Creature::Cat.breed,
        body: body,
        created_at: created_at,
        updated_at: created_at ,
        # user: users.sample
    )
    if p.valid?
        p.comments = rand(0..10).times.map do
            Comment.new(
               
                body:Faker::GreekPhilosophers.quote,
                # user:users.sample               
            )
        end
    end
end
    posts = Post.all
       puts Cowsay.say("Generated #{posts.count} post", :frogs)