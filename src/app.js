
console.log('Battery Logger');
var on = localStorage.getItem('on');
console.log("on=" + on);
var off = localStorage.getItem('off');
console.log("off=" + off);
var chargeState = localStorage.getItem('chargeState');
chargeState = chargeState !== null ? chargeState : '';
console.log("chargeState=" + chargeState);

Pebble.addEventListener("showConfiguration", function () {
    console.log("showing configuration");
    Pebble.openURL('http://assets.getpebble.com.s3-website-us-east-1.amazonaws.com/pebble-js/configurable.html?');
});

Pebble.addEventListener("webviewclosed", function (e) {
    console.log("configuration closed");
    // webview closed
    var options = JSON.parse(decodeURIComponent(e.response));
    console.log("Options = " + JSON.stringify(options));
});

simply.on('singleClick', function (e) {
    console.log(util2.format('single clicked $button!', e));

    var currentdate = new Date();
    if (e.button === 'up') {
        localStorage.setItem('on', currentdate.getTime());
        chargeState = 'on';
        localStorage.setItem('chargeState', chargeState);
    } else if (e.button === 'down') {
        localStorage.setItem('off', currentdate.getTime());
        chargeState = 'off';
        localStorage.setItem('chargeState', chargeState);
    } else if (e.button === 'select') {
        var _off = localStorage.getItem('off');
        var _on = localStorage.getItem('on');
        var diffMs = _on - _off;
        var diffS = diffMs / 1000;
        var diffM = diffS / 60;
        var diffHrs = diffM / 60;
        var diffDays = diffHrs / 24;

        console.log("diff ms=" + diffMs);
        console.log("diff s=" + diffS);
        console.log("diff m=" + diffM);
        console.log("diff hours=" + diffHrs);
        console.log("diff days=" + diffDays);
        var msg;

        if (diffDays < 1) {
            if (diffHrs < 1) {
                if (diffM < 60) {
                    msg = Math.round(diffS) + " secs between charge";
                } else {
                    msg = Math.round(diffM) + " mins between charge";
                }
            } else {
                msg = Math.round(diffHrs) + " hrs between charge";
            }
        } else {
            msg = Math.round(diffDays) + " days between charge";
        }
        console.log(msg);

        simply.subtitle(msg);
    }
    simply.title('BatLog ' + chargeState.toUpperCase());
});

simply.on('longClick', function (e) {
    console.log(util2.format('long clicked $button!', e));
    simply.vibe();
    simply.scrollable(e.button !== 'select');
});


simply.setText({
    title: 'BatLog ' + chargeState.toUpperCase(),
    body: 'Press the up button for on charge and down button for off charge',
}, true);