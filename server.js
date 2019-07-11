const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

var server = express();
var port = process.env.PORT || 3000;


var resumeInfo = require("./schema.js")

server.use(cors());
server.use( express.urlencoded({ extend: false}));
server.use(express.json());
server.use(express.json());
server.use(function(req , res, next) {
  console.log(`New request: ${req.method} ${req.path} on ${ new Date()}`);
  next();

});

//#### personalinfo #####
server.get("/personalinfo", function(req, res){
  resumeInfo.personalinfomodel.find().then(function(model){
    res.json({
      personalinfo: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/personalinfo/:id", function(req, res){
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

server.post("/personalinfo", function(req, res){
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

server.delete("/personalinfo/:id", function(req, res){
  resumeInfo.personalinfomodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/personalinfo/:id", function(req, res){
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
server.get("/statement", function(req, res){
  resumeInfo.statementmodel.find().then(function(model){
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

server.post("/statement", function(req, res){
  	resumeInfo.statementmodel.create({
  	  	statement: req.body.statement,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/statement/:id", function(req, res){
  resumeInfo.statementmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/statement/:id", function(req, res){
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
server.get("/workexp", function(req, res){
  resumeInfo.workexpmodel.find().then(function(model){
    res.json({
      workexplist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/workexp/:id", function(req, res){
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

server.post("/workexp", function(req, res){
  	resumeInfo.workexpmodel.create({
  	  	company: req.body.company,
   		  title: req.body.title,
    		startdate: req.body.startdate,
        enddate: req.body.enddate,
        description: req.body.description,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/workexp/:id", function(req, res){
  resumeInfo.workexpmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/workexp/:id", function(req, res){
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
server.get("/education", function(req, res){
  resumeInfo.educationmodel.find().then(function(model){
    res.json({
      educationlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/education/:id", function(req, res){
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

server.post("/education", function(req, res){
  	resumeInfo.educationmodel.create({
  	  	college: req.body.college,
   		  degree: req.body.degree,
    		gradyear: req.body.gradyear,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/education/:id", function(req, res){
  resumeInfo.educationmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/education/:id", function(req, res){
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
server.get("/accomplishment", function(req, res){
  resumeInfo.accomplishmentmodel.find().then(function(model){
    res.json({
      accomplishmentlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/accomplishment/:id", function(req, res){
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

server.post("/accomplishment", function(req, res){
  	resumeInfo.accomplishmentmodel.create({
  	  	title: req.body.title,
   		  description: req.body.description,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/accomplishment/:id", function(req, res){
  resumeInfo.accomplishmentmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/accomplishment/:id", function(req, res){
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
server.get("/extracurricular", function(req, res){
  resumeInfo.extracurricularmodel.find().then(function(model){
    res.json({
      extracurricularlist: model
    });
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.get("/extracurricular/:id", function(req, res){
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

server.post("/extracurricular", function(req, res){
  	resumeInfo.extracurricularmodel.create({
  	  	title: req.body.title,
   		  description: req.body.description,
        date:req.body.date,
 	 }).then(function(newmodel){
    		res.status(201);
    		res.json({
      		newmodel: newmodel
    	});
  	}).catch(function(error){
   	 	res.status(400).json({msg : error.message});
 	 });
});

server.delete("/extracurricular/:id", function(req, res){
  resumeInfo.extracurricularmodel.findByIdAndDelete( req.params.id).then(function(){
    res.status(204);
    res.send();
  }).catch(function(error){
    res.status(400).json({msg : error.message});
  });
});

server.put("/extracurricular/:id", function(req, res){
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


mongoose.connect("mongodb+srv://pocolocomoco:mocolocopoco@cluster0-ztwj9.mongodb.net/ResumeBuilder?retryWrites=true&w=majority", {
 	 useNewUrlParser: true
}).then(function(){
 	 server.listen(port, function(){
    	console.log(`Listening on ${port}` )
 	 });
});
