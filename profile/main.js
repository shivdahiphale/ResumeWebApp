$(document).ready(function () {
    URL = "http://52.172.213.240:9001/oslc";

    fetch_peopleData();
    //dummyrequest();
});

function fetch_peopleData() {
    $.ajax
        ({
            type: "GET",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa('411339:Hallmark@1'));
            },
            url: URL + "/spq/EmployeeDataSD?oslc.select=*",
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error was returned: " + textStatus + ", Error: " + errorThrown); //Handle other error type
            }
        });
}

function addSelectItems(data){
    var select = document.getElementById('selectUser');

    for (var i = 0; i<=data.length; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }
}

function upload() {
    var recordId = "";
    $.ajax
        ({
            type: "POST",
            headers: { 'Access-Control-Allow-Origin': '*' },
            url: URL + "/so/UploadEmpImg/" + recordId + "/spi:triImageIM",
            dataType: 'json',
            data : data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa('411339:Hallmark@1'));
            },
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error was returned"); //Handle other error type
            }
        });
}