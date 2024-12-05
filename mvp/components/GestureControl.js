import React, { useState, useEffect } from 'react';

function GestureControl({ enableCharacteristic, accCharacteristic, onNotificationsReceived, gestureDuration }) {
    const [isCollecting, setIsCollecting] = useState(false); // Tracks if data collection is in progress
    const [progress, setProgress] = useState(100); // Progress bar percentage
    const [progressInterval, setProgressInterval] = useState(null); // Reference to the progress interval

    // Start Button Click Handler
    const handleStart = () => {
        if (!enableCharacteristic || !accCharacteristic) {
            console.error('Enable or accelerometer characteristic is missing');
            return;
        }

        const timeout = parseInt(gestureDuration, 10) || 2; // Default to 2 seconds if no input

        // Enable the characteristic
        enableCharacteristic
            .writeValue(new Uint8Array([0x01]))
            .then(() => console.log('Enabling Cato Motion service'))
            .catch((error) => console.error('Error enabling service:', error));

        // Start notifications
        accCharacteristic
            .startNotifications()
            .then(() => {
                console.log('Notifications requested');
                accCharacteristic.addEventListener('characteristicvaluechanged', handleNotifications);

                // Start progress bar
                setIsCollecting(true);
                startProgressBar(timeout);
            })
            .catch((error) => {
                console.error('Error starting notifications:', error);
            });
    };

    // Stop Button Click Handler
    const handleStop = () => {
        if (!accCharacteristic) return;

        accCharacteristic
            .stopNotifications()
            .then(() => {
                console.log('Notifications stopped');
                accCharacteristic.removeEventListener('characteristicvaluechanged', handleNotifications);

                clearInterval(progressInterval); // Stop progress bar updates
                setProgress(100); // Reset progress
                setIsCollecting(false);
            })
            .catch((error) => console.error('Error stopping notifications:', error));
    };

    // Handle Notifications
    const handleNotifications = (event) => {
        let value = event.target.value;

        const seq = value.getUint16(0, false);
        const ts = value.getUint16(2, false);

        const ax = value.getInt16(4, false) / 10;
        const ay = value.getInt16(6, false) / 10;
        const az = value.getInt16(8, false) / 10;

        const gx = value.getInt16(10, false) / 10;
        const gy = value.getInt16(12, false) / 10;
        const gz = value.getInt16(14, false) / 10;

        const dataRow = {
            seq,
            ts,
            acc: [ax, ay, az],
            gyro: [gx, gy, gz],
        };

        console.log('Data received:', dataRow);

        // Pass the data to the parent component
        if (onNotificationsReceived) {
            onNotificationsReceived(dataRow);
        }
    };

    // Start Progress Bar
    const startProgressBar = (duration) => {
        let progressValue = 100;
        const intervalDuration = (duration * 1000) / 20; // Divide into 20 steps

        const interval = setInterval(() => {
            progressValue -= 5; // Decrease progress
            setProgress(progressValue);

            if (progressValue <= 0) {
                clearInterval(interval);
                handleStop(); // Automatically stop when duration ends
            }
        }, intervalDuration);

        setProgressInterval(interval);
    };

    // Cleanup on Unmount
    useEffect(() => {
        return () => {
            clearInterval(progressInterval);
            if (accCharacteristic) {
                accCharacteristic.removeEventListener('characteristicvaluechanged', handleNotifications);
            }
        };
    }, [accCharacteristic, progressInterval]);

    return (
        <div className="gesture-control">
            <button onClick={handleStart} disabled={isCollecting}>
                Start
            </button>
            <button onClick={handleStop} disabled={!isCollecting}>
                Stop
            </button>
            {isCollecting && (
                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{
                            width: `${progress}%`,
                            height: '20px',
                            backgroundColor: 'green',
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
}

export default GestureControl;
