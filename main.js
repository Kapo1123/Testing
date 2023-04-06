
function setplayer_name(){
    let x= localStorage.getItem('userName') ?? 'Mystery player';

  const playerNameEl = document.querySelector('.player-name');
      playerNameEl.textContent = x;
    } 
function get_username(){
  if (localStorage.getItem('userName')=='Mystery player'){
    return false;
  }
  return localStorage.getItem('userName');
}
function configureWebSocket() {
  var user = get_username();
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  this.socket.onopen = (event) => {
    this.broadcastEvent(user,'login','login');
    this.displayMsg('system', user, 'login');
  };
  this.socket.onclose = (event) => {
    this.displayMsg('system', user, 'disconnected');
  };
   this.socket.onmessage = async (event) => {
     const msg = JSON.parse(await event.data.text());
   this.displayMsg( 'user',msg.from, msg.value);
    
  }
};



function displayMsg(cls, from, msg) {
  const chatText = document.querySelector('#player-messages');
  chatText.innerHTML =
    `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }
    
setplayer_name();
const addbutton = document.getElementsByClassName("form_button");
// addbutton[0].addEventListener("click",button_click,false);
addbutton[0].addEventListener("click",button_click,false);

async function update_info(){
  const input_element = document.getElementsByClassName("input1")[0];
  let x = input_element.value;
  const userName = this.get_username();
  const date = new Date().toLocaleDateString();
  const lists_urls = { name: userName, lists_urls: x, date: date };
  try {
    const response = await fetch('/api/urls', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(lists_urls),
    });
    //update it on the backend
    get_info();
    //get all urls from the back to front
  } catch {
    // If there was an error then just track scores locally
    
  }
            
    
}
  async function get_info(){
      let x = get_username();
      console.log("This is x " + x);
        const api_url = '/api/urls/'+x;
        const response = await fetch(api_url);
        console.log("this is response" + response);
                if(response.ok){
                  let urls =[];
                urls = await response.json();
                console.log("posted");
                post_it(urls);
                }
            else {
                throw new Error('Error retrieving urls from server');
              }
            
    } // end of get_info
    
    function post_it(urls){
      let i=0;
        console.log(urls);
        const table= document.getElementsByClassName("table1")[0];
        table.innerHTML = "";
        
      while(i<urls.length){
        input_element = urls[i].lists_urls;
        i++;
    // const input_element = document.getElementsByClassName("input1")[0];
    // const table= document.getElementsByClassName("table1")[0];
    const date = document.createElement("td");
    const url = document.createElement("td");
    url.style.textAlign = "center"; 
    url.className = "The_link";
    const button_row = document.createElement("td");
    const newrow = document.createElement("tr");
    const button = document.createElement("button");
    button.textContent = "delete";
    button.style.fontSize ="medium";
    button.className='delete'+b;
    button.type = "submit";
    const now = new Date();
    const dateString = now.toLocaleString('en-US', { dateStyle: 'short' }).split(',')[0];
    date.textContent =  dateString;
    url.textContent = input_element;
    button_row.appendChild(button);
    button_row.dataset.id = b;
    newrow.appendChild(date);
    newrow.appendChild(url);
    newrow.appendChild(button_row);
    table.appendChild(newrow);
    newrow.className ='add'+b;
      // for(let i =0; i<b;i++){
      const deleteButton = document.getElementsByClassName("delete"+b);
      deleteButton[0].addEventListener("click",delete_click,false);
      input_element = '';
      b++;
      }
        
    }
let b = 1;

function button_click(e){
  let user = get_username();
    e.preventDefault();
    update_info();
    console.log("display message");
    broadcastEvent(user,'addedURL','added an URL');
    displayMsg('system', user, 'added an URL');
}
// let i =1;

//   const deleteButton = document.getElementsByClassName("delete"+b);
//   deleteButton[0].addEventListener("click",delete_click,false);

    function delete_click(e){
      e.preventDefault();
      const id = e.target.parentNode.dataset.id;
      const rowElement = document.querySelector('.add' + id);
      rowElement.parentNode.removeChild(rowElement);
      const content = rowElement.querySelector('.The_link').textContent
      delete_database(content);
}

async function delete_database(content){
  console.log(content);
    const api_url = '/api/urls/'+content;
    const response = fetch(api_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    console.log("this is response" + response);
            if(response.ok){
             console.log("successful deleted")
            }
        else {
            throw new Error('Error retrieving urls from server');
          }
        }

configureWebSocket();

