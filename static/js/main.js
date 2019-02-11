$(function () {
    setActiveTab();

    fillForm();

    // encode
    $('#encoder_form').submit(function (event) {
        event.preventDefault();

        let formData = serializeForm($(this));
        let formDataAsString = JSON.stringify(formData);

        location.hash = encodeHashTag(formData);

        $.ajax({
            type: 'POST',
            url: '/api/encode',
            dataType: "json",
            data: formDataAsString,
            beforeSend: function (xhr) {
                $('#encoder_result').html('');
                $('#encoder_error').html('');
            },
            success: function (data) {
                console.log(data);

                $('#encoder_result').html(
                    '<button class="btn-clipboard" title="Copy to clipboard" onclick="copyToClipboard(\'' + data['value'] + '\'); $(this).tooltip(\'dispose\');$(this).attr(\'title\',\'Copied!\');$(this).tooltip(\'show\');return false;" data-toggle="tooltip-encoder" data-placement="left">'
                    + '<img class="clippy" src="images/clippy.svg" width="14"/>'
                    + '</button>'
                    + '<textarea class="form-control p-2 mb-2 rounded-1 result-value" disabled>' + data['value'] + '</textarea>');

                textAreaAdjust($('#encoder_result textarea'));

                $('[data-toggle="tooltip-encoder"]').tooltip();

                // fill decoder field to be kind
                let element = $('#encoded_string');
                if ($.trim(element.val()) === '') {
                    element.val(data['value']);
                }
            },
            error: function (error) {
                let data = error.responseJSON;
                console.log(data);

                $('#encoder_error').html('<textarea class="form-control p-2 mb-2 rounded-1 result-error" disabled>' + data['error'] + '</textarea>');
                textAreaAdjust($('#encoder_error textarea'));
            }
        });

        return false;
    });

    // decode
    $('#decoder_form').submit(function (event) {
        event.preventDefault();

        let formData = serializeForm($(this));
        let formDataAsString = JSON.stringify(formData);

        location.hash = encodeHashTag(formData);

        $.ajax({
            type: 'POST',
            url: '/api/decode',
            dataType: "json",
            data: formDataAsString,
            beforeSend: function (xhr) {
                $('#decoder_result').html('');
                $('#decoder_error').html('');
            },
            success: function (data) {
                console.log(data);

                $('#decoder_result').html(
                    '<button class="btn-clipboard" title="Copy to clipboard" onclick="copyToClipboard(\'' + data['value'] + '\'); $(this).tooltip(\'dispose\');$(this).attr(\'title\',\'Copied!\');$(this).tooltip(\'show\');return false;" data-toggle="tooltip-decoder" data-placement="left">'
                    + '<img class="clippy" src="images/clippy.svg" width="14"/>'
                    + '</button>'
                    + '<textarea class="form-control p-2 mb-2 rounded-1 result-value" disabled>' + data['value'] + '</textarea>');

                textAreaAdjust($('#decoder_result textarea'));

                $('[data-toggle="tooltip-decoder"]').tooltip();

                // fill encoder field to be kind
                let element = $('#decoded_string');
                if ($.trim(element.val()) === '') {
                    element.val(data['value']);
                }
            },
            error: function (error) {
                let data = error.responseJSON;
                console.log(data);

                $('#decoder_error').html('<textarea class="form-control p-2 mb-2 rounded-1 result-error" disabled>' + data.error + '</textarea>');
                textAreaAdjust($('#decoder_error textarea'));
            }
        });

        return false;
    });
});

function setActiveTab() {
    let encoderTab = $('#nav-encoder-tab');
    let decoderTab = $('#nav-decoder-tab');

    encoderTab.click(function () {
        // console.log('nav-encoder-tab');
        Cookies.set('navTabState', 'encoder', {expires: 365});
    });
    decoderTab.click(function () {
        // console.log('nav-decoder-tab');
        Cookies.set('navTabState', 'decoder', {expires: 365});
    });

    let navTabState = Cookies.get('navTabState');
    // console.log('navTabState: ' + navTabState);

    if (navTabState === 'decoder') {
        decoderTab.trigger("click")
    } else {
        encoderTab.trigger("click")
    }
}

function serializeForm(form) {
    let result = {};
    $.map(form.serializeArray(), function (n) {
        result[n['name']] = n['value'];
    });
    return result;
}

function textAreaAdjust(o) {
    o.css("height", "1px");
    setTimeout(function () {
        const maxHeight = 445;
        let newHeight = o.prop('scrollHeight') + 2; // + border
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            o.css("overflow-y", "scroll");
        }

        o.css("height", newHeight + "px");
    }, 1);
}

function copyToClipboard(str) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val(str).select();
    document.execCommand("copy");
    $temp.remove();
}

function b64enc(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function b64dec(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function encodeHashTag(formData) {
    let hashTagData = {};
    hashTagData['tab'] = Cookies.get('navTabState'); // === 'encoder' ? 'encoder_form' : 'decoder_form';
    hashTagData['form'] = formData;
    console.log('hashTag encoded json:', hashTagData);

    let hashTag = JSON.stringify(hashTagData);
    console.log('hashTag decoded string:', hashTag);

    return encodeURI(b64enc(hashTag));
}

function decodeHashTag(str) {
    let hashTag = decodeURI(b64dec(str));
    console.log('hashTag decoded string:', hashTag);

    let hashTagData = JSON.parse(hashTag);
    console.log('hashTag decoded json:', hashTagData);

    return hashTagData;
}

function fillForm() {
    let hashTag = location.hash;
    if (hashTag === '') {
        return;
    }
    console.log('hashTag:', hashTag);

    let hashTagData = decodeHashTag(hashTag.replace('#', ''));

    // activate tab
    Cookies.set('navTabState', hashTagData['tab'], {expires: 365});
    setActiveTab();

    // fill form
    let formId = hashTagData['tab'] === 'encoder' ? 'encoder_form' : 'decoder_form';
    $('#' + formId).populate(hashTagData['form']);
}
