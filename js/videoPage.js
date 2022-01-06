let {videoId,snippet} = JSON.parse(localStorage.getItem('clicked_video'))
    const api = "AIzaSyDPcUUlYywkswMFfAsw48WVknGCPGK3vQA";
    let url = `https://www.googleapis.com/youtube/v3/activitiespart=snippet%2CcontentDetails&channelId=${snippet.channelId}&maxResults=25&regionCode=tw&key=${api}`

    let video_div = document.getElementById("video_details");

    let iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = "100%"
    iframe.height = "100%";
    iframe.setAttribute("allowFullscreen","true");

  let title = document.createElement("p");
  title.textContent = `${snippet.title}`;

    video_div.append(iframe,title)


  const url1 = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=5&key=${api}&part=snippet`
      fetch(url1)
      .then((res)=>{
        res.json()
        .then((res)=>{
          trendingVideos(res.items);
          // console.log(res);
        })
      })
      .catch((error)=>{
        console.log(error);
      })

  let recommendation = document.querySelector("#recommendation");
  const trendingVideos = (items)=>{
  items.forEach((el)=>{

    
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let mainDiv = document.createElement("div")
    mainDiv.setAttribute('id','mainDiv');

    let thumbnail =document.createElement('img');
    thumbnail.src=el.snippet.thumbnails.high.url;
    thumbnail.height = "150";
    thumbnail.width = "230";

    let title = document.createElement('p');
    title.textContent =el.snippet.title;

    let channelName = document.createElement('p');
    channelName.textContent =el.snippet.channelTitle;
    channelName.setAttribute("id","channelName")

    let data_to_send = {//new way of creating a object if we only put the key its working fine
      snippet:el.snippet,
      videoId:el.id,
    }
  
    mainDiv.onclick=()=>{
      showVideo(data_to_send)
    }

    div2.append(title,channelName)
   div1.append(thumbnail);
   mainDiv.append(div1,div2);
   recommendation.append(mainDiv)
    
  })
// console.log(items)

}
function showVideo(data){
  localStorage.setItem('clicked_video',JSON.stringify(data))
  window.location.href="videoPage.html";
}

function showHome(){
  window.location.href ="index.html"
}