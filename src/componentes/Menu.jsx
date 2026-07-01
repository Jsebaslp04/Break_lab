import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Menu.module.css";
import break_lab_logo from "../assets/break_lab.png";
import search from "../assets/search.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import tiktok from "../assets/tiktok.png";
import whatsapp from "../assets/whatsapp.png";
import qr from "../assets/qr_scan.png";
import carrito from "../assets/shopping_cart.png";
import home from "../assets/home.png";
import box from "../assets/box.png";
import personalizacion from "../assets/personalizacion.png";
import contacto from "../assets/contacto.png";
import { useCart } from "./context/CartContext";
import { PRODUCTS_DB } from "../data/products";

export const Menu = () => {
    const location = useLocation();
    const { setIsCartOpen, cartItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const isActive = (path) => location.pathname === path;

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === "") {
            setSearchResults([]);
        } else {
            const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const allProducts = Object.entries(PRODUCTS_DB).flatMap(([category, items]) =>
                items.map(item => ({ ...item, category }))
            );
            const filtered = allProducts.filter(product => {
                const nameNorm = product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const subtitleNorm = (product.subtitle || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const descNorm = (product.description || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const catNorm = product.category.toLowerCase().replace(/-/g, " ");
                
                return nameNorm.includes(normalizedQuery) || 
                       subtitleNorm.includes(normalizedQuery) ||
                       descNorm.includes(normalizedQuery) ||
                       catNorm.includes(normalizedQuery);
            });
            setSearchResults(filtered.slice(0, 8));
        }
    };

    const handleSuggestionClick = () => {
        setSearchQuery("");
        setSearchResults([]);
    };

    // Detect active category either from category page or product details page
    let activeCategory = null;
    if (location.pathname.startsWith("/categoria/")) {
        activeCategory = location.pathname.split("/")[2];
    } else if (location.pathname.startsWith("/producto/")) {
        const productId = location.pathname.split("/")[2];
        for (const cat in PRODUCTS_DB) {
            if (PRODUCTS_DB[cat].some(p => p.id === productId)) {
                activeCategory = cat;
                break;
            }
        }
    }

    const creaTuBoxCategories = [
        'reyes', 'kit-escolar', 'san-valentin', 'dia-mujer', 'dia-hombre', 
        'semana-santa', 'dia-nino', 'dia-madre', 'dia-padre'
    ];

    const personalizamosCategories = [
        'mugs-personalizados', 'vasos-personalizados', 'rompecabezas', 
        'arte-resina', 'miyuki', 'globo-mensaje', 'vino', 'figuras-3d', 
        'amigurumis', 'su-flor-especial'
    ];

    const isCreaTuBoxActive = isActive("/Crea_tu_Box") || 
        (activeCategory && creaTuBoxCategories.includes(activeCategory));

    const isPersonalizamosActive = isActive("/Personalizamos") || 
        (activeCategory && personalizamosCategories.includes(activeCategory));

    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <button 
                    className={`${styles.hamburgerBtn} ${isMenuOpen ? styles.hamburgerActive : ''}`} 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    aria-label="Abrir menú"
                    aria-expanded={isMenuOpen}
                >
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                </button>

                <Link to="/" className={styles.logoSection}>
                    <span className={styles.logoIcon}>
                        <img src={break_lab_logo} alt="Logo de BreakLab - Desayunos Sorpresa y Regalos Personalizados" />
                    </span>
                    <div className={styles.logoText}>
                        <strong className={styles.title}>BreakLab</strong>
                        <p className={styles.subtitle}>Desayunos Sorpresa</p>
                    </div>
                </Link>
                
                <div className={styles.searchBar}>
                    <input 
                        type="text" 
                        placeholder="Buscar productos, categorías..." 
                        className={styles.searchInput} 
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className={styles.searchButton} aria-label="Buscar productos">
                        <img src={search} alt="Buscar" />
                    </button>
                    
                    {searchResults.length > 0 && (
                        <div className={styles.searchDropdown}>
                            {searchResults.map(product => (
                                <Link 
                                    key={product.id} 
                                    to={`/producto/${product.id}`} 
                                    className={styles.searchResultItem}
                                    onClick={handleSuggestionClick}
                                >
                                    <img src={product.image} alt={product.name} className={styles.searchResultImage} />
                                    <div className={styles.searchResultInfo}>
                                        <span className={styles.searchResultName}>{product.name}</span>
                                        <span className={styles.searchResultPrice}>${product.price.toLocaleString("es-CO")}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className={styles.headerActions}>
                    <Link to="/carrito" className={`${styles.iconBtn} ${styles.cartBtn}`} aria-label={`Carrito de compras, ${cartCount} productos`}>
                        <img src={carrito} alt="Carrito de compras BreakLab" />
                        {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                    </Link>
                </div>
            </div>

            <nav className={styles.navContainer}>
                <div className={styles.navInner}>
                    <Link to="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}>
                        <span className={styles.navEmoji}><img src={home} alt="Inicio" /></span> Inicio
                    </Link>
                    
                    <div className={styles.dropdownContainer}>
                        <Link to="/Crea_tu_Box" className={`${styles.navLink} ${isCreaTuBoxActive ? styles.active : ""}`}>
                            <span className={styles.navEmoji}><img src={box} alt="Caja de regalos" /></span> Crea tu Box <span className={styles.arrowIcon}>▼</span>
                        </Link>
                        <div className={styles.dropdownMenu}>
                            <Link to="/categoria/reyes" className={styles.dropdownItem}>Reyes</Link>
                            <Link to="/categoria/kit-escolar" className={styles.dropdownItem}>Kit Escolar</Link>
                            <Link to="/categoria/san-valentin" className={styles.dropdownItem}>San Valentín</Link>
                            <Link to="/categoria/dia-mujer" className={styles.dropdownItem}>Día de la Mujer</Link>
                            <Link to="/categoria/dia-hombre" className={styles.dropdownItem}>Día del Hombre</Link>
                            <Link to="/categoria/semana-santa" className={styles.dropdownItem}>Semana Santa</Link>
                            <Link to="/categoria/dia-nino" className={styles.dropdownItem}>Día del Niño</Link>
                            <Link to="/categoria/dia-madre" className={styles.dropdownItem}>Día de la Madre</Link>
                            <Link to="/categoria/dia-padre" className={styles.dropdownItem}>Día del Padre</Link>
                        </div>
                    </div>

                    <div className={styles.dropdownContainer}>
                        <Link to="/Personalizamos" className={`${styles.navLink} ${isPersonalizamosActive ? styles.active : ""}`}>
                            <span className={styles.navEmoji}><img src={personalizacion} alt="Personalización de regalos" /></span> Personalizamos <span className={styles.arrowIcon}>▼</span>
                        </Link>
                        <div className={styles.dropdownMenu}>
                            <Link to="/categoria/mugs-personalizados" className={styles.dropdownItem}>Mugs Personalizados</Link>
                            <Link to="/categoria/vasos-personalizados" className={styles.dropdownItem}>Vasos Personalizados</Link>
                            <Link to="/categoria/rompecabezas" className={styles.dropdownItem}>Rompecabezas</Link>
                            <Link to="/categoria/arte-resina" className={styles.dropdownItem}>Arte en Resina</Link>
                            <Link to="/categoria/miyuki" className={styles.dropdownItem}>Miyuki</Link>
                            <Link to="/categoria/globo-mensaje" className={styles.dropdownItem}>Globo Mensaje</Link>
                            <Link to="/categoria/vino" className={styles.dropdownItem}>Vino</Link>
                            <Link to="/categoria/figuras-3d" className={styles.dropdownItem}>Figuras 3D</Link>
                            <Link to="/categoria/amigurumis" className={styles.dropdownItem}>Amigurumis</Link>
                            <Link to="/categoria/su-flor-especial" className={styles.dropdownItem}>Su Flor Especial</Link>
                        </div>
                    </div>

                    <Link to="/Contacto" className={`${styles.navLink} ${isActive("/Contacto") ? styles.active : ""}`}>
                        <span className={styles.navEmoji}><img src={contacto} alt="Formulario de contacto" /></span> Contacto
                    </Link>
                </div>
            </nav>

            {/* Drawer de Navegación Móvil */}
            <div className={`${styles.drawerOverlay} ${isMenuOpen ? styles.drawerOpen : ""}`} onClick={() => setIsMenuOpen(false)}>
                <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.drawerHeader}>
                        <strong className={styles.drawerTitle}>Menú</strong>
                        <button className={styles.drawerClose} onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú">
                            ✕
                        </button>
                    </div>
                    <nav className={styles.drawerNav}>
                        <Link to="/" className={`${styles.drawerLink} ${isActive("/") ? styles.drawerLinkActive : ""}`} onClick={() => setIsMenuOpen(false)}>
                            🏠 Inicio
                        </Link>
                        
                        <div className={styles.drawerSection}>
                            <span className={styles.drawerSectionTitle}>🎁 Crea tu Box</span>
                            <div className={styles.drawerSubLinks}>
                                <Link to="/categoria/reyes" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Reyes</Link>
                                <Link to="/categoria/kit-escolar" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Kit Escolar</Link>
                                <Link to="/categoria/san-valentin" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>San Valentín</Link>
                                <Link to="/categoria/dia-mujer" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Día de la Mujer</Link>
                                <Link to="/categoria/dia-hombre" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Día del Hombre</Link>
                                <Link to="/categoria/semana-santa" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Semana Santa</Link>
                                <Link to="/categoria/dia-nino" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Día del Niño</Link>
                                <Link to="/categoria/dia-madre" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Día de la Madre</Link>
                                <Link to="/categoria/dia-padre" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Día del Padre</Link>
                            </div>
                        </div>

                        <div className={styles.drawerSection}>
                            <span className={styles.drawerSectionTitle}>🎨 Personalizamos</span>
                            <div className={styles.drawerSubLinks}>
                                <Link to="/categoria/mugs-personalizados" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Mugs Personalizados</Link>
                                <Link to="/categoria/vasos-personalizados" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Vasos Personalizados</Link>
                                <Link to="/categoria/rompecabezas" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Rompecabezas</Link>
                                <Link to="/categoria/arte-resina" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Arte en Resina</Link>
                                <Link to="/categoria/miyuki" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Miyuki</Link>
                                <Link to="/categoria/globo-mensaje" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Globo Mensaje</Link>
                                <Link to="/categoria/vino" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Vino</Link>
                                <Link to="/categoria/figuras-3d" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Figuras 3D</Link>
                                <Link to="/categoria/amigurumis" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Amigurumis</Link>
                                <Link to="/categoria/su-flor-especial" className={styles.drawerSubLink} onClick={() => setIsMenuOpen(false)}>Su Flor Especial</Link>
                            </div>
                        </div>

                        <Link to="/Contacto" className={`${styles.drawerLink} ${isActive("/Contacto") ? styles.drawerLinkActive : ""}`} onClick={() => setIsMenuOpen(false)}>
                            ✉️ Contacto
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};
