// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,  

function lengthValid(node, errors, lowLimit=false, upperLimit=false){
  if(lowLimit){
    if (node.value.length < lowLimit ) {
      let li = document.createElement('li');
      li.innerText = 'Item is too short';
      errors.appendChild(li)
    }
  }
  if(upperLimit){
    if (node.value.length > upperLimit ) {
      let li = document.createElement('li');
      li.innerText = 'Item is too long';
      errors.appendChild(li)
    }
  }
  
}

function formatValid(node, errors, format){
  if(!node.value.match(format)){
    let li = document.createElement('li');
    li.innerText = 'Format is incorrect';
    errors.appendChild(li)
  }

}

function validateEmail(){
  const emailNode = event.target.elements['email'];
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block')
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");


  lengthValid(emailNode, emailErrors, 5, 50);
  formatValid(emailNode, emailErrors, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }

}

function validateName(){
  const nameNode = event.target.elements['name'];
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block')
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");


  lengthValid(nameNode, nameErrors, 1);
  formatValid(nameNode, nameErrors, /^(\w+\s\s\w+|\w+)$/);


  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors)
  }
}


function validatePhone(){
  const phoneNode = event.target.elements['phone'];
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block')
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  if (phoneNode.value.match(/\d+/g).join("").length < 12) {
    let li = document.createElement('li');
    li.innerText = 'Phone number is too short';
    phoneErrors.appendChild(li)
  }

  formatValid(phoneNode, phoneErrors, /^[+0]380(\(32\)|32)( \d{3}|-\d{3})( \d{2}|-\d{2})( \d{2}|-\d{2})$/);
 
  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }

}

function validateMessage(){
  const messageNode = event.target.elements['message'];
  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block')
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute("role", "alert");


  lengthValid(messageNode, messageErrors, 10);

  if (messageNode.value.match(/\b(.*ugly|.*dumm|.*stupid|.*pig|.*ignorant)\b/g) ) {    
    let li = document.createElement('li');
    li.innerText = 'Message cannot contain bad words';
    messageErrors.appendChild(li)
  }

 
  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors)
  }

}

function validateMe(event) {
  event.preventDefault();

  validateName();

  validateMessage();
  validatePhone();
  
  validateEmail();
  


  return false;
}

