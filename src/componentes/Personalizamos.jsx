import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Personalizamos.module.css';
import { useSEO } from '../hooks/useSEO';

// Imágenes de categorías personalizadas
import imgCatMugs from '../assets/Categorias_menu/mugs-personalizados-con-disenos-de-personajes-y-frases.jpeg';
import imgCatVasos from '../assets/Categorias_menu/vasos-de-vidrio-esmerilado-personalizados-con-disenos.jpeg';
import imgCatLlaveros from '../assets/Categorias_menu/llaveros-personalizados-impresion-3d-coleccion-sublimado.png';
import imgCatRompecabezas from '../assets/Categorias_menu/rompecabezas-personalizados-anime-y-geek-coleccion.png';
import imgCatGelatortas from '../assets/Categorias_menu/gelatortas-personalizadas-y-postres-creativos.jpeg';
import imgCatFiguras3D from '../assets/Categorias_menu/catalogo-impresiones-3d-figuras-coleccionables-geek.jpeg';
import imgCatVariedades from '../assets/Categorias_menu/catalogo-variedades-regalos-geek-y-originales.jpeg';

export const Personalizamos = () => {
    useSEO({
        title: "Regalos y Detalles Personalizados a Medida | BreakLab",
        description: "Personalizamos tus ideas en regalos únicos y especiales. Mugs personalizados, vasos, llaveros, rompecabezas, gelatortas y figuras 3D.",
        keywords: "regalos personalizados bogota, mugs personalizados, vasos personalizados, llaveros personalizados, figuras 3d personalizadas"
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { id: 'mugs-personalizados', name: 'Mugs Personalizados', image: imgCatMugs, theme: styles.themePlayful },
        { id: 'vasos-personalizados', name: 'Vasos Personalizados', image: imgCatVasos, theme: styles.themeMasculine },
        { id: 'llaveros', name: 'Llaveros', image: imgCatLlaveros, theme: styles.themePlayful },
        { id: 'rompecabezas', name: 'Rompecabezas', image: imgCatRompecabezas, theme: styles.themeFestive },
        { id: 'gelatortas', name: 'Gelatortas', image: imgCatGelatortas, theme: styles.themeRomantic },
        { id: 'figuras-3d', name: 'Figuras 3D', image: imgCatFiguras3D, theme: styles.themeMasculine },
        { id: 'variedades', name: 'Variedades', image: imgCatVariedades, theme: styles.themeFestive }
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
                        <div className={styles.imageWrapper}>
                            <img 
                                src={cat.image} 
                                alt={`Categoría ${cat.name} BreakLab`} 
                                className={styles.categoryImg} 
                                loading="lazy" 
                            />
                        </div>
                        <h2 className={styles.cardTitle}>{cat.name}</h2>
                        <span className={styles.exploreBtn}>Ver Opciones →</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};