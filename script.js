const nav = document.querySelector(".primary-nav")
const navToggle = document.querySelector(".mobile-nav-toggle")
const searchButton = document.querySelector('.search-btn');
const searchWrap = document.querySelector('.search-wrap');
const searchDisplay = document.querySelector(".results-display");
const search = document.querySelector('#search');

//const closeButton = document.querySelector('.close');


var articlesLoaded = false;
var articles;

navToggle.addEventListener("click", () => {
  const visible = nav.getAttribute('data-visible');
  if (visible === "false")
  {
   nav.setAttribute('data-visible', true);
   navToggle.setAttribute('aria-expanded', true);
  }
  else if (visible === "true")
  {
   nav.setAttribute('data-visible', false);
   navToggle.setAttribute('aria-expanded', false);
  }
});

/*closeButton.addEventListener('click', () =>
{
    popupForm.style.display = 'none';
})*/

searchButton.addEventListener('click', () =>
{

  const isVisible = search.getAttribute('visible');
  if (isVisible === "false")
   {
    search.setAttribute('visible', true);
    searchWrap.setAttribute('visible', true)
   }
   if (isVisible === "true")
   {
    search.setAttribute('visible', false);
    searchWrap.setAttribute('visible', false);
   }
})

search.addEventListener("input", () =>
{
    ClearResults();
    
    if (search.value == "") // || search.value.length < 3) // daca vr fancy.
        return;

    for (let i = 0; i < articles.length; i++)
    {
        if (CompareArticleTags(search.value, articles[i].tags))
        {
            ShowResult(articles[i]);    
            continue;
        }
        if (articles[i].name.toLowerCase().includes(search.value.toLowerCase())) // CompareArticleName();
        {
            ShowResult(articles[i]);
        }    
    }
});

// Searchbar functions

function CompareArticleTags(search, tags)
{
    search = search.toLowerCase();
    for (let j = 0; j < tags.length; j++)
        if (search == tags[j].toLowerCase())
            return true;
    return false;
}

function ShowResult(result)
{
    console.log(result.name);
    var a = document.createElement("a");
    const node = document.createTextNode(result.name);
    a.title = "hyperlink to article";
    a.href = "https://" + result.link;
    a.appendChild(node);
    searchDisplay.appendChild(a);
}

function ClearResults()
{
    if (searchDisplay.innerHTML != "")
        searchDisplay.innerHTML = "";
}

function GetArticles()
{
    if (articlesLoaded)
        return;
    
    // To be decommented 
    /*fetch("https://linksmk123") // de inlocuit cu un link cand avem
        .then(res=>res.json())
        .then(data=>
        {
            articles = data;
            // console.log("Articles Loaded.");
            articlesLoaded = true;
        });
    */
    // For Debugging Reasons. To be commented in prod.
    articles = [
        {
            "name": "Mama ta este neserioasa",
            "tags": ["socant", "viata satului", "articol"],
            "link": "mama-ta-este-neserioasa"
        },
    
        {
            "name": "Noile schimbari ale programei scolare din 2023",
            "tags": ["programa scolara", "invatamant", "articol"],
            "link": "noile-schimbari-ale-programei-scolare-din-2023"
        },
    
        {
            "name": "Scolile se inchid din 2024",
            "tags": ["breaking", "programa scolara", "invatamant", "articol"],
            "link": "scolile-se-inchid-din-2024"
        },
    
        {
            "name": "Universitatea de Medicina din Sloboz",
            "tags": ["romania", "sloboz", "invatamant", "medicina", "universitate"],
            "link": "universitatea-de-medicina-din-sloboz"
        }
    ];
    console.log("Articles Loaded.");
    articlesLoaded = true;
    console.log(articles);
    // end debugging reasons...
}


