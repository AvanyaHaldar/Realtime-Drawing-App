noseX = 0;
noseY = 0;
difference = 0;
right_wristX = 0;
left_wristX = 0;

function setup() {
    canvas = createCanvas(480, 480);
    canvas.position(700, 160);

    video = createCapture(VIDEO);
    video.size(500, 500);
    video.position(100, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", getPoses);

}

function draw() {
    background("aqua");
    fill("magenta");
    stroke("magenta");
    square(noseX, noseY, difference);
    document.getElementById("square_side").innerHTML = "Length Of The Square Will Be - " + difference;
}

function modelLoaded() {
    console.log("Posenet is Initialized");
}

function getPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose x = " + noseX + "Nose y = " + noseY);

        right_wristX = results[0].pose.rightWrist.x;
        left_wristX = results[0].pose.leftWrist.x;
        console.log("Right Wrist =" + right_wristX + "Left Wrist=" + left_wristX);

        difference = Math.floor(left_wristX - right_wristX);
        console.log("Difference = " + difference);
    }
}