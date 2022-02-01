const {buildSchema}  = require('graphql');

module.exports = buildSchema(`
   
     

    type Users{
        _id:ID!
        email:String!
        password:String!
        name:String!
        phone:String!
    }

    input userInputData{
        email:String!
        password:String!
        name:String!
        phone:String!
    }

    input edituserInputData{
        name:String!
        phone:String!
    }
    
    input loginParameters {
        email:String!
        password:String!
    }

   
    type Trip {
        _id:ID!
        userId:String!
        tripName:String!
        tripLocation:String! 
        days:[Days!]!
        atendees:[atendees]
    }

    type TripAll{
        trips : [Trip!]!
    }

    type toDo {
        task : String!
        isCompleted : Boolean! 
    }

    input inputToDo{
        task : String!
        isCompleted : Boolean!
    }


    type Days { 
        date : String!
        location : [String!]!
        toDo : [toDo]
        notes : String
    }

    type atendees {
        name : String!
        email : String!
        phone : String!
    }

    input inputAtendees { 
        name : String!
        email : String!
        phone : String!
    }

    input inputDays{
        date : String!
        location : [String!]
        toDo : [inputToDo]
        notes : String
    }

    input tripInputData{
        userId:String!
        tripName:String!
        tripLocation:String!
        days : [inputDays]
        atendees: [inputAtendees]
    }

    type RootQuery{
        getUser(Id:String!):Users!
        getUsersTrip(userid:String!):TripAll!
        getTrip(tripId:String!):Trip!
    }

    type RootMutation{
        createUser(userInput:userInputData):Users!
        login(loginparams:loginParameters):String!
        editUserInfo(userId:String!,userInput:edituserInputData):String!
        createTrip(tripInput:tripInputData):Trip!
        editUserTrip(tripid:String!,tripData:tripInputData!):Trip!
        getUserById(Id:String!):Users!
        deleteTrip(tripId:String!):String!
    }

    schema {
        query : RootQuery
        mutation : RootMutation
    }

`);