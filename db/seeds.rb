# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "seed some data bitch"

u1 = User.create(
    username: "lonehorse",
    password: "123",
    name: "troy boi",
    age: 33,
    hometown: "salmon",
    bio: "I'm really bad at texting",
    bikepacking_method: "hungry and blazed"
)

u2 = User.create(
    username: "scenthorse",
    password: "123",
    name: "brandito",
    age: 33,
    hometown: "salmon",
    bio: "just out here for a good time!",
    bikepacking_method: "enjoy the scenery, bomb the descents, wear sunscreen hell yeah"
)

u3 = User.create(
    username: "windmillman",
    password: "123",
    name: "will",
    age: 34,
    hometown: "ashland",
    bio: "fuck paying rent",
    bikepacking_method: "ride your bike, smoke a cig, drink a mcalado"
)

u4 = User.create(
    username: "chuubyhorse",
    password: "123",
    name: "shelby",
    age: 23,
    hometown: "seattle",
    bio: "wtf am i doing with my life",
    bikepacking_method: "pedal fast, eat lots of peanut butter, get er done"
)

t1 = Trip.create(
    creator_id: u1.id,
    link: "https://bikepacking.com/routes/baja-divide/",
    trip_name: "Baja Divide",
    location: "Baja, Mexico",
    route_photo: "https://www.breakingthecycle.education/wp-content/uploads/2018/01/map-baha.jpg",
    total_mileage: 1673,
    total_vert: 92000,
    daily_mileage: 40,
    est_total_weeks: 6,
    departure_city: "San Diego",
    final_city: "La Paz",
    departure_month: "January",
    about_trip: 
        "Hey y'all!  I'm planning on riding the Baja divide this winter, starting in late January. Looking for
        forward moving pace but nothing crazy.  Big propopenent of taking rest days in cool cities and eating all the good food.
        Planning on mostly camping in my bikepacking tent and traveling as light as possible."
)

t2 = Trip.create(
    creator_id: u4.id,
    link: "https://bikepacking.com/routes/tots-nz/",
    trip_name: "TOTS",
    location: "New Zealand",
    route_photo: "https://bikepacking.com/wp-content/uploads/2020/01/Top-of-the-South-New-Zealand_1.jpg",
    total_mileage: 688,
    total_vert: 57677,
    daily_mileage: 50,
    est_total_weeks: 3,
    departure_city: "Hanmer",
    final_city: "Hanmer",
    departure_month: "December",
    about_trip: 
        "It's finally time!  I'm going to NZ after graduating from my coding bootcamp!!  I am SO STOKED and would
        love to find company to explore this epic landscape!  Mostly camping but htought it would be fun to stay in hostels when psosibel!"
)

j1 = UserTripJoin.create(
    user_id: u1.id,
    trip_id: t1.id 
)

j2 = UserTripJoin.create(
    user_id: u2.id,
    trip_id: t1.id 
)

j3 = UserTripJoin.create(
    user_id: u3.id,
    trip_id: t1.id 
)

j4 = UserTripJoin.create(
    user_id: u4.id,
    trip_id: t1.id 
)

j5 = UserTripJoin.create(
    user_id: u4.id,
    trip_id: t2.id 
)


puts "thats all you get stoopid"