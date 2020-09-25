function recHandPos(lms) {
    // recognize 

    var wrist = lms[0];
    
    var tipFirst = lms[8];
    var tipThumb = lms[4];
    var tipMid = lms[12];
    var tipRing = lms[16];
    var tipPinky = lms[20];

    var knuFirst = lms[5];
    var knuThumb = lms[2];
    var knuMid = lms[9];
    var knuRing = lms[13];
    var knuPinky = lms[17];


   /* if (tipFirst[1] > wrist[1]) {
        //drawText("hand down", 0, 0);
        handPos.isUp = 0;
    } else {
        handPos.isUp = 1;
        //drawText("hand up", 0, 0);
    }

    if (tipThumb[0] > knuThumb[0]) {
        handPos.thumbOut = 1;
    } else {
        handPos.thumbOut = 0;
    }

    if (tipFirst[1] > knuFirst[1]) {
        handPos.indexOut = 0;
    } else {
        handPos.indexOut = 1;
    }

    if (tipMid[1] > knuMid[1]) {
        handPos.middleOut = 0;
    } else {
        handPos.middleOut = 1;
    }

    if (tipRing[1] > knuRing[1]) {
        handPos.ringOut = 0;
    } else {
        handPos.ringOut = 1;
    }

    if (tipPinky[1] > knuPinky[1]) {
        handPos.pinkyOut = 0;
    } else {
        handPos.pinkyOut = 1;
    }
*/
    figureOuts(lms);
        if (handPos.thumbOut 
            && handPos.indexOut
            && handPos.middleOut
            && handPos.ringOut
            && handPos.pinkyOut
            ) {
            handPos.isOpen = 1;
        } else {
            handPos.isOpen = 0;
        }

        identifyHand(lms);

        if (handPos.mcpAngle >= 90) {
            handPos.isLeft = 1;
        } else {
            handPos.isLeft = 0;
        }

    return handPos;
}

function figureOuts(lms) {
    var wrist = lms[0];
    
    var tipFirst = lms[8];
    var tipThumb = lms[4];
    var tipMid = lms[12];
    var tipRing = lms[16];
    var tipPinky = lms[20];

    var knuFirst = lms[5];
    var knuThumb = lms[2];
    var knuMid = lms[9];
    var knuRing = lms[13];
    var knuPinky = lms[17];


    if (tipFirst[1] > wrist[1]) {
        //drawText("hand down", 0, 0);
        handPos.isUp = 0;
    } else {
        handPos.isUp = 1;
        //drawText("hand up", 0, 0);
    }

    if (tipThumb[0] > knuThumb[0]) {
        handPos.thumbOut = 1;
    } else {
        handPos.thumbOut = 0;
    }

    if (tipFirst[1] > knuFirst[1]) {
        handPos.indexOut = 0;
    } else {
        handPos.indexOut = 1;
    }

    if (tipMid[1] > knuMid[1]) {
        handPos.middleOut = 0;
    } else {
        handPos.middleOut = 1;
    }

    if (tipRing[1] > knuRing[1]) {
        handPos.ringOut = 0;
    } else {
        handPos.ringOut = 1;
    }

    if (tipPinky[1] > knuPinky[1]) {
        handPos.pinkyOut = 0;
    } else {
        handPos.pinkyOut = 1;
    }
}

function identifyHand(lms) {
    var alpha = getAngle(lms[9][0],lms[9][1],lms[0][0],lms[0][1],lms[0][0]+0.1,lms[0][1])
    alpha = rad2Deg(alpha);
    alpha = Math.abs(alpha);
    console.log(alpha);
    handPos.mcpAngle = alpha;
}

function getAngle(mcpx,mcpy,wx,wy,cx,cy) {
    var ab_x = wx-mcpx;
    var ab_y = wy - mcpy;
    var cb_x = wx - cx;
    var cb_y = wy - cy;

    var dot = ab_x * cb_x + ab_y * cb_y;
    var cross = ab_x * cb_y - ab_y * cb_x;

    var angBA = Math.atan2(ab_y, ab_x);
    var angBC = Math.atan2(cb_y, cb_x);

    var alpha = angBA - angBC;

    //var alpha = Math.atan2(cross, dot);

    return alpha;
}

function rad2Deg(a) {
    return Math.floor(a * 180.0 / Math.PI + 0.5);
}

var handPos = {
    isUp: 0,
    isPointLeft: 0,
    isOpen: 0,
    thumbOut: 0,
    indexOut: 0,
    middleOut: 0,
    ringOut: 0,
    pinkyOut: 0,
    letter: "none",
    mcpAngle: 0.0,
    isLeft: 0,
}