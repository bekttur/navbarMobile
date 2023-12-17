import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = () => {

    const items = ['🍔 Бургеры', '🥗 Салаты', '🍮 Десерты', '🍝 Основные блюда'];

    const [slide1Styles, setSlide1Styles] = useState({ opacity: 1, left: 0, width: 0 });
    const [currentWidth, setCurrentWidth] = useState(0);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const position = e.currentTarget.parentElement?.getBoundingClientRect();
        const width = e.currentTarget.parentElement?.offsetWidth;

        if (position && width) {
            setSlide1Styles({ opacity: 1, left: position.left, width: width });
            e.currentTarget.parentElement?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    };



    const handleSetActive = () => {
        const firstLink = document.querySelector('.navmenu_1 li:nth-of-type(1) a');
        const firstLinkParent = firstLink?.parentElement;

        if (firstLink && firstLinkParent) {
            setCurrentWidth(firstLinkParent.offsetWidth);
            const position = firstLink.getBoundingClientRect();
            setSlide1Styles({ left: position.left, width: firstLinkParent.offsetWidth });
        }
    };

    // Call handleSetActive once when the component mounts
    useEffect(() => {
        handleSetActive();
    }, []);

    return (
        <div className="horizontal-menu">
            <ul className="navmenu_1">
                {items.map((item, index) => (
                    <li key={index}>
                        <a href="#link" onClick={handleLinkClick}>
                            {item}
                        </a>
                    </li>
                ))}
                <li className="slide1" style={slide1Styles}></li>
            </ul>
        </div>
    );
};

export default Menu;
