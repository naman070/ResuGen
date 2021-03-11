export var ResumeController = (function(){

    var data = {
        profile_data : {},
        edu_data : {
            college_data : {},
            XII_data : {},
            X_data : {}
        },
        skills_data : {},
        work_data : [],
        proj_data : [],
        achievements_data : [],
        hobbies_data : {}
    };

    return {
        addSkillsData : function(skills_arr){
            data.skills_data = skills_arr[0];
        },

        addLastData : function(last_arr,type){
            if(type === "hobbies"){
                data.hobbies_data = last_arr[0];
            }
            else{
                data.achievements_data = last_arr[0];
            }
        },

        processMainData : function(my_array,type){
            var id = my_array[0];
            var my_data = my_array[1];
            var index = my_checker(id,type);
            var send = false;
            if(index !== -1){
                // need to only edit
                if(type === "work"){
                    data.work_data[index][1] = my_data;
                }
                else{
                    data.proj_data[index][1] = my_data;
                }
                send = true;
            }
            else{
                if(type === "work"){
                    data.work_data.push(my_array);
                }
                else{
                    data.proj_data.push(my_array);
                }
            }
            console.log(data);
            return [send,my_array];
        },

        searchMainID: function(id,type){
            var data_to_send = [];
            var index = my_checker(id,type);
            if(index !== -1){
                if(type === "work"){
                    data_to_send.push(data.work_data[index]);
                }
                else{
                    data_to_send.push(data.proj_data[index]);
                }
            }
            return data_to_send;
        },

        deleteMainID: function(id,type){
            var index = my_checker(id,type);
            var to_use;
            if(type === "work"){
                to_use = data.work_data;
            }
            else{
                to_use = data.proj_data;
            }
            if(index !== -1){
                to_use.splice(index,1);
            }
            if(to_use.length == 0){
                return true;
            }
            else{
                return false;
            }
        },

        testing : function(){
            console.log(data);
        }
    }

})();
