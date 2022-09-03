
const RON_multiplier = 4.91;
const USD_multiplier = 1.03;

let countriesListByContinent;
let selectedCountry;

document.querySelectorAll('.radio-option').forEach(radio => 
    {
       
        radio.addEventListener('click', () =>
        {
            const checked = radio.getAttribute('aria-checked');
            const radioGroup = radio.parentElement.querySelectorAll('.radio-option');
            radioGroup.forEach(radioItem => radioItem.setAttribute('aria-checked', false));
            if (checked === "true")
                radio.setAttribute('aria-checked', false);
                radio.querySelector('input[type="radio"]').setAttribute('aria-checked', false);
            if (checked === "false")
                radio.setAttribute('aria-checked', true);
                radio.querySelector('input[type="radio"]').setAttribute('aria-checked', true);
        })
    })

const costInput = document.querySelector('hero-input');
const submit = document.querySelector('hero-submit');

/*range.oninput = function() 
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
})*/

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
const housingRadioGroup = document.querySelector('.option.housing');
const langRadioGroup = document.querySelector('.option.lang');
const paymentRadioGroup = document.querySelector('.option.payment');
const flightRadioGroup = document.querySelector('.option.flight');

let flightModifier;
let paymentModifier;

function GetRadioData()
{
    let selectedAll;
    let housingSelected;
    let langSelected;
    let paymentSelected;
    let flightSelected;
    const housingRadioGroup = document.querySelector('.option.housing');
    const langRadioGroup = document.querySelector('.option.lang');
    const paymentRadioGroup = document.querySelector('.option.payment');
    const flightRadioGroup = document.querySelector('.option.flight');

    // in baza de date o sa mai fie o variabila de "house" in vectorul de housingCosts si valoarea input-ului o sa fie index-ul la care se afla
    housingRadioGroup.querySelectorAll('input[type="radio"').forEach(radio =>
    {
        if (radio.getAttribute('aria-checked') === "true")
        {
            housingSelected = true;
        }
    })

    //o sa mai fie o variabila "lang" si daca valoarea input-ului e 'da' adauga si costul meditatiilor la costuri aditionale
    langRadioGroup.querySelectorAll('input[type="radio"').forEach(radio =>
    {
        if (radio.getAttribute('aria-checked') === "true")
        {
            langSelected = true; 
        }
    })

    //imparte de camin / casa la 2 daca e cu inca o persoana
    paymentRadioGroup.querySelectorAll('input[type="radio"').forEach(radio =>
    {
        if (radio.getAttribute('aria-checked') === "true")
        {
            paymentSelected = true;
            paymentModifier = radio.value;
            console.log(paymentModifier);
        }
    })
    //inca o variabla de "flight costs" care inmultita cu nr de zboruri selectat
    flightRadioGroup.querySelectorAll('input[type="radio"').forEach(radio =>
    {
        if (radio.getAttribute('aria-checked') === "true")
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
    let valDorms = selectedCountry.dorms;
    let valFood = selectedCountry.food;
    let valTransport = selectedCountry.transport;
 
    let costAmount = document.querySelector('.cost-amount');
    let totalCost = document.querySelector('.total-cost > p');
    let schoolCost = document.querySelector('.main-cost > p');
    let dormsCost = document.querySelector('.dorms-cost > p');
    let addedCost = document.querySelector('.additional-cost > p');
    

    costAmount.textContent = `${valMin} - ${valMax}`;
    totalCost.textContent = `${Math.ceil(valDorms + valFood + valTransport + parseInt(valSchool))}`;
    schoolCost.textContent = `${valSchool}`;
    dormsCost.textContent = `${valDorms}`;
    addedCost.textContent = `${Math.ceil(valFood + valTransport)}`;
}
document.querySelector('.hero-submit').addEventListener('click', SubmitData);
/*
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
*/
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
                "dorms": 1500,
                "transport": 300,
                "food": 300
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "dorms": 1500,
                "transport": 300,
                "food": 300
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "dorms": 1500,
                "transport": 300,
                "food": 300
            },
            {
                "name": "Olanda",
                "costs":
                {
                   "min": 2500,
                   "max": 15000
                },
                "dorms": 1500,
                "transport": 300,
                "food": 300
            },
            {
                "name": "Germania",
                "costs":
                {
                   "min": 3500,
                   "max": 18000
                },
                "dorms": 2200,
                "transport": 300,
                "food": 300
            },
            {
                "name": "Germania",
                "costs":
                {
                   "min": 3500,
                   "max": 18000
                },
                "dorms": 2200,
                "transport": 300,
                "food": 300
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
                "dorms": 2700,
                "transport": 300,
                "food": 300
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
                "dorms": 2100,
                "transport": 300,
                "food": 300
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
                "dorms": 2350,
                "transport": 300,
                "food": 300
            }
        ]
    }
]
