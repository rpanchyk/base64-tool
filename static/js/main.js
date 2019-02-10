$(function () {
    setActiveTab();
});

function setActiveTab() {
    var encoderTab = $('#nav-encoder-tab');
    var decoderTab = $('#nav-decoder-tab');

    encoderTab.click(function () {
        // console.log('nav-encoder-tab');
        Cookies.set('navTabState', 'encoder', {expires: 365});
    });
    decoderTab.click(function () {
        // console.log('nav-decoder-tab');
        Cookies.set('navTabState', 'decoder', {expires: 365});
    });

    var navTabState = Cookies.get('navTabState');
    // console.log('navTabState: ' + navTabState);

    if (navTabState === 'decoder') {
        decoderTab.trigger("click")
    } else {
        encoderTab.trigger("click")
    }
}
