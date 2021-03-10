var userVote = 0;

function vote(vote){
    var postVote = document.getElementById("voteNum");
    var originalVoteAmount = 0; //grab number of votes on specific post from Database
    if(vote == userVote){
        postVote.innerHTML = originalVoteAmount;
        userVote = 0;
        return;
    }
    if(vote == 1){
        // increment vote number on DB
        postVote.innerHTML = originalVoteAmount + 1;
        userVote = 1;

    }else{
        // decrement vote number on DB
        postVote.innerHTML = originalVoteAmount - 1;
        userVote = -1;
    }
    return;
}

function assemblePostData(){
    var voteAmount = 0;
    document.getElementById("voteNum").innerHTML = voteAmount;

}