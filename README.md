# startup
printf("Hello World")
-h rrr -h
int a = 123;
I found it very interested using Github to write code.
![This is an image](/Startup%20Strach.png)
*/ You can find different types of Food in Provo, Asian, European, American, and South Americans. A website with these inforamtion can help people to decide what they want to eat and where to go on a date./*

Key features:
    Secure login over Https
    Communicate within the Chat
    Notifications when new comments are made
    Able to navigate main, profile, messages
    Comments and saved stores will be stored
    able to comment and save stores
    
   The first Simon went well. I was able to use different html code and recreate a Simon. However, I was having issues when I tried to sync my push with Github. It fraustrated me but I am glad it finally worked out.

I decided to change my start up application to a webiste for meme, where people can share their favourite memes and others can common it.

This CSS and HTML start up is hard for me. I spent couple hours to final have something coded. I can tell that I have learned a lot during this assignment. But I also see that there are concepts that I don't understand well. I took another hour to try and figure how to create a vertical list and a horizontal list.

DOM accessing all element:
	function displayElement(el) {
  console.log(el.tagName);
  for (const child of el.children) {
    displayElement(child);
  }
}

displayElement(document);


DOM - insert, modify, or delete

Create a new element:
	create the element on the DOM document
	const newChild = document.createElement('div');
  newChild.textContent = text;
insert the new element into the DOM tree by appending it to an existing element in the tree.
const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
Removing - removeChild
function deleteChild(parentSelector) {
  const el = document.querySelector(parentSelector);
  el.parentElement.removeChild(el);
}

deleteChild('#courses div’);
Injecting HTML
Find the first element in te DOM and replace it
const el = document.querySelector('div');
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>'
Event Listeners

const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
Clipboard	Cut, copied, pasted
Focus	An element gets focus
Keyboard	Keys are pressed
Mouse	Click events
Text selection	When text is selected




This time I created javascript files for my startup. I learned simple function and high-order functions on Javascript. I tried to make the table and the delete buttons on each row. The problems was on the for loop and I finally firgured to put it on my click_press function to have addeventlistener to all my delete_button. All of all, I am satisified on applying waht I have learned.
