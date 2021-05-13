// Variable that managed whether or not a reply button has been pressed already
var replyToggled = 0;

function makeReplyBox(clickedID)
{
    // Clears the form if it was toggled
    if(replyToggled == 1)
    {
       document.querySelector(".toggledReplyForm").remove();
    }

    replyToggled = 1;
    var form = document.createElement("form");
    form.setAttribute('method', "POST");
    form.setAttribute('action', "/postview/reply");

    // Makes the form class "toggledForm so that it can be found and closed with a querySelector(".toggledReplyForm")
    form.classList.add("toggledReplyForm");

    var text = document.createElement("input");
    text.setAttribute('type', "text");
    text.setAttribute('name', "comment");

    var submit = document.createElement("input"); //input element, Submit button
    submit.setAttribute('type',"submit");
    submit.setAttribute('value',"Submit");

    form.appendChild(text);
    form.appendChild(submit);

    document.getElementById(clickedID).parentElement.appendChild(form);
}