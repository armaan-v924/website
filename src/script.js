const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme;

let html_tag;
let theme_button;
let cursor;
let replay_button;
let greeting_text;
let transparent_objects;
let javascript_not_enabled_warning;
let contact_links;
let banner;

function setThemeOnLoad() {
    // check the local storage for existing theme
    const localTheme = localStorage.getItem("preferredTheme");
    // if no existing theme is found
    if(localTheme === null) {
        // get system theme and set accordingly
        currentTheme = systemSettingDark.matches ? "dark" : "light";
    } else {
        // use stored theme
        currentTheme = localTheme;
    }

    // update the page theme
    html_tag.attr("data-theme", currentTheme);

    // get active icon
    const icon = currentTheme === "dark" ? "fa-sun" : "fa-moon";
    // get accessibility text
    const aria = currentTheme === "dark" ? "Change to light mode" : "Change to dark mode";
    // set active icon
    theme_button.toggleClass(icon);
    // set accessibility text
    theme_button.attr("aria-label", aria);
}

function toggleTheme() {
    // get the new theme
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    // update the page theme
    html_tag.attr("data-theme", newTheme);
    // swap the icon
    theme_button.toggleClass("fa-sun fa-moon");
    // update accessibility text
    theme_button.attr("aria-label", `Change to ${newTheme} mode`);
    // update the theme variable
    currentTheme = newTheme;
}

function setTheme(newTheme) {
    // update the page theme
    html_tag.attr("data-theme", newTheme);
    // find the current icon
    let currentIcon = currentTheme === "dark" ? "fa-sun" : "fa-moon";
    // find the new icon
    let newIcon = newTheme === "dark" ? "fa-sun" : "fa-moon";
    // remove the current icon
    theme_button.toggleClass(currentIcon);
    // set the new icon
    theme_button.toggleClass(newIcon);
    // update accessibility text
    theme_button.attr("aria-label", `Change to ${newTheme} mode`);
    // update theme variable
    currentTheme = newTheme;
}

function typewriter() {
    // index
    let i = 0;
    // final text
    let txt = 'Hi! I\'m Armaan,';
    // animation speed
    let speed = 75;
    // return promise when complete
    return new Promise((resolve) => {
        function type() {
            // while incomplete
            if(i < txt.length) {
                // append next character
                $('#text').append(txt.charAt(i));
                // increment index
                i++;
                // wait for timeout
                setTimeout(type, speed);
            } else {
                // wait a moment
                setTimeout(() => {
                    // complete
                    resolve();
                }, 1000); 
            }
        }
        // initial run
        type();
    });
}

function typeAnimation() {
    // wait for typewriter to complete
    typewriter().then(() => {
        // fade in transparent objects
        transparent_objects.animate({opacity: 1}, 750);
        // hide the cursor
        cursor.css('animation', 'none');
        cursor.fadeOut(750);
        // save state in session storage
        sessionStorage.setItem('animationPlayed', 'true');
    });
}

$(function() {
    // select the appropriate elements
    cursor = $('#cursor');
    theme_button = $('#theme-toggle');
    replay_button = $('#replay_animation');
    greeting_text = $('#text');
    transparent_objects = $('.transparent');
    javascript_not_enabled_warning = $('#noscriptmsg');
    contact_links = $('.social-icon').children();
    banner = $('.banner');
    html_tag = $('html');

    // hide the greeting text for animation
    greeting_text.html("");
    // hide the javascript not enabled warning
    javascript_not_enabled_warning.css('display', 'none');
    // hide transparent objects
    transparent_objects.css('opacity', '0');
    // make the cursor visible and animated
    cursor.css('opacity', '1');
    cursor.css('animation', 'blink 1s infinite');
    cursor.css('-webkit-animation', 'blink 1s infinite');
    // remove text from contact links so icons can display properly
    contact_links.html("");

    // set the initial theme
    setThemeOnLoad();

    // if the animation has already been played, skip it
    if(sessionStorage.getItem("animationPlayed") === "true") {
        // set the text directly
        greeting_text.html("Hi! I'm Armaan,");
        // make transparent objects visible
        transparent_objects.css("opacity", "1");
        // hide the cursor
        cursor.css("display", "none");
    } else {
        setTimeout(() => {
            // type
            typeAnimation();
        }, 1000);
    }

    // add a click event listener to the button
    theme_button.click(function() {
        // toggle the theme
        toggleTheme(currentTheme);
        // save the theme in local storage
        localStorage.setItem("preferredTheme", currentTheme);
    });

    // add a longpress event listener
    theme_button.longpress(2000, function() {
        // remove the local storage
        localStorage.removeItem("preferredTheme");
        // reload the page
        location.reload();
    });

    // add a change event listener to the system setting
    systemSettingDark.addEventListener("change", () => {
        // if the setting hasn't been toggled
        if(localStorage.getItem("preferredTheme") === null) {
            // find out what the new theme is
            const newTheme = systemSettingDark.matches ? "dark" : "light";
            // set that as the new theme
            setTheme(newTheme);
        }
    });

    // add a click event listener to the replay animation button
    replay_button.click(function() {
        // remove the session storage
        sessionStorage.removeItem("animationPlayed");
        // empty the greeting text
        greeting_text.html("");
        // bring back the cursor
        cursor.css('display', 'inline');
        cursor.css('animation', 'blink 1s infinite');
        cursor.css('-webkit-animation', 'blink 1s infinite');
        // hide transparent objects
        transparent_objects.css('opacity', '0');
        // type
        setTimeout(() => {
            typeAnimation();
        }, 1000);
    });
});