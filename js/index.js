//Pagination
function createPages(url, ulName) {
    $(ulName).html("");
    $.ajax({
        url: url, 
        method: 'GET',
        data: {
            format: 'json'
        },
        success: function(object) {
            for(var i = 0; i < parseInt(object.total_pages); i++) {
                $(ulName).append('<li><a href="#">' + i + '</a></li>');
            }
        }
    })
    .done(function(){
        console.log("Created a list");
    })
    .fail(function() {
        console.log("Could not create a list");
    })
}
//Load questions
function fetchQuestions(url, containerDiv) {
    $(containerDiv).empty();
    $.ajax({
        url: url, 
        method: 'GET',
        data: {
            format: 'json'
        },
        success: function(object) {
            var results = object.data.length;
            for (var i = 0; i < results; i++)
                {
                $(containerDiv).prepend(
                    '<div class="row">' +
                        '<div class="col-xs-4 col-md-2 askerInfo">' +
                            '<img src="' + object.data[i].image_url + '" alt="image" class="userImage">' +
                            '<br>' +
                            '<label id="userDate">' + object.data[i].created_on + '</label>' +
                            '<br>' +
                            '<label id="userName">' + object.data[i].posted_by_name + '</label>' +
                        '</div>' +
                        '<div class="col-xs-8 col-md-10 questionContent">'+
                            '<p>' +
                                object.data[i].question +
                            '</p>' +
                            '<a href="answers.html"><button class="btn viewAnswers"' + 'data-question_id=' + object.data[i].id + '>Answers</button></a>' +
                        '</div>' +
                    '</div>' + 
                    '<hr>'
                );
            }
        }
    })
    .done(function() {
        console.log("Done loading questions");
    })
    .fail(function() {
        console.log("Failure, couldn't load questions");
    });
}

