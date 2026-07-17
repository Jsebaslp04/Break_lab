import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Crea_tu_Box.module.css';
import { useSEO } from '../hooks/useSEO';

export const Crea_tu_Box = () => {
    useSEO({
        title: "Crea tu Box de Regalos Personalizados | BreakLab",
        description: "Diseña y crea tu propia caja de regalos sorpresa en Bogotá. Elige entre diferentes temáticas como San Valentín, Día de la Madre, Reyes y más, con detalles únicos.",
        keywords: "diseñar caja de regalo, crear box sorpresa, regalos personalizados bogota, detalles personalizados, breaklab box"
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { id: 'reyes', name: 'Reyes', icon: '👑', theme: styles.themeFestive },
        { id: 'kit-escolar', name: 'Kit Escolar', icon: '🎒', theme: styles.themePlayful },
        { id: 'san-valentin', name: 'San Valentín', icon: '💘', theme: styles.themeRomantic },
        { id: 'box-tematicas', name: 'Box Temáticas', icon: '📦', theme: styles.themePlayful },
        { id: 'dia-mujer', name: 'Día de la Mujer', icon: '🌸', theme: styles.themeRomantic },
        { id: 'dia-hombre', name: 'Día del Hombre', icon: '👔', theme: styles.themeMasculine },
        { id: 'semana-santa', name: 'Semana Santa', icon: '🕊️', theme: styles.themeFestive },
        { id: 'dia-nino', name: 'Día del Niño', icon: '🧸', theme: styles.themePlayful },
        { id: 'dia-madre', name: 'Día de la Madre', icon: '🤱', theme: styles.themeRomantic },
        { id: 'dia-padre', name: 'Día del Padre', icon: '👨‍👦', theme: styles.themeMasculine }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Crea tu Box Especial</h1>
                <p className={styles.subtitle}>Selecciona la ocasión que deseas celebrar y descubre nuestros kits personalizados listos para regalar.</p>
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