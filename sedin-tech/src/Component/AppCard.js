import React, { useState } from 'react';
import './App.css';
import person from "./Person.jpg";
import likeBlack from "./LikeBlack.jpg";
import likeBlue from "./LikeBlue.jpg";
import RedImg from "./Redimg.jpg";
import Whiteimg from "./Whiteimg.jpg";

const App = () => {
    const dummyColors = [
        '#55EFC4',
        '#81ECEC',
        '#74B9FF',
        '#FAB1A0',
        '#B2BEC3',
        '#FAB1A0',
        '#FFEAA7',
    ];
    const [cards, setCards] = useState([
        {
            id: 1,
            heading: 'Card 1',
            description: 'Description for Card 1',
            color: dummyColors[0],
        },
        {
            id: 2,
            heading: 'Card 2',
            description: 'Description for Card 2',
            color: dummyColors[1],
        },
        {
            id: 3,
            heading: 'Card 3',
            description: 'Description for Card 3',
            color: dummyColors[2],
        },
        {
            id: 4,
            heading: 'Card 4',
            description: 'Description for Card 4',
            color: dummyColors[3],
        },
        {
            id: 5,
            heading: 'Card 5',
            description: 'Description for Card 5',
            color: dummyColors[4],
        },
        {
            id: 6,
            heading: 'Card 6',
            description: 'Description for Card 6',
            color: dummyColors[5],
        },
        {
            id: 7,
            heading: 'Card 7',
            description: 'Description for Card 7',
            color: dummyColors[6],
        },
    ]);

    const [showPopup, setShowPopup] = useState(false);
    const [editingCardId, setEditingCardId] = useState(null);
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [popupColor, setPopupColor] = useState(
        dummyColors[Math.floor(Math.random() * dummyColors.length)]
    );
    const [btn1, setBtn1] = useState(false);
    const [btn2, setBtn2] = useState(false);
    const [like, setLike] = useState(false);
    const [heart, setHeart] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setEditingCardId(null);
        setHeading('');
        setDescription('');
        setPopupColor(dummyColors[Math.floor(Math.random() * dummyColors.length)]);
    };

    const addCard = () => {
        if (heading && description) {
            const newCard = {
                id: new Date().getTime(),
                heading,
                description,
                color: popupColor,
            };

            setCards([newCard, ...cards]);
            closePopup();
        }
    };

    const editCard = (id) => {
        const cardToEdit = cards.find((card) => card.id === id);
        setEditingCardId(id);
        setHeading(cardToEdit.heading);
        setDescription(cardToEdit.description);
        setShowPopup(true);
        setPopupColor(cardToEdit.color);
    };

    const saveEditedCard = () => {
        if (editingCardId) {
            const updatedCards = cards.map((card) =>
                card.id === editingCardId
                    ? {
                        ...card,
                        heading,
                        description,
                    }
                    : card
            );
            setCards(updatedCards);
            closePopup();
        }
    };

    const toggleButton1 = () => {
        setBtn1(true);
        setBtn2(false);
    };

    const toggleButton2 = () => {
        setBtn1(false);
        setBtn2(true);
    };

    return (
        <div className="main">
            <div className='conatiner'>
                <div className="data">
                    <h3>Openings</h3>
                    <p>Manage Your Openings and create a new one quickly!</p>
                    <div className="buttons">
                        <button className="btn" disabled={btn1} onClick={toggleButton1}>
                            Active
                        </button>
                        <button className="btn" disabled={btn2} onClick={toggleButton2}>
                            Archive
                        </button>
                    </div>
                </div>
                <br />
                <br />
                <div className='card-box'>
                    <div className="card-list">
                        <div
                            className="card create-card"
                            style={{ backgroundColor: 'CLOUDS' }}
                            onClick={openPopup}
                        >
                            <button id="Btn">+</button>
                            <h3> New Opening</h3>
                        </div>
                        {cards.map((card) => (
                            <div
                                className="card"
                                key={card.id}
                                style={{ backgroundColor: card.color }}
                            >
                                <h3 onClick={() => editCard(card.id)}>{card.heading}</h3>
                                <p onClick={() => editCard(card.id)} className="card-description">{card.description}</p>
                                <span style={{ padding: '7px' }}>
                                    <span style={{ border: "2px solid #eae1e1", padding: '3px', margin: '7px' }}><img src={person} alt='Image' width="15px" height="15px" /></span>
                                    <span style={{ border: "2px solid #eae1e1", padding: '3px', margin: '7px' }} onClick={() => setLike(!like)}>
                                        {like ? <img src={likeBlack} alit="Like" width="15px" height="15px" /> : <img src={likeBlue} alit="Like" width="15px" height="15px" />}
                                    </span>
                                    <span style={{ border: "2px solid #eae1e1", padding: '3px', margin: '7px' }} onClick={() => setHeart(!heart)}>
                                        {heart ? <img src={Whiteimg} alit="Like" width="15px" height="15px" /> : <img src={RedImg} alit="Like" width="15px" height="15px" />}
                                    </span>
                                </span>
                                {' '}
                            </div>
                        ))}

                        {showPopup && (
                            <div className="popup-container">
                                <div className="popup">
                                    <input
                                        type="text"
                                        placeholder="Heading"
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    {editingCardId ? (
                                        <button onClick={saveEditedCard} style={{ borderRadius: '5px' }}>Save</button>
                                    ) : (
                                        <button onClick={addCard} style={{ borderRadius: '5px' }}>Add Card</button>
                                    )}
                                    <button onClick={closePopup} style={{ borderRadius: '5px' }}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </div>
    );
};

export default App;
