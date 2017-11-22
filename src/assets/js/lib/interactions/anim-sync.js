var arrSyncElm = [];
var arrTempSync = [];
var arrTabCount = [];
var arrPlayed = [];
var syncTime;
var thisShow;
$(document)
    .ready(function() {
        if (parent.blnRemediate) {
            var divRemd = createElem("div");
            $('.crs-wrap').append(divRemd);
            alert('should be')
        }
        if ($("[data-v-in]").length > 0) {
            syncElement();
        }

        function syncElement() {
            arrSyncElm = [];
            if ($("[data-show]").length > 0) {
                thisShow = $("[data-show]").attr("data-show");
            }
            $("[data-v-in]").each(function(idx) {
                var thisElm = $(this);
                var thisElmId;

                if (idx < 9) {
                    thisElmId = $(thisElm).attr("id", "sync-elm_0" + parseInt(idx + 1));
                } else {
                    thisElmId = $(thisElm).attr("id", "sync-elm_" + parseInt(idx + 1));
                }
                var getElmId = $(thisElm).attr("id");
                var thisIn = $(this).attr("data-v-in");
                var thisOut = $(this).attr("data-v-out");
                var thisAnimIn = $(this).attr("data-v-ani-in");
                var thisAnimOut = $(this).attr("data-v-ani-out");
                var thisSwitch = "off"
                var thisDuration = $(this).attr("data-v-duration");
                var thisDelay = $(this).attr("data-v-delay");
                var thisEase = $(this).attr("data-v-ease");
                var thisClasses;
                if ($("[data-v-in]")[0].hasAttribute('class') != undefined) {
                    thisClasses = $("[data-v-in]")[idx]
                        .getAttribute('class')
                }
                arrSyncElm.push([thisElm, getElmId, thisIn, thisOut, thisAnimIn, thisAnimOut, thisSwitch, thisDuration, thisDelay, thisEase])
            });
        }
        setTimeout(function() {
            var $trans = $('.transition-box').addClass('is-open');
            setTimeout(function() {
                $trans.removeClass('is-open');
            }, 3000);
        }, 100);
    })

function getTimeVal(pt) {
    if ($("[data-v-in]").length > 0) {
        var pt;
        var thisPlayer = audioTrk.get(0);
        var atimeIn;
        syncTime = pt;

        for (var x = 0; x < arrSyncElm.length; x++) {
            var animIn = "" + arrSyncElm[x][4];
            var animOut = "" + arrSyncElm[x][5];
            atimeIn = parseFloat(arrSyncElm[x][2])
            if (atimeIn <= (parseFloat(pt) - .025) && atimeIn <= (parseFloat(pt) + .025)) {
                if (arrSyncElm[x][6] === "off") {
                    arrSyncElm[x][6] = "on"
                    $("#" + arrSyncElm[x][1]).velocity('' + animIn, { duration: parseInt(arrSyncElm[x][7]), delay: parseInt(arrSyncElm[x][8]) })
                    arrPlayed.push([arrSyncElm[x][0], arrSyncElm[x][1], arrSyncElm[x][2], arrSyncElm[x][3], arrSyncElm[x][4], arrSyncElm[x][5], arrSyncElm[x][6], arrSyncElm[x][7], arrSyncElm[x][8], arrSyncElm[x][9]])
                }
            }
            if (animOut.length) {
                $("#" + arrSyncElm[x][1]).velocity('' + animOut, { duration: parseInt(arrSyncElm[x][7]), delay: parseInt(arrSyncElm[x][8]) })
            }
        }

        for (var y = 0; y < arrPlayed.length; y++) {
            var playTimeIn = parseFloat(arrPlayed[y][2])
            if (playTimeIn > (parseFloat(pt)) && arrPlayed[y][6] === "on") {
                for (var z = 0; z < arrSyncElm.length; z++) {
                    if (arrSyncElm[z][1] === arrPlayed[y][1]) {
                        arrSyncElm[z][6] = "off"
                        $("#" + arrSyncElm[z][1]).velocity('fadeOut')
                    }
                }
            }
        }
    }
    if (thisPlayer.ended === true) {
        thisPlayer.pause();
    }
}