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