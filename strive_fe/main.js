// Create a request variable and assign a new XMLHttpRequest object to it.

$(document).ready(function() {
    function appendHtml(el, str) {
        var div = document.createElement('div');
        div.innerHTML = str;
        while (div.children.length > 0) {
            el.appendChild(div.children[0]);
        }
    }
    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    function injectData(jsonHash,templateString){
      var template = ""
      if(templateString.includes("##_FIRST_NAME_##")){
        templateString = templateString.replace("##_FIRST_NAME_##", jsonHash["firstname"])
      }
      if(templateString.includes("##_LAST_NAME_##")){
        templateString = templateString.replace("##_LAST_NAME_##", jsonHash["lastname"])
      }
      if(templateString.includes("##_EMAIL_##")){
        templateString = templateString.replace("##_EMAIL_##", jsonHash["email"])
      }
      if(templateString.includes("##_AGO_##")){
        const hourVar = getRandomArbitrary(1,7)
        const minVar = getRandomArbitrary(0,59)
        templateString = templateString.replace("##_AGO_##", hourVar+"h "+minVar+"m ")
      }
      if(templateString.includes("##_DESCRIPTION_##")){
        templateString = templateString.replace("##_DESCRIPTION_##", jsonHash["description"])
      }
      if(templateString.includes("##_CONTENT_##")){
        templateString = templateString.replace("##_CONTENT_##", jsonHash["content"])
      }
      if(templateString.includes("##_TITLE_##")){
        templateString = templateString.replace("##_TITLE_##", jsonHash["title"])
      }
      template = templateString
      return template
    }

    $.ajax({
        url: "http://localhost:8080/users",
        success: function(result) {
            resultArray = JSON.parse(result)
            console.log(resultArray)
            $("#inject-content").ready(function() {
                var templateData = injectData(resultArray[0],feedTemplate)
                appendHtml(document.getElementById("inject-feed"), templateData)
            })
        }
    });

    /*
        ##_FIRST_NAME_## ##_LAST_NAME_## ##_EMAIL_## ##_AGO_## ##_DESCRIPTION_##"
    */
    const feedTemplate = "<div class='box'> <article class='media is-primary'> <figure class='media-left'> <p class='image is-32x32'> <img src='images/me.jpg'> </p> </figure> <div class='media-content'> <div class='content'> <p> <strong>##_FIRST_NAME_## ##_LAST_NAME_##</strong> <small>##_EMAIL_##</small> <small>##_AGO_##</small> <br> ##_DESCRIPTION_# </p> </div> <nav class='level is-mobile'> <div class='level-left'> <a class='level-item'> <span class='icon is-small'><i class='fas fa-reply'></i></span> </a> <a class='level-item'> <span class='icon is-small'><i class='fas fa-hand-rock'></i></span> </a> </div> </nav> </div> </article> <article class='media'> <figure class='media-left'> <p class='image is-32x32'> <img src='images/portrait4.jpg'> </p> </figure> <div class='media-content'> <div class='field'> <p class='control'> <!-- <input class='input' type='text' placeholder='Input a comment...'> --> <textarea class='textarea' placeholder='Comment something...' rows='1'></textarea> </p> </div> <nav class='level'> <div class='level-left'> <div class='level-item'> </div> </div> <div class='level-right'> <div class='level-item'> <a class='button is-info is-small'>Submit</a> </div> </div> </nav> </div> </article> </div>"
});
