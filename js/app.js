import {ResumeController} from './resuCtrl.js';
import {UIController} from './UICtrl.js';

var controller = (function(ResuCtrl,UICtrl){

    var vanish = function(DOMstrings){
        var array = Object.values(DOMstrings);
        for(var i=0; i<array.length; i++){
            document.querySelector(array[i]).style.display = 'none';
        }
    }

    var appear = function(val){
        document.querySelector(val).style.display = "block";
    }
    
    var DOMbtns = UICtrl.get_DOMbtns();
    var DOMstrings = UICtrl.get_DOMstrings();
    var DOMforms = UICtrl.get_DOMforms();
    var TemplateSections = UICtrl.get_Template_Sections();

    var setupEventListeners = function(){

        // Event listeners for section buttons
        vanish(DOMstrings);
        vanish(TemplateSections);

        document.querySelector(DOMstrings.profile_section).style.display = "block";

        document.querySelector(DOMbtns.profile_btn).addEventListener('click',function(){
            vanish(DOMstrings);
            document.querySelector(DOMstrings.profile_section).style.display = 'block';
        });

        document.querySelector(DOMbtns.edu_btn).addEventListener('click',function(){
            vanish(DOMstrings);
            document.querySelector(DOMstrings.edu_section).style.display = 'block';
        });

        document.querySelector(DOMbtns.work_btn).addEventListener('click',function(){
            vanish(DOMstrings);
            document.querySelector(DOMstrings.work_section).style.display = 'block';
        });

        document.querySelector(DOMbtns.proj_btn).addEventListener('click',function(){
            vanish(DOMstrings);
            document.querySelector(DOMstrings.proj_section).style.display = 'block';
        });
        

        // Event listeners for submit aur add button in different sections
        document.querySelector(DOMbtns.profile_submit_btn).addEventListener('click',ctrlProfile);

        document.querySelector(DOMbtns.edu_submit_btn).addEventListener('click',ctrlEducation);


        // WORK EVENT LISTENERS
        document.querySelector(DOMbtns.work_submit_btn).addEventListener('click',function(){
            var type = "work";
            for_data_main(type);
        });

        document.querySelector(DOMbtns.work_add_btn).addEventListener('click', function(){
            document.querySelector(DOMforms.work_form).reset();
        });

        document.querySelector(DOMbtns.work_edit_btn).addEventListener('click',function(){
            var type = "work";
            var id = UICtrl.prompt_user("WorkID you want to edit");
            for_edit_main(id,type);
        });

        document.querySelector(DOMbtns.work_delete_btn).addEventListener('click',function(){
            var type = "work";
            var id = UICtrl.prompt_user("workID you want to delete");
            for_delete_main(id,type);
        });

        // PROJECT EVENT LISTENERS
        document.querySelector(DOMbtns.proj_submit_btn).addEventListener('click',function(){
            var type = "project";
            for_data_main(type);
        });

        document.querySelector(DOMbtns.proj_add_btn).addEventListener('click', function(){
            document.querySelector(DOMforms.proj_form).reset();
        });

        document.querySelector(DOMbtns.proj_edit_btn).addEventListener('click',function(){
            var type = "project";
            var id = UICtrl.prompt_user("ProjectID you want to edit");
            for_edit_main(id,type);
        });

        document.querySelector(DOMbtns.proj_delete_btn).addEventListener('click',function(){
            var type = "project";
            var id = UICtrl.prompt_user("ProjectID you want to delete");
            for_delete_main(id,type);
        });

    }

    var isEducationEmpty = function(edu_data){
        var c = Object.values(edu_data.college_data);
        var x1 = Object.values(edu_data.XII_data);
        var x2 = Object.values(edu_data.X_data);
        var arr = [0,0,0];

        for(var i=0;i<c.length;i++){
            if(c[i].length > 0){
                arr[0]+=1;
            }
            if(x1[i].length>0){
                arr[1]+=1;
            }
            if(x2[i].length>0){
                arr[2]+=1;
            }
        }
        return arr;
    }

    var educationDisplay = function(id,el){
        if(el == 0){
            document.getElementById(id).style.display = 'none';
        }
        else{
            document.getElementById(id).style.display = 'block';
        }
    }

    var isProfileEmpty = function(prof_data){
        var x = Object.values(prof_data);
        for( var i=0;i<x.length;i++){
            if(x[i].length>0){
                return false;
            }
        }
        return true;
    }

    var ctrlProfile = function(){
        var inp = UICtrl.get_profile_input();
        var data = ResuCtrl.addProfileData(inp);
        UICtrl.updateProfile(data);
        if(!isProfileEmpty(data.profile_data)){
            appear(TemplateSections.profile);
        }
        else{
            document.querySelector(TemplateSections.profile).style.display = 'none';
        }
    }

    var ctrlEducation = function(){
        var inp = UICtrl.get_education_input();
        var data = ResuCtrl.addEducationData(inp);
        UICtrl.updateEducation(data);
        var arr = isEducationEmpty(data.edu_data);
        if(arr[0]==0 && arr[1]==0 && arr[2]==0){
            document.querySelector(TemplateSections.education).style.display = 'none';
        }
        else{
            appear(TemplateSections.education);
            educationDisplay('college_data',arr[0]);
            educationDisplay('XII_data',arr[1]);
            educationDisplay('X_data',arr[2]);
        }
    }


    var for_data_main = function(type){
        var res = UICtrl.get_main_input(type);
        if(res.length<2){
            // generate alert as user did not submit the ID
            UICtrl.alert_user("Please enter a unique WorkID before submitting the Work.")
        }
        else{
            // process the data
            var value = ResuCtrl.processMainData(res,type);
            console.log(value);

            // update the work data in the UI
            UICtrl.updateMain(value,type);
        }
    }

    var for_edit_main = function(id,type){
        // 1. search this id in the database
        // arr = [id,{work_data}]
        if(id !== -1){
            var arr = ResuCtrl.searchMainID(id,type);

            // 2. if id is not found then alert user about it
            if(arr.length == 0){
                UICtrl.alert_user("The following ID is not found in the database. Please try again.");
            }
            // 3. if id is found then update the form with that data values
            else{
                // UICtrl.edit_form(arr);
                UICtrl.edit_form(arr,type);
            }
        }
    }

    var for_delete_main = function(id,type){
        // 1. check if prompt is cancelled or is pressed ok
        if(id !== -1){
            var arr = ResuCtrl.searchMainID(id,type);

            // 2. if id is not found then alert the user about it
            if(arr.length == 0){
                UICtrl.alert_user("The following ID is not found. Please try again.");
            }
            // 3. if id is found then remove that work from the database as well as from UI (i.e. HTML div)
            else{
                // Remove the work from the database
                var cond = ResuCtrl.deleteMainID(id,type);

                // Remove the work from the UI
                UICtrl.deleteMain(id,cond,type);
            }
        }
    }

    return {
        init: function(){
            setupEventListeners();
        }
    }

})(ResumeController,UIController);

controller.init();
