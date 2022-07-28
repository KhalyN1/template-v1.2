const sidebarToggle = document.querySelector('.sidebar-btn')
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () =>
{
   const active = sidebar.getAttribute('active')
   if (active === 'false')
   {
    sidebar.setAttribute('active', true);
    sidebarToggle.setAttribute('sidebar-active', true);
   }
   else if (active === 'true')
   {
    sidebar.setAttribute('active', false);
    sidebarToggle.setAttribute('sidebar-active', false);
   }
})