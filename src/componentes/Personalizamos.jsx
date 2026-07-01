import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Personalizamos.module.css';
import { useSEO } from '../hooks/useSEO';

export const Personalizamos = () => {
    useSEO({
        title: "Regalos y Detalles Personalizados a Medida | BreakLab",
        description: "Personalizamos tus ideas en regalos únicos y especiales. Mugs personalizados, arte en resina, amigurumis tejidos, copas grabadas, flores eternas y figuras 3D.",
        keywords: "regalos personalizados bogota, mugs personalizados, arte en resina, amigurumis bogota, vino grabado, figuras 3d personalizadas"
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { id: 'mugs-personalizados', name: 'Mugs Personalizados', icon: '☕', theme: styles.themePlayful },
        { id: 'vasos-personalizados', name: 'Vasos Personalizados', icon: '🥤', theme: styles.themePlayful },
        { id: 'rompecabezas', name: 'Rompecabezas', icon: '🧩', theme: styles.themePlayful },
        { id: 'arte-resina', name: 'Arte en Resina', icon: '🎨', theme: styles.themeFestive },
        { id: 'miyuki', name: 'Miyuki', icon: '💎', theme: styles.themeRomantic },
        { id: 'globo-mensaje', name: 'Globo Mensaje', icon: '🎈', theme: styles.themeRomantic },
        { id: 'vino', name: 'Vino', icon: '🍷', theme: styles.themeMasculine },
        { id: 'figuras-3d', name: 'Figuras 3D', icon: '👾', theme: styles.themePlayful },
        { id: 'amigurumis', name: 'Amigurumis', icon: '🧶', theme: styles.themeRomantic },
        { id: 'su-flor-especial', name: 'Su Flor Especial', icon: '🌹', theme: styles.themeRomantic }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Personalizamos Tus Ideas</h1>
                <p className={styles.subtitle}>Detalles únicos creados a tu medida. Elige la categoría y dale un toque especial y único a tus regalos.</p>
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