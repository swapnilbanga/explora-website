
//Get subject IDs
function getSubjectId() {
    $.ajax({
        url: "http://acadprojects.com/py/explora/subject",
        method: 'GET',
        success: function(object)
        {   for(i in object.data)
            $('#subject').prepend (
                "<option value=" + object.data[i].id + ">" + object.data[i].name + "</option>"
            );
        }
    })
    .done(function() {
        console.log("Succesfully loaded subjects");
    })
    .fail(function() {
        console.log("Failed to load subjects");
    })
}


//Open search page
function searchBySubject(query) {
    var subject_id = 0;
    $('#subject').children().each(function() {
        if($(this).html().toUpperCase() === query.toUpperCase()) {
            subject_id = $(this).val();
            localStorage.setItem("subject_id", subject_id);
            localStorage.setItem("subject_name", query);
        }   
    });
    window.location.href = "search.html";
}

//Get search text
$('#searchButton').on('click', function() {
    var query = $('#searchInput').val();
    if(query)
        searchBySubject(query);
    else
        console.log("Empty value");
});

//Post a new question
function addQuestion(data) {
$.ajax({
        url: "http://acadprojects.com/py/explora/question",
        method: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        success: function(object) {
            console.log(object);
            window.location.href = "index.html";
        }
    })
    .done(function() {
        console.log("Successfully posted your question");
        $('#questionForm').each(function() {
             this.reset();
         });
         $('#successMessage').append("<label>Succesfully posted</label");
    })
    .fail(function() {
        console.log("Nope");
        $('#successMessage').append("<label>Could not post</label");
    });
}

//Get subjects
getSubjectId();

//Submit a question
$('#submitQuestion').on('click', function() {
    var proceed = true;
    $('#questionForm input, #questionForm textarea').each(function() {
          $(this).css('border-color',''); 
          if(! $.trim($(this).val())) { 
              $(this).css('border-color','red'); 
              proceed = false;
        }
    });
    var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
    if(! email_reg.test($.trim($('#email').val()))) {
        $('#email').css('border-color','red');
        $('#successMessage').html("<label>Invalid email</label");
        proceed = false;           
    } 
    else
    {
        $('#successMessage').html("<label></label");
    }
    
    if (proceed) {
       var data = {
           posted_by_email: $('#email').val(),
           posted_by_name: $('#name').val(),
           question: $('#question').val(),
           subject_id: 1,
           semester: $('#semesterForm').val(),
           tags: $('#tagInput').val().split(" ")
       }
       addQuestion(data);
    }
    event.preventDefault();
});

//Read question data

$('body').on('click', ".viewAnswers", function() {
    var question_id = $(this).attr("data-question_id");
    var question_statement = $(this).parent().parent().find('p').html()
    var question_posted =  $(this).parent().parent().siblings().find('#userDate').html();
    var question_imageurl = $(this).parent().parent().siblings().find('img').attr('src');
    var user_name = $(this).parent().parent().siblings().find('#userName').html();
    localStorage.setItem("question_id", question_id);
    localStorage.setItem("question_statement", question_statement);
    localStorage.setItem("question_posted", question_posted);
    localStorage.setItem("question_imageurl", question_imageurl);
    localStorage.setItem("user_name", user_name);
});
