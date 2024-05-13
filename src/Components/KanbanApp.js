import React, { useState, useEffect } from 'react';
import Board from 'react-trello';
import Header from './Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function KanbanApp() {
    const { bId } = useParams();
    const [boardData, setBoardData] = useState({ lanes: [] });

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        axios.get(`http://localhost:8080/tableauData/${bId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            setBoardData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setBoardData({ lanes: [] });
        });
    }, [bId]);

    const handleSaveClick = () => {
        console.log('Saving board data:', boardData);
        const jwtToken = localStorage.getItem('jwtToken');
        axios.put(`http://localhost:8080/tableauData/${bId}`, boardData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            console.log('Data saved successfully:', response.data);
        })
        .catch(error => {
            console.error('Error saving data:', error);
        });
    };

    return (
        <>
            <Header />
            <Board
                data={boardData}
                draggable
                editable
                canAddLanes
            />
            <button onClick={handleSaveClick} style={{ margin: '20px', padding: '10px' }}>
                Save Board
            </button>
        </>
    );
}

export default KanbanApp;
