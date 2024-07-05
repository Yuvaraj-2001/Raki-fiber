function openNav() {
    document.getElementById("myNav").style.display = "block";
  }
  
function closeNav() {
    document.getElementById("myNav").style.display = "none";
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active-accord");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}




var validator = new Dominar(document.querySelector('.dominar-form-contact'), {
	user_name: {
	  rules: 'required|min:3',
	  triggers: ['focusout', 'change', 'keyup'],
	  customMessages: {
		required: 'Please Enter Your Name',
		min: 'Please Enter Minimum of :min characters',
	  }
	},
	user_phone: {
		rules: 'required|digits:10',
		triggers: ['focusout', 'change', 'keyup'],
		customMessages: {
		  required: 'Please Enter Your Mobile Number',
		  digits: 'Enter Valid Mobile Number'

		}
	},
	user_message: {
	  rules: 'required|min:10',
	  triggers: ['focusout', 'change', 'keyup'],
	  customMessages: {
		required: 'Please Enter Your Message',
		min: 'Please Enter Minimum of :min characters',
	  }
	}
});

function submitForm(){
	validator.validateAll(validateForm);
}

function validateForm(){
    let dateStr = new Date().toString();
    let data = objectToFormData(
        {
            name: idval('user_name'), 
            phone:idval('user_phone'), 
            message: idval('user_message'),
            time: dateStr
        }
    );
	if(document.getElementById('spin-off').style.display === 'none'){
		return;
	}
    document.getElementById('spin-off').style.display = 'none';
    document.getElementById('spin-on').style.display = 'inline-block';
    fetch('https://script.google.com/macros/s/AKfycbxGs_6o1V2qBH9USNCimrOgmN5k1KGXpyffIXJ4YY2lzmIi0Zfs_WXzXcjiWvspTSiM/exec', {
        method: "POST",
        body: data
    })
    // The fetch() method is used to make a request to the server and retrieve data.
    // This is an example API endpoint. Replace it with the actual URL for the API endpoint you want to use.
    .then(res => res.text())
    // The .then() method is used to handle the response from the server.
    // The response is converted to text using the res.text() method.
    .then(data => {
        alert(data);
        location.reload();
    })
    .catch(()=>{
        document.getElementById('spin-off').style.display = 'block';
        document.getElementById('spin-on').style.display = 'none';
    })
    ;
};
