const housingRadioGroup = document.querySelector('.option.housing');
const langRadioGroup = document.querySelector('.option.lang');
const paymentRadioGroup = document.querySelector('.option.payment');
const flightRadioGroup = document.querySelector('.option.flight');
const costInput = document.querySelector('hero-input');
const submit = document.querySelector('hero-submit');

let flightModifier;
let paymentModifier;
let housingModifier;
let langModifier; 
let countriesListByContinent;
let selectedCountry;

function ResetCosts()
{
    document.querySelectorAll('.cost-line').forEach(costValue => costValue.querySelector('p').textContent = 'N/A');
    document.querySelector('.cost-amount').textContent = 'N/A';
}
window.onload = () =>
{
    AddCountries();
    ResetCosts();
};

document.querySelectorAll('.radio-option').forEach(radio => 
    {
       
        radio.addEventListener('click', () =>
        {
            let checked = radio.getAttribute('aria-checked');
            const radioGroup = radio.parentElement.querySelectorAll('.radio-option');
            radioGroup.forEach(radioItem => radioItem.setAttribute('aria-checked', false));
            if (checked === "true")
                radio.setAttribute('aria-checked', false);
            else
                radio.setAttribute('aria-checked', true);
        })
    })

async function AddCountries()
{

    let queryList = ['[europe]', '[america]', '[oceania]', '[asia]']; // nu putem avea mai mult de 7 continente deeci vom hard coda pozitia lor in vector
    for (let i = 0; i < countriesListByContinent.length; i++)
        for (let j = 0; j < countriesListByContinent[i].countries.length; j++)
        {
            //console.log(countriesListByContinent[i].countries[j].name)
            let country = document.createElement('div');
            country.classList.add('country');
            let countryName = document.createElement('h3');
            countryName.textContent = countriesListByContinent[i].countries[j].name;
            document.querySelector(queryList[i]).querySelector('.countries').appendChild(country);
        
            country.appendChild(countryName);
    
            country.addEventListener('click', () => {
                //dormsCheck.checked = false;

                document.querySelectorAll('.country').forEach((countryItem) => // ineficient dar csf. Mai bine tine minte ultimul countryItem setat dar mi-e lene 
                {
                    countryItem.classList.remove('active')
                })
                country.classList.add('active');
                selectedCountry = countriesListByContinent[i].countries[j];
                
            })
        }
}

function GetRadioData()
{
    let housingSelected;
    let langSelected;
    let paymentSelected;
    let flightSelected;
    const housingRadioGroup = document.querySelector('.option.housing');
    const langRadioGroup = document.querySelector('.option.lang');
    const paymentRadioGroup = document.querySelector('.option.payment');
    const flightRadioGroup = document.querySelector('.option.flight');

    housingRadioGroup.querySelectorAll('input[type="radio"').forEach(radio =>
    {
        if (radio.parentElement.getAttribute('aria-checked') === "true")
        {
            housingSelected = true;
            housingModifier = radio.value;
        }
    })

    langRadioGroup.querySelectorAll('input[type="radio"').forEach(radio =>
    {
        if (radio.parentElement.getAttribute('aria-checked') === "true")
        {
            langSelected = true; 
            langModifier = radio.value;
        }
    })

    paymentRadioGroup.querySelectorAll('input[type="radio"').forEach(radio =>
    {
        if (radio.parentElement.getAttribute('aria-checked') === "true")
        {
            paymentSelected = true;
            paymentModifier = radio.value;
            console.log("payment modifier: "+ paymentModifier);
        }
    })

    flightRadioGroup.querySelectorAll('input[type="radio"').forEach(radio =>
    {
        if (radio.parentElement.getAttribute('aria-checked') === "true")
        {
            flightSelected = true;  
            flightModifier = radio.value;
            console.log(flightModifier);
        }
    })

    if (!langSelected  || !flightSelected || !housingSelected || !paymentSelected)
    {
        alert('selecteaza tot');
        return false;
    }
         
    console.log(housingSelected);
    console.log(langSelected);
    console.log(paymentSelected);
    console.log(flightSelected);

    return true;
}
function SubmitData()
{
     if (selectedCountry === null)
        return;
    
    let costInput = document.querySelector('.hero-input');
    
    if (costInput.value === null || isNaN(costInput.value))
        return;
    
    let data = GetRadioData();
    console.log(data);
    if (!data) 
      return;
    
    let valSchool = costInput.value;
    let valMin = selectedCountry.costs.min;
    let valMax = selectedCountry.costs.max;
    let valDorms = ((housingModifier == 0) ? selectedCountry.housingCosts.house / paymentModifier : selectedCountry.housingCosts.dorms / paymentModifier);
    let valFood = selectedCountry.food;
    let valTransport = selectedCountry.transport;
    let valFlight = selectedCountry.flightCost * flightModifier;
    let valLang = ((langModifier == 1)? selectedCountry.lang : 0)
    let costAmount = document.querySelector('.cost-amount');
    let totalCost = document.querySelector('.total-cost > p');
    let schoolCost = document.querySelector('.main-cost > p');
    let dormsCost = document.querySelector('.dorms-cost > p');
    let tripCost = document.querySelector('.trips-cost > p');
    let addedCost = document.querySelector('.additional-cost > p');
    

    costAmount.textContent = `${valMin} - ${valMax}`;
    totalCost.textContent = `${Math.ceil(valDorms + valFood + valTransport + parseInt(valSchool) + valFlight + valLang)}`;
    schoolCost.textContent = `${valSchool}`;
    dormsCost.textContent = `${valDorms}`;
    tripCost.textContent = `${valFlight}`;
    addedCost.textContent = `${Math.ceil(valFood + valTransport + valLang)}`;
}
document.querySelector('.hero-submit').addEventListener('click', SubmitData);

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
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
            },
            {
                "name": "Germania",
                "costs":
                {
                   "min": 3500,
                   "max": 18000
                },
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
            },
            {
                "name": "Germania",
                "costs":
                {
                   "min": 3500,
                   "max": 18000
                },
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
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
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
            },
        ]
    },
    {
        "continent": "Oceania",
        "countries": 
        [
            {
                "name": "Australia",
                
                "costs":
                {
                   "min": 3800,
                   "max": 15500
                },
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
            }
        ]
    },
    {
        "continent": "Asia",
        "countries": 
        [
            {
                "name": "Japonia",
                "costs":
                {
                   "min": 4500,
                   "max": 18500
                },
                "housingCosts":
                {
                    "house": 2500,
                    "dorms": 1500
                },
                "transport": 300,
                "food": 300,
                "lang": 300,
                "flightCost" : 500
            }
        ]
    }
]
