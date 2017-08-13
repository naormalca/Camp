var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware =require("../middleware");
//*************************//
//campgrounds//
//*************************//


//INDEX ROUTE - Show all campgrounds
router.get("/",function(req, res){
    Campground.find({},function(err, allCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campground:allCampground});
        }
    });
     
});
//CREATE - create new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from FORM and add to campgrounds ARRAY
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        username: req.user.username,
        id: req.user._id
    };
    var newCamp = {name: name, image: image,description:desc ,author: author};
    //create a new campground and save to DB
    Campground.create(newCamp,function(err, newCreated){
       if(err){
           console.log(err);
       } else{
           res.redirect("/campgrounds");
       }
    });
    
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});
//SHOW -show more info about ID campground
router.get("/:id",function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgrounds){
        if(err){
            console.log(err);
            console.log("ERROR!");
        } else{
            console.log(foundCampgrounds);
            res.render("campgrounds/show", {campground: foundCampgrounds});
        }
    });
});
//EDIT
router.get("/:id/edit",middleware.checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit",{campground:foundCampground});
    });
});
//UPDATE
router.put("/:id", middleware.checkCampgroundOwner,function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect > show page
});

//DESTORY CAMPGROUDN ROUTE
router.delete("/:id",middleware.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){    
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
    }
    });
});

module.exports = router;