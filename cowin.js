function playAudio() { 
    var x = document.getElementById("myAudio");
    x.play(); 
} 

function filterDistrict(){
    $.ajax({url: "https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+$('#state').val(),
    type: "GET", 
    dataType: "json", 
    success: function(result){
        var district = $('#district');
        var html = $.map(result.districts, function(dist){
        return '<option value="' + dist.district_id + '">' + dist.district_name + '</option>'
        }).join('');
        district.html(html)
    }}); 
}

function loadStates(){
    $.ajax({url: "https://cdn-api.co-vin.in/api/v2/admin/location/states", 
    type: "GET", 
    dataType: "json", 
    success: function(result){
        var state = $('#state');
        var html = $.map(result.states, function(st){
        return '<option value="' + st.state_id + '">' + st.state_name + '</option>'
        }).join('');
        state.html(html)
    }});
}

async function getResult(){
    console.log("Button Clicked");
    var flag = false;
    var itr = 0;
    while(flag == false){
        flag = await callAPI();
        if(itr < 500){
            itr++;
            await sleep(30000);
        }
        else{
            flag = true;
        }
    }
};

async function callAPI(){
    console.log("API Call:");
    var countFlag = false;
    await $.ajax({url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+$('#district').val()+"&date=11-05-2021", 
    success: function(result){
        console.log(result.centers.length);
        for(var i =0; i< result.centers.length; i++)
        {
            for(var j=0; j< result.centers[i].sessions.length; j++){
                if(result.centers[i].sessions[j].available_capacity > 0 && result.centers[i].sessions[j].min_age_limit == $('#age').val()){
                    $("#div1").append("<p> <b>Date: </b>"+result.centers[i].date
                    +" <b>Hospital: </b>"+result.centers[i].name
                    +" <b>Quantity: </b> "+ result.centers[i].sessions[j].available_capacity
                    +" <b>Vaccine: </b> "+ result.centers[i].sessions[j].vaccine
                    +" <b>Age Limit: </b> "+ result.centers[i].sessions[j].min_age_limit
                    +"</p>");
                    countFlag = true;
                }
            }
        }
        if(countFlag == true){
            playAudio();
        }
        else{
            $("#div1").append("<p>Still Waiting...</p>");
        }
    }});
    return countFlag;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
