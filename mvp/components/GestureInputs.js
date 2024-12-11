import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
            <Paper  elevation={1} style={{ padding: '2rem', margin: '4rem' }}>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                    <TextField
                        id="userName"
                        label="User Name"
                        required
                        value={userName}
                        size="small"
                        onChange={(event) => {
                            setUserName(event.target.value);
                            handleChange();
                        }}
                    />

                    <TextField
                        id="gestureName"
                        placeholder="Nod right"
                        label="Gesture Name"
                        value={gestureName}
                        size="small"
                        onChange={(e) => {
                            setGestureName(e.target.value);
                            handleChange();
                        }}
                    />

                    <TextField
                        label="Gesture ID"
                        type="number"
                        id="gestureId"
                        value={gestureId}
                        size="small"
                        onChange={(e) => {
                            setGestureId(e.target.value);
                            handleChange();
                        }}
                    />
                    <FormControl>
                        <InputLabel id="location">Placement</InputLabel>
                        <Select
                            labelid="location"
                            id="location"
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                handleChange();
                            }}
                        >
                            <MenuItem value="Head">Head</MenuItem>
                            <MenuItem value="Hand">Hand</MenuItem>
                            <MenuItem value="Foot">Foot</MenuItem>
                            <MenuItem value="Toe">Toe</MenuItem>
                            <MenuItem value="Ankle">Ankle</MenuItem>
                            <MenuItem value="Heel">Heel</MenuItem>
                            <MenuItem value="Calf">Calf</MenuItem>
                            <MenuItem value="Thigh">Thigh</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Disability"
                        id="disability"
                        placeholder="ALS"
                        value={disability}
                        size="small"
                        onChange={(e) => {
                            setDisability(e.target.value);
                            handleChange();
                        }}
                    />

                    <TextField
                        label="timeoutDuration"
                        type="number"
                        id="timeoutDuration"
                        value={timeoutDuration}
                        size="small"
                        onChange={(e) => {
                            setTimeoutDuration(e.target.value);
                            handleChange();
                        }}
                    />
                </Stack>
            </Paper>
        </div>
     );
}

export default GestureInputs;
