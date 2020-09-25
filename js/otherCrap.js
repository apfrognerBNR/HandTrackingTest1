'use strict';
            var hands;
            var model;
            
            const video = document.getElementById('video');
            const canvas = document.getElementById('canvas');
            const snap = document.getElementById("snap");
            const errorMsgElement = document.querySelector('span#errorMsg');
            
            async function test() {
                // Load the MediaPipe handpose model assets.
                model = await handpose.load();
                
                // Pass in a video stream to the model to obtain 
                // a prediction from the MediaPipe graph.
                const video = document.querySelector("video");
                hands = await model.estimateHands(video);
                
                // Each hand object contains a `landmarks` property,
                // which is an array of 21 3-D landmarks.
                setInterval(handTrack,1);
            }
            test();

            async function handTrack() {

                hands = await model.estimateHands(video);
                hands.forEach(hand => {
                    //console.log(hand.landmarks);
                    console.log(hand);
                    drawHand(hand.landmarks);
                    //hand.landmarks.forEach(lm => drawDot(lm[0],lm[1],lm[2]))
                });
            }


            const constraints = {
                audio: false,
                video: {
                    width: 1280, height: 768
                }
            };

            // Access webcam
            async function init() {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    handleSuccess(stream);
                } catch (e) {
                    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
                }
            }

            // Success
            function handleSuccess(stream) {
                window.stream = stream;
                video.srcObject = stream;
            }

            // Load init
            init();

            // Draw image
            var context = canvas.getContext('2d');
                
            // snap.addEventListener("click", function() {
            //     context.drawImage(video, 0, 0, 640, 480);
            // });
            function drawHand(lms) {
                clearScreen();
                var zS = lms.map(zoot => zoot[3]);
                var zMin = Math.min(zS);
                var zMax = Math.max(zS);
                lms.forEach((lm,i) => drawDot(lm[0],lm[1],lm[2],zMin, zMax,i));

                var handPos = recHandPos(lms);
                if (handPos.isUp) {
                    drawText("Hand up",0,0);
                } else {
                    drawText("Hand down", 0,0 );
                }
                if (handPos.isOpen) {
                    drawText("Hand Open",0,30);
                } else {
                    drawText("Hand Closed", 0,30 );
                }
                if (handPos.thumbOut) {
                    drawText("Thumb out",0,60);
                } else {
                    drawText("Thumb in", 0,60 );
                }
                if (handPos.indexOut) {
                    drawText("Index out",0,90);
                } else {
                    drawText("Index in", 0,90 );
                }
                if (handPos.middleOut) {
                    drawText("Middle out",0,120);
                } else {
                    drawText("Middle in", 0,120 );
                }
                if (handPos.ringOut) {
                    drawText("Ring out",0,150);
                } else {
                    drawText("Ring in", 0,150 );
                }
                if (handPos.pinkyOut) {
                    drawText("Pinky out",0,180);
                } else {
                    drawText("Pinky in", 0,180 );
                }
                
                if (handPos.isLeft) {
                    drawText("Left hand", 0, 210);
                } else {
                    drawText("Right hand", 0, 210);
                }

            }

            function clearScreen() {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            function drawText(txt, x, y) {
                context.font = "30px Arial";
                context.fillText(txt, 10+x, 50+y);
            }

            function drawDot(x,y,z,ZMIN, ZMAX, idx) {
                var iStart = 2;
                var iEnd = 12;
                var spec = [0,8,4,12,16,20,5,2,9,13,17];
                context.beginPath();
                var zTrans = ZMIN + ((ZMAX-ZMIN)/ (iEnd - iStart)) * (z-iStart)
                context.arc(x,y,5, 0,2*Math.PI,false);
                if (spec.indexOf(idx) > 0) {
                    context.fillStyle = 'red';
                } else {
                    context.fillStyle = 'green';
                }

                if (idx === 0) {
                    context.fillText(z, x,y);
                }

                context.fill();
            }


