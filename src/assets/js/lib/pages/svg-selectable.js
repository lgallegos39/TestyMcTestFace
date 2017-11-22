var arrSVG = [];
var passSVG;
var intSVG;
var intSVGct;
$(document)
    .ready(function getSVG() {
        intSVGct = 0;
        $(".js-pager-next").addClass("is-disabled")
        $('[data-svg-select]')
            .each(function(idx_a) {
                var thisSVG = $(this);
                if (idx_a < 9) {
                    thisSVG.attr("id", "svg_select_0" + (idx_a + 1))
                } else {
                    thisSVG.attr("id", "svg_select_" + (idx_a + 1))
                }
                var thisID = $(this).attr("id");
                thisSVG.attr("tabindex", 0)
                $(thisSVG)
                    .bind("click", function() {
                        selectSVG(this.id);
                    })
                $(thisSVG).on("focusin", function() {
                        $(thisSVG)
                            .on("keypress", function() {
                                selectSVG(this.id);
                            })
                    }
                )
                arrSVG.push(thisSVG);
            });
    });

function selectSVG(svg_id) {
  passSVG=svg_id;
    if (intSVGct < arrSVG.length) {
        intSVGct = intSVGct + 1;
        intSVG = parseInt(svg_id.substring(svg_id.length - 2, svg_id.length))
        var popup = new Foundation.Reveal($('#' + intSVG));
        popup.open();
    }
    if (intSVGct === (arrSVG.length)) {
        $(".js-pager-next").removeClass("is-disabled")
    }
}

function whichSVG()
{
  return passSVG;
}