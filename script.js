/*
         * addRow function adds a new row to local storge when user clicks on submit button
         */

        function addRow()
        {
            //Retriving values from form
            var new_name = document.forms["registerForm"]["name"].value;
            var new_email = document.forms["registerForm"]["emailid"].value;
            var new_phone = document.forms["registerForm"]["phone"].value;  
            var new_country = document.forms["registerForm"]["country"].value;
            var new_state = document.forms["registerForm"]["state"].value;
            var new_city = document.forms["registerForm"]["city"].value;
            
            //Creating a object
            var person = {
                "name" : new_name,
                "emailid":new_email,
                "phone":new_phone,
                "country":new_country,
                "state":new_state,
                "city" :new_city
            }

            // getting data from local storage if data is already available if it is null then creating new array
            var retrived = localStorage.getItem("data");
            if(retrived == null){
                var objectsArray = [];
            }
            else if(retrived != null){
                var objectsArray = JSON.parse(retrived);    
            }
            
            objectsArray.push(person);
            localStorage.setItem("data",JSON.stringify(objectsArray));
        }    

        /*
         * ShowTable function shows thw table on main page with the data from local storage
         */
        function showTable(){
            //Retriving Data
            var objJSON = localStorage.getItem("data");
            var obj = JSON.parse(objJSON);
            if(objJSON != null){    
            for(var i=0;i<obj.length;i++)
            {
            //Storing data in new variable    
            var new_name = obj[i].name;
            var new_email = obj[i].emailid;
            var new_phone = obj[i].phone;  
            var new_country = obj[i].country;
            var new_state = obj[i].state;
            var new_city = obj[i].city;
            
            var table = document.getElementById("infotable");
            var row = table.insertRow(table.rows.length);
            row.setAttribute('id',"rowid"+i);
            
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            var cell6 = row.insertCell(6);
            var cell7 = row.insertCell(7);
            var cell8 = row.insertCell(8);
            
            cell1.innerHTML = new_name;
            cell2.innerHTML = new_email;
            cell3.innerHTML = new_phone;                                         
            cell4.innerHTML = new_country;
            cell5.innerHTML = new_state;
            cell6.innerHTML = new_city;
            
            //Creating Edit Button
            var edit_button = document.createElement("button");
            edit_button.setAttribute('name','edit');
            edit_button.setAttribute('value','edit');
            edit_button.setAttribute('class','buttonOnTable');
            edit_button.setAttribute('id', i );
            edit_button.innerHTML = "Edit"
            edit_button.onclick = function(){editRow(this.id)};
            cell7.appendChild(edit_button);
                                
            ////Creating Delete Button
            var delete_button = document.createElement("button");
            delete_button.setAttribute('name','delete');
            delete_button.setAttribute('class','buttonOnTable');
            delete_button.setAttribute('content','delete');
            delete_button.setAttribute('id', i );
            delete_button.innerHTML = "Delete";
            delete_button.onclick=function(){deleteRow(this.id)};
            cell8.appendChild(delete_button);
                                
            
            }   
            } 
        }
        /*
         * editRow function helps to edit any data og given row 
         * if user clicks on it all the data get copies to form
         * and given row gets deleted
         * @param - givenid - Array index of row which is to be deleted
         */

        function editRow(givenId){
            var table = document.getElementById("infotable");
            var row = document.getElementById("rowid"+givenId);
            var Cells = row.getElementsByTagName("td");
            document.getElementById("name").value = Cells[1].innerText ;
            document.getElementById("emailid").value = Cells[2].innerText ;
            document.getElementById("phone").value = Cells[3].innerText ;
            document.getElementById("country").value = Cells[4].innerText;
            populate("country","state");
            document.getElementById("state").value = Cells[5].innerText;
            populateCity("state","city");
            document.getElementById("city").value = Cells[6].innerText;
            var retrived = localStorage.getItem("data");
            if(retrived != null){
                var objectsArray = JSON.parse(retrived); 
                var length = objectsArray.length;
                objectsArray.splice(givenId,1);
                localStorage.clear();
                localStorage.setItem("data",JSON.stringify(objectsArray));
            }

        }
        /*
         * deleteRow function deletes a row data from local storage
         * first it retrive data in array and delete it from array
         * then clear all local storage
         * and again set all data
         * @param - givenId - Array index of row which is to be deleted
         */
        
        function deleteRow(givenId){          
            var retrived = localStorage.getItem("data");
            if(retrived != null){
                var objectsArray = JSON.parse(retrived); 
                var length = objectsArray.length;
                objectsArray.splice(givenId,1);
                localStorage.clear();
                localStorage.setItem("data",JSON.stringify(objectsArray));
                location.reload();
                }   
            }
            
        /*
         * Given function validates the user input
         */

        function formValidation()
        {
            var userName = document.forms["registerForm"]["name"].value;
            var userEmail = document.forms["registerForm"]["emailid"].value;
            var userPhone = document.forms["registerForm"]["phone"].value;
            var userPassword1 = document.forms["registerForm"]["password1"].value;
            var userPassword2 = document.forms["registerForm"]["password2"].value;
            var length = userName.length;
            //Name field should not be empty
            if(userName == ""){                      
                alert("Name feild is Necessary");
                return false;
            }
            //Name feild should not contain numbers
            for(var i = 0;i<length;i++)
            {
                if(userName[i] == " "){
                    continue;
                }
                else if(userName[i] >=0 && userName[i] <=9)
                {
                    alert("Name feild can't contain numbers");
                    return false;
                }
            }
            //Email should compulsary have  [ '@' , '.' ] in order
            var flag1 = false;
            var flag2 = false;
            length = userEmail.length;
            for(var i = 0;i<length;i++)
            {
                if(userEmail[i] == '@'){
                    flag1 = true;
                    i++;
                    while(i<length)
                    {
                        if(userEmail[i] == "."){
                            flag2 = true;
                        } 
                        i++;   
                    }
                }
                
            }
            if(flag1 == false || flag2 == false){
                    alert("Pleade provide email id in format --  abc@xyz.com");
                    return false;
                }
            
            length = userPhone.length
            //Phone Number should not have anything other then number
            for(var i = 0;i<length;i++)
            {
                if(userPhone[i]>=0 && userPhone[i]<=9){
                    continue;
                }
                else{
                    alert("Phone Number should be in numbers");
                    return false;
                }
            }
            
            //Length of password should be greater then 8
            length = userPassword1.length;
            if(length<8)
            {
                alert("Length of password shoud be greater then 8");
                return false;
            }
            //Both the password feild should be same
            if(userPassword1 != userPassword2)
            {
                alert("Both Password feild should be same");
                return false;
            }
            
            addRow();
        }
        /*
         * populate function helps to dynamically add options in state feild according to user selected country
         * @param - country = id of country feild
         * @param - state = id of state feild
         */
        function populate(country,state)
        {
            var countrySelected = document.getElementById(country);
            var stateSelected = document.getElementById(state);
            stateSelected.innerHTML = "";
            if(countrySelected.value == "Australia")
            {
                var optionArray = ["|","New South Wales|New South Wales","Queensland|Queensland"];
            }
            else if(countrySelected.value == "India"){
                var optionArray = ["|","Gujrat|Gujrat" , "Rajasthan|Rajasthan","Maharashtra|Maharashtra"];
            }
            else if(countrySelected.value == "USA")
            {
                var optionArray = ["|","Alaska|Alaska","California|California","New York|New York"];
            }
            for(var option in optionArray)
            {
                var pair = optionArray[option].split("|");
                var newOption = document.createElement("option");
                newOption.value = pair[0];
                newOption.innerHTML = pair[1];
                stateSelected.options.add(newOption);
            }
        }
        /*
         * populate function helps to dynamically add options in city feild according to user selected state
         * @param - state = id of state feild
         * @param - city = id of city feild
         */
        function populateCity(state,city)
        {
            var stateSelected = document.getElementById(state);
            var citySelected = document.getElementById(city);
            citySelected.innerHTML = "";
            if(stateSelected.value == "New South Wales")
            {
                var optionArray = ["|","Grafton|Grafton","New Castle|New Castle","Sydney|Sydney"];
            }
            else if(stateSelected.value == "Queensland")
            {
                var optionArray = ["|","Brisbane|Brisbane","Gold Coast|Gold Coast","Townsville‎|Townsville‎"];
            }
            else if(stateSelected.value == "Gujrat")
            {
                var optionArray = ["|","Ahemdabad|Ahemdabad","Baroda|Baroda","Surat‎|Surat"];
            }
            else if(stateSelected.value == "Rajasthan")
            {
                var optionArray = ["|","Ajmer|Ajmer","Bhilwara|Bhilwara","Jaipur|Jaipur","Udaipur|Udaipur"];
            }
            else if(stateSelected.value == "Maharashtra")
            {
                var optionArray = ["|","Mumbai|Mumbai","Nagpur|Nagpur","Pune|Pune"];
            }
            else if(stateSelected.value == "Alaska")
            {
                var optionArray = ["|","Anchorage|Anchorage","Juneau|Juneau","Sitka‎|Sitka"];
            }
            else if(stateSelected.value == "California")
            {
                var optionArray = ["|","Los Angeles|Los Angeles","Oakland|Oakland","San Francisco|San Francisco"];
            }
            else if(stateSelected.value == "New York")
            {
                var optionArray = ["|","Albany|Albany","New York City|New York City","Rochester|Rochester"];
            }
        
        
            for(var option in optionArray)
            {
                var pair = optionArray[option].split("|");
                var newOption = document.createElement("option");
                newOption.value = pair[0];
                newOption.innerHTML = pair[1];
                citySelected.options.add(newOption);
            }
        }