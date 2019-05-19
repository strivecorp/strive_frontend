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
      if(templateString.includes("##_FIRST_NAME_##") && "firstname" in jsonHash){
        templateString = templateString.replace("##_FIRST_NAME_##", jsonHash["firstname"])
      }
      if(templateString.includes("##_AVATAR_##") && jsonHash["firstname"]=="Nejc"){
        templateString = templateString.replace("##_AVATAR_##", avatarNejc)
      }else if(templateString.includes("##_AVATAR_##") && jsonHash["firstname"]=="Gregor"){
        templateString = templateString.replace("##_AVATAR_##", avatarGregor)
      }else if(templateString.includes("##_AVATAR_##") && jsonHash["firstname"]=="Žan"){
        templateString = templateString.replace("##_AVATAR_##", avatarZan)
      }
      if(templateString.includes("##_LAST_NAME_##") && "lastname" in jsonHash){
        templateString = templateString.replace("##_LAST_NAME_##", jsonHash["lastname"])
      }
      if(templateString.includes("##_EMAIL_##") && "email" in jsonHash){
        templateString = templateString.replace("##_EMAIL_##", jsonHash["email"])
      }
      if(templateString.includes("##_AGO_##")){
        const hourVar = getRandomArbitrary(1,7)
        const minVar = getRandomArbitrary(0,59)
        templateString = templateString.replace("##_AGO_##", hourVar+"h "+minVar+"m ")
      }
      if(templateString.includes("##_GOAL_NAME_##") && "description" in jsonHash){
        templateString = templateString.replace("##_GOAL_NAME_##", jsonHash["description"])
      }
      if(templateString.includes("##_CONTENT_##") && "content" in jsonHash){
        templateString = templateString.replace("##_CONTENT_##", jsonHash["content"])
      }
      if(templateString.includes("##_TITLE_##") && "title" in jsonHash){
        templateString = templateString.replace("##_TITLE_##", jsonHash["title"])
      }
      if(templateString.includes("##_PERCENT_##") && "percentage" in jsonHash){
        templateString = templateString.replace("##_PERCENT_##", jsonHash["percentage"])
      }
      if(templateString.includes("##_LIKES_##") && "likes-array" in jsonHash){
        const likesNum = jsonHash["likes-array"].length
        templateString = templateString.replace("##_LIKES_##", likesNum)
      }
      const template = templateString
      return template
    }

    $.ajax({
        url: "http://localhost:8080/feeds",
        success: function(result) { // completed attr goal instead of milestone
            resultArray = JSON.parse(result)
            console.log(resultArray)
            $("#inject-content").ready(function() {
            for (var i = 0; i < resultArray.length; i++) {
              var templateData = feedTemplate
              if ("milestone" in resultArray[i]){
                milestoneHash = resultArray[i]["milestone"]
                goalHash = milestoneHash["goal"]
                userHash = goalHash["user"]

                templateData = injectData(resultArray[i],templateData)
                templateData = injectData(milestoneHash,templateData)
                templateData = injectData(goalHash,templateData)
                templateData = injectData(userHash,templateData)
              }
              if ("goal" in resultArray[i]){
                goalHash = resultArray[i]["goal"]
                userHash = goalHash["user"]

                templateData = injectData(resultArray[i],templateData)
                templateData = injectData(goalHash,templateData)
                templateData = injectData(userHash,templateData)
              }

              console.log(resultArray[i])

              appendHtml(document.getElementById("inject-feed"), templateData)
            }
            })
        }
    });



    /*
        ##_FIRST_NAME_## ##_LAST_NAME_## ##_EMAIL_## ##_AGO_## ##_DESCRIPTION_##"
    */
    const avatarNejc = "<p class='image is-32x32'> <img src='http://www.iconninja.com/files/95/401/67/avatar-man-old-person-male-mature-user-icon.png'> </p>"
    const avatarZan = "<p class='image is-32x32'> <img src='http://www.iconninja.com/files/852/501/256/avatar-boy-young-user-kid-child-male-icon.png'> </p>"
    const avatarGregor= "<p class='image is-32x32'> <img src='http://www.iconninja.com/files/511/390/516/office-user-costume-business-avatar-man-male-icon.png'> </p>"
    const feedTemplate = `<div class='box'>
  <article class='media is-primary'>
    <figure class='media-left'> ##_AVATAR_## </figure>
    <div class='media-content'>
      <div class='content'>
        <p> <strong>##_FIRST_NAME_## ##_LAST_NAME_##</strong> <small>##_EMAIL_##</small> <small>##_AGO_##</small> <br> ##_TITLE_## </p>
         Progress: &nbsp;<span style="font-weight: bold; font-size: 120%;">##_GOAL_NAME_##</span>
         <progress class="progress is-warning" value='##_PERCENT_##' max='100' style="margin-top:5px">##_PERCENT_##%</progress>
      </div>
      <nav class='level is-mobile'>
        <div class='level-left'>
        <a class='level-item' style="color:purple">
        <div class="boutline" style="border:1px solid purple; margin:5px; width:50px; height:50px; border-radius:50px;">
          <span class='icon is-small superbutton' style="margin:16px;">
            <i class='fas fa-trophy' style="font-size: 175%"></i>
          </span></div>
          &nbsp ##_LIKES_##
        </a>
          <a class='level-item' style="color:purple">
            <span class='icon is-small'>
              <i class='fas fa-reply'></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
  <article class='media'>
    <figure class='media-left'>
      <p class='image is-32x32'> <img src='images/portrait4.jpg'> </p>
    </figure>
    <div class='media-content'>
      <div class='field'>
        <p class='control'>
          <!-- <input class='input' type='text' placeholder='Input a comment...'> -->
          <textarea class='textarea' placeholder='Comment something...' rows='1'></textarea>
        </p>
      </div>
      <nav class='level'>
        <div class='level-left'>
          <div class='level-item'> </div>
        </div>
        <div class='level-right'>
          <div class='level-item'> <a class='button is-info is-small'>Submit</a> </div>
        </div>
      </nav>
    </div>
  </article>
</div>`
});
