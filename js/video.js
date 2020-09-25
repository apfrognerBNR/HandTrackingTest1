(function() {
    var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    vide = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL;

    navigator.getMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream) {
            video.src = vendorUrl.createObjectURL(stream);
    }, function(error) {

    });
})();