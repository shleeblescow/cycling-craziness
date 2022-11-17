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
    creator_id: u2.id,
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

t3 = Trip.create(
    creator_id: u4.id,
    # link: "",
    trip_name: "Tour Aotearoa",
    location: "New Zealand",
    route_photo: "https://www.breakingthecycle.education/wp-content/uploads/2018/01/map-baha.jpg",
    total_mileage: 1900,
    total_vert: 20000,
    daily_mileage: 40,
    est_total_weeks: 5,
    departure_city: "Auckland",
    final_city: "Auckland",
    departure_month: "December",
    about_trip: 
        "Biking as much of New Zealand as possible over the course of 5 weeks!  Focusing on morning miles, working pace, and mostly camping."
)

t4 = Trip.create(
    creator_id: u2.id,
    link: "https://bikepacking.com/routes/caldera-500/",
    trip_name: "Caldera 500",
    location: "Eastern Sierras",
    route_photo: "https://www.breakingthecycle.education/wp-content/uploads/2018/01/map-baha.jpg",
    total_mileage: 480,
    total_vert: 60000,
    daily_mileage: 30,
    est_total_weeks: 3,
    departure_city: "Mammoth Lakes",
    final_city: "Mammoth Lakes",
    departure_month: "July",
    about_trip: 
        "Sick trip through the Eastern Sierras!  Gonna be hilly and rough but super fun!!"
)

t5 = Trip.create(
    creator_id: u3.id,
    link: "https://bikepacking.com/routes/olympic-bridges-overnighter/",
    trip_name: "Olympic Bridges Overnighter",
    location: "Olympic National Park",
    route_photo: "https://www.breakingthecycle.education/wp-content/uploads/2018/01/map-baha.jpg",
    total_mileage: 39,
    total_vert: 2890,
    daily_mileage: 20,
    est_total_weeks: 0,
    departure_city: "Vance Creek",
    final_city: "Vance Creek",
    departure_month: "August",
    about_trip: 
        "Quick little overnighter to check out some cool bridges in Olympic National Forest"
)

t6 = Trip.create(
    creator_id: u4.id,
    link: "https://bikepacking.com/routes/bikepacking-south-africa-the-dragons-spine/",
    trip_name: "The Dragon's Spine",
    location: "South Africa",
    route_photo: "https://www.breakingthecycle.education/wp-content/uploads/2018/01/map-baha.jpg",
    total_mileage: 2500,
    total_vert: 155388,
    daily_mileage: 40,
    est_total_weeks: 9,
    departure_city: "Zimbabwe",
    final_city: "Cape Town",
    departure_month: "January",
    about_trip: 
        "Big trip planning in the books!  Maybe January 2024?  Gonna be epic."
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
    user_id: u2.id,
    trip_id: t2.id 
)

j6 = UserTripJoin.create(
    user_id: u4.id,
    trip_id: t3.id 
)

j7 = UserTripJoin.create(
    user_id: u4.id,
    trip_id: t4.id 
)

j8 = UserTripJoin.create(
    user_id: u3.id,
    trip_id: t5.id 
)

j9 = UserTripJoin.create(
    user_id: u1.id,
    trip_id: t6.id 
)

j10 = UserTripJoin.create(
    user_id: u3.id,
    trip_id: t3.id 
)

j11 = UserTripJoin.create(
    user_id: u4.id,
    trip_id: t6.id 
)

j12 = UserTripJoin.create(
    user_id: u2.id,
    trip_id: t4.id 
)

b1 = Bike.create(
    bike_name: "puke van larry",
    brand: "specialized",
    bike_type: "hardtail",
    model: "'22 fuse 29r",
    bike_photo: "https://assets.specialized.com/i/specialized/96022-50_FUSE-COMP-29-OLVGRN-SND_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto",
    user_id: u4.id
)

b2 = Bike.create(
    bike_name: "MC (My Child)",
    brand: "specialized",
    bike_type: "trail",
    model: "'22 stumpy evo comp",
    bike_photo: "https://p.vitalmtb.com/photos/products/34301/photos/78557/original_photo_724862.jpg?VersionId=psk0gc_E9y2g5N1s1rwmSRteRMXM8hvL",
    user_id: u4.id
)

b3 = Bike.create(
    bike_name: "troy doesnt name stuff",
    brand: "santa cruz",
    bike_type: "hardtail",
    model: "chameleon",
    bike_photo: "https://triathlonmagazine.ca/wp-content/uploads/2018/06/andean-red-profile_v02.jpg",
    user_id: u1.id
)

b4 = Bike.create(
    bike_name: "patrik?",
    brand: "kona",
    bike_type: "hardtail",
    model: "honzo",
    bike_photo: "https://images.immediate.co.uk/production/volatile/sites/21/2022/01/kona-honzo-esd-7b26934.jpg?quality=90&resize=768%2C574",
    user_id: u2.id
)

b5 = Bike.create(
    bike_name: "some stone",
    brand: "surly",
    bike_type: "fully rigid fat bike",
    model: "krampus",
    bike_photo: "https://mbaction.com/wp-content/uploads/2015/04/Surly-1-e1428043171769.jpg",
    user_id: u3.id
)




puts "thats all you get stoopid"