const mongoose = require("mongoose");

const personalinfoSchema = mongoose.Schema({
 		 first_name: {
   		 	type: String,
    		required: true,
  		},
  	  last_name: {
   			type: String,
    		required: true,
 		 },
 		 address: {
   			type: String,
    		required: true,

 		 },
     city: {
   			type: String,
    		required: true,

 		 },
     state: {
   			type: String,
    		required: true,
 		 },
		zip: {
    	type: Number,
    	required: true,
 		 },
     country: {
   			type: String,
    		required: true,
 		 },
     email: {
   			type: String,
    		required: true,
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,
       default: mongoose.Types.ObjectId()
     }

});

const statementSchema = mongoose.Schema({
 		 statement: {
   		 	type: String,
    		required: true,
  		},
  	  saveddate: {
   			type: String,
    		required: true,
        default: new Date().toDateString()
 		 },
     displayShow:{
       type: Boolean,
       required: true,
       default: flase
     },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,

     }

});

const workexpSchema = mongoose.Schema({
 		 company: {
   		 	type: String,
    		required: true,
  		},
  	  title: {
   			type: String,
    		required: true,
 		 },
 		 startdate: {
   			type: String,
    		required: true,
        default: new Date().toDateString()
 		 },
     enddate: {
   			type: String,
    		required: true,
        default: new Date().toDateString()
 		 },
		description: {
    	type: String,
    	required: true,
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
    displayShow:{
      type: Boolean,
      required: true,
      default: flase
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,

     }

});

const educationSchema = mongoose.Schema({
 		 college: {
   		 	type: String,
    		required: true,
  		},
  	  degree: {
   			type: String,
    		required: true,
 		 },
 		 gradyear: {
   			type: String,
    		required: true,
        default: new Date().toDateString()
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
    displayShow:{
      type: Boolean,
      required: true,
      default: flase
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,

     }

});

const accomplishmentSchema = mongoose.Schema({
 		 title: {
   		 	type: String,
    		required: true,
  		},
  	  description: {
   			type: String,
    		required: true,
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
    displayShow:{
      type: Boolean,
      required: true,
      default: flase
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,

     }

});

const extracurricularSchema = mongoose.Schema({
 		 title: {
   		 	type: String,
    		required: true,
  		},
  	  description: {
   			type: String,
    		required: true,
 		 },
     date: {
   			type: String,
    		required: true,
        default: new Date().toDateString()
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
    displayShow:{
      type: Boolean,
      required: true,
      default: flase
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,

     }

});

const languageSchema = mongoose.Schema({
 		 title: {
   		 	type: String,
    		required: true,
  		},
  	  proficiency: {
   			type: String,
    		required: true,
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
    displayShow:{
      type: Boolean,
      required: true,
      default: flase
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,

     }

});

const programSchema = mongoose.Schema({
 		 title: {
   		 	type: String,
    		required: true,
  		},
  	  proficiency: {
   			type: String,
    		required: true,
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
    displayShow:{
      type: Boolean,
      required: true,
      default: flase
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,

     }

});

const softskillSchema = mongoose.Schema({
 		 title: {
   		 	type: String,
    		required: true,
  		},
      displayShow:{
        type: Boolean,
        required: true,
        default: flase
      },

});

const awardSchema = mongoose.Schema({
 		 title: {
   		 	type: String,
    		required: true,
  		},
      receivedfrom: {
    		type: String,
     		required: true,
   		},
  	  description: {
   			type: String,
    		required: true,
 		 },
     date: {
   			type: String,
    		required: true,
        default: new Date().toDateString()
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
    displayShow:{
      type: Boolean,
      required: true,
      default: flase
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,
     }

});

const saveTemplateLayout = mongoose.Schema({
 		 statementposition: {
   		 	type: String,
    		required: true,
  		},
      workexpposition: {
    		 	type: String,
     		required: true,
   		},
      educationposition: {
    		 	type: String,
     		required: true,
   		},
      accomplishmentposition: {
    		 	type: String,
     		required: true,
   		},
      extracurricularposition: {
    		 	type: String,
     		required: true,
   		},
      languagesposition: {
    		 	type: String,
     		required: true,
   		},
      programsposition: {
    		type: String,
     		required: true,
   		},
  	  softskillsposition: {
   			type: String,
    		required: true,
 		 },
     saveddate: {
       type: String,
       required: true,
       default: new Date().toDateString()
    },
    displayShow:{
      type: Boolean,
      required: true,
      default: flase
    },
     user_id: {
       type: String, //ObjectId needed here but error coming back saying undefined
       required: true,
     }

});

var personalinfomodel = mongoose.model("personalinfo", personalinfoSchema);
var statementmodel = mongoose.model("statement", statementSchema);
var workexpmodel = mongoose.model("workexp", workexpSchema);
var educationmodel = mongoose.model("education", educationSchema);
var accomplishmentmodel = mongoose.model("accomplishment", accomplishmentSchema);
var extracurricularmodel = mongoose.model("extracurricular", extracurricularSchema);
var languagemodel = mongoose.model("language", languageSchema);
var programmodel = mongoose.model("program", programSchema);
var softskillmodel = mongoose.model("softskill", softskillSchema);
var awardmodel = mongoose.model("award", awardSchema);
module.exports = {
  personalinfomodel:personalinfomodel,
  statementmodel:statementmodel,
  workexpmodel: workexpmodel,
  educationmodel:educationmodel,
  accomplishmentmodel:accomplishmentmodel,
  extracurricularmodel:extracurricularmodel,
  languagemodel:languagemodel,
  programmodel:programmodel,
  softskillmodel:softskillmodel,
  awardmodel:awardmodel,
};
