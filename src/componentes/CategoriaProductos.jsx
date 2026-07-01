import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoriaProductos.module.css';
import { getCategoryProducts, getIncludedItems, getProductOptions } from '../data/products';
import { useSEO } from '../hooks/useSEO';
import { useCart } from './context/CartContext';

export function CategoriaProductos() {
    const { id } = useParams();
    const categoriaId = id || 'kit-escolar';
    const products = getCategoryProducts(categoriaId);
    const { addToCart } = useCart();

    const [selectedOptions, setSelectedOptions] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [activeProductForModal, setActiveProductForModal] = useState(null);
    const [selectedSug, setSelectedSug] = useState({});

    const formatCategoryName = (str) => {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const categoryName = formatCategoryName(categoriaId);

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${categoryName} - BreakLab`,
        "description": `Colección de regalos personalizados y desayunos sorpresa en la categoría ${categoryName}.`,
        "url": window.location.href,
        "numberOfItems": products.length,
        "itemListElement": products.map((prod, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `${window.location.origin}/producto/${prod.id}`,
            "name": prod.name,
            "image": prod.image.startsWith('http') ? prod.image : `${window.location.origin}${prod.image.startsWith('/') ? prod.image : '/' + prod.image}`
        }))
    };

    useSEO({
        title: `${categoryName} | Cajas de Regalo y Detalles | BreakLab`,
        description: `Descubre nuestra colección de ${categoryName}. Cajas de regalo sorpresa y detalles personalizados de alta calidad para celebrar cualquier ocasión especial.`,
        keywords: `${categoriaId.replace(/-/g, ' ')}, regalos ${categoriaId.replace(/-/g, ' ')}, breaklab ${categoriaId.replace(/-/g, ' ')}, detalles personalizados bogota`,
        ogImage: products[0]?.image,
        schema: itemListSchema
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedOptions({});
        setShowModal(false);
        setActiveProductForModal(null);
        setSelectedSug({});
    }, [id]);

    const getSelectedOption = (productId, optionName, defaultValue) => {
        return selectedOptions[`${productId}_${optionName}`] || defaultValue;
    };

    const handleSelectOption = (productId, optionName, choice) => {
        setSelectedOptions(prev => ({
            ...prev,
            [`${productId}_${optionName}`]: choice
        }));
    };

    const handleOpenAddToCartModal = (product) => {
        const options = getProductOptions(product);
        const selected = {};
        options.forEach(opt => {
            selected[opt.name] = getSelectedOption(product.id, opt.name, opt.default);
        });

        setActiveProductForModal({ product, selected });
        setShowModal(true);
    };

    const suggestedItems = [
        { id: 'mug', name: 'Mug Personalizado', icon: '☕', price: 15000 },
        { id: 'llavero', name: 'Llavero Especial', icon: '🔑', price: 8000 },
        { id: 'chocolates', name: 'Caja Chocolates', icon: '🍫', price: 12000 }
    ];

    const toggleSuggestion = (sugId) => {
        setSelectedSug(prev => ({ ...prev, [sugId]: !prev[sugId] }));
    };

    const handleAddSelected = () => {
        if (!activeProductForModal) return;

        const { product, selected } = activeProductForModal;
        const optString = Object.values(selected).join(', ');
        const optId = Object.values(selected).join('-');

        const productsToAdd = [{
            id: `${product.id}-${optId}`,
            name: `${product.name} (${optString})`,
            price: product.price,
            quantity: 1,
            image: product.image
        }];

        suggestedItems.forEach(sug => {
            if (selectedSug[sug.id]) {
                productsToAdd.push({
                    id: sug.id,
                    name: sug.name,
                    price: sug.price,
                    quantity: 1
                });
            }
        });

        addToCart(productsToAdd);
        setShowModal(false);
        setSelectedSug({});
        setActiveProductForModal(null);
    };

    const handleAddOnlyMainProduct = () => {
        if (!activeProductForModal) return;

        const { product, selected } = activeProductForModal;
        const optString = Object.values(selected).join(', ');
        const optId = Object.values(selected).join('-');

        addToCart([{
            id: `${product.id}-${optId}`,
            name: `${product.name} (${optString})`,
            price: product.price,
            quantity: 1,
            image: product.image
        }]);
        setShowModal(false);
        setSelectedSug({});
        setActiveProductForModal(null);
    };

    const hasSelection = Object.values(selectedSug).some(Boolean);

    return (
        <div className={styles.categoryContainer}>
            <h1 className={styles.categoryTitle}>{formatCategoryName(categoriaId)}</h1>
            <div className={styles.productsGrid}>
                {products.map(product => {
                    return (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.cardImageWrapper}>
                                <Link to={`/producto/${product.id}`} className={styles.imageLink}>
                                    <img 
                                        src={product.image} 
                                        alt={`Detalle de ${product.name} - Regalo personalizado BreakLab`} 
                                        className={styles.productImage} 
                                        loading="lazy" 
                                    />
                                </Link>
                                {product.isNew && <span className={styles.newBadge}>Nuevo</span>}
                            </div>
                            
                            <div className={styles.cardBody}>
                                <Link to={`/producto/${product.id}`} className={styles.productNameLink}>
                                    <h2 className={styles.productName}>{product.name}</h2>
                                </Link>
                                
                                <p className={styles.productSubtitle}>{product.subtitle}</p>
                                
                                <hr className={styles.cardDivider} />
                                
                                <div className={styles.cardFooter}>
                                    <span className={styles.productPrice}>
                                        ${product.price.toLocaleString()}
                                    </span>
                                    
                                    <button 
                                        className={styles.addBtnMini}
                                        onClick={() => handleOpenAddToCartModal(product)}
                                    >
                                        + Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showModal && activeProductForModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>✨ ¡Has añadido un producto al carrito! 🎉</h2>
                        <p>Sugerimos añadir más productos para complementar tu regalo:</p>
                        <div className={styles.suggestedItems}>
                            {suggestedItems.map(sug => (
                                <div 
                                    key={sug.id} 
                                    className={`${styles.suggestedBox} ${selectedSug[sug.id] ? styles.selected : ''}`}
                                    onClick={() => toggleSuggestion(sug.id)}
                                >
                                    <span className={styles.sugIcon}>{sug.icon}</span> 
                                    <strong>{sug.name}</strong><br/>
                                    <span className={styles.sugPrice}>+${sug.price.toLocaleString()}</span>
                                    {selectedSug[sug.id] && <div className={styles.checkIcon}>✓</div>}
                                </div>
                            ))}
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.btnSecondary} onClick={handleAddOnlyMainProduct}>
                                No, gracias (Ver carrito)
                            </button>
                            <button 
                                className={`${styles.btnPrimary} ${!hasSelection ? styles.btnDisabled : ''}`} 
                                onClick={handleAddSelected}
                            >
                                {hasSelection ? 'Sí, agregar seleccionados' : 'Selecciona una sugerencia'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
