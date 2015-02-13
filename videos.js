window.onload = function() {
  // Add category button
  var vidList = document.getElementById('vid-list');
  var catFilter = document.createElement("select");
  var singleCat = document.createElement("option");
  singleCat.setAttribute('value', 'testvalue');
  singleCat.innerText = "hello";
  catFilter.appendChild(singleCat);
  vidList.insertBefore(catFilter, vidList.firstChild);

  // Get the table row count
  // need to insert another button
};

/**
* Checks the add vid form for empty values
* @return {bool} - True - Everything is good.
*                  False - A value is missing.
*/
function checkAddVidFields() {
  var vidName = document.getElementById("vidName").value;
  var vidCat = document.getElementById("vidCat").value;
  var vidLen = document.getElementById("vidLen").value;
  var msg = "Please fill in the following fields:";
  var showMsg = false;

  if (vidName === '') {
    msg += ' Video Name';
    showMsg = true;
  }

  if (vidCat === '') {
    if (showMsg) {
      msg += ',';
    }
    msg += ' Video Category';
    showMsg = true;
  }

  if (vidLen === '') {
    if (showMsg) {
      msg += ',';
    }
    msg += ' Video Length';
    showMsg = true;
  }

  if (showMsg) {
    alert(msg);
    return false;
  }

  return true;
}

/**
* Deletes an individual vid from the mysql database.
* @param {string} vidname - The video name.
*/
function deleteVid(vidname) {
  var path = 'https://web.engr.oregonstate.edu/~toke/a4p2/videos.php';
  var params = {deletevid: vidname};
  var method = 'POST';
  sendForm(path, params, method);
}

/**
* Sends a post or get request via a form. 
* This code was found here: http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit. I changed the comments and the method names.
* @param {string} path - The location you want the form to submit to.
* @param {object} params - An object containing key/value pairs of the form info you want to send.
* @param {string} method - Can specify either a 'GET' or 'POST' call.
*/
function sendForm(path, params, method) {
  // Create an invisible form
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  // Set up the key/value pairs
  for(var key in params) {
      if(params.hasOwnProperty(key)) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);

          form.appendChild(hiddenField);
       }
  }

  // Submit the form
  document.body.appendChild(form);
  form.submit();
}

/**
* Updates the checkout status of a video. 
* @param {string} action - String to determine whether you want to checkout or checkin a video.
* @param {string} vidname - The video name.
*/
function updateCheckout(action, vidname) {
  var path = 'https://web.engr.oregonstate.edu/~toke/a4p2/videos.php';
  var method = 'POST';
  var params;

  if (action === 'Checkout') {
    // Set up the checkout parameters
    params = {checkout: true, name: vidname};
  }
  else if (action === 'Checkin') {
    // Set up the checkin parameters
    params = {checkout: false, name: vidname};
  }
  else {
    return;
  }

  sendForm(path, params, 'POST');
}

/**
* Deletes all videos.
*/
function deleteAllVids() {
  var path = 'https://web.engr.oregonstate.edu/~toke/a4p2/videos.php';
  var method = 'POST';
  var params = {deleteall: true};

  sendForm(path, params, 'POST');
}