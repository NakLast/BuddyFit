import React, { useEffect, useRef } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose, POSE_CONNECTIONS, POSE_LANDMARKS_NEUTRAL } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { Row, Col } from 'antd';

function PushUp() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    let userPoseNose = 0.5;
    let camera = null;
    let stage = 'UP';
    let repsCounter = 0;

    function onResults(results) {
        if (!results.poseLandmarks) return;
        let landmarks = results.poseLandmarks;

        let poseLandmarksNeutral = Object.values(POSE_LANDMARKS_NEUTRAL);
        let nose = poseLandmarksNeutral.map(index => landmarks[index]);
        userPoseNose = nose[0].y;

        calculateReps(userPoseNose);

        canvasRef.current.width = webcamRef.current.video.videoWidth;
        canvasRef.current.height = webcamRef.current.video.videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.font = '30px Arial';
        canvasCtx.fillStyle = 'red';
        canvasCtx.fillText(`${stage}: ${repsCounter.toString()}`, 320, 50);
        canvasCtx.restore();

        drawConnectors(
            canvasCtx,
            landmarks,
            POSE_CONNECTIONS,
            { color: '#00FF00', lineWidth: 2 }
        );

        drawLandmarks(
            canvasCtx,
            landmarks,
            { color: '#FF0000', lineWidth: 2, radius: 4 }
        );

        canvasCtx.restore();
    }

    const calculateReps = (nose) => {
        if (nose <= 0.5) {
            stage = 'UP';
        }
        if (nose > 0.7 && stage === 'UP') {
            stage = 'DOWN';
            repsCounter += 1;
            console.log(repsCounter, 'repsCounter');
        }
    };

    useEffect(() => {
        const userPose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            },
        });

        userPose.setOptions({
            selfieMode: true,
            modelComplexity: 0,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        userPose.onResults(onResults);

        if (webcamRef.current && webcamRef.current.video) {
            camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await userPose.send({ image: webcamRef.current.video });
                },
                width: 1280,
                height: 720,
            });
            camera.start();
        }

        return () => {
            if (camera) {
                camera.stop();
            }
        };
    }, []);

    return (
        <>
            <Row>
                <Webcam className="input_video" ref={webcamRef} imageSmoothing={true} mirrored={true} style={{ display: 'none' }} />
                <Col xs={24} md={12} lg={12}>
                    <canvas className="output" ref={canvasRef} />
                </Col>
            </Row>
        </>
    )
}

export default PushUp;
