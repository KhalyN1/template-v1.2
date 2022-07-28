const input = document.getElementById("search");
const display = document.querySelector(".results-display");

var articlesLoaded = false;
var articles;

function CompareArticleTags(input, tags)
{
    input = input.toLowerCase();
    for (let j = 0; j < tags.length; j++)
        if (input == tags[j].toLowerCase())
            return true;
    return false;
}

function ShowResult(result)
{
    var a = document.createElement("a");
    const node = document.createTextNode(result.name);
    a.title = "hyperlink to article";
    a.href = "https://" + result.link;
    a.appendChild(node);
    display.appendChild(a);
}

function ClearResults()
{
    if (display.innerHTML != "")
        display.innerHTML = "";
}

input.addEventListener("input", () =>
{
    ClearResults();
    
    if (input.value == "") // || input.value.length < 3) // daca vr fancy.
        return;

    for (let i = 0; i < articles.length; i++)
    {
        if (CompareArticleTags(input.value, articles[i].tags))
        {
            ShowResult(articles[i]);    
            continue;
        }
        if (articles[i].name.toLowerCase().includes(input.value.toLowerCase())) // CompareArticleName();
        {
            ShowResult(articles[i]);
        }    
    }
});

function GetArticles()
{
    if (articlesLoaded)
        return;
    
    // To be decommented 
    fetch("https://linksmk123")
        .then(res=>res.json())
        .then(data=>
        {
            articles = data;
            // console.log("Articles Loaded.");
            articlesLoaded = true;
        });
    
    // For Debugging Reasons. To be commented in prod.
    /*articles = [
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
    console.log(articles);*/
    // end debugging reasons...
}