let currentTheme;

const systemSettingIsDark = window.matchMedia('(prefers-color-scheme: dark)');

let html_tag = $('html');

let switch_theme_button = $('#switch-theme');
let switch_theme_icon = $('#switch-theme-icon');

let cursor = $('#cursor');
let replay_button = $('#replay-animation');
let intro = $('.intro');
let bio = $('.bio');
let socials = $('.socials');
let footer = $('.footer');
let banner = $('.banner');
let greeting = $('#greeting');
let page_control = $('#page-control');

const greeting_text = 'Hi! I\'m <span id="name">Armaan</span>,';

function setThemeOnLoad() {
    const localTheme = localStorage.getItem("preferred-theme");
    const systemTheme = systemSettingIsDark.matches ? "dark" : "light";
    const preferredTheme = localTheme ? localTheme : systemTheme;
    setTheme(preferredTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    html_tag.attr('data-theme', theme);
    switch_theme_icon.children().attr('xlink:href', theme === 'dark' ? 'resources/icons/sun.svg#dark-mode' : 'resources/icons/night.svg#light-mode');
}

function toggleTheme() {
    if (currentTheme === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

function typewriter(selector, text) {
    let i = 0;
    let speed = 100;
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (text.charAt(i) === "<") {
                // Skip to the end of the HTML tag
                i = text.indexOf(">", i);
            }
            // Append the cursor after the text
            selector.html(text.substring(0, i+1) + '<span class="cursor"></span>');
            i++;
            if (i > text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

function typeAnimation() {
    // Prepare the animation
    prepareAnimation();

    // Pass the greeting element to the typewriter function
    typewriter(greeting, 'Hi! I\'m <span id="name">Armaan</span>,').then(() => {
        bio.animate({
            opacity: 1
        }, 1000);
        socials.delay(1000).animate({
            opacity: 1
        }, 1000);
        footer.delay(1000).animate({
            opacity: 1
        }, 1000);
        cursor.fadeOut(1000);
        sessionStorage.setItem('animationPlayed', true);
    });
}

function prepareAnimation() {
    greeting.html('');
    bio.css('opacity', '0');
    socials.css('opacity', '0');
    footer.css('opacity', '0');
    cursor.css('display', 'inline');
}

function replayAnimation() {
    sessionStorage.removeItem('animationPlayed');
    prepareAnimation();
    typeAnimation(greeting_text);
}

function prepareJavaScript() {
    banner.toggleClass('hidden');
    page_control.toggleClass('hidden');
    cursor.toggleClass('blinking');
}

$(function () {
    prepareJavaScript();
    setThemeOnLoad();
    if(sessionStorage.getItem('animationPlayed') === null) {
        typeAnimation(greeting_text);
    }
    switch_theme_button.click(function () {
        toggleTheme();
        localStorage.setItem('preferred-theme', currentTheme);
    });
    replay_button.click(function () {
        replayAnimation();
    });
    systemSettingIsDark.addEventListener('change', function (e) {
        if(localStorage.getItem('preferred-theme') === null) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});