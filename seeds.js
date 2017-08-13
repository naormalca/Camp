var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data= [
    {name:"Cloud Rest",
    image:"https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?h=350&auto=compress&cs=tinysrgb",
    description:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {name:"Yea Camp",
    image:"https://images.pexels.com/photos/111362/pexels-photo-111362.jpeg?h=350&auto=compress&cs=tinysrgb",
    description:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {name:"House Bio",
    image:"https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?h=350&auto=compress&cs=tinysrgb",
    description:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        
    }
]; //array of objects
function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
       /*if(err){
           console.log(err);
       } else {
           console.log("removed campgrounds!");
       }
    });
    //add a few campgrounds
    data.forEach(function(seed){
       Campground.create(seed, function(err, campground){
          if(err){
              console.log(err);
          } else {
              console.log("added a campground");
              //Create new comment
              Comment.create({
                  text:"This PLACE GREAT",
                  author:{
                      username:"Homer"
                  }
              }, function(err, comment){
                  if(err){
                        console.log(err);
                  } else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment!");
                  }
              });
          }
       });*/
    });
}

module.exports = seedDB;
