//var url = "http://localhost:3000";
var url = "https://createresume.herokuapp.com";

var app= new Vue ({
    el: "#app1",

    data: {
      islogin: false,
      loadinglists: false,
      username: "",
      password: "",
      userID: "",
      menu:false,
      modal: false,
      page: "home",
      color: "",
      panel: 0,
      panel1: 0,
      panel2: 0,
      panel3: 0,
      panel4: 0,
      panel5: 0,
      panel6: 0,
      panel7: 0,
      panel8: 0,
      panel9: 0,

        educationlist:[],
        workexplist:[
        ],
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
            professional_title: "",
            linkedin: "",
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
            user_id: ""
        },
        statementEdit: {
          statement: "",
          user_id: ""
        },
        workexpEdit: {
            company: "",
            title: "",
            startdate: new Date().toISOString().substr(0, 10),
            enddate: new Date().toISOString().substr(0, 10),
            description: "",
            start_menu: false,
            end_menu: false,
            user_id: ""
        },
        educationEdit: {
          college: "",
          degree: "",
          gradyear: new Date().toISOString().substr(0, 10),
          menu: false,
          user_id: ""
        },
        accomplishmentEdit: {
          title: "",
          description: "",
          user_id: ""
        },
        extracurricularEdit: {
          title: "",
          description: "",
          date: "",
          menu: false,
          user_id: ""
        },
        languagesEdit: {
          title: "",
          proficiency:  "",
          user_id: ""
        },
        programsEdit: {
          title: "",
          proficiency:  "",
          user_id: ""
        },
        softskillsEdit: {
          title: "",
          user_id: ""
        },
        awardsEdit: {
          title: "",
          receivedfrom:  "",
          date: new Date().toISOString().substr(0, 10),
          description: "",
          menu:false,
          user_id: ""
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
        selected_color_accent: "rgb(84, 174, 219)",
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
          model: "basezones",
          name: "Template 3"
        },
        {
          model: "template4",
          name: "Template 4"
        },
        {
          model: "template5",
          name: "Template 5"
        },
        {
          model: "template6",
          name: "Template 6"
        },
        {
          model: "template7",
          name: "Template 7"
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


      positionEdit: {
        statementposition: 0,
        workexpposition: 0,
        educationposition: 0,
        accomplishmentposition: 0,
        extracurricularposition: 0,
        languagesposition: 0,
        programsposition: 0,
        softskillsposition: 0,
        awardsposition: 0,
        user_id: "",
      },

      statementpositions: [0,1,2,3,4,5,6,7,8],
      workexppositions: [0,1,2,3,4,5,6,7,8],
      educationpositions: [0,1,2,3,4,5,6,7,8],
      accomplishmentpositions: [0,1,2,3,4,5,6,7,8],
      extracurricularpositions: [0,1,2,3,4,5,6,7,8],
      languagespositions: [0,1,2,3,4,5,6,7,8],
      programspositions: [0,1,2,3,4,5,6,7,8],
      softskillspositions: [0,1,2,3,4,5,6,7,8],
      awardspositions: [0,1,2,3,4,5,6,7,8],

      zone1: [],
      zone2: [],
      zone3: [],
      zone4: [],
      zone5: [],
      zone6: [],
      zone7: [],
      zone8: [],

      zone1_type: "",
      zone2_type: "",
      zone3_type: "",
      zone4_type: "",
      zone5_type: "",
      zone6_type: "",
      zone7_type: "",
      zone8_type: "",

      workexpcheck: false,
      educationcheck: false,
      accomplishmentscheck: false,
      extracurricularscheck: false,
      languagescheck: false,
      programscheck: false,
      softskillscheck: false,
      statementcheck: false,
      awardscheck: false,

      loginError: false,
      loginErrorMsg: "",
      loginSuccess: false,
      registerSuccess: false,

      addError: false,
      addErrorMsg: "",
      deleteError: false,
      deleteErrorMsg: "",


      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      fieldRules: [
        v => !!v || 'This field is required',
      ],
      fonts: [
        'Merriweather', 'Montserrat', 'Libre Baskerville', 'Karla', 'Arvo', 'Source Serif Pro', 'EB Garamond', 'Cairo',
        ],
        fontLabel: "Choose Font...",
    },

    created: function () {

    },


    methods: {
      toPrint: function(divID) { //changed
        var divElements = document.getElementById(divID).innerHTML;
        var headDoc = document.head.innerHTML;
        var oldPage = document.body.innerHTML;
        console.log(headDoc)

        document.body.innerHTML =
          "<html>" + headDoc + `<body>` +
          divElements + "</body>";



        window.print();

        document.location.reload(true);
      },
      changeFont: function (font) { //changed
        font = String(font);
        var pageID = document.getElementById(page);
        console.log(pageID);
        document.getElementById(font).style.fontFamily = font + ",sans-serif";
        document.getElementById(page).style.fontFamily = font + ",sans-serif";
      },


  register: function() {
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
          app.loginError = true;
          console.log("Error", data.msg);
          app.loginErrorMsg = "Username and Password are required";
        })
      } else if (response.status == 201) {
        console.log("registered")
        app.loginError = false;
        app.registerSuccess = true;
        fetch(`${url}/users/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            username: app.username,
            password: app.password
          })

        }).then(function(response) {

          if (response.status == 403) {
            response.json().then(function(data) {
              app.loginError = true;
              app.loginErrorMsg = data.msg;
            })
          }else if(response.status == 200){
              app.loginError = false; // changed
              app.loginSuccess = true;
            response.json().then( function(data){
              app.userID = data.user_id
              app.page = "form";
              app.islogin = true;
              app.newPosition();
              app.newPersonalInfo();
              app.loadlists();

            })

          }
        });



        app.page = "form";

      }
    });
  },

  login: function() {
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
          app.loginError = true;
          app.loginErrorMsg = data.msg;
        })
      }else if(response.status == 200){
          app.loginError = false; // changed
          app.loginSuccess = true;
        response.json().then( function(data){
          app.userID = data.user_id
          app.page = "form";
          app.islogin = true;
          app.loadlists();

        })

      }
    });
  },

  logout: function() {
    fetch(`${url}/users/logout`, {
      method: "GET",
      credentials: "include",
    }).then(function(response) {
      app.islogin = false;
      app.clearlists();
      app.loadlists();
      app.getPosition();
      app.setZone();
    });

  },


      // phoneNum: function () {
      //   var x = this.personalinfoEdit.phone.replace(/\D/g, '').match(`(\d{0,3})(\d{0,3})(\d{0,4})`);
      //   return (
      //     x = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
      //   );
      // },

      clearlists: function() {
        app.educationlist = []
        app.workexplist=[]
        app.accomplishmentlist= []
        app.extracurricularlist=[]
        app.languageslist=[]
        app.programslist=[]
        app.softskillslist=[]
        app.awardslist=[]
        app.statementlist=[]
        app.statementdisplay= []
        app.workexpdisplay= []
        app.educationdisplay= []
        app.accomplishmentdisplay= []
        app.extracurriculardisplay= []
        app.languagesdisplay= []
        app.programsdisplay= []
        app.softskillsdisplay= []
        app.awardsdisplay= []
        app.personalinfoEdit={}
        app.positionEdit={}
      },



      newKellyColorPickerMain: function () {
        addEventListener("click", function () {
            app.selected_color_main = document.getElementById("colorMain").style.backgroundColor;
        }, {passive: true});
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
        addEventListener("click", function () {
            app.selected_color_accent = document.getElementById("colorAccent").style.backgroundColor;
        }, {passive: true});
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



      addToDisplay: function (item,want) {

        item.displayShow = !item.displayShow;

        fetch(`${url}/${want}/${item._id}`, {
          method:"PUT",
          credentials: "include",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(item)
        }).then(function (response) {
          if (response.status == 400){
            response.json().then(function (data) {
              app.addError = true; // changed
              app.addErrorMsg = data.msg; // changed
            });
          } else {
            app.addError = false; // changed
            app.includeDisplay();
          }
        });
      },

      loadlists: async function() {
        app.loadinglists = true;
        await app.checklogin()
        if(app.islogin){
          console.log("starting loadlist");
          await app.getData("statement");
          await app.getData("workexp");
          await app.getData("education");
          await app.getData("accomplishment");
          await app.getData("extracurricular");
          await app.getData("language");
          await app.getData("program");
          await app.getData("softskill");
          await app.getData("award");
          // app.setPosition();
          app.getPersonalInfo();
          app.includeDisplay();
        }
        app.loadinglists = false;
        console.log("reloading");
        },

        newPersonalInfo: async function (){
          console.log("created new personal info object")

          await app.checklogin()
          var newuserinfo = {
          first_name: "First",
          last_name: "Last",
          address: "123 Address",
          city: "City",
          state: "State",
          phone: "555-555-5555",
          zip: 55555,
          country: "Country",
          email: "Email@email.com",
          user_id: app.userID
          }

          fetch(`${url}/personalinfo`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(newuserinfo)
        }).then(function (response) {
          response.json().then((response)=>{
            console.log(response.personalinfo.first_name)
            app.personalinfoEdit.first_name = response.personalinfo.first_name
            app.personalinfoEdit.last_name = response.personalinfo.last_name
            app.personalinfoEdit.professional_title = response.personalinfo.professional_title
            app.personalinfoEdit.linkedin = response.personalinfo.linkedin
            app.personalinfoEdit.address = response.personalinfo.address
            app.personalinfoEdit.city = response.personalinfo.city
            app.personalinfoEdit.state = response.personalinfo.state
            app.personalinfoEdit.phone = response.personalinfo.phone
            app.personalinfoEdit.zip = response.personalinfo.zip
            app.personalinfoEdit.country = response.personalinfo.country
            app.personalinfoEdit.email = response.personalinfo.email
            app.personalinfoEdit.user_id = response.personalinfo.user_id

          })

        });
        },

        getPersonalInfo: function(){
       fetch(`${url}/personalinfo`,{
         credentials: "include"
       }).then(function(response){
         response.json().then(function(data){
           app.personalinfoEdit = data
         })
       })
     },

     PersonalInfoUpdate: function(){

       fetch(`${url}/personalinfo`, {
         method:"PUT",
         headers:{
         "Content-type": "application/json"
         },
         credentials: "include",
         body: JSON.stringify(app.personalinfoEdit)


     }).then(function (response) {
       app.personalinfoEdit={
         first_name :app.personalinfoEdit.first_name,
         last_name:app.personalinfoEdit.last_name,
         linkedin: app.personalinfoEdit.linkedin,
         professional_title: app.personalinfoEdit.professional_title,
         address:app.personalinfoEdit.address,
         city:app.personalinfoEdit.city,
         state:app.personalinfoEdit.state,
         zip:app.personalinfoEdit.zip ,
         country:app.personalinfoEdit.country,
         email:app.personalinfoEdit.email,
         phone:app.personalinfoEdit.phone,
         branding_statement:app.personalinfoEdit.branding_statement,

       }

     app.getData("personalinfo");
   })
     },



      includeDisplay: function () {
        var newdisplay=[]
        app.statementdisplay= [];
        app.workexpdisplay= [];
        app.educationdisplay= [];
        app.accomplishmentdisplay= [];
        app.extracurriculardisplay= [];
        app.languagesdisplay= [];
        app.programsdisplay= [];
        app.softskillsdisplay= [];
        app.awardsdisplay= [];

        app.educationlist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.educationdisplay=newdisplay;
        newdisplay=[];

        app.workexplist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.workexpdisplay=newdisplay
        newdisplay=[];

        app.accomplishmentlist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.accomplishmentdisplay=newdisplay
        newdisplay=[];

        app.extracurricularlist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.extracurriculardisplay=newdisplay
        newdisplay=[];

        app.languageslist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.languagesdisplay=newdisplay
        newdisplay=[];

        app.programslist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.programsdisplay=newdisplay
        newdisplay=[];

        app.softskillslist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.softskillsdisplay=newdisplay
        newdisplay=[];

        app.awardslist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.awardsdisplay=newdisplay
        newdisplay=[];

        app.statementlist.forEach(function(item){
          if(item.displayShow == true){
            newdisplay.push(item);
          }
        });
        app.statementdisplay=newdisplay
        newdisplay=[];
      },

      getPosition: function () {

        if(app.islogin){
          fetch(`${url}/position`,{
            credentials: "include"
          }).then(function (response) { //then executes when browser has received response from browser
            response.json().then(function (data) {
              app.positionEdit.statementposition = data.statementposition;
              app.positionEdit.workexpposition = data.workexpposition;
              app.positionEdit.educationposition = data.educationposition;
              app.positionEdit.accomplishmentposition = data.accomplishmentposition;
              app.positionEdit.extracurricularposition = data.extracurricularposition;
              app.positionEdit.languagesposition = data.languagesposition;
              app.positionEdit.programsposition = data.programsposition;
              app.positionEdit.softskillsposition = data.softskillsposition;
              app.positionEdit.awardsposition = data.awardsposition;

              app.setZone();

            });
          });

        }

      },

      newPosition: async function (){
        console.log("created new position object")
        await app.checklogin()
        app.positionEdit.user_id = app.userID
        fetch(`${url}/position`, {
          credentials: "include",
          method:"POST",
          headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(app.positionEdit)
      }).then(function (response) {
        //response.json().then((data)=>{console.log(data.msg)})
        app.statementposition = response.statementposition;
        app.workexpposition = response.workexpposition;
        app.educationposition = response.educationposition;
        app.accomplishmentposition = response.accomplishmentposition;
        app.extracurricularposition = response.extracurricularposition;
        app.languagesposition = response.languagesposition;
        app.programsposition = response.programsposition;
        app.softskillsposition = response.softskillsposition;
        app.awardsposition = response.awardsposition;
      });
      },

      setPosition: function (position, type) {

        if(app.positionEdit.statementposition == position && type !=="statement"){
          app.positionEdit.statementposition = 0
        }
        if(app.positionEdit.workexpposition == position && type !=="workexp"){
          app.positionEdit.workexpposition = 0
        }
        if(app.positionEdit.educationposition == position && type !=="education"){
          app.positionEdit.educationposition = 0
        }
        if(app.positionEdit.extracurricularposition == position && type !=="extracurricular"){
          app.positionEdit.extracurricularposition = 0
        }
        if(app.positionEdit.languagesposition == position && type !=="languages"){
          app.positionEdit.languagesposition = 0
        }
        if(app.positionEdit.programsposition == position && type !=="programs"){
          app.positionEdit.programsposition = 0
        }
        if(app.positionEdit.softskillsposition == position && type !=="softskills"){
          app.positionEdit.softskillsposition = 0
        }
        if(app.positionEdit.awardsposition == position && type !=="awards"){
          app.positionEdit.awardsposition = 0
        }
        if(app.positionEdit.accomplishmentposition == position && type !=="accomplishment"){
          app.positionEdit.accomplishmentposition = 0
        }


        fetch(`${url}/position`, {
          method:"PUT",
          credentials: "include",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.positionEdit)
        }).then(function (response) {
          if (response.status == 400){
            response.json().then(function (data) {
              alert(data.msg)
            });
          }
          app.getPosition();
          app.setZone();
        });
      },

      setZone:function (){
        app.zone1 = []
        app.zone2 = []
        app.zone3= []
        app.zone4 = []
        app.zone5 = []
        app.zone6 = []
        app.zone7 = []
        app.zone8 = []
      
        app.sortToZone(app.positionEdit.statementposition,app.statementdisplay, "statement");
        app.sortToZone(app.positionEdit.workexpposition,app.workexpdisplay, "workexp");
        app.sortToZone(app.positionEdit.educationposition,app.educationdisplay, "education");
        app.sortToZone(app.positionEdit.extracurricularposition,app.extracurriculardisplay, "extracurricular");
        app.sortToZone(app.positionEdit.languagesposition,app.languagesdisplay, "language");
        app.sortToZone(app.positionEdit.programsposition,app.programsdisplay, "programs");
        app.sortToZone(app.positionEdit.softskillsposition,app.softskillsdisplay, "skills");
        app.sortToZone(app.positionEdit.awardsposition,app.awardsdisplay, "award");
        app.sortToZone(app.positionEdit.accomplishmentposition,app.accomplishmentdisplay, "accomplishment");
        console.log("sorted zones");
      },

      sortToZone: function (position,displayList,type) {



        if(position == 1){
          app.zone1=displayList;
          app.zone1_type=type;
        }
        if(position == 2){
          app.zone2=displayList;
          app.zone2_type=type;
        }
        if(position == 3){
          app.zone3=displayList
          app.zone3_type=type;
        }
        if(position == 4){
          app.zone4=displayList
          app.zone4_type=type;
        }
        if(position == 5){
          app.zone5=displayList
          app.zone5_type=type;
        }
        if(position == 6){
          app.zone6=displayList;
          app.zone6_type=type;
        }
        if(position == 7){
          app.zone7=displayList;
          app.zone7_type=type;
        }
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

      checklogin: function(){
        return new Promise(resolve => {
        fetch(`${url}/users/checklogin`, {
  				method: "GET",
  				credentials: "include",
  			}).then(function(response) {
  				if (response.status == 403) {
  					response.json().then(function(data) {
              app.userID = ""
              app.islogin = false;
              resolve(true);
  					})
  				}else if(response.status == 200){
            response.json().then( function(data){
              app.userID = data.user_id
              app.islogin = true
              resolve(true);
            })
          }
  			});
        });

      },


      getData: function(want) {
        return new Promise(resolve => {

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

            resolve(true);

            });
          });
          });
        },

        removeFromList: function (itemlist,objid){
          var filtered = itemlist.filter(function(item){
            return item._id != objid
        });
          return filtered

      },

      removeFromDisplay: function (whatlist,objid){
        if(whatlist="workexp"){
          app.workexpdisplay= app.removeFromList(app.workexpdisplay,objid)
        }
        if(whatlist="statement"){
          app.statementdisplay= app.removeFromList(app.statementdisplay,objid)
        }
        if(whatlist="education"){
          app.educationdisplay= app.removeFromList(app.educationdisplay,objid)
        }
        if(whatlist="accomplishment"){
          app.accomplishmentdisplay= app.removeFromList(app.accomplishmentdisplay,objid)
        }
        if(whatlist="extracurricular"){
          app.extracurriculardisplay= app.removeFromList(app.extracurriculardisplay,objid)
        }
        if(whatlist="language"){
          app.languagesdisplay= app.removeFromList(app.languagesdisplay,objid)
        }
        if(whatlist="program"){
          app.programsdisplay= app.removeFromList(app.programsdisplay,objid)
        }
        if(whatlist="softskill"){
          app.softskillsdisplay= app.removeFromList(app.softskillsdisplay,objid)
        }
        if(whatlist="award"){
          app.awardsdisplay= app.removeFromList(app.awardsdisplay,objid)
        }

      },

        submitStatement: async function (){
          await app.checklogin()
          if(app.islogin){
            app.statementEdit.user_id = app.userID
            fetch(`${url}/statement`, {
              credentials: "include",
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

          } else {
            alert("login test")
          }
        },

        submitNewWorkexp: async function (){
          await app.checklogin()
          if(app.islogin){
            app.workexpEdit.user_id = app.userID
            fetch(`${url}/workexp`, {
              credentials: "include",
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

          }


        },

        submitEducation: async function (){
          await app.checklogin()
          if(app.islogin){
            app.educationEdit.user_id = app.userID
            fetch(`${url}/education`, {
              credentials: "include",
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

          }


        },

        submitAccomplishment: async function (){
          await app.checklogin()
          if(app.islogin){
            app.accomplishmentEdit.user_id = app.userID
            fetch(`${url}/accomplishment`, {
              credentials: "include",
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

          }


        },

        submitLanguage: async function (){
          await app.checklogin()
          if(app.islogin){
            app.languagesEdit.user_id = app.userID
            fetch(`${url}/language`, {
              credentials: "include",
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

          }


        },

        submitProgram: async function (){
          await app.checklogin()
          if(app.islogin){
            app.programsEdit.user_id = app.userID
            fetch(`${url}/program`, {
              credentials: "include",
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

          }


        },
        submitAward: async function (){
          await app.checklogin()
          if(app.islogin){
            app.awardsEdit.user_id = app.userID
            fetch(`${url}/award`, {
              credentials: "include",
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

          }


        },

        submitExtracurricular: async function (){
          await app.checklogin()
          if(app.islogin){
            app.extracurricularEdit.user_id = app.userID
            fetch(`${url}/extracurricular`, {
              credentials: "include",
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
                menu:false
              }
              app.getData("extracurricular");

            });

          }


        },
        submitSoftskill: async function (){
          await app.checklogin()
          if(app.islogin){
            app.softskillsEdit.user_id = app.userID
            fetch(`${url}/softskill`, {
              credentials: "include",
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

          }

        },


        deleteItem:  function(thing,item){
          console.log("Trying to deletes");
          app.removeFromDisplay(thing, item._id);
          fetch(`${url}/${thing}/${item._id}`,
          {
            credentials: "include",
            method: "DELETE"
          }).then(function(response){
            if (response.status == 204){
              console.log("Deleted Item");
              app.getData(thing);
            } else if(response.status == 400){
              response.json().then(function(data){
                app.deleteError = true;
                app.deleteErrorMsg = data.msg;
              })
            }


          });

        },




    },
    computed: {

      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndDown) binding.column = true

        return binding
    },
    lgbinding () {
        const binding = {}

        if (this.$vuetify.breakpoint.lgAndDown) binding.column = true

        return binding
    },
},


})
