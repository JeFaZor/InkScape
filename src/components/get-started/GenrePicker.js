import React, { useState } from 'react'; // Add useState import

import styled from 'styled-components';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // Import the tooltip CSS

const GenrePickerContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
    padding: 20px;
    background-color: #2E073F; // Changed to a lighter opacity
    border: 2px solid #3a2566; // Changed to a darker purple tone
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(64, 0, 64, 0.3);
    position: relative;
    top: 50px;
    z-index: 10;
    max-width: 55vw;
    max-height: 400px;
    overflow-y: auto;
`;

const GenreImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    background-color: #3a2566; // Changed to a darker purple tone
    padding: 5px;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(186, 85, 211, 1); // Changed to a brighter purple tone
    }
    cursor: pointer;
`;

const GenreImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 4px;
`;


const GenrePicker = ({ genres, onSelectGenre }) => {
    const [hoveredGenre, setHoveredGenre] = useState(null); // Move useState inside the component

    return (
        <GenrePickerContainer>
            {genres.map((genre, index) => (
                <GenreImageContainer
                    key={index}
                    onMouseEnter={() => setHoveredGenre(genre.name)}
                    onMouseLeave={() => setHoveredGenre(null)}
                    onClick={() => onSelectGenre(genre)}
                    data-tooltip-id="genre-tooltip"
                >
                    <GenreImage src={genre.image} alt={genre.name} />
                    <span style={{ marginTop: '8px', color: '#fff', fontSize: '14px', textAlign: 'center', fontFamily: 'Raleway, sans-serif' }}>{genre.name}</span>

                </GenreImageContainer>
            ))}
        </GenrePickerContainer>
    );
};



export default GenrePicker;
