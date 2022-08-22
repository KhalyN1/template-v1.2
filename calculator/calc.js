
const range = document.getElementById('cost-range');
const costValue = document.querySelector('.range-value');

const RON_multiplier = 4.91;
const USD_multiplier = 1.03;

const dormsCheck = document.getElementById('dorms');
const submit = document.querySelector('.submit');

let countriesListByContinent;
let selectedCountry;
let dormsCost;
costValue.placeholder = range.value;
range.oninput = function() 
{
  costValue.value = this.value;
}
range.addEventListener('mousemove',  () =>
{
    let percent = range.value;
    let clr = `linear-gradient(to right, lightgray ${percent / 300}%, white ${percent / 300}%)`;
    range.style.background = clr;
})
costValue.addEventListener('input', () => 
{
    range.value = costValue.value;    
    let percent = range.value;
    let clr = `linear-gradient(to right, lightgray ${percent / 300}%, white ${percent / 300}%)`;
    range.style.background = clr;
})

async function addCountries()
{

    let queryList = ['[europe]', '[america]', '[oceania]']; // nu putem avea mai mult de 7 continente deeci vom hard coda pozitia lor in vector
    for (let i = 0; i < countriesListByContinent.length; i++)
        for (let j = 0; j < countriesListByContinent[i].countries.length; j++)
        {
            console.log(countriesListByContinent[i].countries[j].name)
            let country = document.createElement('div');
            country.classList.add('country');
            let countryName = document.createElement('h3');
            countryName.textContent = countriesListByContinent[i].countries[j].name;
            document.querySelector(queryList[i]).querySelector('.countries').appendChild(country);
        
            country.appendChild(countryName);
    
            country.addEventListener('click', () => {
                dormsCheck.checked = false;

                document.querySelectorAll('.country').forEach((countryItem) => // ineficient dar csf. Mai bine tine minte ultimul countryItem setat dar mi-e lene 
                {
                    countryItem.classList.remove('active')
                })

                selectedCountry = countriesListByContinent[i].countries[j];
                country.classList.add('active');
            })
        }
}
window.onload = addCountries;

function submitData()
{
    if (selectedCountry == null)
        return;

    submit.href = `./countries/${selectedCountry.name.toLowerCase()}.html`
    dormsCost = selectedCountry.dorms;
    localStorage.setItem('cost', costValue.value);
    localStorage.setItem('min', selectedCountry.costs.min);
    localStorage.setItem('max', selectedCountry.costs.max);
    console.log(localStorage.getItem('cost'));

    if(dormsCheck.checked)
        localStorage.setItem('dorms', dormsCost);
    else
        localStorage.setItem('dorms', 0);     
}
submit.addEventListener('click', submitData);

countriesListByContinent = 
[
    {
        "continent": "Europe",
        "countries":
        [
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 1500
                },
                "dorms": 1500
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "dorms": 1500
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "dorms": 1500
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "dorms": 1500
            },
            {
                "name": "Germania",
                "costs":
                {
                   "min": 3500,
                   "max": 18000
                },
                "dorms": 2200
            },
            {
                "name": "Germania",
                "costs":
                {
                   "min": 3500,
                   "max": 18000
                },
                "dorms": 2200
            },
        ]
    },
    {
        "continent": "America",
        "countries": 
        [
            {
                "name": "Canada",
                "costs":
                {
                   "min": 4500,
                   "max": 20500
                },
                "dorms": 2700
            },
        ]
    },
    {
        "continent": "Ocenia",
        "countries": 
        [
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
    }
]
