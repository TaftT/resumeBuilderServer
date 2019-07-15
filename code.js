var url = "http://localhost:3000";
//var url = "https://createresume.herokuapp.com";


var app= new Vue ({
    el: "#app1",

    data: {
      username: "", //CHANGED BY TAFT AND SHARON
      password: "", //CHANGED BY TAFT AND SHARON
      menu:false,
      modal: false,
      page: "form",
      color: "",

        educationlist:[],
        workexplist:[],
        accomplishmentlist: [],
        extracurricularlist:[],
        languageslist:[],
        programslist:[],
        softskillslist:[],
        awardslist:[],
        statementlist:[],


        personalinfoEdit:
        {
            first_name:"",
            last_name:"",
            address: "",
            city:"",
            state:"",
            zip:"",
            country: "",
            email: "",
            phone: "",
            branding_statement: "",
            professional_title: "",
            linkedin: "",
        },
        statementEdit: {
          statement: "",
        },
        workexpEdit: {
            company: "",
            title: "",
            startdate: new Date().toISOString().substr(0, 10),
            enddate: new Date().toISOString().substr(0, 10),
            description: "",
            start_menu: false,
            end_menu: false,
            position: 0, // for each v-card in a template, do for loop through all categories and see which has the desired position

        },
        educationEdit: {
          college: "",
          degree: "",
          gradyear: new Date().toISOString().substr(0, 10),
          menu: false
        },
        accomplishmentEdit: {
          title: "",
          description: "",
        },
        extracurricularEdit: {
          title: "",
          description: "",
          date: "",
        },
        languagesEdit: {
          title: "",
          proficiency:  "",
        },
        programsEdit: {
          title: "",
          proficiency:  "",
        },
        softskillsEdit: {
          title: "",
        },
        awardsEdit: {
          title: "",
          receivedfrom:  "",
          date: new Date().toISOString().substr(0, 10),
          description: "",
          menu:false
        },
        proficiencylist: [
          "Beginner",
          "Intermediate",
          "Proficient",
          "Advanced",
          "Expert"
        ],
        colors: [
            "orange",
            "black",
            "red",
            "blue",
            "green"
        ],
        selected_color_main: "rgb(84, 174, 219)",
        selected_color_accent: "",
        pickingColorMain: false,
        pickingColor: false,
        color_brightness: 6,
        accent: 0,

      template: "malia",
      templateLabel: "Choose a Template",
      templates: [
        {
          model: "malia",
          name: "Template 1"
        },
        {
          model: "hannah",
          name: "Template 2"
        },
        {
          model: "taft",
          name: "Template 3"
        },
        {
          model: "sharon",
          name: "Template 4"
        },
      ],

      statementdisplay: [],
      workexpdisplay: [],
      educationdisplay: [],
      accomplishmentdisplay: [],
      extracurriculardisplay: [],
      languagesdisplay: [],
      programsdisplay: [],
      softskillsdisplay: [],
      awardsdisplay: [],

      add_remove: "",

      workexpposition: "",
      position1: {},

      zone1: [],
      zone2: [],
      zone3: [],
      zone4: [],
      zone5: [],
      zone6: [],
      zone7: [],

      zone1_type: "",
      zone2_type: "",
      zone3_type: "",
      zone4_type: "",
      zone5_type: "",
      zone6_type: "",
      zone7_type: "",


    },
    created: function () {



      addEventListener("click", function () {
        app.selected_color_main = document.getElementById("colorMain").style.backgroundColor;
        console.log("Main Color: ", app.selected_color_main);
        app.selected_color_accent = document.getElementById("colorAccent").style.backgroundColor;
        console.log("Accent Color: ", app.selected_color_accent);
      });
    },


    methods: {
      register: function() { //ADDED by TAFT
  			fetch(`${url}/users/register`, {
  				method: "POST",
  				credentials: "include",
  				headers: {
  					"Content-type": "application/json"
  				},
  				body: JSON.stringify({
  					username: this.username,
  					password: this.password
  				})
  			}).then(function(response) {
  				if (response.status == 422 || response.status == 400) {
  					response.json().then(function(data) {
  						alert(data.msg);
  					})
  				} else if (response.status == 201) {
  					console.log("registered");
  				}
  			});
  		},

  		login: function() { //ADDED by TAFT
        console.log(this.username);
  			fetch(`${url}/users/login`, {
  				method: "POST",
  				credentials: "include",
  				headers: {
  					"Content-type": "application/json"
  				},
  				body: JSON.stringify({
  					username: this.username,
  					password: this.password
  				})
  			}).then(function(response) {
  				if (response.status == 403) {
  					response.json().then(function(data) {
  						alert(data.msg);
  					})
  				}else if(response.status == 200){
            alert("logged in");
            app.page = "form";
            app.getData("statement")
            app.getData("workexp")
            app.getData("education")
            app.getData("accomplishment")
            app.getData("extracurricular")
            app.getData("language")
            app.getData("program")
            app.getData("softskill")
            app.getData("award")

          }
  			});
  		},

      addStatement: function(){
        this.statementlist.push(this.statementEdit)

        this.statementEdit= {
          statement: "",
        }
      },
      addWork: function(){
        this.workexplist.push(this.workexpEdit)
        this.workexpEdit={
          work1company: "",
          work1title: "",
          work1startdate: "",
          work1enddate: "",
          work1description: "",

        }
      },
      addEducation: function(){
          this.educationlist.push(this.educationEdit)

          this.educationEdit= {
            college: "",
            degree: "",
            gradyear: "",
            menu: false
          }

      },
      addAccomplishment: function(){
        this.accomplishmentlist.push(this.accomplishmentEdit)

        this.accomplishmentEdit= {
          title: "",
          description: "",
        }

      },
      addLanguage: function(){
        this.languageslist.push(this.languagesEdit)

        this.languagesEdit= {
          title: "",
          proficiency:  "",
        }


      },
      addSkill: function(){
        this.programslist.push(this.programsEdit)

        this.programsEdit= {
          title: "",
          proficiency:  "",
        }


      },
      addAward: function(){
        this.awardslist.push(this.awardsEdit)

        this.awardsEdit= {
          title: "",
          receivedfrom:  "",
          date: "",
          description: "",
        }
      },
      addExtracurricular: function(){
        this.extracurricularlist.push(this.extracurricularEdit)

        this.extracurricularEdit= {
          title: "",
          proficiency:  "",
        }
      },

      includeStatement: function(exp) {
        this.statementdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeWork: function(exp) {
        this.workexpdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeEducation: function(exp) {
        this.educationdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeAccomplishment: function(exp) {
        this.accomplishmentdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeAward: function(exp) {
        this.awardsdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeProgram: function(exp) {
        this.programsdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeSkill: function(exp) {
        this.softskillsdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeExtracurricular: function(exp) {
        this.extracurriculardisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeLanguage: function(exp) {
        this.languagesdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },


      priorityOne: function (exp) {
        this.priority1.push(exp);
      },


      apply1: function (type) {
        this.zone1 = this.workexpdisplay;
        this.zone1_type = type;
      },
      apply2: function (type) {
        this.zone2 = this.workexpdisplay;
        this.zone2_type = type;
      },
      apply3: function (type) {
        this.zone3 = this.workexpdisplay;
        this.zone3_type = type;
      },
      apply4: function (type) {
        this.zone4 = this.workexpdisplay;
        this.zone4_type = type;
      },
      apply5: function (type) {
        this.zone5 = this.workexpdisplay;
        this.zone1_type = type;
      },
      apply6: function (type) {
        this.zone6 = this.workexpdisplay;
        this.zone6_type = type;
      },
      apply7: function (type) {
        this.zone7 = this.workexpdisplay;
        this.zone7_type = type;
      },

      newKellyColorPickerMain: function () {
        if (this.pickingColorMain == false) {
          new KellyColorPicker({
            place : 'color-picker-main',
            size : 150,
            input : 'colorMain',
            method: 'triangle',
            input_format: "rgba",
            alpha_slider: true,
            display: 'block',
          });
          this.pickingColorMain = true;
        } else if (this.pickingColorMain == true) {
          this.pickingColorMain = false;
        };
      },
      newKellyColorPickerAccent: function () {
        if (this.pickingColor == false) {
          new KellyColorPicker({
            place : 'color-picker-accent',
            size : 150,
            input : 'colorAccent',
            method: 'triangle',
            input_format: "rgba",
            alpha_slider: true,
            display: 'block',
          });
          this.pickingColor = true;
        } else if (this.pickingColor == true) {
          this.pickingColor = false;
        };
      },

      pdfSave: function () {
        var doc = new jsPDF();
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML($('#resume').html(), 15, 15, {
          'width': 170,
          'elementHandlers': specialElementHandlers
        });
        doc.save(this.personalinfoEdit.first_name+'_Resume.pdf');
      },


      getData: function(want) {
        fetch(`${url}/${want}`,{
          credentials: "include"
        }).then(function (response) { //then executes when browser has received response from browser
          response.json().then(function (data) {

            if(want=="statement"){
              app.statementlist = data.statementlist
            }
            if(want=="workexp"){
              app.workexplist = data.workexplist
            }
            if(want=="education"){
              app.educationlist = data.educationlist
            }
            if(want=="accomplishment"){
              app.accomplishmentlist = data.accomplishmentlist
            }
            if(want=="extracurricular"){
              app.extracurricularlist = data.extracurricularlist
            }
            if(want=="language"){
              app.languageslist = data.languagelist
            }
            if(want=="program"){
              app.programslist = data.programlist
            }
            if(want=="softskill"){
              app.softskillslist = data.softskilllist
            }
            if(want=="award"){
              app.awardslist = data.awardlist
            }

            });
          });
        },

        submitStatement: function (){ //ADDED BY TAFT
          fetch(`${url}/statement`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.statementEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.statementEdit=
           {
            statement: ""
          }
          app.getData("statement");

        });


        },

        submitNewWorkexp: function (){
          fetch(`${url}/workexp`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.workexpEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.workexpEdit={
            company: "",
            title: "",
            startdate: new Date().toISOString().substr(0, 10),
            enddate: new Date().toISOString().substr(0, 10),
            description: "",
            start_menu: false,
            end_menu: false,
            position: 0,
          }
          app.getData("workexp");

        });


        },

        submitEducation: function (){ //ADDED BY TAFT
          fetch(`${url}/education`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.educationEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.educationEdit=
           {
            college: "",
            degree: "",
            gradyear: new Date().toISOString().substr(0, 10),
            menu: false
          }
          app.getData("education");

        });


        },

        submitAccomplishment: function (){ //ADDED BY TAFT
          fetch(`${url}/accomplishment`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.accomplishmentEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.accomplishmentEdit=
           {
            title: "",
            description: "",
          }
          app.getData("accomplishment");

        });


        },

        submitlanguage: function (){ //ADDED BY TAFT
          fetch(`${url}/language`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.languagesEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.languagesEdit=
           {
              title: "",
              proficiency:  "",
            }
          app.getData("language");

        });


        },

        submitProgram: function (){ //ADDED BY TAFT
          fetch(`${url}/program`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.programsEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.programsEdit=
           {
              title: "",
              proficiency:  "",
            }
          app.getData("program");

        });


        },
        submitAward: function (){ //ADDED BY TAFT
          fetch(`${url}/award`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.awardsEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.awardsEdit=
           {
            title: "",
            receivedfrom:  "",
            date: new Date().toISOString().substr(0, 10),
            description: "",
            menu:false
          }
          app.getData("award");

        });


        },

        submitextracurricular: function (){ //ADDED BY TAFT
          fetch(`${url}/extracurricular`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.extracurricularEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.extracurricularEdit=
           {
            title: "",
            description: "",
            date: "",
          }
          app.getData("extracurricular");

        });


        },
        submitSoftskill: function (){ //ADDED BY TAFT
          fetch(`${url}/softskill`, {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.softskillsEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.softskillsEdit=
           {
            title: "",
          }
          app.getData("softskill");

        });

        },

        deleteItem:  function(thing,item){

          fetch(`${url}/${thing}/${item._id}`, {
            method: "DELETE"
          }).then(function(response){
            if (response.status == 204){
              console.log("Deleted Item")
              app.getData(thing);
            } else if(response.status == 400){
              response.json().then(function(data){
                alert(data.msg)
              })
            }

          });

        },

        // editItem:  function(thing,item){
        //   fetch(`${url}/thing/${item.id}`, {
        //     method:"PUT",
        //     headers:{
        //       "Content-type": "application/json"
        //     },
        //     body: JSON.stringify(reqBody)
        //   }).then(function (response) {
        //     if (response.status == 400){
        //       response.json().then(function (data) {
        //         alert(data.msg)
        //         });
        //     } else {
        //       app.page="blog"
        //       app.getData(thing);
        //
        //     }
        //   });
        //   },






    },

    computed: {
        computedColorClass: function () {
          return {
            "lighten-5": this.color_brightness == 1,
            "lighten-4": this.color_brightness == 2,
            "lighten-3": this.color_brightness == 3,
            "lighten-2": this.color_brightness == 4,
            "lighten-1": this.color_brightness == 5,
            "darken-1": this.color_brightness == 7,
            "darken-2": this.color_brightness == 8,
            "darken-3": this.color_brightness == 9,
            "darken-4": this.color_brightness == 10,
            "accent-1": this.accent == 11,
            "accent-2": this.accent == 12,
            "accent-3": this.accent == 13,
            "accent-4": this.accent == 14,
          }
        },
      },
})
