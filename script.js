const api_key = "576835fb5e1548e1a6933d16be269fe1"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', () => fetchNews("India"))

async function fetchNews(query) {
    const x = await fetch(`${url}${query}&apiKey=${api_key}`)
    const data = await x.json();
    // console.log(data)
    bindData(data.articles)
}

function bindData(articles) {
    const cardcontainer = document.getElementById('cards-container');
    const cardstemp = document.getElementById('news-card-temp');

    cardcontainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardclone = cardstemp.content.cloneNode(true);
        fillData(cardclone,article)
        cardcontainer.appendChild(cardclone);
        

    });
}

function fillData(cardclone,article) {
    const newsImg = cardclone.querySelector('#news_img') 
    const newsTitle = cardclone.querySelector('#news_title') 
    const newsSource = cardclone.querySelector('#news_source') 
    const newsDesc = cardclone.querySelector('#news_desc') 
    
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    const date =new Date(article.publishedAt).toLocaleTimeString('en-US',{
        timeZone:'Asia/Kolkata'
    })
    newsSource.innerHTML=`${article.source.name}.${date}`
}

let CurSelectitem =null;
function OnNavitem(id){
    fetchNews(id);
    const navitem=document.getElementsById(id)
    CurSelectitem?.classList.remove('active');
    CurSelectitem=navitem;
    CurSelectitem.classList.add('active')

}
const searchButton=document.getElementById('search-btn')
const searchText=document.getElementById('search-text')

searchButton.addEventListener('click',()=>{
    const query =searchText.value;
    if(!query) return;
    fetchNews(query)
   searchText.value='';
})