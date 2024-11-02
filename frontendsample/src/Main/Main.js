import React, { useState } from 'react';
import './Main.css';

function Main() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState({});

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setPrediction(result);
                console.log('Prediction result:', result);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='main'>
            <h1>Upload Image for Prediction</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload and Predict</button>
            </form>

            <div className="results">
                { Object.keys(prediction).length !== 0 && (
                    <div>
                        <img src={URL.createObjectURL(selectedFile)} alt="Selected file" />
                        <h2>Prediction</h2>
                        <p>Class: {prediction.message}</p>
                        <p>Confidence: {prediction.confidence}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Main;