const nav = document.querySelector(".primary-nav")
const navToggle = document.querySelector(".mobile-nav-toggle")
const searchButton = document.querySelector('.search-btn');
const searchWrap = document.querySelector('.search-wrap');
const search = document.getElementById('search');
const askButton = document.getElementById('solicita');
const closeButton = document.querySelector('.close');
const popupForm = document.querySelector('.popup');




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
askButton.addEventListener('click', () =>
{
    popupForm.style.display = 'flex';
})

closeButton.addEventListener('click', () =>
{
    popupForm.style.display = 'none';
})

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


