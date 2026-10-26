const headerNavbarEl = document.querySelector(".header-navbar");
const headerNavbarTogglerEl = document.querySelector(".header-navbar-toggler");

if(headerNavbarEl && headerNavbarTogglerEl ) {
    headerNavbarTogglerEl.addEventListener("click",()=>{
        headerNavbarEl.classList.toggle("hidden")
    })
}

