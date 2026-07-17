import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Combos.module.css';
import { useSEO } from '../hooks/useSEO';

export const Combos = () => {
    useSEO({
        title: "Combos de Mugs Temáticos y Personalizados | BreakLab",
        description: "Encuentra combos exclusivos de mugs coleccionables en Bogotá. Los Simpson, Friends, One Piece, Avengers, Batman, Bob Esponja, Looney Tunes y más.",
        keywords: "combos de mugs, tazas coleccionables, mugs personalizados bogota, set de mugs friends, mugs los simpson, breaklab combos"
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { id: 'combo-avengers', name: 'Combo Avengers', icon: '🦸', theme: styles.themePlayful },
        { id: 'combo-batman', name: 'Combo Batman', icon: '🦇', theme: styles.themeMasculine },
        { id: 'combo-bob-esponja', name: 'Combo Bob Esponja', icon: '🧽', theme: styles.themePlayful },
        { id: 'combo-caballeros-del-zodiaco', name: 'Combo Caballeros del Zodíaco', icon: '🌌', theme: styles.themePlayful },
        { id: 'combo-friends', name: 'Combo Friends', icon: '☕', theme: styles.themeRomantic },
        { id: 'combo-looney-tunes', name: 'Combo Looney Tunes', icon: '🐰', theme: styles.themePlayful },
        { id: 'combo-los-simpson', name: 'Combo Los Simpson', icon: '🍩', theme: styles.themePlayful },
        { id: 'combo-mugs-one-piece', name: 'Combo One Piece', icon: '🏴‍☠️', theme: styles.themePlayful }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Combos de Mugs Coleccionables</h1>
                <p className={styles.subtitle}>Descubre nuestros espectaculares combos temáticos de tazas. Llévate la colección completa de tus personajes favoritos o regala un detalle inolvidable.</p>
            </div>
            
            <div className={styles.grid}>
                {categories.map((cat) => (
                    <Link to={`/categoria/${cat.id}`} key={cat.id} className={`${styles.card} ${cat.theme}`}>
                        <div className={styles.iconWrapper}>
                            <span className={styles.icon}>{cat.icon}</span>
                        </div>
                        <h2 className={styles.cardTitle}>{cat.name}</h2>
                        <span className={styles.exploreBtn}>Ver Opciones →</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
