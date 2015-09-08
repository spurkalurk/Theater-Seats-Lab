

/* Instructions

1. Create a repo for the project. 
2. Each member should clone the repo to their local machine. 
3. As a group, begin building out the HTML and CSS according to the instructions (two slides from now).

Situation
You own a small theatre. With just 24 seats, it's a very intimate space. You want to create a simple app that will allow users to reserve seats for the upcoming show. Since you really don't have much money, this will be a simple project.

Display each seat as a small box in the browser. There should be 24 arranged in rows and columns. The number of rows and columns is up to you, but should remain the same no matter the width of the viewport. 

There should be some visible indication that certain seats are available and others are not. 

Clicking on available seats should cause a simple form to appear on the page below the boxes. 

The form should ask for the user's name and email address. 

Include at least one heading, a brief paragraph of instructions, and at least one image.
*/

//empty array to hold reservations objects
var reservationArray = [];

//new object prototype for incoming reservations
function reserver(name, email) {
	this.name= name;
	this.email=email;
}



//function to check new entry against array of reservations

function checkforDuplicate (entered) {
	for (i=0; i<reservationArray.length; i++) {
		if (reservationArray[i].email===entered) {
			return true;
		}
	}
}



function selectSeat(e) {
	var warning= document.getElementById('warning');
	if (e.target.className==="available") {
		e.target.className="selected";
		warning.style.visibility = "hidden";
		//displays which seat was chosen on the form
		var chosenSeat = e.target.id;
		console.log(chosenSeat);
		listItem= document.createElement('li');
  		listItem.innerHTML= "You have selected " + chosenSeat;
  		listItem.className=chosenSeat;
  		document.getElementById("list").appendChild(listItem);
	}
	//unselects selected seat if clicked again
	else if (e.target.className==="selected"){
		e.target.className="available";
		warning.style.visibility = "hidden";
		var targID= e.target.id;
		//removes corresponding chosen seat from the form
		if (document.getElementsByClassName(targID)) {
			var liToDelete = document.getElementsByClassName(targID);
			for (var i=0; i<liToDelete.length; i++) {
				var parentEl= liToDelete[i].parentNode;
				parentEl.removeChild(liToDelete[i]);
			}
			
		}
	}
	//shows an error if user clicks on seat already selected
	else if (e.target.className==="unavailable"){
		warning.style.visibility= "visible";
	}
	//just a message to help me figure out if something isn't working
	else {
		console.log('somethingbroke');
	}
}



// drops down the form if an available seat is clicked,
// set on "selected" seats bc fn is called after seat class is changed
function dropForm(e) {
	if (e.target.className==="selected") {
	var form = document.getElementById("form");
	form.style.visibility = "visible";
	}
}





// $( ".available" ).click(function() {
//   $( "#form" ).slideDown( "slow", function() {
//     // Animation complete.
//   });
// });



//response to clicking submit button
function submitForm() {
	var x;
	//if nothing is entered in form fields, error message
	if ( (document.getElementById('name').value.length===0) || 
				(document.getElementById('email').value.length===0)) {
		x= "You didn't complete the form!";
	}

	else if (document.getElementsByClassName("selected").length===0) {
		x="You didn't select a seat!";
	}
	//otherwise prompt for confirmation
	else {

	    if (confirm("Click OK to confirm your reservation. Only one reservation may be made per email address.") === true) {
	    	if (checkforDuplicate(document.getElementById('email').value)===true) {
		    	x="you already have a reservation";
		    }
		    else {

		    		var person= new reserver(document.getElementById('name').value, document.getElementById('email').value);
					reservationArray.push(person);
					console.log(reservationArray);
			        // all selected seats change to sold
					//and list of selected seat names clears
					//and error message clears if applicable
			        var soldSeats = document.getElementsByClassName('selected');
					var seatList = [].slice.call(soldSeats);
					
					seatList.forEach(function(element) {
							console.log(element.className);
							element.className= "unavailable";
						});
					var allListItems = document.querySelectorAll('li');
				  	for(var i=0; i<allListItems.length; i++) {
				    	var parentEl= allListItems[i].parentNode;
				    	parentEl.removeChild(allListItems[i]);
				    	}
				    x = "Your seat has been reserved!";
			 		var form = document.getElementById("formEntry");
					form.reset();
			    }

			}
		
	    else {
	        x = "Your reservation has been canceled.";
	    }	   
	}
	 document.getElementById("confirmation").innerHTML = x;
	
}







//Below, event listeners and corresponding variables

var chairSelect = document.getElementById('theatre');
chairSelect.addEventListener('click', selectSeat, false);

chairSelect.addEventListener('click', dropForm, false);

var submitButton = document.getElementById('button');
submitButton.addEventListener('click', submitForm, false);


