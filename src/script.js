const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme;

let theme_button;
let cursor;
let replay_button;
let greeting_text;
let transparent_objects;
let javascript_not_enabled_warning;
let contact_links;
let banner;

function setThemeOnLoad() {
    const localTheme = localStorage.getItem("preferredTheme");
    if(localTheme === null) {
        currentTheme = systemSettingDark.matches ? "dark" : "light";
    } else {
        currentTheme = localTheme;
    }

    document.querySelector("html").setAttribute("data-theme", currentTheme);

    const icon = currentTheme === "dark" ? "fa-sun" : "fa-moon";
    const aria = currentTheme === "dark" ? "Change to light mode" : "Change to dark mode";
    theme_button.toggleClass(icon);
    theme_button.attr("aria-label", aria);
}

function toggleTheme() {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.querySelector("html").setAttribute("data-theme", newTheme);
    theme_button.toggleClass("fa-sun fa-moon");
    theme_button.attr("aria-label", `Change to ${newTheme} mode`);
    currentTheme = newTheme;
}

function setTheme(newTheme) {
    $("html").attr("data-theme", newTheme);
    let currentIcon = currentTheme === "dark" ? "fa-sun" : "fa-moon";
    let newIcon = newTheme === "dark" ? "fa-sun" : "fa-moon";
    theme_button.toggleClass(currentIcon);
    theme_button.toggleClass(newIcon);
    theme_button.attr("aria-label", `Change to ${newTheme} mode`);
    currentTheme = newTheme;
}

function typewriter() {
    let i = 0;
    let txt = 'Hi! I\'m Armaan,';
    let speed = 75;
    return new Promise((resolve) => {
        function type() {
            if(i < txt.length) {
                $('#text').append(txt.charAt(i));
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    resolve();
                }, 1000); 
            }
        }
        type();
    })
}

function typeAnimation() {
    typewriter().then(() => {
        $('.transparent').animate({opacity: 1}, 750);
        cursor.css('animation', 'none');
        cursor.fadeOut(750);
        sessionStorage.setItem('animationPlayed', 'true');
    });
}

$(function() {
    cursor = $('#cursor');
    theme_button = $('#theme-toggle');
    replay_button = $('#replay_animation');
    greeting_text = $('#text');
    transparent_objects = $('.transparent');
    javascript_not_enabled_warning = $('#noscriptmsg');
    contact_links = $('.social-icon').children();
    banner = $('.banner');

    // on page load
    greeting_text.html("");
    javascript_not_enabled_warning.css('display', 'none');
    transparent_objects.css('opacity', '0');
    cursor.css('opacity', '1');
    cursor.css('animation', 'blink 1s infinite');
    cursor.css('-webkit-animation', 'blink 1s infinite');
    contact_links.html("");

    // set the initial theme
    setThemeOnLoad();

    // if the animation has already been played, skip it
    if(sessionStorage.getItem("animationPlayed") === "true") {
        greeting_text.html("Hi! I'm Armaan,");
        transparent_objects.css("opacity", "1");
        cursor.css("display", "none");
    } else {
        setTimeout(() => {
            typeAnimation();
        }, 1000);
    }

    // add a click event listener to the button
    theme_button.click(function() {
        toggleTheme(currentTheme);
        localStorage.setItem("preferredTheme", currentTheme);
    });

    theme_button.longpress(2000, function() {
        localStorage.removeItem("preferredTheme");
        location.reload();
    });

    // add a change event listener to the system setting
    systemSettingDark.addEventListener("change", () => {
        if(localStorage.getItem("preferredTheme") === null) {
            const newTheme = systemSettingDark.matches ? "dark" : "light";
            setTheme(newTheme);
        }
    });

    // add a click event listener to the replay animation button
    replay_button.click(function() {
        sessionStorage.removeItem("animationPlayed");
        greeting_text.html("");
        cursor.css('display', 'inline');
        cursor.css('animation', 'blink 1s infinite');
        cursor.css('-webkit-animation', 'blink 1s infinite');
        transparent_objects.css('opacity', '0');
        setTimeout(() => {
            typeAnimation();
        }, 1000);
    });
});