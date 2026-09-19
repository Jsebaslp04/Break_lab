import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Boxs.module.css';
import { useSEO } from '../hooks/useSEO';

// Imágenes reales de alta calidad para cada categoría
import imgDesayunoPremium from '../assets/desayuno-sorpresa-premium-impresion-3d-te-amo-breaklab.png';
import imgDesayunoGourmet from '../assets/desayuno-sorpresa-gourmet-personalizado-regalo-especial.jpeg';
import imgDesayunoClasico from '../assets/desayuno-sorpresa-clasico-cumpleanos-breaklab.png';
import imgBabyShower from '../assets/regalo-sorpresa-bienvenida-baby-shower-breaklab.png';
import { imgDragonSet, imgBoxTematica, imgBoxSanValentin } from '../data/products';

export const Boxs = () => {
    useSEO({
        title: "Desayunos Sorpresa y Cajas de Regalo Boxs | BreakLab",
        description: "Descubre nuestra selección exclusiva de Boxs y Desayunos Sorpresa en Bogotá: Kit Pareja Dragón, Desayuno Premium, Gourmet, Boxs Temáticas Anime y San Valentín.",
        keywords: "desayunos sorpresa bogota, box sorpresa, desayuno gourmet, desayuno premium bogota, desayuno clasico, baby shower box, kit pareja dragon"
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        {
            id: 'kit-pareja-dragon',
            name: 'Kit Pareja Dragón',
            image: imgDragonSet,
            alt: 'Kit Regalo Pareja Cómo Entrenar a Tu Dragón Chimuelo y Furia Luminosa BreakLab',
            badge: 'Nuevo Romántico ❤️',
            desc: 'Set de tazas personalizadas con nombres y código Spotify, más rompecabezas corazón interactivo.',
            theme: styles.themeDragon
        },
        {
            id: 'desayuno-premium',
            name: 'Desayuno Premium',
            image: imgDesayunoPremium,
            alt: 'Desayuno Sorpresa Premium BreakLab Bogotá',
            badge: 'Más Popular ⭐',
            desc: 'Nuestra selección especial con excelente variedad de sabores gourmet, sándwich artesanal y detalles inolvidables.',
            theme: styles.themePremium
        },
        {
            id: 'desayuno-luxury',
            name: 'Desayuno Gourmet',
            image: imgDesayunoGourmet,
            alt: 'Desayuno Sorpresa Gourmet Luxury BreakLab Bogotá',
            badge: 'Exclusivo ✨',
            desc: 'Para impresionar con la máxima elegancia, waffles belgas, croissant de almendras y prensa francesa.',
            theme: styles.themeLuxury
        },
        {
            id: 'box-tematicas',
            name: 'Box Temática Anime',
            image: imgBoxTematica,
            alt: 'Box Sorpresa Temática One Piece Anime BreakLab',
            badge: 'Geek / Anime ⚓',
            desc: 'Increíble caja sorpresa temática con gelatorta artesanal personalizada de One Piece, mug y dulces.',
            theme: styles.themeAnime
        },
        {
            id: 'san-valentin',
            name: 'Box San Valentín & Amor',
            image: imgBoxSanValentin,
            alt: 'Box San Valentín Gelatorta y Vino BreakLab Bogotá',
            badge: 'En Pareja 🍷',
            desc: 'Detalle romántico exclusivo con botella de vino grabada, gelatorta temática y caja de lujo.',
            theme: styles.themeRomantic
        },
        {
            id: 'desayuno-clasico',
            name: 'Desayuno Clásico',
            image: imgDesayunoClasico,
            alt: 'Desayuno Sorpresa Clásico BreakLab Bogotá',
            badge: 'Tradicional 🍳',
            desc: 'El toque tradicional perfecto con sándwich artesanal, jugo fresco y mug personalizado para alegrar su mañana.',
            theme: styles.themeClassic
        },
        {
            id: 'baby-shower',
            name: 'Baby Shower',
            image: imgBabyShower,
            alt: 'Caja Regalo Sorpresa Bienvenida Baby Shower BreakLab Bogotá',
            badge: 'Tierno 👶',
            desc: 'Cajas llenas de ternura y amor con amigurumi de apego y sonajero artesanal para dar la bienvenida al bebé.',
            theme: styles.themeBaby
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Boxs y Desayunos Sorpresa</h1>
                <p className={styles.subtitle}>
                    Elige entre nuestras exclusivas opciones de cajas y desayunos sorpresa preparados con los mejores ingredientes y detalles con alma.
                </p>
            </div>

            <div className={styles.grid}>
                {categories.map((cat) => (
                    <Link to={`/categoria/${cat.id}`} key={cat.id} className={`${styles.card} ${cat.theme}`}>
                        {cat.badge && <span className={styles.badge}>{cat.badge}</span>}
                        <div className={styles.imageWrapper}>
                            <img src={cat.image} alt={cat.alt} className={styles.categoryImg} loading="lazy" />
                        </div>
                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>{cat.name}</h2>
                            <p className={styles.cardDesc}>{cat.desc}</p>
                        </div>
                        <span className={styles.exploreBtn}>Ver Opciones →</span>
                    </Link>
                ))}
            </div>

            {/* Banner redirigiendo al constructor personalizado */}
            <div className={styles.builderPromo}>
                <div className={styles.builderPromoContent}>
                    <h3 className={styles.builderPromoTitle}>¿Prefieres armar tu regalo pieza por pieza? 🎁</h3>
                    <p className={styles.builderPromoText}>
                        Visita nuestra sección interactiva y elige la base, bebidas, comida, mugs y piezas 3D a tu gusto exacto.
                    </p>
                </div>
                <Link to="/Crea_tu_Box" className={styles.builderPromoBtn}>
                    Ir a Arma tu Box →
                </Link>
            </div>
        </div>
    );
};
