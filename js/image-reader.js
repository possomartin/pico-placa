const plate_input = document.getElementById("plate-image");

var data = new FormData();

plate_input.addEventListener('change', (evt) => {
    data.append('imageFile', evt.target.files[0]);

    var settings = {
        "url": "https://api.cloudmersive.com/image/recognize/detect-vehicle-license-plates",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "multipart/form-data",
            "Apikey": "YOUR-API-KEY"
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": data
    };

    $.ajax(settings).done((response) => {
        console.log(response);
    })    

});
