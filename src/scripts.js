function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if(localStorageTheme !== null) {
        return localStorageTheme;
    }
    if(systemSettingDark.matches) {
        return "dark";
    } 
    return "light";
}
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

function toggleTheme({ newTheme, button }) {
    // update the button text
    const newCta = newTheme === "dark" ? "fa-sun" : "fa-moon";
    const oldCta = newTheme === "dark" ? "fa-moon" : "fa-sun";
    button.classList.toggle(oldCta);
    button.classList.toggle(newCta);

    // use an aria-label if you are omitting text on the button
    // and using sun/moon icons, for example
    const newText = newTheme === "dark" ? "Change to light mode" : "Change to dark mode";
    button.setAttribute("aria-label", newText);

    // update theme attribute on HTML to switch theme in CSS
    document.querySelector("html").setAttribute("data-theme", newTheme);

    // update the currentThemeSetting in memory
    currentThemeSetting = newTheme;
}

var i = 0; 
var txt = 'Hi! I\'m Armaan,';
var initialTimeout = 750;
var speed = 75;
function typewriter() {
    return new Promise((resolve) => {
        function type() {
            if(i < txt.length) {
                document.getElementById("typewriter").innerHTML += txt.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // target the button using the data attribute we added earlier
    window.onload = function() {
        // update the button text
        const button = document.getElementById("theme-toggle");
        const newCta = currentThemeSetting === "dark" ? "fa-sun" : "fa-moon";
        button.classList.toggle(newCta);

        // use an aria-label if you are omitting text on the button
        // and using sun/moon icons, for example
        button.setAttribute("aria-label", newCta);
    
        // update theme attribute on HTML to switch theme in CSS
        document.querySelector("html").setAttribute("data-theme", currentThemeSetting);
    }
    const button = document.getElementById("theme-toggle");
    button.addEventListener("click", () => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        toggleTheme({ newTheme, button });
        localStorage.setItem("theme", newTheme);
        localStorageTheme = newTheme;
    });
    systemSettingDark.addEventListener("change", () => {
        const localStorageTheme = localStorage.getItem("theme");
        if(localStorageTheme === null) {
            const newTheme = systemSettingDark.matches ? "dark" : "light";
            toggleTheme({ newTheme, button });
        }
    });    
});

$(function () {
    $('theme-toggle').attr('title', 'Change website theme');
    typewriter().then(() => {
        $('.transparent').animate({opacity: 1}, 750);
    });
});