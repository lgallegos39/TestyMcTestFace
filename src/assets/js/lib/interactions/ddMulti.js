// Coley Interaction Library - Do or Do Not Drag & Drop
var doc = document;
var arrDropTrg = new Array();
var arrDragObj = new Array();
var arrDropAns = new Array();
var arrDropObj = new Array();
var arrDragAns = new Array();
var arrChoiceItem = new Array();
var arrChoiceObj = new Array();
var arrDrgFB = new Array();
var boolDragAtt;
var divDragObj;
var divFeedback;
var dragResponse;
var intDrgAttempt;
var intCurrDrgAttempt;
var intDropCt = 0;
var intCorrect;
var intFocusChoice;
var strDDType;
var strDragFormNm;
var strDragStatus;
var btnSubmitDD;
var btnResetDD;
var btnRetryDD;
$(document)
    .ready(function initDDrop() {
        arrChoiceObj = [];
        arrDropTrg = [];
        arrDragAns = [];
        strDDType = $("[data-dd-type]").attr("data-dd-type");
        intDrgAttempt = $("[data-dd-attempt]").attr("data-dd-attempt");
        intCurrDrgAttempt = 0;
        btnSubmitDD = $("[data-dd-submit]");
        btnResetDD = $("[data-dd-reset]");
        divFeedback = $('#feedback');

        if (parseInt(intDrgAttempt) > 1) {
            boolDragAtt = true;
        } else {
            boolDragAtt = false;
        }

        $('[data-dd-feedback]')
            .each(function(idx_a) {

                var thisFb = $(this)[0].outerHTML;
                // var thisFb = $(this)
                //      .html();
                arrDrgFB.push(thisFb);
                $(this)
                    .remove();
            });

        $('.js-drag-choice')
            .each(function(idx_b) {
                var thisObj = $(this);
                var thisChoice = $(this)
                    .html();
                var responseObj;
                if (idx_b <= 9) {
                    thisObj.attr("id", "drag_choice_0" + parseInt(idx_b + 1));
                } else {
                    thisObj.attr("id", "drag_choice_" + parseInt(idx_b + 1));
                }

                thisObj
                    .draggable({
                        containment: 'crs-wrap',
                        cursor: '-webkit-grab',
                        cursor: '-moz-grab',
                        revert: true,
                        start: ui_dragStart
                    });
                arrChoiceItem.push([thisChoice]);
                arrChoiceObj.push(thisObj);
                $(this).children().removeAttr("data-target");
            });

        divDragObj = $(".js-choice-container");
        $(divDragObj).attr("tabindex", "0");
        $(divDragObj).focus();
        setStage();
    });


function setStage() {
    arrDropTrg = [];
    arrDropAns = [];
    arrDropObj = [];
    $(btnSubmitDD).bind("click", function() {
        chkDrop();
    });
    $(btnResetDD).bind("click", function() {
        resetDrop();
    })

    if ($('.ui-droppable').length > 0) {
        $('.ui-droppable').each(
            function(idx_c) {
                var thisObj = $(this);
                if (idx_c < 9) {
                    thisObj.attr("id", "drp_trg_0" + (idx_c + 1));
                } else {
                    thisObj.attr("id", "drp_trg_" + (idx_c + 1));
                }
                $(thisObj).droppable({
                    drop: boxDrop,
                    hoverClass: 'is-hovered'
                });
                var tempStr = thisObj.attr("id");
                var strFormNum = tempStr.substring(tempStr.length - 2, tempStr.length);
                var thisForm = parent.createElem("form", "fm_" + strFormNum);
                var thisAns;
                if (parseInt($(thisObj).attr("data-answer")) !== 0) {
                    thisAns = $(thisObj).attr("data-answer");
                } else {
                    thisAns = "0"
                }
                $(thisForm).attr("data-dd-form", "");
                $(thisObj).append(thisForm);
                for (var i = 0; i < arrChoiceItem.length; i++) {
                    var thisInput;
                    var thisName = "" + $(thisForm).attr("id");
                    if (strDDType === "matching") {
                        if (i < 9) {
                            thisInput = $('<label class="l-dnd__label"><input class="l-dnd__input" type="radio" name="' + thisName + '" id="' + thisName + '_0' + parseInt(i + 1) + '" value="' + parseInt(i + 1) + '"><span class="l-dnd__control"></span><span class="show-for-sr">' + parseInt(i + 1) + '</span></label>');
                            strDragFormNm = thisName;
                            $(thisInput)
                                .click(function() {
                                    sel_rad(this.id, thisName);
                                })
                        } else {
                            thisInput = $('<label class="l-dnd__label"><input class="l-dnd__input" type="radio" name="' + thisName + '" id="' + thisName + '_' + parseInt(i + 1) + '" value="' + parseInt(i + 1) + '"><span class="l-dnd__control"></span><span class="show-for-sr">' + parseInt(i + 1) + '</span></label>');
                            strDragFormNm = thisName;
                            $(thisInput)
                                .click(function() {
                                    sel_rad(this.id, thisName);
                                })

                        }

                    } else if (strDDType === "onetomany") {
                        if (i < 9) {

                            thisInput = $('<label class="l-dnd__label"><input class="l-dnd__input" type="checkbox" name="' + thisName + '" id="' + thisName + '_0' + parseInt(i + 1) + '" value="' + parseInt(i + 1) + '"><span class="l-dnd__control"></span><span class="show-for-sr">' + parseInt(i + 1) + '</span></label>');
                            $(thisInput)
                                .click(function() {
                                    sel_chk(this.id, thisName);
                                })
                        } else {

                            thisInput = $('<label class="l-dnd__label"><input class="l-dnd__input" type="checkbox" name="' + thisName + '" id="' + thisName + '_' + parseInt(i + 1) + '" value="' + parseInt(i + 1) + '"><span class="l-dnd__control"></span><span class="show-for-sr">' + parseInt(i + 1) + '</span></label>');
                            $(thisInput)
                                .click(function() {
                                    sel_chk(this.id, thisName);
                                })
                        }
                    }
                    $(thisForm).append(thisInput);
                }
                arrDropTrg.push([thisObj, $(thisObj).attr("id"), $(thisForm).attr("id")]);
                arrDropAns.push(thisAns);
            });

    }
    // $("#divFeedBack").attr("tabindex", 0);

}

function startDragDrop() {
    $(divDoDontInstruction)
        .remove();
    do_dragDrop();
}

function feedbackClose() {
    $(divFeedback).css("display", "none");
    if (intCurrNum == arrChoiceItem.length) {
        parent.strInteraction_stat = "correct";
        parent.intSetInteractionScr = 100;
        parent.getkcid();
        for (i = 0; i < arrChoiceItem.length; i++) {

            $(arrChoiceObj[i])
                .css('cursor', 'pointer');

            $(arrChoiceObj[i])
                .css('opacity', '1');

            $(arrChoiceObj[i])
                .attr('draggable', 'true');

            arrChoiceObj[i].on('dragstart', dragStart, false);
            arrChoiceObj[i].on('dragenter', dragEnter, false);
            arrChoiceObj[i].on('dragover', dragOver, false);
            arrChoiceObj[i].on('dragleave', dragLeave, false);
            arrChoiceObj[i].on('drop', drop, false);
            arrChoiceObj[i].on('dragend', dragEnd, false);

        }
    }

    $(divDragObj).focus();
}

function objSetFocus(val) {
    setTimeout(function() { $("#" + val).focus(), 300 });
}

function boxDrop(event, ui) {

    var dragSrcID = $(dragSrc)
        .attr('id');
    var strTempId = this.id;
    var intChoice = parseInt(dragSrcID.substring(dragSrcID.length - 2, dragSrcID.length));
    var intDrop = parseInt(strTempId.substring(strTempId.length - 2, strTempId.length));
    var tempForm = $("#" + strTempId).children("form:first").attr("id");

    if (strDDType === "matching") {

        for (var i = 0; i < arrDropTrg.length; i++) {

            if (i < 9) {
                if ($("#" + arrDropTrg[i][2] + "_0" + intChoice).prop("checked") === true) {

                    if ("" + arrDropTrg[i][2] !== arrDropTrg[intDrop - 1][2]) {
                        $("#" + arrDropTrg[i][2] + "_0" + intChoice).prop("checked", false);
                    }
                }
            } else {
                if ($("#" + arrDropTrg[i][2] + "_" + intChoice).prop("checked") === true) {

                    if ("" + arrDropTrg[i][2] !== arrDropTrg[intDrop - 1][2]) {
                        $("#" + arrDropTrg[i][2] + "_" + intChoice).prop("checked", false);
                    }
                }

            }
            if (i < 9) {
                $("#" + arrDropTrg[intDrop - 1][2] + "_0" + intChoice).prop("checked", true);

            } else {
                $("#" + arrDropTrg[intDrop - 1][2] + "_" + intChoice).prop("checked", true);

            }
        }
    } else {
        for (var i = 0; i < arrDropTrg.length; i++) {
            if (i < 9) {
                $("#" + arrDropTrg[intDrop - 1][2] + "_0" + intChoice).prop("checked", true);

            } else {
                $("#" + arrDropTrg[intDrop - 1][2] + "_" + intChoice).prop("checked", true);

            }
        }

    }
    btnResetDD.removeAttr('disabled');
    return false;
}

function chkDrop() {
    intDropCt = 0;
    intCorrect = 0
    arrDropObj = [];
    if (strDDType === "matching") {
        for (var i = 0; i < arrDropTrg.length; i++) {
            var strTempId = "" + arrDropTrg[i][2];
            var intTempDrop = parseInt(strTempId.substring(strTempId.length - 2, strTempId.length))
            if ($("input:radio[name=" + arrDropTrg[i][2] + "]:checked").length != 0) {
                intDropCt = intDropCt + 1;
                var intDropVal = $('input[name=' + arrDropTrg[i][2] + ']:checked', '#' + arrDropTrg[i][2]).val();
                arrDropObj.push(intDropVal)
            }

        }
    } else if (strDDType === "onetomany") {
        for (var i = 0; i < arrDropTrg.length; i++) {
            var strTempId = "" + arrDropTrg[i][2];
            var intTempDrop = parseInt(strTempId.substring(strTempId.length - 2, strTempId.length))
            if ($("input:checkbox[name=" + arrDropTrg[i][2] + "]:checked").length != 0) {
                intDropCt = intDropCt + 1;
                var sel = "";
                $('input[name=' + arrDropTrg[i][2] + ']:checked').each(function() {
                    if (sel.length < 0) {
                        sel = "" + this.value;

                    } else {

                        sel += "," + this.value;
                    }
                });
                sel = sel.substring(1, sel.length);
                arrDropObj.push(sel)
            } else {
                sel = "0"
                arrDropObj.push(sel)
            }
        }
    }

    if (intDropCt === arrDropTrg.length && strDDType === "matching") {
        for (var i = 0; i < arrDropAns.length; i++) {
            if ("" + arrDropObj[i] === "" + arrDropAns[i]) {
                intCorrect = intCorrect + 1;
            }
        }
        if (intCorrect === arrDropTrg.length) {
            strDragStatus = "correct";
        } else if (intCorrect !== arrDropTrg.length) {
            strDragStatus = "incorrect";
        }
    } else if (strDDType === "onetomany") {
        for (var i = 0; i < arrDropAns.length; i++) {
            if ("" + arrDropObj[i] === "" + arrDropAns[i]) {
                intCorrect = intCorrect + 1;
            }
        }
        if (intCorrect === arrDropTrg.length) {
            strDragStatus = "correct";
        } else if (intCorrect !== arrDropTrg.length) {
            strDragStatus = "incorrect";
        }
    } else if (intDropCt < arrDropTrg.length && strDDType !== "onetomany") {
        strDragStatus = "not completed";
    }

    getDragFB(strDragStatus);
}

function dragEnd(e) {
    if (dragResponse == 'true') {
        $(this)
            .css('opacity', '0.5');
    } else if (dragResponse == 'true') {
        $(this)
            .css('opacity', '1');
    }
}

function sel_rad(btnID, nm) {
    var intGetChoice = parseInt(btnID.substring(btnID.length - 2, btnID.length));
    var intTrgSel = parseInt(nm.substring(nm.length - 2, nm.length));
    for (var i = 0; i < arrDropTrg.length; i++) {
        if (i < 9) {
            if ($("#" + arrDropTrg[i][2] + "_0" + intGetChoice).prop("checked") === true) {

                if ("" + arrDropTrg[i][2] !== nm) {
                    $("#" + arrDropTrg[i][2] + "_0" + intGetChoice).prop("checked", false);
                }
            }

        } else {

            if ($("#" + arrDropTrg[i][2] + "_" + intGetChoice).prop("checked") === true) {

                if ("" + arrDropTrg[i][2] !== nm) {
                    $("#" + arrDropTrg[i][2] + "_" + intGetChoice).prop("checked", false);
                }
            }

            if (i < 9) {
                $("#" + arrDropTrg[intTrgSel - 1][2] + "_0" + intGetChoice).prop("checked", true);

            } else {

                $("#" + arrDropTrg[intTrgSel - 1][2] + "_" + intGetChoice).prop("checked", true);
            }
        }
    }
    btnResetDD.removeAttr('disabled');
}

function sel_chk(btnID, nm) {
    var intGetChoice = parseInt(btnID.substring(btnID.length - 2, btnID.length));
    var intTrgSel = parseInt(nm.substring(nm.length - 2, nm.length));
    var testthis = $("input:checkbox[name=" + arrDropTrg[intTrgSel - 1][2] + "_0" + intGetChoice + "]:checked").length;
    if (intTrgSel < 9) {
        if (testthis === 0) {
            $("#" + arrDropTrg[intTrgSel - 1][2] + "_0" + intGetChoice).attr("checked", true);
        } else {
            $("#" + arrDropTrg[intTrgSel - 1][2] + "_0" + intGetChoice).attr("checked", false);
        }
    } else {
        if (testthis === 0) {
            $("#" + arrDropTrg[intTrgSel - 1][2] + "_" + intGetChoice).attr("checked", true);
        } else {
            $("#" + arrDropTrg[intTrgSel - 1][2] + "_" + intGetChoice).attr("checked", false);
        }
    }

    btnResetDD.removeAttr('disabled');
}

function resetDrop() {
    arrDropObj = [];
    for (var i = 0; i < arrDropTrg.length; i++) {

$("form[id="+ arrDropTrg[i][2]+"]").find("input[name="+ arrDropTrg[i][2]+"]").prop("checked",false)



//         $('input[name=' + arrDropTrg[i][2] + ']').addClass('resetdrop')
//         $('input[name=' + arrDropTrg[i][2] + ']').attr('checked', false)
//         input:after {
//    content: none;
// }
    }
    if ($("#feedback.is-open").length > 0) {
        $(divFeedback).html("").removeClass("is-open");
    }

    if (strDDType === "matching") {
        enableRad();
    } else if (strDDType === "onetomany") {
        enableChk();
    }

    $(btnSubmitDD).unbind("click");
    $(btnSubmitDD).attr('value', 'Submit');
    btnSubmitDD.removeAttr('disabled');
    $(btnSubmitDD)
        .text($(btnSubmitDD)
            .val());
    $(btnSubmitDD).bind("click", function() {
        chkDrop();
    });
    // $("[data-dd_button]").prepend(btnSubmitDD);
}

function getDragFB(stat) {

    switch (stat) {
        case "correct":
            successDrgFB();
            break;
        case "incorrect":
            failDrgFB();
            break;
        case "not completed":
            warningFB();
            break;
    }
    if (strDDType === "matching") {
        disableRad();
    } else if (strDDType === "onetomany") {
        disableChk();
    }
    if (stat !== "not completed" && parent.initialized === "true" || parent.initialized === true) {
        parent.getkcid();
    }
}

function successDrgFB() {
    $(divFeedback)
        .html(arrDrgFB[0])
        .addClass("is-open");
    if (parent.initialized === "true" || parent.initialized === true) {
        parent.strInteraction_stat = "correct"
        parent.strSuccess_stat = "passed";
        parent.intSetScr = 100;
    }

    $(divFeedback)
        .focus();
    intCurrDrgAttempt = 0;
    disableDragSub();
    disableDragReset();
}

function failDrgFB() {
    if (boolDragAtt === true) {
        intCurrDrgAttempt = intCurrDrgAttempt + 1;
        if (intCurrDrgAttempt < intDrgAttempt) {
            btnResetDD.removeAttr('disabled');
            $(divFeedback)
                .html(arrDrgFB[3])
            drawDragReset();
        } else {
            $(divFeedback)
                .html(arrDrgFB[1])
            intCurrDrgAttempt = 0;
            disableDragSub();
            disableDragReset();
        }
    } else {
        $(divFeedback)
            .html(arrDrgFB[1])
        intCurrDrgAttempt = 0;
    }
    $(divFeedback)
        .addClass("is-open")
    $(divFeedback)
        .focus();
    if (parent.initialized === "true" || parent.initialized === true) {
        parent.strInteraction_stat = "incorrect"
        parent.strSuccess_stat = "failed";
        parent.intSetScr = 0;
    }
}

function warningFB() {
    $(divFeedback)
        .html(arrDrgFB[2])
        .addClass("is-open")

    $(divFeedback)
        .focus();
    disableDragSub();
    btnResetDD.removeAttr("disabled");
    //disableSub();
}

function drawDragReset() {
    setTimeout(function() {

        btnRetryDD = $("button[data-dd-try]");
        if ($(btnRetryDD).length > 0) {
            $(btnRetryDD).on("click", function() {
                resetDrop();
            })
        }
    }, 500);
    disableDragReset();
}

function disableDragSub() {
    btnSubmitDD
        .attr("disabled", true);
}

function disableDragReset() {
    btnResetDD
        .attr("disabled", true);
}

function disableRad() {
    for (var i = 0; i < arrDropTrg.length; i++) {
        var tempFormNm = arrDropTrg[i][2]
        $("input:radio[name=" + tempFormNm + "]")
            .each(function(idx_a) {
                $(this)
                    .prop("disabled", true);
            })
    }
}

function disableChk() {
    for (var i = 0; i < arrDropTrg.length; i++) {
        var tempFormNm = arrDropTrg[i][2]
        $("input:checkbox[name=" + tempFormNm + "]")
            .each(function(idx_a) {
                $(this)
                    .prop("disabled", true);
            })
    }
}

function enableRad() {
    for (var i = 0; i < arrDropTrg.length; i++) {
        var tempFormNm = arrDropTrg[i][2]
        $("input:radio[name=" + tempFormNm + "]")
            .each(function(idx_a) {
                $(this)
                    .prop("disabled", false);
            })
    }
}

function enableChk() {
    for (var i = 0; i < arrDropTrg.length; i++) {
        var tempFormNm = arrDropTrg[i][2]
        $("input:checkbox[name=" + tempFormNm + "]")
            .each(function(idx_a) {
                $(this)
                    .prop("disabled", false);
            })
    }

}
