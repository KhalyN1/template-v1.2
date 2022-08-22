const options = document.querySelector('.degree-options');
const subjectOptions = options.querySelectorAll('.subject-card')
const subjectContainer = document.querySelector('.degree-results');
const subjectResults = subjectContainer.querySelectorAll('.subject-card');

const filterBtn = document.querySelector('.filter-btn');

let selectedSubjects = [];

let degrees; // scope-ul variabilelor globale e pe intreg site-ul / toate sursele -_-. Probabil ca nu-i ok si trebuie sa gasim alt cv.

subjectOptions.forEach((subject) =>
{
  subject.addEventListener('click', () =>
  {
    let card = document.createElement('div');
    let p = document.createElement ('p');
    card.classList.add('subject-card');
    p.textContent = subject.textContent;
    let btn = document.createElement('button');
    btn.classList.add('x-button');
    for (let i = 0; i < 2; i++)
    {
        let line = document.createElement('span');
        line.classList.add('x-line');
        btn.appendChild(line);
    }
  
    subjectContainer.appendChild(card);
    card.appendChild(p);
    card.appendChild(btn);
    
    subject.setAttribute('selected', 'true');   
    selectedSubjects.push(subject.querySelector('.subject-card p').textContent.replace('â', 'a').replace('ă', 'a')); // uite ce ma pui sa fac caline
    console.log(selectedSubjects);
    checkOptionNumber();

    document.querySelectorAll('.x-button').forEach((xBtn) =>
    {
    xBtn.addEventListener('click', () =>
    {
        let result = xBtn.parentElement
        result.parentElement.removeChild(result); // aici da o eroare, nu e de la mine, kktul merge oricum tho
        checkOptionNumber();
        subject.setAttribute('selected', 'false');
        const index = selectedSubjects.indexOf(subject.querySelector('.subject-card p').textContent.replace('â', 'a').replace('ă', 'a'));
        selectedSubjects.splice(index, 1);
    })
    })
  })
})

function checkOptionNumber()
{
    let optionCount = subjectContainer.children.length;
    if (optionCount > 0)
    {
        document.querySelector('.aid-text').setAttribute('style', 'display: none');
        console.log(optionCount);
    }
    else document.querySelector('.aid-text').setAttribute('style', 'display: block');

    if (optionCount === 3)
        document.querySelectorAll('[selected="false"]').forEach((unclicked) => unclicked.classList.add('inactive'));
    else
        document.querySelectorAll('[selected="false"]').forEach((unclicked) => unclicked.classList.remove('inactive'));
}

filterBtn.addEventListener('click', () =>
{
  let optionCount = subjectContainer.children.length;
  if (optionCount === 0) 
  {
    document.querySelector('.error-text').setAttribute('style', 'display: block');
    document.querySelector('.succes-text').setAttribute('style', 'display: none');
    return;
  }

  filterPrograms();
  document.querySelector('.error-text').setAttribute('style', 'display: none');
  document.querySelector('.succes-text').setAttribute('style', 'display: block');
})

function showPrograms(filteredDegrees)
{
    filteredDegrees.sort((a, b) => a.score > b.score ? -1 : 1); // sort dupa "score";
    filteredDegrees.forEach(degree => console.log(degree));
}

/** "When I wrote this code, only God and I knew how it worked. Now only God knows."/s */
function filterPrograms()
{
    if (selectedSubjects.length == 0)
        return;
    
    // ok deci va parcurge fiecare program din lista de programe <degrees> si va compara tagurile sale <subjects> cu materiile selectate <selectedSubjects>.
    // Daca gaseste o materie data egala cu tagul programului, adauga programul in arrayul de programe relevante <filteredDegrees>, si ii seteaza "score" la 1 (daca exista deja, score++).
    // Afisarea se va face pe <filteredDegrees>, sortat dupa "score" crescator. Astfel, programele relevante sunt afisate primele.
    var filteredDegrees = [];
    degrees.forEach(degree =>
    {
        selectedSubjects.forEach(subject =>
        {
            if (degree.subjects.includes(subject))
            {
                let found = false;
                for (let i = 0; i < filteredDegrees.length; i++)
                {
                    if (filteredDegrees[i].name == degree.name)
                    {
                        filteredDegrees[i].score += 1;
                        found = true;
                        break;
                    }
                }
                if (!found)
                    filteredDegrees.push({ "name": degree.name, "score": 1 });
            }
        })
    })
    showPrograms(filteredDegrees);
    filteredDegrees.length = 0; // filteredDegrees.clear() - pentru ca avem functie .includes dar nu avem .clear; ms js
}

degrees = [
    {
        "name": "Computer Science",
        "subjects": ["Matematica", "Informatica"]
    },
    {
        "name": "Software and Engineer",
        "subjects": ["Matematica", "Informatica"]
    },
    {
        "name": "Game Dev",
        "subjects": ["Informatica", "Fizica"]
    },
    {
        "name": "Contabilitate",
        "subjects": ["Matematica", "Economie"]
    },
    {
        "name": "Arhitectura si Constructii",
        "subjects": ["Matematica", "Fizica,", "Desen"]
    },
    {
        "name": "Inginerie Aerospatiala",
        "subjects": ["Matematica", "Fizica"]
    },
    {
        "name": "Arta si Design",
        "subjects": ["Desen", "Istorie"]
    },
    {
        "name": "Business si Managemenet",
        "subjects": ["Psihologie, Economie"]
    },    
    {
        "name": "Inginerie Chimica",
        "subjects": ["Chimie"]
    },
    {
        "name": "Criminologie",
        "subjects": ["Chimie", "Biologie"]
    },
    {
        "name": "Inginerie Electrica",
        "subjects": ["Fizica"]
    },
    {
        "name": "Finante",
        "subjects": ["Economie", "Matematica"]
    },
    {
        "name": "Cinematografie",
        "subjects": ["Istorie", "Desen", "Engleza"]
    },
    {
        "name": "Jurnalism",
        "subjects": ["Engleza", "Istorie", "Psihologie"]
    },
    {
        "name": "Drept",
        "subjects": ["Istorie", "Psihologie"]
    },
    {
        "name": "Marketing",
        "subjects": ["Desen", "Economie", "Psihologie"]
    },
    {
        "name": "Inginerie Mecanica",
        "subjects": ["Matematica", "Fizica"]
    },
    {
        "name": "Medicina",
        "subjects": ["Biologie", "Chimie"]
    },
    {
        "name": "Biofizica",
        "subjects": ["Biologie", "Fizica"] // btw nu cred ca asta-i biofizica chief 
    },
    {
        "name": "Biochimie",
        "subjects": ["Biologie", "Chimie"]
    },
    {
        "name": "Biologie Moleculara",
        "subjects": ["Biologie"]
    },
    {
        "name": "Medicina Veterinara",
        "subjects": ["Biologie", "Chimie"]
    },
    {
        "name": "Psihologie",
        "subjects": ["Psihologie"]
    },
    {
        "name": "Politica",
        "subjects": ["Istorie", "Psihologie"]
    },
    {
        "name": "Mc. Donald's",
        "subjects": ["Desen", "Istorie", "Psihologie"] // sau noi astia de pe info (nu o sa gasim job)
    },
] 


//progress bar + slider, in versiunea actuala nu exista
/*
document.querySelectorAll('.progress-bar').forEach(calculateProgress);
const checkProgress = () => 
{
  document.querySelectorAll('.progress-bar').forEach(calculateProgress);
}
window.addEventListener("resize", checkProgress);

document.addEventListener('click', e => {
        let handle;
        if (e.target.matches('.handle'))
            handle = e.target;
        else 
           handle = e.target.closest('.handle');
        
        if (handle != null)
        {
            handleClick(handle);
        }
})

function calculateProgress(progressBar)
{
       progressBar.innerHTML = '';
       const slider = document.querySelector('.slider');
       const itemCount = slider.children.length;
        const itemsPerScreen = parseInt(
             getComputedStyle(slider).getPropertyValue('--items-per-screen'));
             const sliderIndex = parseInt(
              getComputedStyle(slider).getPropertyValue('--slider-index'))
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);
        console.log(itemCount);
        for (let i = 0; i < progressBarItemCount; i++)
        {
           const item = document.createElement('div');
           item.classList.add('progress-item');
           if (i === sliderIndex)
           {
              item.classList.add('active');
           }
           progressBar.append(item);
        }
}
function handleClick(handle)
{
        const progressBar = handle.closest('.row').querySelector('.progress-bar');
        const slider = document.querySelector('.slider');
        const sliderIndex = parseInt(
            getComputedStyle(slider).getPropertyValue('--slider-index'));
        const itemCount = slider.children.length;
        const itemsPerScreen = parseInt(
             getComputedStyle(slider).getPropertyValue('--items-per-screen'));
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);
        if (handle.classList.contains('left'))
        {
            if (sliderIndex <= 0)
            {
              slider.style.setProperty('--slider-index', progressBarItemCount - 1);
              progressBar.children[0].classList.remove('active');
              progressBar.children[progressBarItemCount - 1].classList.add('active');
            }
               
            else 
            {
              slider.style.setProperty('--slider-index', sliderIndex - 1);
              progressBar.children[sliderIndex].classList.remove('active');
              progressBar.children[sliderIndex - 1].classList.add('active');
           }
               
        
        }
     
        if (handle.classList.contains('right'))
        {
            if (sliderIndex >= progressBarItemCount - 1)
            {
              slider.style.setProperty('--slider-index', 0);
              progressBar.children[sliderIndex].classList.remove('active');
              progressBar.children[0].classList.add('active');
            }
             
            else
            {
              slider.style.setProperty('--slider-index', sliderIndex + 1);
              progressBar.children[sliderIndex].classList.remove('active');
              progressBar.children[sliderIndex + 1].classList.add('active');
            }
              
        }
}
*/