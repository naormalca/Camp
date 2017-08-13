var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next){
     if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            req.flash("error","Campground not found!");
            res.redirect("back");
        } else{
            //does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "you dont have permission to do that!");
                res.redirect("back");
            }
        }
    });       
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundComment){
        if(err){
            res.redirect("/campgrounds");
        } else{
            //does user own the comment?
            console.log(foundComment.author.id);
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error","You not have permission to do that");
                res.redirect("back");
            }
        }
    });       
    } else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be looged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;


