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




mongoose.connect("mongodb+srv://pocolocomoco:mocolocopoco@cluster0-ztwj9.mongodb.net/ResumeBuilder?retryWrites=true&w=majority", {
 	 useNewUrlParser: true
}).then(function(){
 	 server.listen(port, function(){
    	console.log(`Listening on ${port}` )
 	 });
});
