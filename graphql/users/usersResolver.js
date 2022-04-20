const Users = require('../../models/users');
const Trips = require('../../models/trips');

const bcrypt = require('bcrypt');

module.exports = {
    getUser: async function({Id}){
        const user = await Users.findById(Id);

        if(!user){
            throw new Error("NO user Found");
        }

        return { 
            ...user._doc,
            _id:user._id.toString(),
        }

    },

    getUserById : async function({Id}){
        const user = await Users.findById(Id);

        if(!user){
            throw new Error("NO user Found");
        }

        return { 
            ...user._doc,
            _id:user._id.toString(),
        }

    },

    createUser: async function({userInput}){
       
        const hash = await bcrypt.hash(userInput.password, 12);

        const user = new Users({
            email : userInput.email,
            password : hash,
            name : userInput.name,
            phone:userInput.phone
        });

        const createdUser = await user.save();
        return {
            ...createdUser._doc,
            _id:createdUser._id.toString(),
        }
    },

    login : async function({loginparams}){
        const user = await Users.findOne({email:loginparams.email});
        
        

        if(!user){
            throw new Error("No user Found");
        }

        console.log(user.password);

        const valid = await bcrypt.compare(loginparams.password,user.password);
        

        if(!valid){
            throw new Error("Wrong Password");
        }
        const id = user._id.toString();
        
        return id;
            
    },

    createTrip : async function({tripInput}){
        const trip = new Trips({
            userId : tripInput.userId,
            tripName: tripInput.tripName,
            tripLocation: tripInput.tripLocation,
            days:tripInput.days,
            atendees:tripInput.atendees,
           
        });

        const createdTrip = await trip.save();
        return {
            ...createdTrip._doc,
            _id:createdTrip._id.toString(),
        }
    },

    getUsersTrip : async function({userid}){
        const trips = await Trips.find({userId: userid})
        console.log(trips)
       
        if(!trips){
            throw new Error("not any");
        }
       
        return{
            trips:trips.map((t)=>{
                return{
                    ...t._doc,
                    _id:t._id.toString()
                }
            })
            
        }
    },

    editUserTrip : async function({tripid,tripData}){
        const trip = await Trips.findById(tripid)

        if(!trip){
            throw new Error("Not found");
        }

        trip.tripName = tripData.tripName;
        trip.tripLocation = tripData.tripLocation;
        trip.days = tripData.days;
        trip.atendees = tripData.atendees;

        const updatedTrip = await trip.save();

        return {
            ...updatedTrip._doc,
            _id:updatedTrip._id.toString()
        }
       
    },

    editUserInfo : async function({userId,userInput}){
        const user = await Users.findById(userId);

        user.name = userInput.name; 
        user.phone =userInput.phone;

        const updatedUser =  await user.save();

        return "User : " + updatedUser.name +" saved."

    },

    getTrip : async function({tripId}){
        const trip = await Trips.findById(tripId);

        if(!trip){
            throw new Error("Not Found");
        }

        return{
            ...trip._doc,
            _id:trip._id.toString()
        }
    },


    deleteTrip: async function({tripId}){
        const Result =  Trips.findByIdAndDelete(tripId,function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
            }
        })

        
        return "trip deleted";
    },

    submitReview: async function({inputReview}){
        const review = new Reviews({
            reviewName:inputReview.reviewName,
            reviewEmail:inputReview.reviewEmail,
            reviewCountry:inputReview.reviewCountry,
            reviewText:inputReview.revieText,
           
        });

        const submittedReview = await review.save();
        return {
            ...submittedReview._doc,
            _id:submittedReview._id.toString(),
        }
    },

    getReview: async function({reviewId}){
        const review = await Reviews.findById(reviewId);

        if(!review){
            throw new Error("Not Found");
        }

        return{
            ...review._doc,
            _id:review._id.toString()
        }
    },

    deleteReview: async function({reviewId}){
        const reviewResult =  Reviews.findByIdAndDelete(reviewId,function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
            }
        })

        return "review deleted";
    },

}