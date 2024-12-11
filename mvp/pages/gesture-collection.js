import React, { useState } from 'react';
import GestureInputs from '../components/GestureInputs';
import BluetoothConnector from '../components/BluetoothConnector';
import GestureControl from '../components/GestureControl';
import NavBar from '../components/navbar';
import { useAuth } from '../firebase/auth';
import Head from 'next/head';
import CircularProgress from '@mui/material/CircularProgress';

function GestureCollection() {
    const { authUser, isLoading } = useAuth();
    const [gestureInputs, setGestureInputs] = useState({}); // State for input fields
    const [gestureData, setGestureData] = useState([]); // State for collected gestures
    const [enableCharacteristic, setEnableCharacteristic] = useState(null); // Enable characteristic
    const [accelerometerCharacteristic, setAccelerometerCharacteristic] = useState(null); // Accelerometer characteristic

    // Handle updates from GestureInputs
    const handleInputUpdate = (data) => {
        setGestureInputs(data);
        console.log('Input Data:', data);
    };

    // Handle notifications
    const handleNotification = (data) => {
        console.log('Notification received:', data);
        setGestureData((prev) => [...prev, data]);
    };

    // Callback for setting Bluetooth characteristics (passed to BluetoothConnector)
    const handleCharacteristicsReady = (enableChar, accChar) => {
        setEnableCharacteristic(enableChar);
        setAccelerometerCharacteristic(accChar);
    };

    return  ((!authUser ) ?
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }}/>
    :
    <div>
      <Head>
        <title>MyCato-Gesture Collection</title>
      </Head>


            <NavBar />

            {/* Input Fields */}
            <GestureInputs onUpdate={handleInputUpdate} />

            {/* Bluetooth Connector */}
            <BluetoothConnector
                onCharacteristicsReady={handleCharacteristicsReady}
            />

            {/* Gesture Control */}
            <GestureControl
                enableCharacteristic={enableCharacteristic}
                accCharacteristic={accelerometerCharacteristic}
                onNotificationsReceived={handleNotification}
                gestureDuration={gestureInputs.timeoutDuration || 2} // Default to 2 seconds
            />

            {/* Display Collected Data */}
            <p>Collected Data:</p>
            <pre>{JSON.stringify({ inputs: gestureInputs, data: gestureData }, null, 2)}</pre>
        </div>
    );
}

export default GestureCollection;
