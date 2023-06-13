import Phaser from 'phaser';
import React, { useEffect } from 'react';

import Background from '../../assets/BGFitness.png'
import Duck from '../../assets/DuckDuck.png';

const GamePushUp = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: 'game-component',
            width: '100%',
            height: '60%',
            scene: {
                preload: preload,
                create: create,
                update: update
            },
        };
        const game = new Phaser.Game(config)

        var countdown = 5
        let pushupCount = 0

        function getPushupCountdown() {
            return countdown
        }

        function startTimer(duration, timerText) {
            var timer = duration;
            pushupCount = 0;
            sessionStorage.setItem("pushup_count", 0);
            var timerInterval = setInterval(() => {
                timer--;
                if (timer >= 0) {
                    var minutes = Math.floor(timer / 60);
                    var seconds = timer % 60;

                    // แสดงผลเวลาในรูปแบบ 00:00
                    var timeString = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
                    timerText.setText(timeString);
                }
                if (timer < 0) {
                    clearInterval(timerInterval);
                    timerText.setText("Time's up!");
                    countdown = 10;
                }
            }, 1000);
        }

        function preload() {
            this.load.spritesheet('duck', Duck, { frameWidth: 640, frameHeight: 640 });
        }

        function create() {
            const buddy = this.add.sprite(360, 250, 'duck').setScale(0.5);
            this.anims.create({
                key: 'pushup',
                frameRate: 5,
                frames: this.anims.generateFrameNumbers('duck', {
                    start: 4,
                    end: 6,
                }),
            });
            buddy.anims.play('pushup');

            // Add text
            var text = this.add.text(360, 100, 'PushUp bro', {
                fontSize: '42px',
                // fontFamily: 'minecraft',
                fill: '#fff'
            });
            text.setOrigin(0.5, 0.5);

            this.pushupCountText = this.add.text(300, 300, '', {
                fontSize: '64px',
                // fontFamily: 'minecraft',
                fill: '#fff'
            });
            this.pushupCountText.setOrigin(0.5)

            var startButton = this.add.text(300, 700, 'Start', {
                fontSize: '64px',
                // fontFamily: 'minecraft',
                fill: '#fff'
            });
            startButton.setOrigin(0.5);
            startButton.setInteractive();

            // Handle start button click event
            startButton.on('pointerdown', () => {
                startButton.disableInteractive(); // ปิดปุ่มให้ไม่สามารถคลิกได้
                var countdownText = this.add.text(300, 300, '', {
                    fontSize: '64px',
                    // fontFamily: 'minecraft',
                    fill: '#fff'
                }).setOrigin(0.5);
                countdown = 5;
                var countdownInterval = setInterval(() => {
                    countdownText.setText(countdown);
                    countdown--;
                    if (countdown < 0) {
                        countdown = 0
                        clearInterval(countdownInterval);
                        countdownText.setText('');
                        startTimer(30, this.add.text(300, 300, '', {
                            fontSize: '64px',
                            // fontFamily: 'minecraft',
                            fill: '#fff'
                        }).setOrigin(0.5)); // เริ่มจับเวลา 30 วินาที
                    }
                }, 1000);
            });
        }

        function update() {
            var count = 0

            // Update any logic for the character page
            if (count == 1 && countdown == 0) {
                this.buddy.play('puship');
                count++;
                pushupCount++;
                this.pushupCountText.setText(pushupCount);
                sessionStorage.setItem("pushup_count", pushupCount);
            }
        }

    }, []);

    return <div id="game-component" />;
};

export default GamePushUp;
