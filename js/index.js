const api = "AIzaSyDPcUUlYywkswMFfAsw48WVknGCPGK3vQA";

const trendingUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=20&key=${api}&part=snippet`
fetch(trendingUrl)
.then((res)=>{
  res.json()
  .then((res)=>{
    trendingVideos(res.items);
    // console.log(res.items);
  })
})
.catch((error)=>{
  console.log(error);
})


async function searchVideo(){
    try{
        let video_query = document.getElementById("video").value;
        // console.log(video_query);
        let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${video_query}&type=video&key=${api}&maxResults=20&`);
        let data = await response.json();

        let videos = data.items;
        appendVideos(videos);
        // console.log(videos);
    }
    catch (error){
        console.log(error);
    }

}

let trendingDiv = document.querySelector(".trending_result");
const trendingVideos = (items)=>{
  console.log(items);
  // let videoDiv =document.querySelector(".videos")
  
  let h1tagDiv = document.createElement("div");
  let h1Trending = document.createElement("h1")
  

  h1tagDiv.append(h1Trending)
  
  h1Trending.textContent = "Trending Videos In India";
  items.forEach((el)=>{
    let{id} =el

    let thumbnailTrend = document.createElement('img');
    thumbnailTrend.src = el.snippet.thumbnails.high.url;
    thumbnailTrend.height = "200";
    thumbnailTrend.width = "280";
    
    
    let titleTrend = document.createElement('p');
    titleTrend.textContent =el.snippet.title;

    let channelNameTrend = document.createElement('p');
    channelNameTrend.textContent =el.snippet.channelTitle;
    channelNameTrend.setAttribute('class','channelNameTrend');
    

    let iframe_div = document.createElement("div");
    iframe_div.setAttribute('id','iframe_div1')

    // let iframe = document.createElement("iframe");
    // iframe.setAttribute('id','iframeTrending')
    // iframe.src = `https://www.youtube.com/embed/${id}`;
    // iframe.height = "170";
    // iframe.width = "280";
    // iframe.setAttribute("allowFullscreen","true");
    let data_to_send = {//new way of creating a object if we only put the key its working fine
      snippet:el.snippet,
      videoId:id,
    }

    iframe_div.onclick=()=>{
      showVideo(data_to_send)
    }

    iframe_div.append(thumbnailTrend,titleTrend,channelNameTrend);
    trendingDiv.append(iframe_div);
    
  })
// console.log(items)

}


const appendVideos = (arr)=>{
  // console.log(items,data)
  const results_div = document.getElementById("search_results");
    trendingDiv.innerHTML = "";
    results_div.innerHTML =null; //Arrow Function

    arr.forEach(({snippet, id:{videoId}})=>{


    // let {id:{videoId}} = el; //Nested Destructing
    // // console.log(videoId); 
    // let{snippet:{title}} =el;

    // let{snippet:{channelTitle}} =el;

    // let{snippet:{description}} =el;

    // let{snippet:{thumbnails},thumbnails:{medium}} = el;
    // console.log(title);

    // iframe - for displaying media 

    let iframe_div = document.createElement("div");
    iframe_div.setAttribute('id','iframe_div2')

    // let iframe = document.createElement("iframe");
    // iframe.setAttribute('id','iframe1')
    // iframe.src = `https://www.youtube.com/embed/${videoId}`;
    // iframe.height = "170";
    // iframe.width = "280";
    // iframe.setAttribute("allowFullscreen","true");

    let thumbnail = document.createElement("img");
    thumbnail.src = snippet.thumbnails.medium.url;
    console.log(thumbnail);
    thumbnail.height = "180";
    thumbnail.width = "280";

    let title1 = document.createElement('p');
    title1.textContent =snippet.title;

    let channelName = document.createElement('p');
    channelName.textContent =snippet.channelTitle;
    channelName.setAttribute('class','channelName')
   
    let data_to_send = {//new way of creating a object if we only put the key its working fine
      snippet,
      videoId
    }

    results_div.onclick=()=>{
      showVideo(data_to_send)
    }
   
    iframe_div.append(thumbnail,title1,channelName);

    // main_div.append(iframe_div,details_div)
    results_div.append(iframe_div);
});

};
function showVideo(data){
  localStorage.setItem('clicked_video',JSON.stringify(data))
  window.location.href="videoPage.html";
}
 
const menu = document.querySelector('#menu');
// console.log(menu);
const sidebar = document.querySelector('.sidebar');
// console.log(sidebar);

menu.addEventListener('click', function () {
  sidebar.classList.toggle('show-sidebar');
});

function showHome(){
  window.location.href ="index.html"
}