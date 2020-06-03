export var UIController = (function(){
    var DOMbtns = {
        make_pdf : '#MakePDF',
        profile_btn : '#Profile',
        edu_btn : '#Education',
        skills_btn: '#Skills',
        work_btn : '#Work',
        proj_btn: '#Projects',
        achievements_btn: '#Achievements',
        hobbies_btn: '#Hobbies',
        profile_submit_btn: '#profile_submit__btn',
        edu_submit_btn:"#education_submit__btn",
        skills_submit_btn: "#skills_submit__btn",
        work_submit_btn: '#work_submit__btn',
        work_add_btn: '#work_add__btn',
        work_edit_btn: '#work_edit__btn',
        work_delete_btn: '#work_delete__btn',
        proj_submit_btn: '#proj_submit__btn',
        proj_add_btn: '#proj_add__btn',
        proj_edit_btn: '#proj_edit__btn',
        proj_delete_btn: '#proj_delete__btn'
    };

    var DOMstrings = {
        profile_section: '#ProfileSection',
        edu_section: '#EducationSection',
        skills_section: '#SkillsSection',
        work_section: '#WorkSection',
        proj_section: '#ProjectSection'
    };

    var DOMforms = {
        profile_form: '#ProfileForm',
        edu_college_form: '#CollegeForm',
        edu_XII_form: '#XIIForm',
        edu_X_form: '#XForm',
        skills_form: '#SkillsForm',
        work_form: '#WorkForm',
        proj_form: '#ProjectForm'
    };

    var TemplateSections = {
        profile : "#profile_section",
        education : "#education_section",
        skills: "#skills_section",
        work : "#work_section",
        project: '#project_section'
    };

    var helper = function(elements){
        var obj = {};
        for(var i=0;i<elements.length;i++){
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
        return obj;
    };

    var updateHelper = function(obj_data){
        var key_names = Object.keys(obj_data);
        for(var i=0;i<key_names.length;i++){
            var resu_id = 'student_' + key_names[i];
            var add = "";
            var val = obj_data[key_names[i]];
            if(key_names[i] === "college_cgpa" && val.length > 0){
                add += "CGPA: ";
            }
            else if(key_names[i] === "XII_percentage" && val.length >0){
                add += "Percentage: ";
            }
            else if(key_names[i] === "X_cgpa" && val.length>0){
                add += "CGPA: ";
            }
            document.getElementById(resu_id).innerHTML = add + val;
        }
    };

    return {
        get_profile_input : function(){
            var elements = document.querySelector(DOMforms.profile_form).elements;
            return  helper(elements);
        },

        get_education_input : function(){
            var education_arr = [];
            var college_el = document.querySelector(DOMforms.edu_college_form).elements;
            var XII_el = document.querySelector(DOMforms.edu_XII_form).elements;
            var X_el = document.querySelector(DOMforms.edu_X_form).elements;
    
            education_arr.push(helper(college_el));
            education_arr.push(helper(XII_el));
            education_arr.push(helper(X_el));

            return education_arr;
        },

        get_skills_input : function(){
            var skills_arr = [];
            var skills_el = document.querySelector(DOMforms.skills_form).elements;
            skills_arr.push(helper(skills_el));
            return skills_arr;
        },

        get_main_input : function(value){
            var elements,match;
            if(value == "project"){
                elements = document.querySelector(DOMforms.proj_form).elements;
                match = "projectID";
            }
            else{
                elements = document.querySelector(DOMforms.work_form).elements;
                match = "workID";
            }
            var obj = {};
            var arr = [];
            var count = 0;
            var id = "";
            for(var i=0;i<elements.length;i++){
                var item = elements.item(i);
                if(item.name === match && count == 0){
                    id = item.value;
                    arr.push(item.value);
                    count+=1;
                }
                else{
                    if(id.length>0){
                        // var my_key = item.name + "-" + id;
                        // obj[my_key] = item.value;
                        obj[item.name] = item.value;
                    }    
                }
            }
            if(id.length == 0){
                return arr;
            }
            else{
                arr.push(obj);
                return arr;
            }
        },

        get_DOMstrings: function(){
            return DOMstrings;
        },

        get_DOMbtns: function(){
            return DOMbtns;
        },

        get_DOMforms: function(){
            return DOMforms;
        },

        get_Template_Sections : function(){
            return TemplateSections;
        },
        
        updateProfile: function(data){
            var obj_data = data.profile_data;
            var key_names = Object.keys(obj_data);
            for(var i=0;i<key_names.length;i++){
                var add = "";
                var value = obj_data[key_names[i]];
                var resu_id = 'student_' + key_names[i];

                if(key_names[i]=== "rollno" && value.length >0){
                    add += "Rollno: ";
                }
                else if(key_names[i] === "dob" && value.length >0){
                    add += "Date of Birth: ";
                }
                document.getElementById(resu_id).innerHTML = add + value;
            }
        },

        updateEducation: function(data){
            console.log(data.edu_data.college_data);
            updateHelper(data.edu_data.college_data);
            updateHelper(data.edu_data.XII_data);
            updateHelper(data.edu_data.X_data);

        },

        updateSkills: function(data){
            var obj_data = data[0];
            var key_names = Object.keys(obj_data);
            console.log(obj_data);
            var subheadings = ["student_expertise_sub","student_prog_languages_sub","student_tech_and_tools_sub","student_tech_electives_sub"];
            var count = 0;

            for(var i=0;i<key_names.length;i++){
                var value = obj_data[key_names[i]];
                var resu_id = 'student_' + key_names[i];
                console.log(value);
                if(value.length > 0){
                    document.querySelector(TemplateSections.skills).style.display = 'block';
                    document.getElementById(resu_id).style.display = 'block';
                    document.getElementById(subheadings[i]).style.display = 'block';
                }
                else{
                    count += 1;
                    document.getElementById(resu_id).style.display = 'none';
                    document.getElementById(subheadings[i]).style.display = 'none';
                    if(count == 4){
                        document.querySelector(TemplateSections.skills).style.display = 'none';
                    }
                }
                document.getElementById(resu_id).innerHTML = value;
            }

        },

        updateMain: function(data,type){
            // data = [bool, [{id,work_data}]]
            var main_id = data[1][0];
            var main_data = data[1][1];
            var to_replace,html,element,selector;

            if(type === "work"){
                var html = '<li id="work-%id%" class="mb-3"><div class="pl-4"><div class="row"><div class="col-sm-12"><div id="info" style="display:inline-block"><p id="student_workName-' + main_id + '" class="subtitle" style="font-weight: bold;">%workName%</p><p class="p_tag subtitle">Guide: </p><p id="student_workGuide-' + main_id + '" class="normal_text p_tag">%workGuide%</p></div><div style="float: right; display:inline-block; margin-right:20px;" class="pr-3 text-right normal_text"><p id="student_workDuration-' + main_id + '">%workDuration%</p></div></div></div><br><p id="student_workDescription-' + main_id + '" class="normal_text">%workDescription%</p></div><br></li>';
                to_replace = ['%workName%','%workGuide%','%workDuration%','%workDescription%'];
                element = "#work_list";
                selector = TemplateSections.work;
            }
            else{
                var html = '<li id="project-%id%" class="mb-3"><div class="pl-4"><div class="row"><div class="col-sm-12"><div id="info" style="display:inline-block"><p id="student_projectName-' + main_id + '" class="subtitle" style="font-weight: bold;">%projectName%</p><p class="p_tag subtitle">Guide: </p><p id="student_projectGuide-' + main_id + '" class="normal_text p_tag">%projectGuide%</p></div><div style="float: right; display:inline-block; margin-right:20px;" class="pr-3 text-right normal_text"><p id="student_projectDuration-' + main_id + '">%projectDuration%</p></div></div></div><br><p id="student_projectDescription-' + main_id + '" class="normal_text">%projectDescription%</p></div><br></li>';
                to_replace = ['%projectName%','%projectGuide%','%projectDuration%','%projectDescription%'];
                element = "#project_list";
                selector = TemplateSections.project;
            } 

            if(data[0]==false){
                // data is not currently present, we need to push it
                var newHtml;
                var main_keys = Object.keys(main_data);
                // create HTML string with placeholder text
                newHtml = html.replace('%id%',main_id);

                for(var i=0;i<to_replace.length;i++){
                    newHtml = newHtml.replace(to_replace[i],main_data[main_keys[i]]);
                }

                console.log(newHtml);
                document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

            }
            else{
                // data is already in the database, we just need to update it
                var main_data_obj = Object.keys(main_data);
                var size = main_data_obj.length;

                for(var i=0; i<size;i++){
                    var id_element = "student_" + main_data_obj[i] + "-" + main_id;
                    // var id_element = "student_" + main_data_obj[i];
                    console.log(id_element);
                    console.log(main_data[main_data_obj[i]]);
                    document.getElementById(id_element).innerHTML = main_data[main_data_obj[i]];
                }
            }

            document.querySelector(selector).style.display = 'block';
            
        },

        prompt_user: function(name){
            var res_id;
            var msg = "Please enter the " + name;
            var placer = msg+ "ID";
            var id = prompt(msg,placer);
            if(id == null || id==""){
                res_id = -1;
            }
            else{
                res_id = id;
            }
            return res_id;
        },

        edit_form : function(data,type){
            var main_id = data[0][0];
            var main_data = data[0][1];
            var form_names, my_form;
            if(type === "work"){
                my_form = 'WorkForm';
                form_names= ['workID','workName','workGuide','workDuration','workDescription'];
            }
            else{
                my_form = 'ProjectForm';
                form_names= ['projectID','projectName','projectGuide','projectDuration','projectDescription'];
            }

            var data_names = Object.keys(main_data);

            for(var i=0;i<form_names.length;i++){
                if(i==0){
                    console.log(main_id);
                    document.forms[my_form][form_names[i]].value = main_id; 
                }
                else{
                    document.forms[my_form][form_names[i]].value = main_data[data_names[i-1]]; 
                }
            }
        },
        deleteMain : function(id,cond,type){
            var li_to_remove,selector;
            if(type === "work"){
                li_to_remove = "work-" + id;
                selector = TemplateSections.work;
            }
            else{
                li_to_remove = "project-" + id;
                selector = TemplateSections.project;
            }
            var obj_to_remove = document.getElementById(li_to_remove);
            obj_to_remove.remove();
            if(cond == true){
                document.querySelector(selector).style.display = 'none';
            }
            else{
                document.querySelector(selector).style.display = 'block';
            }
        },

        alert_user: function(msg){
            alert(msg);
        }

    }


})();
