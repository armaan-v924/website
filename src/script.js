var theme;
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

function setThemeOnLoad() {
    const localTheme = localStorage.getItem("theme");
    if(localTheme === null) {
        theme = systemSettingDark.matches ? "dark" : "light";
    } else {
        theme = localTheme;
    }

    document.querySelector("html").setAttribute("data-theme", theme);

    const icon = theme === "dark" ? "fa-sun" : "fa-moon";
    const aria = theme === "dark" ? "Change to light mode" : "Change to dark mode";
    $("#theme-toggle").toggleClass(icon);
    $("#theme-toggle").attr("aria-label", aria);
}

function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.querySelector("html").setAttribute("data-theme", newTheme);
    $("#theme-toggle").toggleClass("fa-sun fa-moon");
    $("#theme-toggle").attr("aria-label", `Change to ${newTheme} mode`);
    theme = newTheme;
}

function typewriter() {
    var i = 0;
    var txt = 'Hi! I\'m Armaan,';
    var speed = 75;
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
        $('#cursor').css('animation', 'none');
        $('#cursor').fadeOut(750);
        localStorage.setItem('animationPlayed', 'true');
    });
}

$(function() {
    // on page load
    $('#text').html("");
    $('#noscriptmsg').css('display', 'none');
    $('.transparent').css('opacity', '0');
    $('#cursor').css('opacity', '1');
    $('#cursor').css('animation', 'blink 1s infinite');
    $('#cursor').css('-webkit-animation', 'blink 1s infinite');
    $('.social-icon').children().html("");

    // set the initial theme
    setThemeOnLoad();

    // if the animation has already been played, skip it
    if(localStorage.getItem("animationPlayed") === "true") {
        $("#text").html("Hi! I'm Armaan,");
        $(".transparent").css("opacity", "1");
        $("#cursor").css("display", "none");
    } else {
        setTimeout(() => {
            typeAnimation();
        }, 1000);
    }

    // add a click event listener to the button
    $("#theme-toggle").click(function() {
        toggleTheme(theme);
        localStorage.setItem("theme", theme);
    });

    // add a change event listener to the system setting
    systemSettingDark.addEventListener("change", () => {
        const localStorageTheme = localStorage.getItem("theme");
        if(localStorageTheme === null) {
            const newTheme = systemSettingDark.matches ? "dark" : "light";
            toggleTheme();
        }
    });

    // add a click event listener to the replay animation button
    $("#replay_animation").click(function() {
        localStorage.removeItem("animationPlayed");
        location.reload();
    });
});