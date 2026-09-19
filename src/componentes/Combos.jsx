import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Combos.module.css';
import { useSEO } from '../hooks/useSEO';

// Imágenes reales de alta calidad de la carpeta banner-combos-mugs-coleccionables-breaklab
import imgComboAvengers from '../assets/banner-combos-mugs-coleccionables-breaklab/taza-heroes-comic-marvel-dc-vengadores-breaklab.png';
import imgComboBatman from '../assets/banner-combos-mugs-coleccionables-breaklab/mug-batman-logo-rojo-negro-the-batman-breaklab.png';
import imgComboBobEsponja from '../assets/banner-combos-mugs-coleccionables-breaklab/mug-bob-esponja-patricio-edicion-especial-breaklab.png';
import imgComboCaballeros from '../assets/banner-combos-mugs-coleccionables-breaklab/mug-caballeros-zodiaco-saint-seiya-coleccion-breaklab.png';
import imgComboFriends from '../assets/banner-combos-mugs-coleccionables-breaklab/taza-friends-central-perk-logo-coleccionable-breaklab.png';
import imgComboLooneyTunes from '../assets/banner-combos-mugs-coleccionables-breaklab/tazas-looney-tunes-piolin-taz-coleccion-breaklab.jpeg';
import imgComboLosSimpson from '../assets/banner-combos-mugs-coleccionables-breaklab/tazas-los-simpson-familia-edicion-especial-breaklab.jpeg';
import imgComboOnePiece from '../assets/banner-combos-mugs-coleccionables-breaklab/mug-one-piece-luffy-zoro-chopper-coleccionable-breaklab.jpeg';

export const Combos = () => {
    useSEO({
        title: "Packs de Mugs Temáticos y Personalizados | BreakLab",
        description: "Encuentra packs exclusivos de mugs coleccionables en Bogotá. Los Simpson, Friends, One Piece, Avengers, Batman, Bob Esponja, Looney Tunes y más.",
        keywords: "packs de mugs, tazas coleccionables, mugs personalizados bogota, set de mugs friends, mugs los simpson, breaklab packs"
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { 
            id: 'combo-avengers', 
            name: 'Pack Avengers', 
            image: imgComboAvengers, 
            alt: 'Pack Mugs Avengers Marvel BreakLab', 
            theme: styles.themePlayful 
        },
        { 
            id: 'combo-batman', 
            name: 'Pack Batman', 
            image: imgComboBatman, 
            alt: 'Pack Mugs Batman DC Comics BreakLab', 
            theme: styles.themeMasculine 
        },
        { 
            id: 'combo-bob-esponja', 
            name: 'Pack Bob Esponja', 
            image: imgComboBobEsponja, 
            alt: 'Pack Mugs Bob Esponja y Patricio BreakLab', 
            theme: styles.themePlayful 
        },
        { 
            id: 'combo-caballeros-del-zodiaco', 
            name: 'Pack Caballeros del Zodíaco', 
            image: imgComboCaballeros, 
            alt: 'Pack Mugs Caballeros del Zodíaco Saint Seiya BreakLab', 
            theme: styles.themePlayful 
        },
        { 
            id: 'combo-friends', 
            name: 'Pack Friends', 
            image: imgComboFriends, 
            alt: 'Pack Mugs Friends Central Perk BreakLab', 
            theme: styles.themeRomantic 
        },
        { 
            id: 'combo-looney-tunes', 
            name: 'Pack Looney Tunes', 
            image: imgComboLooneyTunes, 
            alt: 'Pack Mugs Looney Tunes Piolín Taz BreakLab', 
            theme: styles.themePlayful 
        },
        { 
            id: 'combo-los-simpson', 
            name: 'Pack Los Simpson', 
            image: imgComboLosSimpson, 
            alt: 'Pack Mugs Los Simpson Familia BreakLab', 
            theme: styles.themePlayful 
        },
        { 
            id: 'combo-mugs-one-piece', 
            name: 'Pack One Piece', 
            image: imgComboOnePiece, 
            alt: 'Pack Mugs One Piece Luffy Zoro Chopper BreakLab', 
            theme: styles.themePlayful 
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Packs de Mugs Coleccionables</h1>
                <p className={styles.subtitle}>Descubre nuestros espectaculares packs temáticos de tazas. Llévate la colección completa de tus personajes favoritos o regala un detalle inolvidable.</p>
            </div>
            
            <div className={styles.grid}>
                {categories.map((cat) => (
                    <Link to={`/categoria/${cat.id}`} key={cat.id} className={`${styles.card} ${cat.theme}`}>
                        <div className={styles.imageWrapper}>
                            <img src={cat.image} alt={cat.alt} className={styles.categoryImg} loading="lazy" />
                        </div>
                        <h2 className={styles.cardTitle}>{cat.name}</h2>
                        <span className={styles.exploreBtn}>Ver Opciones →</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
