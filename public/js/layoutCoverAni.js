$(document).ready(function() {
    
    var fillTheGrid = function(timeInter, numArray) {
        setTimeout(function() {
            $.each(numArray, function(index, item){
                $('.ds-screen1 .ds-grid-fill'+item).addClass('ds-grid-opacity'+item);
            });
        }, timeInter);
    };

    fillTheGrid(200, [2, 8, 10, 12]);
    fillTheGrid(400, [4, 6]);
    fillTheGrid(600, [1, 3, 5, 7]);
    fillTheGrid(800, [9, 11]);
});