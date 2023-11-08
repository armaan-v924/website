// Long-press Plugin for jQuery
$.fn.longpress = function(time, onlongpress) {
    var timestart = 0;
    var timer = null;

    // If time wasn't specified
    if (!onlongpress) {
        onlongpress = time;
        time = 2000; // Default long-press time
    }

    // When the mouse is down start checking the time
    $(this).on('mousedown', function(e) {
        timestart = new Date().getTime();
        checktime();
    });

    // Check to see how much time has passed
    var checktime = function() {
        if (new Date().getTime() >= (timestart + time)) {
            if (typeof onlongpress == 'function') {
                // Fire the callback
                onlongpress();
            }
        } else {
            // Keep checking
            timer = setTimeout(checktime, 1);
        }
    }
}