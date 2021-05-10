var header = {"Accept-Language":"hi_IN", 
    "accept":"application/json",};

function playAudio() { 
    var x = document.getElementById("myAudio");
    x.play(); 
} 

function filterDistrict(){
    $.ajax({url: "https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+$('#state').val(),
    type: "GET", 
    dataType: "json", 
    headers: header,
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
    headers: header,
    success: function(result){
        var state = $('#state');
        var html = $.map(result.states, function(st){
        return '<option value="' + st.state_id + '">' + st.state_name + '</option>'
        }).join('');
        state.html(html)
    }});
}
$("button").click(function(){
    // playAudio();
    var flag = false;
    var itr = 0;
    while(flag == false){
        if(itr < 1000){
            sleep(2000);
            console.log(itr);
            itr++;
        }
        else{
            flag = true;
        }
        $.ajax({url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+$('#district').val()+"&date=11-05-2021", 
        headers: header,
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
                        flag = true;
                    }
                }
                
            }
        if(flag == true){
            playAudio();
        }
        else{
            $("#div1").append("Still Waiting...");
        }
        }});
    }
});

