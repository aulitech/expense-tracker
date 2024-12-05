import React, { useState } from 'react';

function GestureInputs({ onUpdate }) {
    // Define state for all inputs
    const [userName, setUserName] = useState('');
    const [gestureId, setGestureId] = useState('');
    const [gestureName, setGestureName] = useState('');
    const [location, setLocation] = useState('Head'); // Default to "Head"
    const [disability, setDisability] = useState('');
    const [timeoutDuration, setTimeoutDuration] = useState('');

    // Handle changes for each input field
    const handleChange = () => {
        // Pass updated state to parent or other components
        onUpdate({
            userName,
            gestureId,
            gestureName,
            location,
            disability,
            timeoutDuration,
        });
    };

    return (
        <div>
            <h1>Cato Gesture Collection</h1>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3>Accepted Gesture Count: <span>0</span></h3>
            </div>

            <div className="inputs">
                <div>
                    <label htmlFor="userName">User Name</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                            handleChange();
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="gesture">Gesture ID</label>
                    <input
                        type="number"
                        id="gesture"
                        placeholder="Integer label (e.g. 1, 2, etc)"
                        step="1"
                        value={gestureId}
                        onChange={(e) => {
                            setGestureId(e.target.value);
                            handleChange();
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="gestureName">Gesture Name</label>
                    <input
                        type="text"
                        id="gestureName"
                        placeholder="e.g. Nod right, hand wave"
                        value={gestureName}
                        onChange={(e) => {
                            setGestureName(e.target.value);
                            handleChange();
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="location">Cato Location</label>
                    <select
                        id="location"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            handleChange();
                        }}
                    >
                        <option value="Head">Head</option>
                        <option value="Hand">Hand</option>
                        <option value="Foot">Foot</option>
                        <option value="Toe">Toe</option>
                        <option value="Ankle">Ankle</option>
                        <option value="Heel">Heel</option>
                        <option value="Calf">Calf</option>
                        <option value="Thigh">Thigh</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="disability">Disability</label>
                    <input
                        type="text"
                        id="disability"
                        placeholder="e.g. None, ALS"
                        value={disability}
                        onChange={(e) => {
                            setDisability(e.target.value);
                            handleChange();
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="timeoutDuration">Gesture Duration (sec)</label>
                    <input
                        type="number"
                        id="timeoutDuration"
                        value={timeoutDuration}
                        onChange={(e) => {
                            setTimeoutDuration(e.target.value);
                            handleChange();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default GestureInputs;
