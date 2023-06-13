import React, { useEffect, useRef } from 'react';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_LANDMARKS_LEFT, POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import Webcam from 'react-webcam';
import { Row, Col } from 'antd';

function Squat() {
    const webcamRef = useRef();
    const canvasRef = useRef();

    let userPoseAngle = null;
    let camera = null;
    let stage = 'UP';
    let repsCounter = 0;

    function onResults(results) {
        if (!results.poseLandmarks) return;

        const landmarksRight = Object.values(POSE_LANDMARKS_LEFT)
            .map(index => results.poseLandmarks[index]);

        const hip = [landmarksRight[11].x, landmarksRight[11].y];
        const knee = [landmarksRight[12].x, landmarksRight[12].y];
        const ankle = [landmarksRight[13].x, landmarksRight[13].y];

        const angle = calculatePoseAngle(hip, knee, ankle);

        canvasRef.current.width = webcamRef.current.video.videoWidth;
        canvasRef.current.height = webcamRef.current.video.videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');
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

    const calculatePoseAngle = (hip, knee, ankle) => {
        let radians = Math.atan2(ankle[1] - knee[1], ankle[0] - knee[0]) - Math.atan2(hip[1] - knee[0], hip[0] - knee[0]);
        let angle = Math.abs((radians * 180.0) / Math.PI);

        if (angle > 180.0) {
            angle = 360 - angle;
        }
        if (angle > 0 && angle < 180) {
            // console.log(angle.toFixed(2), 'currentAngle)
        }
        userPoseAngle = angle.toFixed(2);
        calculateReps(userPoseAngle);
    };

    const calculateReps = (angle) => {
        if (angle > 140) {
            stage = 'UP';
        }
        if (angle < 100 && stage === 'UP') {
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
            <Webcam className="input_video" ref={webcamRef} imageSmoothing={true} mirrored={true} style={{ display: 'none' }} />
            <canvas className="output" ref={canvasRef} style={{ width: '100%', height: '78.89%' }} />
        </>
    );
}

export default Squat;
