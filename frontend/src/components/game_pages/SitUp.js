import React, { useEffect, useRef, useState } from 'react';

import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_LANDMARKS, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import Webcam from 'react-webcam';

import { Row, Col } from 'antd'

function SitUp() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    let userPoseAngle = null;
    let camera = null;
    let stage = 'DOWN';
    let repsCounter = 0;

    function onResults(results) {
        if (!results.poseLandmarks) return;
        let landmarks = results.poseLandmarks;

        try {
            let leftShoulder = landmarks[POSE_LANDMARKS.LEFT_SHOULDER];
            let leftElbow = landmarks[POSE_LANDMARKS.LEFT_ELBOW];
            let leftWrist = landmarks[POSE_LANDMARKS.LEFT_WRIST];
            calculatePoseAngle(leftShoulder, leftElbow, leftWrist);
        } catch (error) {
            // console.error(error);
        }
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
            results.poseLandmarks,
            POSE_CONNECTIONS,
            { color: '#00FF00', lineWidth: 2 }
        );
        drawLandmarks(
            canvasCtx,
            results.poseLandmarks,
            { color: '#FF0000', lineWidth: 2, radius: 4 }
        );
        canvasCtx.restore();
    }

    const calculatePoseAngle = (shoulder, elbow, wrist) => {
        let radians = Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x) - Math.atan2(shoulder.y - elbow.y, shoulder.x - elbow.x);
        let angle = Math.abs(radians * (180 / Math.PI));

        if (angle > 180) {
            angle = 360 - angle;
        }
        if (angle > 0 && angle < 180) {
            // console.log(angle.toFixed(2), "currentAngle");
        }
        userPoseAngle = angle.toFixed(2);
        calculateReps(userPoseAngle);
    };

    const calculateReps = (angle) => {
        if (angle >= 160) {
            stage = 'DOWN';
        }
        if (angle <= 40 && stage === 'DOWN') {
            stage = 'UP';
            repsCounter += 1;
            console.log(repsCounter, "repsCounter");
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
    );
};

export default SitUp;
