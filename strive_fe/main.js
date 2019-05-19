// Create a request variable and assign a new XMLHttpRequest object to it.

$(document).ready(function() {
    function appendHtml(el, str) {
        var div = document.createElement('div');
        div.innerHTML = str;
        while (div.children.length > 0) {
            el.appendChild(div.children[0]);
        }
    }
    console.log("ready!");

    $.ajax({
        url: "http://localhost:8080/users",
        success: function(result) {
            resultHash = JSON.parse(result)
            console.log(resultHash)
            $("#inject-content").ready(function() {
                var template = feedTemplate.replace("##_FIRST_NAME_##", resultHash["firstname"])
                appendHtml(document.getElementById("inject-feed"), template)
            })
        }
    });

    /*
        ##_FIRST_NAME_## ##_LAST_NAME_## ##_EMAIL_## ##_AGO_MIN_## ##_FEED_DESCRIPTION_##"
    */
    const feedTemplate = "<div class='box'> <article class='media is-primary'> <figure class='media-left'> <p class='image is-32x32'> <img src='images/me.jpg'> </p> </figure> <div class='media-content'> <div class='content'> <p> <strong>##_FIRST_NAME_## ##_LAST_NAME_##</strong> <small>##_EMAIL_##</small> <small>##_AGO_##</small> <br> ##_FEED_DESCRIPTION_# </p> </div> <nav class='level is-mobile'> <div class='level-left'> <a class='level-item'> <span class='icon is-small'><i class='fas fa-reply'></i></span> </a> <a class='level-item'> <span class='icon is-small'><i class='fas fa-hand-rock'></i></span> </a> </div> </nav> </div> <div class='media-right'> <button class='delete'></button> </div> </article> <article class='media'> <figure class='media-left'> <p class='image is-32x32'> <img src='images/portrait4.jpg'> </p> </figure> <div class='media-content'> <div class='field'> <p class='control'> <!-- <input class='input' type='text' placeholder='Input a comment...'> --> <textarea class='textarea' placeholder='Comment something...' rows='1'></textarea> </p> </div> <nav class='level'> <div class='level-left'> <div class='level-item'> </div> </div> <div class='level-right'> <div class='level-item'> <a class='button is-info is-small'>Submit</a> </div> </div> </nav> </div> </article> </div>"
});