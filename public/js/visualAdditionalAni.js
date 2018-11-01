function getTop(id) {
    return $("#" + id).offset().top - 700;
}
function visualScreen3() {
    var visualinter3 = setInterval(function(){
        if (getTop('colorDoDont00')<= $('html, body').scrollTop()) {
            CDD00animation.play();
            CDD01animation.play();
            clearInterval(visualinter3);
        }
    }, 100);    
}

function visualScreen4() {
    var visualinter4 = setInterval(function(){
    if (getTop('colorDoDont02')<= $('html, body').scrollTop()) {
        CDD02animation.play();
        clearInterval(visualinter4);
        }
    }, 100);
}

function visualScreen5() {
    var visualinter5 = setInterval(function(){
    if (getTop('colorDoDont03')<= $('html, body').scrollTop()) {
        CDD03animation.play();
        CDD04animation.play();
        clearInterval(visualinter5);
        }
    }, 100);    
}

function visualScreen6() {
    var visualinter6 = setInterval(function(){
    if (getTop('colorDoDont05')<= $('html, body').scrollTop()) {
        CDD05animation.play();
        clearInterval(visualinter6);
        }
    }, 100);    
}

function visualScreen8() {
    var visualinter8 = setInterval(function(){
    if (getTop('typography00')<= $('html, body').scrollTop()) {
        typo00animation.play();
        typo01animation.play();
        clearInterval(visualinter8);
        }
    }, 100);    
}

function visualScreen10() {
    var visualinter10 = setInterval(function(){
    if (getTop('icons00')<= $('html, body').scrollTop()) {
        icons00animation.play();
        icons01animation.play();
        clearInterval(visualinter10);
        }
    }, 100);    
}

function visualScreen11() {
    var visualinter11 = setInterval(function(){
    if (getTop('hintText')<= $('html, body').scrollTop()) {
        HTanimation.play();
        HTanimation.play();
        clearInterval(visualinter11);
        }
    }, 100);    
}

function visualScreen14() {
    var visualinter14 = setInterval(function(){
    if (getTop('illustration')<= $('html, body').scrollTop()) {
        illusAnimation.play();
        clearInterval(visualinter14);
        }
    }, 100);    
}

