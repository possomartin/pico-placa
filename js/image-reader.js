const plate_input = document.getElementById("plate-image");
const plate_text = document.getElementById('plate');

var body = new FormData();

plate_input.addEventListener('change', async (evt) => {
    body.append('upload', evt.target.files[0]);
    body.append("regions", "ec");
    var settings = {
        "url": "https://api.platerecognizer.com/v1/plate-reader/",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Token 3ae81c138569830b922503bc1842de7314ad5474"
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": body,
    };

    const getResources = async () => {
        var res;
        await $.ajax(settings).done( async (response) => {
            res = response;
        });

        return res;
    }

    var result = await getResources();
    plate_text.value = JSON.parse(result).results[0].plate;
    plate_text.dispatchEvent(new Event('change'));
});
