const options = document.querySelector('.degree-options');
const subjectOptions = options.querySelectorAll('.subject-card')
const subjectContainer = document.querySelector('.degree-results');
const subjectResults = subjectContainer.querySelectorAll('.subject-card');

const filterBtn = document.querySelector('.filter-btn');

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

    checkOptionNumber();

     document.querySelectorAll('.x-button').forEach((xBtn) =>
      {
         xBtn.addEventListener('click', () =>
        {
            let result = xBtn.parentElement
            result.parentElement.removeChild(result);
            checkOptionNumber();
            subject.setAttribute('selected', 'false');
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
     {
       document.querySelectorAll('[selected="false"]').forEach((unclicked) => unclicked.classList.add('inactive'));
     }
     else
     {
      document.querySelectorAll('[selected="false"]').forEach((unclicked) => unclicked.classList.remove('inactive'));
     }
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

  document.querySelector('.error-text').setAttribute('style', 'display: none');
  document.querySelector('.succes-text').setAttribute('style', 'display: block');
        
})



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