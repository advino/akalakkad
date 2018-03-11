let bot = new RiveScript();

bot.loadFile("brain.rive", brainReady, brainError);

function brainReady() {

  console.log("Brain Initliazed");
  bot.sortReplies();
}

function brainError() {

  console.log("Brain Failure");
}

let userInput = document.getElementById("messagebar");
// console.log(userInput);

userInput.addEventListener("keypress", function chat(event) {

  let key = event.which;


  if(key == 13) {

    let userChat = userInput.value;
    let feed = document.getElementById("messagefeed");
    let cht = document.createElement("p");
    let t = document.createTextNode(userChat);
    cht.className += "chat";

    cht.appendChild(t);
    feed.appendChild(cht);



    let reply = bot.reply('local-user', userChat);
    let rpy = document.createElement('p');
    let t2 = document.createTextNode(reply);
    rpy.className += "chat2";

    rpy.appendChild(t2);
    feed.appendChild(rpy);

    let messageFeed = document.getElementById("messagefeed");
    messageFeed.scrollTop = messageFeed.scrollHeight;

    document.getElementById("messagebar").value = "";
    }

});
