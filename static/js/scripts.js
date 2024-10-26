$('#btn-save').click(function () { 

    let output = "";

    // take the value of all input in the form (information in the browser)
    let name = $('#id_name').val();
    let email = $('#id_email').val();
    let course = $('#id_course').val();

    if(name == ""){
        console.log('Enter Name');
    } else if(email == ""){
        console.log('Enter Email');
    } else if(course == ""){
        console.log('Enter Course');
    } else {
        // console.log(name);
        // console.log(email);
        // console.log(course);

        // take the value of the input data typed by the user
        mydata = {
            name: name,
            email: email,
            course: course
        }

        // appl AJAX
        $.ajax({
            // url: "{% url 'save-data' %}",
            url: "save-data/",
            method: "POST",
            data: mydata,

            success: function(data) {
                // console.log(data.status)
                console.log('Data submitted')
              
                // --> put in the content of the table in the right side the data content
                x = data.student_data               

                if(data.status == 'Data saved'){
                    for (let i = 0; i < x.length; i++) {
                        // recomposer le contenu tu tableau en fonction de données recues en AJAX
                       output += "<tr><td>" + x[i].id +
                            "</td><td>" + x[i].name +
                            "</td><td>" + x[i].email +
                            "</td><td>" + x[i].course +
                            "</td><td> <input type='button' value='Edit' class='btn btn-outline-warning btn-sm' data-sid=" + 
                             x[i].id + "/>" + " " +
                             "<input type='button' value='Delete' class='btn btn-outline-danger btn-sm' data-sid=" +
                             x[i].id + "/>"
                    }   

                    
                    // load ajax data in the table body
                    $('#tbody').html(output);

                    // reset form once submitted
                    $('form')[0].reset();

                }
                if(data.status == 'Unable to save'){

                }

            },
        });
    }

});