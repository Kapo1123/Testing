// let links = ["https://i.gifer.com/4jcE.mp4","https://i.gifer.com/19ps.mp4","https://i.gifer.com/JaBP.mp4","https://i.gifer.com/BZXa.mp4","https://i.gifer.com/ZKDW.mp4" ,"https://i.gifer.com/EyoD.mp4"];
let links =[];
async function get_links() {
    // let links = ["https://i.gifer.com/4jcE.mp4","https://i.gifer.com/19ps.mp4","https://i.gifer.com/JaBP.mp4","https://i.gifer.com/BZXa.mp4","https://i.gifer.com/ZKDW.mp4" ,"https://i.gifer.com/EyoD.mp4"];
        
      // Get the links from the service
      console.log("The function is working")
        try{const response = await fetch('/api/links');
                console.log("Iam here");
                if(response.ok){
            links = await response.json();
            // links.splice(0, links.length, ...newLinks);
            console.log(links);}
            else {
                throw new Error('Error retrieving links from server');
              }}
              catch (error) {
                console.error(error);
              }
              
        open_website();
        }

function open_website(){
    const grid_class = document.getElementsByClassName("grid")[0];
for(i=0; i<links.length;i++){

const div_class = document.createElement("div");
div_class.className = "card";
div_class.id = "first"
    const div_class2 = document.createElement("div");
    div_class2.id = "v"+i;
    div_class2.className ="video";
const video_class = document.createElement("video");
video_class.autoplay = true;
video_class.loop = true;
video_class.className = "gif" 
video_class.id = "video";
const source_class = document.createElement("source");
source_class.src = links[i];
source_class.type = "video/ogg";
video_class.appendChild(source_class);
div_class2.appendChild(video_class);
div_class.appendChild(div_class2);
grid_class.appendChild(div_class);
}
}
get_links();


