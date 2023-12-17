import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './HorizontalMenu.css';

const items = ['🍔 Бургеры', '🥗 Салаты', '🍮 Десерты', '🍝 Основные блюда'];

const HorizontalMenu = () => {
    const dragX = useMotionValue(0);
    const constraintsRef = useRef(null);
    const menuWidth = 400;

    const menuRef = useRef(null);
    const [menuItemsWidth, setMenuItemsWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(-1); // Добавляем состояние для отслеживания активной кнопки

    const controls = useAnimation(); // Добавляем анимацию

    useLayoutEffect(() => {
        const { width } = menuRef?.current?.getBoundingClientRect();
        setMenuItemsWidth(width);
    }, []);

    const makeActiveMenuElement = (index: number) => {
        const menuItems = document.querySelectorAll('.menu-item') as unknown as HTMLDivElement[];
        const menuItem = document.getElementById(`menu-item-${index}`);

        const currentIndex = Array.from(menuItems).findIndex((el) => el.classList.contains('active'));
        if (!menuItem) return;

        const menuItemCenter = menuItem.offsetLeft + menuItem.offsetWidth / 2;
        const menuCenter = menuWidth / 2;

        const leftConstraint = -menuItemsWidth + menuWidth;
        const rightConstraint = 0;

        let menuItemOffset = menuItemCenter - menuCenter;
        menuItemOffset = Math.min(rightConstraint, Math.max(leftConstraint, -menuItemOffset));

        // Анимация смещения меню
        controls.start({ x: menuItemOffset });

        menuItems.forEach((el) => {
            el.classList.remove('active');
        });
        menuItem.classList.add('active');
        setActiveIndex(index); // Устанавливаем активный индекс
    };

    return (
        <>
            <div style={{ width: menuWidth, overflow: 'hidden', position: "fixed", backgroundColor: "white" }} ref={constraintsRef}>
                <motion.div
                    ref={menuRef}
                    className="menu"
                    style={{
                        display: 'flex',
                        userSelect: 'none',
                        x: dragX,
                        width: 'max-content',
                        cursor: 'pointer',
                        transition: 'transform 120ms linear',
                    }}
                    drag="x"
                    dragConstraints={{ left: menuWidth - menuItemsWidth, right: 0 }}
                    dragElastic={0.8}
                    animate={controls} // Подключаем controls к свойству animate
                >
                    {items.map((item, index) => (
                        <ScrollLink to={item} spy={true} smooth={true} offset={-100} duration={500} className='main-page-link'>
                            <motion.div
                                key={index}
                                id={`menu-item-${index}`}
                                className={`menu-item ${index === activeIndex ? 'active' : ''}`}
                                style={{
                                    flex: '0 0 auto',
                                    padding: '8px 16px',
                                    borderRadius: 999,
                                    backgroundColor: index === activeIndex ? '#3498db' : 'transparent', // Цвет фона для активной кнопки
                                    color: index === activeIndex ? '#fff' : '#000', // Цвет текста для активной кнопки
                                }}
                                onClick={() => makeActiveMenuElement(index)}
                            >
                                {item}
                            </motion.div>
                        </ScrollLink>
                    ))}
                </motion.div>
            </div>
            <div className='scrollBlock'>
                <br/>
                <br/>
                {items.map((item, index) => (
                    <div key={index} id={item} style={{ marginBottom: 600 }}>
                        <h2>{item}</h2>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HorizontalMenu;
