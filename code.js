
//var url = "http://localhost:3000";//ADDED BY TAFT
var url = "https://createresume.herokuapp.com";//ADDED BY TAFT

var app= new Vue ({
  el: "#app1",

  data: {
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
          work_company: "",
          work_title: "",
          work_startdate: new Date().toISOString().substr(0, 10),
          work_enddate: new Date().toISOString().substr(0, 10),
          work_description: "",
          start_menu: false,
          end_menu: false,

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
      selected_color_main: "",
    selected_color_accent: "",
    picked_color: "black",
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

  },
  created: function () {
    this.getData("statement")
    this.getData("workexp")
    this.getData("education")
    this.getData("accomplishment")
    this.getData("extracurricular")
    this.getData("language")
    this.getData("program")
    this.getData("softskill")
    this.getData("award")

    new KellyColorPicker({ //changed
      place : 'color-picker-main',
      size : 150,
      input : 'colorMain',
      method: 'triangle',
      input_format: "rgba",
      alpha_slider: true,
    });
    new KellyColorPicker({ //changed
      place : 'color-picker-accent',
      size : 150,
      input : 'colorAccent',
      method: 'triangle',
      input_format: "rgba",
      alpha_slider: true,
    });
    addEventListener("click", function () { //changed
      this.selected_color_main = document.getElementById("colorMain").style.backgroundColor;
      console.log("Main Color: ", this.selected_color_main);
      this.selected_color_accent = document.getElementById("colorAccent").style.backgroundColor;
      console.log("Accent Color: ", this.selected_color_accent);
    });
  },


  methods: {
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

    newKellyColorPickerMain: function () { //changed
      if (this.pickingColor == false) {
        new KellyColorPicker({
          place : 'color-picker-main',
          size : 150,
          input : 'colorMain',
          method: 'triangle',
          input_format: "rgba",
          alpha_slider: true,
          display: 'block',
        });
        this.pickingColor = true;
      } else if (this.pickingColor == true) {
        this.pickingColor = false;
        x = document.getElementById("main");
        x.style.setAttribute("style", "display: hidden;");

      };
    },
    newKellyColorPickerAccent: function () { //changed
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

    getData: function(want) { //ADDED BY TAFT
      fetch(`${url}/${want}`).then(function (response) { //then executes when browser has received response from browser
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
