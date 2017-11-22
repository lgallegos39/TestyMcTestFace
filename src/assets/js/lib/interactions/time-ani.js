var playTime;
var currMins;
var currSecs;
var durMins;
var durSecs;
var arrHidden = [];
var arrNotOut = []
var audioTrk = $('.mejs-player--course');
var progressBar;
if (audioTrk.length > 0) {
    audioTrk.get(0).addEventListener("timeupdate", seekTimeUpdate, false);

    setTimeout(function() {
        if ($('.mejs__time-slider').length > 0) {
            audioTrk.get(0).addEventListener("timeupdate", updateProgressBar, false),
                progressBar = $('.mejs__time-slider')[0];
            var testBar = $(".mejs__time-slider")[0].getAttribute("aria-valuenow")
            var testLbl = $(".mejs__time-slider")[0].getAttribute("aria-label")
        }
    }, 200)
}
var chkClass;
function updateProgressBar() {
    var e = Math.floor(100 / audioTrk.get(0).duration * audioTrk.get(0).currentTime);
    // progressDone = e;
    var seekTo = audioTrk.get(0).duration * ($('.mejs__time-slider')[0].getAttribute("aria-valuenow") / 100);
    var percentage = Math.floor((100 / audioTrk.get(0).duration) * audioTrk.get(0).currentTime);
    if ($("[data-sync-in]").length > 0) {
        setInterval(function() {
            if (audioTrk.get(0).currentTime <= arrSyncElm[0][3]) {
                for (var x = 0; x < arrSyncElm.length; x++) {
                    chkClass = "" + arrSyncElm[0][7];
                    if (chkClass.indexOf("is-anim-initial ") && $("#" + arrSyncElm[0][1]).hasClass("is-anim-initial") === false) {
                        $("#" + arrSyncElm[0][1]).addClass("is-anim-initial");
                        $("#" + arrSyncElm[0][1]).removeClass("is-hidden fade-out mui-enter mui-enter-active mui-leave mui-leave-active")
                    }
                }
            } else if (!isNaN(arrSyncElm[0][3])&&audioTrk.get(0).currentTime >= arrSyncElm[0][3]){
                setTimeout(function(){
                    //console.log("in here")
                        //$("#" + arrSyncElm[0][1]).addClass(" is-hidden fade-out mui-leave mui-leave-active")
                $("#" + arrSyncElm[0][1]).removeClass("is-anim-initial");
                },100)
            } else {

                $("#" + arrSyncElm[0][1]).addClass("is-hidden");
            }
        }, 25);
    }
}

function seekTimeUpdate() {
    if (audioTrk.get(0)
        .readyState > 0) {
        getVidTime();
        setInterval(function() {
            playTime = (audioTrk.get(0).currentTime).toFixed(3);
        }, 5);
        getTimeVal(playTime);
    }
}

function getVidTime() {
    currMins = Math.floor(audioTrk.get(0)
        .currentTime / 60);
    currSecs = Math.floor(audioTrk.get(0)
        .currentTime - currMins * 60);
    durMins = Math.floor(audioTrk.get(0)
        .duration / 60);
    durSecs = Math.floor(audioTrk.get(0)
        .duration - durMins * 60);
    if (currSecs < 10) {
        currSecs = '0' + currSecs;
    }
    if (durSecs < 10) {
        durSecs = '0' + durSecs;
    }
    if (currMins < 10) {
        currMins = '0' + currMins;
    }
    if (durMins < 10) {
        durMins = '0' + durMins;
    }
}

function mediaAuto() {
    if (mediaAutoStat) {
        mediaAutoStat = false;
        $(btnAuto)
            .removeClass("apBtn_active")
            .addClass("apBtn_inactive");
        mediaAutoCls = "apBtn_inactive";
    } else {
        mediaAutoStat = true;
        $(btnAuto)
            .removeClass("apBtn_inactive")
            .addClass("apBtn_active");
        mediaAutoCls = "apBtn_active";
    }
}


// $(document)
//     .ready(function() {
//         //<![CDATA[
//         /*var lyrics = document.getElementById('lyrics');*/
//         /*var audio = document.getElementsByClassName('mejs__media');
//         var track = document.getElementById('trk');*/
//         /*var textTrack = track.track;*/
//         /*track.addEventListener("cuechange", cueChange, false);*/

//         var currMins;
//         var currSecs;
//         var durMins;
//         var durSecs;
//         var audioTrk = $('.mejs__media');

//         if (audioTrk.length > 0) {
//             $('.mejs__media').get(0).addEventListener("timeupdate", seekTimeUpdate, false);
//             // function init(){audio.volume = .3;audio.play();cueChange();}
//             /*function cueChange(){
//             var cues = textTrack.activeCues;
//             if (cues.length > 0){
//             lyrics.innerHTML = cues[0].text.replace(/\n/g, '<br>');}}*/
//         }

//         function seekTimeUpdate() {
//             if (audioTrk.get(0)
//                 .readyState > 0) {
//                 var nt = audioTrk.get(0)
//                     .currentTime * (100 / audioTrk.get(0)
//                         .duration);
//                 /*progressBar.get(0)
//                     .value = nt;*/
//                 getVidTime();
//                 console.log("this exists " + audioTrk.get(0).currentTime)
//                     /*$(txtTime)
//                         .html("" + currMins + ":" + currSecs + " | " + durMins + ":" + durSecs);*/
//             }
//         }

//         function getVidTime() {
//             currMins = Math.floor(audioTrk.get(0)
//                 .currentTime / 60);
//             currSecs = Math.floor(audioTrk.get(0)
//                 .currentTime - currMins * 60);
//             durMins = Math.floor(audioTrk.get(0)
//                 .duration / 60);
//             durSecs = Math.floor(audioTrk.get(0)
//                 .duration - durMins * 60);
//             if (currSecs < 10) {
//                 currSecs = '0' + currSecs;
//             }
//             if (durSecs < 10) {
//                 durSecs = '0' + durSecs;
//             }
//             if (currMins < 10) {
//                 currMins = '0' + currMins;
//             }
//             if (durMins < 10) {
//                 durMins = '0' + durMins;
//             }
//         }
//         /*window.onload = init;*/

//         //]]>
//     })
