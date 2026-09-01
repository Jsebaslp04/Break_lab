import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Crea_tu_Box.module.css';
import { useSEO } from '../hooks/useSEO';
import { useCart } from './context/CartContext';
import { PRODUCTS_DB, breakLabLogo } from '../data/products';
import boxIcon from '../assets/box.png';

// Box bases options
const BOX_BASES = [
    {
        id: 'base-madera-pino',
        name: 'Caja de Madera Pino Luxury',
        price: 25000,
        icon: '🪵',
        badge: 'Más Popular ⭐',
        description: 'Caja artesanal en madera de pino con viruta decorativa, moño de satín de lujo y tarjeta de regalo personalizada.'
    },
    {
        id: 'base-box-tematica',
        name: 'Box Sorpresa Temática',
        price: 20000,
        icon: '🎁',
        badge: 'Colorida ✨',
        description: 'Caja decorada con temática de tu personaje o evento favorito, confeti y lazo especial.'
    },
    {
        id: 'base-canasta-ancheta',
        name: 'Ancheta Canasta Rústica',
        price: 22000,
        icon: '🧺',
        badge: 'Elegante 🌿',
        description: 'Canasta artesanal tejida con forro en tela delicada, moño de regalo y empaque transparente.'
    },
    {
        id: 'base-kraft-eco',
        name: 'Caja Kraft Ecológica con Visor',
        price: 15000,
        icon: '📦',
        badge: 'Eco Friendly 🍃',
        description: 'Empaque minimalista en cartón kraft de alta resistencia con ventana transparente y cordón rústico.'
    },
    {
        id: 'base-sin-caja',
        name: 'Sin Caja Base (Solo Productos)',
        price: 0,
        icon: '✨',
        badge: 'Directo',
        description: 'Elige solo los productos y detalles individuales que deseas ordenar sin costo de empaque base.'
    }
];

// High-level category tab definitions
const CATEGORY_TABS = [
    { id: 'all', name: 'Todos los Productos', icon: '🌟' },
    {
        id: 'mugs',
        name: 'Mugs y Vasos',
        icon: '☕',
        matchKeys: ['mugs-personalizados', 'Amarillo', 'Azul', 'Rojo', 'Verde', 'vasos-personalizados', 'combo-mugs-one-piece']
    },
    {
        id: 'puzzles',
        name: 'Rompecabezas',
        icon: '🧩',
        matchKeys: [
            'rompecabezas-one-piece',
            'rompecabezas-caballeros-del-zodiaco',
            'rompecabezas-dragon-ball-z',
            'rompecabezas-pokemon',
            'rompecabezas-sailor-moon',
            'rompecabezas-mario-bros',
            'rompecabezas-yugi-oh',
            'rompecabezas-carton',
            'rompecabezas-mdf'
        ]
    },
    {
        id: 'geek_3d',
        name: 'Figuras 3D y Geek',
        icon: '👾',
        matchKeys: [
            'figuras-3d-mario-bros',
            'figuras-3d-bowser',
            'figuras-3d-gengar',
            'figuras-3d-pokebola',
            'figuras-3d-mewtwo',
            'figuras-3d-mapache',
            'figuras-3d-t-rex',
            'figuras-3d-personalizadas',
            'soportes'
        ]
    },
    {
        id: 'delicias',
        name: 'Comida y Delicias',
        icon: '🍰',
        matchKeys: ['gelatortas_mascota', 'gelatorta_tematica', 'vino']
    },
    {
        id: 'detalles',
        name: 'Detalles y Peluches',
        icon: '🧸',
        matchKeys: ['amigurumis', 'su-flor-especial', 'arte-resina', 'miyuki', 'variedades']
    },
    {
        id: 'globos_llaveros',
        name: 'Globos y Llaveros',
        icon: '🎈',
        matchKeys: ['globo-mensaje', 'llaveros']
    },
    {
        id: 'desayunos_base',
        name: 'Kits y Desayunos Base',
        icon: '🥞',
        matchKeys: [
            'desayuno-luxury',
            'desayuno-premium',
            'desayuno-clasico',
            'baby-shower',
            'san-valentin',
            'box-tematicas',
            'kit-escolar',
            'reyes',
            'dia-mujer',
            'dia-hombre',
            'semana-santa',
            'dia-nino',
            'dia-madre',
            'dia-padre'
        ]
    }
];

export const Crea_tu_Box = () => {
    useSEO({
        title: "Arma tu Box o Ancheta a Tu Medida | BreakLab Bogotá",
        description: "Diseña y crea tu propia caja de regalos sorpresa o desayuno en Bogotá. Elige la base, mugs, figuras 3D, rompecabezas, comida y detalles para armar el regalo perfecto a tu medida.",
        keywords: "armar box personalizada, crear desayuno sorpresa, anchetas personalizadas bogota, diseñar regalo bogota, breaklab box"
    });

    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // State for Box builder
    const [selectedBase, setSelectedBase] = useState(BOX_BASES[0]);
    const [selectedTab, setSelectedTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [selectedItems, setSelectedItems] = useState({}); // { [productId]: { product, quantity } }
    const [recipientName, setRecipientName] = useState('');
    const [dedicationMessage, setDedicationMessage] = useState('');
    const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
    const [addedToast, setAddedToast] = useState(null);

    // Flatten all products from PRODUCTS_DB into unique array
    const allProducts = useMemo(() => {
        const productMap = new Map();

        Object.entries(PRODUCTS_DB).forEach(([categoryKey, items]) => {
            if (Array.isArray(items)) {
                items.forEach(item => {
                    if (!productMap.has(item.id)) {
                        productMap.set(item.id, {
                            ...item,
                            categoryKey,
                            image: item.image || breakLabLogo,
                            subtitle: item.subtitle || 'Detalle especial BreakLab',
                            price: item.price || 0
                        });
                    }
                });
            }
        });

        return Array.from(productMap.values());
    }, []);

    // Filter products by active tab and search query
    const filteredProducts = useMemo(() => {
        const activeTabObj = CATEGORY_TABS.find(t => t.id === selectedTab);

        let list = allProducts.filter(product => {
            // Category filter
            if (selectedTab !== 'all' && activeTabObj && activeTabObj.matchKeys) {
                if (!activeTabObj.matchKeys.includes(product.categoryKey)) {
                    return false;
                }
            }

            // Search filter
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const matchName = product.name?.toLowerCase().includes(q);
                const matchSub = product.subtitle?.toLowerCase().includes(q);
                const matchDesc = product.description?.toLowerCase().includes(q);
                if (!matchName && !matchSub && !matchDesc) return false;
            }

            return true;
        });

        // Sorting
        if (sortBy === 'price_asc') {
            list = [...list].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
            list = [...list].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name') {
            list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        }

        return list;
    }, [allProducts, selectedTab, searchQuery, sortBy]);

    // Calculations
    const itemsList = Object.values(selectedItems);
    const totalItemsCount = itemsList.reduce((sum, it) => sum + it.quantity, 0);
    const itemsSubtotal = itemsList.reduce((sum, it) => sum + (it.product.price * it.quantity), 0);
    const basePrice = selectedBase ? selectedBase.price : 0;
    const totalPrice = basePrice + itemsSubtotal;

    // Handlers
    const handleAddItem = (product) => {
        setSelectedItems(prev => {
            const existing = prev[product.id];
            const newQty = existing ? existing.quantity + 1 : 1;
            return {
                ...prev,
                [product.id]: {
                    product,
                    quantity: newQty
                }
            };
        });

        // Toast feedback
        setAddedToast(`+ Agregado: ${product.name}`);
        setTimeout(() => setAddedToast(null), 2200);
    };

    const handleRemoveItem = (productId) => {
        setSelectedItems(prev => {
            const existing = prev[productId];
            if (!existing) return prev;
            if (existing.quantity > 1) {
                return {
                    ...prev,
                    [productId]: {
                        ...existing,
                        quantity: existing.quantity - 1
                    }
                };
            }
            const updated = { ...prev };
            delete updated[productId];
            return updated;
        });
    };

    const handleDeleteItem = (productId) => {
        setSelectedItems(prev => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
        });
    };

    const handleResetBox = () => {
        if (window.confirm('¿Deseas reiniciar tu selección de Box/Ancheta?')) {
            setSelectedItems({});
            setDedicationMessage('');
            setRecipientName('');
        }
    };

    // Add custom box to main cart
    const handleAddBoxToCart = () => {
        if (totalItemsCount === 0 && (!selectedBase || selectedBase.price === 0)) {
            alert('¡Selecciona al menos un producto o una base para tu Box!');
            return;
        }

        const itemsSummary = itemsList.map(it => `${it.quantity}x ${it.product.name}`).join(', ');
        const boxTitle = `Box Personalizada (${selectedBase.name})${itemsSummary ? ': ' + itemsSummary : ''}`;

        const cartBoxItem = {
            id: `custom-box-${Date.now()}`,
            productId: 'custom-box',
            name: boxTitle,
            price: totalPrice,
            quantity: 1,
            image: selectedBase.id !== 'base-sin-caja' ? boxIcon : (itemsList[0]?.product.image || breakLabLogo),
            selectedOptions: {
                base: selectedBase.name,
                para: recipientName || 'No especificado',
                dedicatoria: dedicationMessage || 'Sin dedicatoria'
            }
        };

        addToCart(cartBoxItem);
        setIsMobileSummaryOpen(false);
    };

    // Send order via WhatsApp
    const handleOrderWhatsApp = () => {
        if (totalItemsCount === 0 && (!selectedBase || selectedBase.price === 0)) {
            alert('¡Selecciona al menos un producto o una base para tu Box!');
            return;
        }

        let msg = `¡Hola BreakLab! 👋 Quiero cotizar y ordenar mi *Box/Ancheta Personalizada* armada a mi medida:%0A%0A`;
        
        if (selectedBase) {
            msg += `📦 *Base de Empaque:* ${selectedBase.name} ($${selectedBase.price.toLocaleString('es-CO')})%0A`;
        }

        msg += `%0A🎁 *Productos Seleccionados (${totalItemsCount} unid.):*%0A`;
        if (itemsList.length > 0) {
            itemsList.forEach(it => {
                msg += `• ${it.quantity}x ${it.product.name} - $${(it.product.price * it.quantity).toLocaleString('es-CO')}%0A`;
            });
        } else {
            msg += `• Solo la base decorada%0A`;
        }

        if (recipientName.trim()) {
            msg += `%0A👤 *Para:* ${recipientName.trim()}%0A`;
        }

        if (dedicationMessage.trim()) {
            msg += `💌 *Dedicatoria:* "${dedicationMessage.trim()}"%0A`;
        }

        msg += `%0A💰 *Total Estimado: $${totalPrice.toLocaleString('es-CO')} COP*%0A%0A¿Me confirman disponibilidad y tiempos de entrega en Bogotá? 😊✨`;

        window.open(`https://wa.me/573208738961?text=${msg}`, '_blank');
    };

    return (
        <div className={styles.builderContainer}>
            {/* Notification Toast */}
            {addedToast && (
                <div className={styles.toastNotification}>
                    {addedToast}
                </div>
            )}

            {/* Header / Intro */}
            <div className={styles.builderHeader}>
                <div className={styles.badgeTop}>Diseño Exclusivo BreakLab ✨</div>
                <h1 className={styles.mainTitle}>Arma tu Box o Ancheta a Tu Medida 🎁</h1>
                <p className={styles.mainSubtitle}>
                    Elige la base de tu regalo, navega por nuestras categorías y agrega tus productos favoritos. Nosotros nos encargamos de empacarlo con amor, viruta decorativa y tarjeta especial.
                </p>

                {/* Steps Visual Tracker */}
                <div className={styles.stepsTracker}>
                    <div className={`${styles.stepItem} ${styles.stepActive}`}>
                        <span className={styles.stepNumber}>1</span>
                        <span className={styles.stepText}>Elige la Base</span>
                    </div>
                    <div className={styles.stepDivider}></div>
                    <div className={`${styles.stepItem} ${totalItemsCount > 0 ? styles.stepActive : ''}`}>
                        <span className={styles.stepNumber}>2</span>
                        <span className={styles.stepText}>Agrega Productos ({totalItemsCount})</span>
                    </div>
                    <div className={styles.stepDivider}></div>
                    <div className={`${styles.stepItem} ${dedicationMessage || recipientName ? styles.stepActive : ''}`}>
                        <span className={styles.stepNumber}>3</span>
                        <span className={styles.stepText}>Personaliza y Pide</span>
                    </div>
                </div>
            </div>

            {/* Main Builder Grid */}
            <div className={styles.builderLayout}>
                {/* Left Column: Bases + Category Tabs + Products */}
                <div className={styles.catalogColumn}>
                    
                    {/* Step 1: Base Selection */}
                    <section className={styles.sectionBlock}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionNumber}>Paso 1</span>
                            <h2 className={styles.sectionTitle}>Selecciona la Base o Presentación</h2>
                        </div>
                        <div className={styles.basesGrid}>
                            {BOX_BASES.map(base => {
                                const isSelected = selectedBase.id === base.id;
                                return (
                                    <div
                                        key={base.id}
                                        className={`${styles.baseCard} ${isSelected ? styles.baseCardActive : ''}`}
                                        onClick={() => setSelectedBase(base)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className={styles.baseCardTop}>
                                            <span className={styles.baseIcon}>{base.icon}</span>
                                            <span className={styles.baseBadge}>{base.badge}</span>
                                        </div>
                                        <h3 className={styles.baseName}>{base.name}</h3>
                                        <p className={styles.baseDesc}>{base.description}</p>
                                        <div className={styles.basePriceRow}>
                                            <span className={styles.basePrice}>
                                                {base.price === 0 ? 'Sin costo adicional' : `$${base.price.toLocaleString('es-CO')}`}
                                            </span>
                                            <span className={styles.baseRadioCheck}>
                                                {isSelected ? '✓ Seleccionada' : 'Elegir'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Step 2: Category Tabs & Products */}
                    <section className={styles.sectionBlock}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionNumber}>Paso 2</span>
                            <h2 className={styles.sectionTitle}>Explora y Agrega Productos a Tu Ancheta</h2>
                        </div>

                        {/* Search & Sort Row */}
                        <div className={styles.filterBar}>
                            <div className={styles.searchWrapper}>
                                <span className={styles.searchIcon}>🔍</span>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Buscar productos (mugs, anime, chocolates, amigurumis...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button className={styles.clearSearchBtn} onClick={() => setSearchQuery('')}>
                                        ✕
                                    </button>
                                )}
                            </div>

                            <div className={styles.sortWrapper}>
                                <label htmlFor="sort-select" className={styles.sortLabel}>Ordenar:</label>
                                <select
                                    id="sort-select"
                                    className={styles.sortSelect}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="default">Destacados</option>
                                    <option value="price_asc">Menor precio</option>
                                    <option value="price_desc">Mayor precio</option>
                                    <option value="name">Nombre (A-Z)</option>
                                </select>
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className={styles.categoryTabsContainer}>
                            <div className={styles.tabsScroll}>
                                {CATEGORY_TABS.map(tab => {
                                    const isActive = selectedTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                                            onClick={() => setSelectedTab(tab.id)}
                                        >
                                            <span className={styles.tabIcon}>{tab.icon}</span>
                                            <span className={styles.tabText}>{tab.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Products Counter */}
                        <div className={styles.resultsInfo}>
                            <span>Mostrando <strong>{filteredProducts.length}</strong> productos disponibles</span>
                            {searchQuery && (
                                <span className={styles.searchTag}>
                                    Filtro: "{searchQuery}"
                                    <button onClick={() => setSearchQuery('')}>✕</button>
                                </span>
                            )}
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className={styles.emptyResults}>
                                <span className={styles.emptyIcon}>🔎</span>
                                <h3>No encontramos productos con ese criterio</h3>
                                <p>Prueba buscando con otra palabra o selecciona otra categoría.</p>
                                <button className={styles.resetFilterBtn} onClick={() => { setSearchQuery(''); setSelectedTab('all'); }}>
                                    Ver todos los productos
                                </button>
                            </div>
                        ) : (
                            <div className={styles.productsGrid}>
                                {filteredProducts.map(product => {
                                    const inBoxItem = selectedItems[product.id];
                                    const inBoxQty = inBoxItem ? inBoxItem.quantity : 0;
                                    const isVideo = product.image?.endsWith('.mp4');

                                    return (
                                        <div
                                            key={product.id}
                                            className={`${styles.productCard} ${inBoxQty > 0 ? styles.productCardInBox : ''}`}
                                        >
                                            {/* Card Image */}
                                            <div className={styles.productImgWrapper}>
                                                {isVideo ? (
                                                    <video
                                                        src={product.image}
                                                        className={styles.productImg}
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                    />
                                                ) : (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className={styles.productImg}
                                                        loading="lazy"
                                                    />
                                                )}
                                                {product.isNew && <span className={styles.newBadge}>Nuevo</span>}
                                                {inBoxQty > 0 && (
                                                    <span className={styles.inBoxBadge}>
                                                        ✓ En tu Box ({inBoxQty})
                                                    </span>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className={styles.productContent}>
                                                <h3 className={styles.productName}>{product.name}</h3>
                                                <p className={styles.productSubtitle}>{product.subtitle}</p>

                                                <div className={styles.productPriceRow}>
                                                    <span className={styles.productPrice}>
                                                        ${product.price.toLocaleString('es-CO')}
                                                    </span>

                                                    {/* Add / Quantity Controls */}
                                                    {inBoxQty === 0 ? (
                                                        <button
                                                            className={styles.addBtn}
                                                            onClick={() => handleAddItem(product)}
                                                            aria-label={`Agregar ${product.name} a mi box`}
                                                        >
                                                            <span>+</span> Agregar
                                                        </button>
                                                    ) : (
                                                        <div className={styles.qtyControls}>
                                                            <button
                                                                className={styles.qtyBtn}
                                                                onClick={() => handleRemoveItem(product.id)}
                                                                aria-label="Disminuir cantidad"
                                                            >
                                                                -
                                                            </button>
                                                            <span className={styles.qtyDisplay}>{inBoxQty}</span>
                                                            <button
                                                                className={styles.qtyBtn}
                                                                onClick={() => handleAddItem(product)}
                                                                aria-label="Aumentar cantidad"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Column: Live Box Summary Sidebar (Desktop) */}
                <aside className={styles.summarySidebar}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryHeader}>
                            <div className={styles.summaryTitleRow}>
                                <span className={styles.summaryIcon}>🎁</span>
                                <h2>Tu Ancheta / Box</h2>
                            </div>
                            {totalItemsCount > 0 && (
                                <button className={styles.resetSummaryBtn} onClick={handleResetBox} title="Reiniciar selección">
                                    ↺ Limpiar
                                </button>
                            )}
                        </div>

                        {/* Selected Base Indicator */}
                        <div className={styles.summaryBaseBadge}>
                            <div className={styles.summaryBaseInfo}>
                                <span className={styles.summaryBaseIcon}>{selectedBase.icon}</span>
                                <div>
                                    <div className={styles.summaryBaseLabel}>Base de regalo:</div>
                                    <div className={styles.summaryBaseName}>{selectedBase.name}</div>
                                </div>
                            </div>
                            <span className={styles.summaryBasePrice}>
                                {selectedBase.price === 0 ? 'Gratis' : `$${selectedBase.price.toLocaleString('es-CO')}`}
                            </span>
                        </div>

                        {/* Selected Items List */}
                        <div className={styles.summaryItemsList}>
                            {itemsList.length === 0 ? (
                                <div className={styles.summaryEmptyState}>
                                    <div className={styles.emptyBoxIcon}>📦</div>
                                    <p className={styles.emptyBoxTitle}>Tu Box está vacía</p>
                                    <p className={styles.emptyBoxText}>Selecciona productos del catálogo para armar tu regalo.</p>
                                </div>
                            ) : (
                                itemsList.map(({ product, quantity }) => (
                                    <div key={product.id} className={styles.summaryItemRow}>
                                        <img src={product.image} alt={product.name} className={styles.summaryItemImg} />
                                        <div className={styles.summaryItemInfo}>
                                            <div className={styles.summaryItemName}>{product.name}</div>
                                            <div className={styles.summaryItemMeta}>
                                                <span>${product.price.toLocaleString('es-CO')} c/u</span>
                                                <div className={styles.miniQtyControls}>
                                                    <button onClick={() => handleRemoveItem(product.id)}>-</button>
                                                    <span>{quantity}</span>
                                                    <button onClick={() => handleAddItem(product)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.summaryItemSubtotal}>
                                            ${(product.price * quantity).toLocaleString('es-CO')}
                                            <button
                                                className={styles.deleteItemBtn}
                                                onClick={() => handleDeleteItem(product.id)}
                                                title="Eliminar de la box"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Step 3: Card Dedication & Recipient */}
                        <div className={styles.personalizationBlock}>
                            <div className={styles.personalizationTitle}>
                                💌 Personaliza tu Tarjeta
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="recipient-name">Para quién es (Opcional):</label>
                                <input
                                    id="recipient-name"
                                    type="text"
                                    className={styles.inputField}
                                    placeholder="Ej: Mamá, Juan, Mi Pareja 💖"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="card-dedication">Dedicatoria para la tarjeta:</label>
                                <textarea
                                    id="card-dedication"
                                    rows="3"
                                    className={styles.textareaField}
                                    placeholder="Escribe el mensaje emotivo que imprimiremos en la tarjeta de regalo..."
                                    value={dedicationMessage}
                                    onChange={(e) => setDedicationMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className={styles.priceBreakdown}>
                            <div className={styles.priceRow}>
                                <span>Base de empaque</span>
                                <span>${basePrice.toLocaleString('es-CO')}</span>
                            </div>
                            <div className={styles.priceRow}>
                                <span>Productos seleccionados ({totalItemsCount})</span>
                                <span>${itemsSubtotal.toLocaleString('es-CO')}</span>
                            </div>
                            <div className={`${styles.priceRow} ${styles.priceRowTotal}`}>
                                <span>Total Box</span>
                                <span className={styles.totalPriceValue}>${totalPrice.toLocaleString('es-CO')} COP</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.summaryActions}>
                            <button
                                className={styles.addToCartBtn}
                                onClick={handleAddBoxToCart}
                            >
                                🛒 Agregar Box al Carrito
                            </button>
                            <button
                                className={styles.orderWhatsAppBtn}
                                onClick={handleOrderWhatsApp}
                            >
                                💬 Pedir Box por WhatsApp
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Mobile Bottom Sticky Bar */}
            <div className={styles.mobileBottomBar}>
                <div className={styles.mobileBarInfo}>
                    <div className={styles.mobileBarCount}>
                        🎁 <strong>{totalItemsCount}</strong> items en tu Box
                    </div>
                    <div className={styles.mobileBarPrice}>
                        Total: <strong>${totalPrice.toLocaleString('es-CO')}</strong>
                    </div>
                </div>
                <button
                    className={styles.mobileViewSummaryBtn}
                    onClick={() => setIsMobileSummaryOpen(true)}
                >
                    Ver Resumen →
                </button>
            </div>

            {/* Mobile Drawer / Sheet Modal */}
            {isMobileSummaryOpen && (
                <div className={styles.mobileModalBackdrop} onClick={() => setIsMobileSummaryOpen(false)}>
                    <div className={styles.mobileModalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.mobileModalHeader}>
                            <div className={styles.summaryTitleRow}>
                                <span className={styles.summaryIcon}>🎁</span>
                                <h2>Tu Box ({totalItemsCount} items)</h2>
                            </div>
                            <button className={styles.closeModalBtn} onClick={() => setIsMobileSummaryOpen(false)}>
                                ✕
                            </button>
                        </div>

                        <div className={styles.mobileModalBody}>
                            {/* Selected Base Indicator */}
                            <div className={styles.summaryBaseBadge}>
                                <div className={styles.summaryBaseInfo}>
                                    <span className={styles.summaryBaseIcon}>{selectedBase.icon}</span>
                                    <div>
                                        <div className={styles.summaryBaseLabel}>Base seleccionada:</div>
                                        <div className={styles.summaryBaseName}>{selectedBase.name}</div>
                                    </div>
                                </div>
                                <span className={styles.summaryBasePrice}>
                                    {selectedBase.price === 0 ? 'Gratis' : `$${selectedBase.price.toLocaleString('es-CO')}`}
                                </span>
                            </div>

                            {/* Items list */}
                            <div className={styles.summaryItemsList}>
                                {itemsList.length === 0 ? (
                                    <div className={styles.summaryEmptyState}>
                                        <p className={styles.emptyBoxTitle}>Aún no has agregado productos</p>
                                    </div>
                                ) : (
                                    itemsList.map(({ product, quantity }) => (
                                        <div key={product.id} className={styles.summaryItemRow}>
                                            <img src={product.image} alt={product.name} className={styles.summaryItemImg} />
                                            <div className={styles.summaryItemInfo}>
                                                <div className={styles.summaryItemName}>{product.name}</div>
                                                <div className={styles.summaryItemMeta}>
                                                    <span>${product.price.toLocaleString('es-CO')} c/u</span>
                                                    <div className={styles.miniQtyControls}>
                                                        <button onClick={() => handleRemoveItem(product.id)}>-</button>
                                                        <span>{quantity}</span>
                                                        <button onClick={() => handleAddItem(product)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.summaryItemSubtotal}>
                                                ${(product.price * quantity).toLocaleString('es-CO')}
                                                <button
                                                    className={styles.deleteItemBtn}
                                                    onClick={() => handleDeleteItem(product.id)}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Dedication Form */}
                            <div className={styles.personalizationBlock}>
                                <div className={styles.personalizationTitle}>
                                    💌 Personaliza tu Tarjeta
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="mobile-recipient-name">Para quién es (Opcional):</label>
                                    <input
                                        id="mobile-recipient-name"
                                        type="text"
                                        className={styles.inputField}
                                        placeholder="Ej: Mamá, Juan, Mi Pareja 💖"
                                        value={recipientName}
                                        onChange={(e) => setRecipientName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="mobile-card-dedication">Dedicatoria para la tarjeta:</label>
                                    <textarea
                                        id="mobile-card-dedication"
                                        rows="2"
                                        className={styles.textareaField}
                                        placeholder="Escribe el mensaje emotivo que imprimiremos..."
                                        value={dedicationMessage}
                                        onChange={(e) => setDedicationMessage(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Total and Actions */}
                            <div className={styles.priceBreakdown}>
                                <div className={`${styles.priceRow} ${styles.priceRowTotal}`}>
                                    <span>Total Box</span>
                                    <span className={styles.totalPriceValue}>${totalPrice.toLocaleString('es-CO')} COP</span>
                                </div>
                            </div>

                            <div className={styles.summaryActions}>
                                <button
                                    className={styles.addToCartBtn}
                                    onClick={handleAddBoxToCart}
                                >
                                    🛒 Agregar Box al Carrito
                                </button>
                                <button
                                    className={styles.orderWhatsAppBtn}
                                    onClick={handleOrderWhatsApp}
                                >
                                    💬 Pedir Box por WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};