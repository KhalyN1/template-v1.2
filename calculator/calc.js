
const range = document.getElementById('cost-range');
const costValue = document.querySelector('.range-value');

const europeGrid = document.querySelector('[europe]');
const americaGrid = document.querySelector('[america]');
const oceaniaGrid = document.querySelector('[oceania]');

const RON_multiplier = 4.91;
const USD_multiplier = 1.03;

range.oninput = function() 
{
  costValue.textContent = this.value;
}
range.addEventListener('mousemove',  () =>
{
    let percent = range.value;
    let clr = `linear-gradient(to right, lightgray ${percent / 150}%, white ${percent / 150}%)`;
    range.style.background = clr;
})

let countries =
[
    {
        "name": "Olanda",
        "continent": "Europe",
        "costs":
        {
           "min": 2500,
           "max": 15000
        },
        "dorms": 1500
    },
    {
        "name": "Olanda",
        "continent": "Europe",
        "costs":
        {
           "min": 2500,
           "max": 15000
        },
        "dorms": 1500
    },
    {
        "name": "Olanda",
        "continent": "Europe",
        "costs":
        {
           "min": 2500,
           "max": 15000
        },
        "dorms": 1500
    },
    {
        "name": "Olanda",
        "continent": "Europe",
        "costs":
        {
           "min": 2500,
           "max": 15000
        },
        "dorms": 1500
    },
    {
        "name": "Germania",
        "continent": "Europe",
        "costs":
        {
           "min": 3500,
           "max": 18000
        },
        "dorms": 2200
    },
    {
        "name": "Germania",
        "continent": "Europe",
        "costs":
        {
           "min": 3500,
           "max": 18000
        },
        "dorms": 2200
    },
    {
        "name": "Germania",
        "continent": "Europe",
        "costs":
        {
           "min": 3500,
           "max": 18000
        },
        "dorms": 2200
    },
    {
        "name": "Germania",
        "continent": "Europe",
        "costs":
        {
           "min": 3500,
           "max": 18000
        },
        "dorms": 2200
    },
    {
        "name": "Canada",
        "continent": "America",
        "costs":
        {
           "min": 4500,
           "max": 20500
        },
        "dorms": 2700
    },
    
    {
        "name": "Australia",
        "continent": "Oceania",
        "costs":
        {
           "min": 3800,
           "max": 15500
        },
        "dorms": 2100
    }
] 
async function addCountries()
{
    for (let i = 0; i <= countries.length; i++)
    {
        let country = document.createElement('div');
        country.classList.add('country');
        let countryName = document.createElement('h3');
        countryName.textContent = countries[i].name;
        if (countries[i].continent === 'Europe')
            europeGrid.querySelector('.countries').appendChild(country);
        if (countries[i].continent === 'America')
            americaGrid.querySelector('.countries').appendChild(country);      
        if (countries[i].continent === 'Oceania')
            oceaniaGrid.querySelector('.countries').appendChild(country);
        country.appendChild(countryName);
    
        country.addEventListener('click', ()=>
        {
            document.querySelectorAll('.country').forEach((countryItem) =>
            {
                countryItem.classList.remove('active')
            })
            country.classList.add('active');
        })
    }
}
window.onload = addCountries;

function checkCostRange()
{
    let countryGroup = document.querySelectorAll('.country');
    for (let i = 0; i < countries.length; i++)
    {
        countryGroup.forEach((country) =>
        {
            if (!(country.classList.contains('active')))
                return;
            
            if (country.textContent === countries[i].name)
            {
                range.min = countries[i].costs.min;
                range.max = countries[i].costs.max;
            }
        })
    }
    costValue.textContent = range.value;
}
document.querySelectorAll('.country').forEach(addEventListener('click', checkCostRange));

