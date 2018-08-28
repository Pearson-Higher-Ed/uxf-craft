$(document).ready(function() {
    
    var fillTheGrid = function(timeInter, numArray) {
        setTimeout(function() {
            $.each(numArray, function(index, item){
                $('.ds-screen1 .ds-layout-grid:nth-child('+ item +')').addClass('ds-grid-fill'+item);
            });
        }, timeInter);
    };

    fillTheGrid(10, [2, 8, 10, 12]);
    fillTheGrid(200, [4, 6]);
    fillTheGrid(400, [1, 3, 5, 7]);
    fillTheGrid(600, [9, 11]);
});