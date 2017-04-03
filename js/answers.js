var question_id = localStorage.getItem("question_id");

function createPages() {
    $('#answerList').html("");
    $.ajax({
        url: "http://acadprojects.com/py/explora/answer?question_id=" + question_id + "&page=0", 
        method: 'GET',
        data: {
            format: 'json'
        },
        success: function(object) {
            if(parseInt(object.total_pages) <= 0) {
                $('#answerList').html('<li><a href="#">0</a></li>'); 
            }
            else {
                for(var i = 0; i < parseInt(object.total_pages); i++) {
                    $('#answerList').append('<li><a href="#">' + i + '</a></li>');
                }
            }
        }
    })
    .done(function(){
        console.log("Created a list");
    })
    .fail(function() {
        console.log("Could not create a list");
    });
}

//Fetch answers
function fetchAnswers(url) {
    $('#allAnswers').empty();
    $.ajax({
        url: url,
        method: 'GET',
        data: {
            format: 'json'
        },
        success: function(object) {
            var results = object.data.length;
            if(results === 0) {
                $('#allAnswers').prepend(
                    '<div class="row">' +
                        '<div class="col-xs-10 answerContent" style="float: right">'+
                            '<p>No answers yet</p>' +
                        '</div>' +
                    '</div>' 
                );
            }
            else {
                for(var i = 0; i < results; i++)
                    {
                    $('#allAnswers').append(
                        '<div class="row">' +
                            '<div class="col-xs-12 col-md-10 answerContent" style="float: right" data-answerid=' + object.data[i].id + '>'+
                                '<p>' +
                                    object.data[i].answer +
                                '</p>' +
                                '<br>' +
                                '<span style="float: left"><a class="likeButton"><i class="fa fa-thumbs-o-up fa-lg"></i></a>&nbsp<label class="likeCount">' + object.data[i].like_count  + '</label></span>' + 
                                '<span style="float: right"><label>Posted by: ' + object.data[i].answer_by_name + '</label>' +
                                '<br>' +
                                '<span style="float: right"><label> Date: ' + object.data[i].created_on + " "+ '</label>' +
                            '</div>' +
                        '</div>' +
                        '<hr>'
                    );
                }
            }
        }
    })
    .done(function() {
        console.log("done");
    })
    .fail(function() {
        console.log("failure");
    });
}
//End fetching answers

//Post new answer
function addAnswer(data) {
    $.ajax({
        url: "http://acadprojects.com/py/explora/answer",
        method: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        success: function(object) {
            console.log(object);
        }
    })
    .done(function() {
        console.log("Successfully posted your answer");
        $('#answerForm').each(function() {
             this.reset();
         });
         $('#successMessage').append("<label>Succesfully posted</label");
         location.reload();
    })
    .fail(function() {
        console.log("Nope");
        $('#successMessage').append("<label>Could not post</label");
    });
}

//Update likes
function updateLikes(answerID) {
    var answerIDval = $(answerID).attr("data-answerid");
    $.ajax ({
        url: 'http://acadprojects.com/py/explora/answer',
        method: 'PUT', 
        data: {
            format: JSON,
            "answer_id": answerIDval
        },
        success: function(object) {
            if(object.result === true)
            {
                var likeCount = parseInt((answerID).find('.likeCount').html());
                likeCount += 1;
                $(answerID).find('.likeCount').html(likeCount);
            }
        }
    })
    .done(function() {
        console.log("Updated likes");
    })
    .fail(function() {
        console.log("Could not update likes");
    });
}