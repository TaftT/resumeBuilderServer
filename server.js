const express = require("express");
const expressSession = require("express-session"); // npm install express-session
//const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // npm install bcryptjs
const passport = require("passport"); // npm install passport
const LocalStrategy = require("passport-local").Strategy;

var server = express();
var port = process.env.PORT || 3000;


var resumeInfo = require("./schema.js")
var userModel = require("./user.js");

//server.use(cors());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("origin"));
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
server.options("*", function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-type");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT")
  next();
});
server.use(express.json());
server.use( express.urlencoded({ extend: false}));
server.use(function(req , res, next) {
  console.log(`New request: ${req.method} ${req.path} on ${ new Date()}`);
  next();

});

server.use(expressSession({
  secret: "Avatar is the best tv show ever",
  resave: true,
  saveUninitialized: true,
  cookie: {
      secure: false,
      maxAge: 3600000 // 1 hour
  }
}));
server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});
passport.deserializeUser(function(id, callback) {
  userModel.findById(id, function(error, user) {
      callback(error, user);
  });
});
passport.use(new LocalStrategy(
  function(username, password, done) {
      userModel.findOne({
          username: username
      }, function(error, user) {
          if (error) {
              return done(error);
          }
          if (!user) {
              return done(null, false);
          }
          bcrypt.compare(password, user.password, function(error, isMatch) {
              if (isMatch) {
                  return done(null, user);
              } else {
                  return done(null, false);
              }
          });
      });
  }
));
var ensureAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(403); // Forbidden
      res.json({
          msg: "Please login first"
      });
  }
};

// Endpoints
server.get("/private", ensureAuthentication, function(req, res) {
  res.json({
      msg: `Hello ${req.user.username}`
  });
});

// Register
server.post("/users/register",  function(req, res) {
  userModel.findOne({
      username: req.body.username
  }).then(function(user) {
      if (user) {
          res.status(422); // unprocessable
          res.json({
              msg: "That username is already in use."
          });
      } else {
          // Create the user, but first encrypt the password
          bcrypt.genSalt(10, function(error, salt) {
              bcrypt.hash(req.body.password, salt, function(error, hashed_password) {
                  userModel.create({
                      username: req.body.username,
                      password: hashed_password
                  }).then(function(new_user) {
                      res.status(201);
                      res.json({
                          user: new_user
                      });
                  }).catch(function(error) {
                      res.status(400).json({msg: error.message});
                  });
              });
          });
      }
  }).catch(function(error) {
      res.status(400).json({msg: error.message});
  });
});

// Login
server.post("/users/login",
  passport.authenticate("local", { failureRedirect: "/users/login/error" }),
  function(req, res, next) {
      res.redirect("/users/login/success");
  }
);

// Login error and success
server.get("/users/login/error", function(req, res) {
  res.status(403); // forbidden
  res.json({
      msg: "Invalid username or password"
  });
});

server.get("/users/login/success", function(req, res) {
  res.json({
      msg: `Welcome ${req.user.username}`,
      user_id: req.user._id
  });
});

server.get("/users/checklogin",ensureAuthentication, function(req, res) {
  res.json({
      msg: `Welcome ${req.user.username}`,
      user_id: req.user._id
  });
});

//#### personalinfo #####
server.get("/personalinfo", ensureAuthentication,  function(req, res){
  resumeInfo.personalinfomodel.find().then(function(model){
    res.json({
      personalinfo: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/personalinfo/:id", ensureAuthentication,  function(req, res){
  resumeInfo.personalinfomodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no personal info with id of ${req.params.id}`
      });
    } else{
      res.json({
        personalinfo : item
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/personalinfo", ensureAuthentication,  function(req, res){
  	resumeInfo.personalinfomodel.create({
  	  	first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        email: req.body.email,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/personalinfo/:id", ensureAuthentication,  function(req, res){
  resumeInfo.personalinfomodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/personalinfo/:id", ensureAuthentication,  function(req, res){
  resumeInfo.personalinfomodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no personal info with id of ${req.params.id}`
      });
    } else{
      if (req.body.first_name != undefined){
        item.first_name = req.body.first_name;
      }
      if (req.body.last_name != undefined){
        item.last_name = req.body.last_name;
      }
      if (req.body.address != undefined){
        item.address = req.body.address;
      }
      if (req.body.city != undefined){
        item.city = req.body.city;
      }
      if (req.body.state != undefined){
        item.state = req.body.state;
      }
      if (req.body.zip != undefined){
        item.zip = req.body.zip;
      }
      if (req.body.country != undefined){
        item.country = req.body.country;
      }
      if (req.body.email != undefined){
        item.email = req.body.email;
      }
      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          item: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});


//#### statement #####
server.get("/statement", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.statementmodel.find().then(function(wholeModel){
    wholeModel.forEach(function(item){
      if (item.user_id == req.user._id){
        model.push(item)
      }
    });
    res.json({
      statementlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/statement/:id", function(req, res){
  resumeInfo.statementmodel.findById(req.params.id).then(function(statement){
    if(statement == null){
      res.status(404);
      res.json({
        msg: `there is no statement with id of ${req.params.id}`
      });
    } else{
      res.json({
        statement : statement
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/statement", ensureAuthentication,  function(req, res){
  	resumeInfo.statementmodel.create({
  	  	statement: req.body.statement,
        user_id: req.body.user_id,

 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/statement/:id", ensureAuthentication,  function(req, res){
  resumeInfo.statementmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/statement/:id", ensureAuthentication,  function(req, res){
  resumeInfo.statementmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no statement with id of ${req.params.id}`
      });
    } else{
      if (req.body.statement != undefined){
        item.statement = req.body.statement;
      }
      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          item: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});


//#### work experience #####
server.get("/workexp", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.workexpmodel.find().then(function(wholeModel){
    wholeModel.forEach(function(item){
      if (item.user_id == req.user._id){
        model.push(item)
      }
    });
    res.json({
      workexplist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/workexp/:id", ensureAuthentication,  function(req, res){
  resumeInfo.workexpmodel.findById(req.params.id).then(function(experience){
    if(experience == null){
      res.status(404);
      res.json({
        msg: `there is no workexp with id of ${req.params.id}`
      });
    } else{
      res.json({
        experience : experience
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/workexp", ensureAuthentication,  function(req, res){
  	resumeInfo.workexpmodel.create({
  	  	company: req.body.company,
   		  title: req.body.title,
    		startdate: req.body.startdate,
        enddate: req.body.enddate,
        description: req.body.description,
        user_id: req.body.user_id,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/workexp/:id", ensureAuthentication,  function(req, res){
  resumeInfo.workexpmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/workexp/:id", ensureAuthentication,  function(req, res){
  resumeInfo.workexpmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no workexp with id of ${req.params.id}`
      });
    } else{
      if (req.body.company != undefined){
        item.company = req.body.company;
      }
      if (req.body.title != undefined){
        item.title = req.body.title;
      }
      if (req.body.startdate != undefined){
        item.startdate = req.body.startdate;
      }
      if (req.body.enddate != undefined){
        item.enddate = req.body.enddate;
      }
      if (req.body.description != undefined){
        item.description = req.body.description;
      }
      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          item: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

//#### education #####
server.get("/education", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.educationmodel.find().then(function(wholeModel){
      wholeModel.forEach(function(item){
        if (item.user_id == req.user._id){
          model.push(item)
        }
      });
    res.json({
      educationlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/education/:id", ensureAuthentication,  function(req, res){
  resumeInfo.educationmodel.findById(req.params.id).then(function(education){
    if(education == null){
      res.status(404);
      res.json({
        msg: `there is no education item with id of ${req.params.id}`
      });
    } else{
      res.json({
        education : education
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/education", ensureAuthentication,  function(req, res){
  	resumeInfo.educationmodel.create({
  	  	college: req.body.college,
   		  degree: req.body.degree,
    		gradyear: req.body.gradyear,
        user_id: req.body.user_id,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/education/:id", ensureAuthentication,  function(req, res){
  resumeInfo.educationmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/education/:id", ensureAuthentication,  function(req, res){
  resumeInfo.educationmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no education item with id of ${req.params.id}`
      });
    } else{
      if (req.body.college != undefined){
        item.college = req.body.college;
      }
      if (req.body.degree != undefined){
        item.degree = req.body.degree;
      }
      if (req.body.gradyear != undefined){
        item.gradyear = req.body.gradyear;
      }
      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          education: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

//#### accomplishment #####
server.get("/accomplishment", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.accomplishmentmodel.find().then(function(wholeModel){
    wholeModel.forEach(function(item){
      if (item.user_id == req.user._id){
        model.push(item)
      }
    });
    res.json({
      accomplishmentlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/accomplishment/:id", ensureAuthentication,  function(req, res){
  resumeInfo.accomplishmentmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no accomplishment with id of ${req.params.id}`
      });
    } else{
      res.json({
        accomplishment : item
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/accomplishment", ensureAuthentication,  function(req, res){
  	resumeInfo.accomplishmentmodel.create({
  	  	title: req.body.title,
   		  description: req.body.description,
        user_id: req.body.user_id,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/accomplishment/:id", ensureAuthentication,  function(req, res){
  resumeInfo.accomplishmentmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/accomplishment/:id", ensureAuthentication,  function(req, res){
  resumeInfo.accomplishmentmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no education item with id of ${req.params.id}`
      });
    } else{
      if (req.body.title != undefined){
        item.title = req.body.title;
      }
      if (req.body.description != undefined){
        item.description = req.body.description;
      }
      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          education: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

//#### extracurricular #####
server.get("/extracurricular", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.extracurricularmodel.find().then(function(wholeModel){
    wholeModel.forEach(function(item){
      if (item.user_id == req.user._id){
        model.push(item)
      }
    });
    res.json({
      extracurricularlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/extracurricular/:id", ensureAuthentication,  function(req, res){
  resumeInfo.extracurricularmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no extracurricular with id of ${req.params.id}`
      });
    } else{
      res.json({
        extracurricular : item
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/extracurricular", ensureAuthentication,  function(req, res){
  	resumeInfo.extracurricularmodel.create({
  	  	title: req.body.title,
   		  description: req.body.description,
        date:req.body.date,
        user_id: req.body.user_id,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/extracurricular/:id", ensureAuthentication,  function(req, res){
  resumeInfo.extracurricularmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/extracurricular/:id", ensureAuthentication,  function(req, res){
  resumeInfo.extracurricularmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no extracurricular item with id of ${req.params.id}`
      });
    } else{
      if (req.body.title != undefined){
        item.title = req.body.title;
      }
      if (req.body.description != undefined){
        item.description = req.body.description;
      }
      if (req.body.date != undefined){
        item.date = req.body.date;
      }
      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          education: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

//#### language #####
server.get("/language", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.languagemodel.find().then(function(wholeModel){
    wholeModel.forEach(function(item){
      if (item.user_id == req.user._id){
        model.push(item)
      }
    });
    res.json({
      languagelist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/language/:id", ensureAuthentication,  function(req, res){
  resumeInfo.languagemodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no language with id of ${req.params.id}`
      });
    } else{
      res.json({
        language : item
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/language", ensureAuthentication,  function(req, res){
  	resumeInfo.languagemodel.create({
  	  	title: req.body.title,
   		  proficiency: req.body.proficiency,
        user_id: req.body.user_id,

 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/language/:id", ensureAuthentication,  function(req, res){
  resumeInfo.languagemodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/language/:id", ensureAuthentication,  function(req, res){
  resumeInfo.languagemodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no language with id of ${req.params.id}`
      });
    } else{
      if (req.body.title != undefined){
        item.title = req.body.title;
      }
      if (req.body.proficiency != undefined){
        item.proficiency = req.body.proficiency;
      }

      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          education: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

//#### program #####
server.get("/program", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.programmodel.find().then(function(wholeModel){
    wholeModel.forEach(function(item){
      if (item.user_id == req.user._id){
        model.push(item)
      }
    });
    res.json({
      programlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/program/:id", ensureAuthentication,  function(req, res){
  resumeInfo.programmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no program with id of ${req.params.id}`
      });
    } else{
      res.json({
        program : item
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/program", ensureAuthentication,  function(req, res){
  	resumeInfo.programmodel.create({
  	  	title: req.body.title,
   		  proficiency: req.body.proficiency,
        user_id: req.body.user_id,

 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/program/:id", ensureAuthentication,  function(req, res){
  resumeInfo.programmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/program/:id", ensureAuthentication,  function(req, res){
  resumeInfo.programmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no program with id of ${req.params.id}`
      });
    } else{
      if (req.body.title != undefined){
        item.title = req.body.title;
      }
      if (req.body.proficiency != undefined){
        item.proficiency = req.body.proficiency;
      }

      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          education: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

//#### softskill #####
server.get("/softskill", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.softskillmodel.find().then(function(wholeModel){
    wholeModel.forEach(function(item){
      if (item.user_id == req.user._id){
        model.push(item)
      }
    });
    res.json({
      softskilllist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/softskill/:id", ensureAuthentication,  function(req, res){
  resumeInfo.softskillmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no soft skill with id of ${req.params.id}`
      });
    } else{
      res.json({
        softskill : item
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/softskill", ensureAuthentication, function(req, res){
  	resumeInfo.softskillmodel.create({
  	  	title: req.body.title,
        user_id: req.body.user_id,

 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/softskill/:id", ensureAuthentication,  function(req, res){
  resumeInfo.softskillmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/softskill/:id", ensureAuthentication,  function(req, res){
  resumeInfo.softskillmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no soft skill with id of ${req.params.id}`
      });
    } else{
      if (req.body.title != undefined){
        item.title = req.body.title;
      }

      item.save().then(function(){
        res.status(200);
        res.json({
          education: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

//#### award #####
server.get("/award", ensureAuthentication,  function(req, res){
  var model = [];
  resumeInfo.awardmodel.find().then(function(wholeModel){
    wholeModel.forEach(function(item){
      if (item.user_id == req.user._id){
        model.push(item)
      }
    });
    res.json({
      awardlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/award/:id", ensureAuthentication,  function(req, res){
  resumeInfo.awardmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no award with id of ${req.params.id}`
      });
    } else{
      res.json({
        award : item
      });
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.post("/award", ensureAuthentication,  function(req, res){
  	resumeInfo.awardmodel.create({
  	  	title: req.body.title,
        receivedfrom: req.body.receivedfrom,
   		  description: req.body.description,
        date:req.body.date,
        user_id: req.body.user_id,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/award/:id", ensureAuthentication,  function(req, res){
  resumeInfo.awardmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/award/:id", ensureAuthentication,  function(req, res){
  resumeInfo.awardmodel.findById(req.params.id).then(function(item){
    if(item == null){
      res.status(404);
      res.json({
        msg: `there is no award item with id of ${req.params.id}`
      });
    } else{
      if (req.body.title != undefined){
        item.title = req.body.title;
      }
      if (req.body.receivedfrom != undefined){
        item.receivedfrom = req.body.receivedfrom;
      }
      if (req.body.description != undefined){
        item.description = req.body.description;
      }
      if (req.body.date != undefined){
        item.date = req.body.date;
      }
      item.saveddate = new Date().toDateString()

      item.save().then(function(){
        res.status(200);
        res.json({
          education: item
        });
      })
    }
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});


mongoose.connect("mongodb+srv://pocolocomoco:mocolocopoco@cluster0-ztwj9.mongodb.net/ResumeBuilder?retryWrites=true&w=majority", {
 	 useNewUrlParser: true
}).then(function(){
 	 server.listen(port, function(){
    	console.log(`Listening on ${port}` )
 	 });
});
