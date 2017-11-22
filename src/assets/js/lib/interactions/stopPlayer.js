// Tab Player Stop

$(document)
    .on('open.zf.reveal', '[data-reveal]', function() {
        $('video,audio')
            .each(function(idx_a) {

                $(this)[0].pause();
                $(this)[0].currentTime=0;
            })
    });

$(document)
    .on('closed.zf.reveal', '[data-reveal]', function() {
        $('video,audio')
            .each(function(idx_a) {

                $(this)[0].pause();
                $(this)[0].currentTime=0;

            })
    });