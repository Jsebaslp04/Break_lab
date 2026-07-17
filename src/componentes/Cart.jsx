import React, { useEffect } from 'react';
import { useCart } from './context/CartContext';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';
import { useSEO } from '../hooks/useSEO';
import { getProductById, getProductOptions } from '../data/products';

export const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, updateCartItemOptions } = useCart();

    const phoneNumber = "573208738961"; // Real WhatsApp number configured in other parts

    useSEO({
        title: "Carrito de Compras | BreakLab",
        description: "Revisa los productos en tu carrito de compras de BreakLab. Completa tu pedido para coordinar el envío de tus desayunos sorpresa y regalos personalizados por WhatsApp.",
        keywords: "carrito de compras, finalizar compra, regalos personalizados, breaklab carrito"
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        let text = "¡Hola! Quiero finalizar mi compra en BreakLab:%0A%0A";
        cartItems.forEach(item => {
            text += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})%0A`;
        });
        text += `%0A*Total: $${total.toLocaleString()}*`;
        
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.cartCard}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>
                        <span className={styles.cartIcon}>🛒</span>
                        <h1>Tu Carrito de Compras</h1>
                    </div>
                </div>

                <div className={styles.content}>
                    {cartItems.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.iconWrapper}>
                                <span className={styles.giftIcon}>🎁</span>
                            </div>
                            <h3>Tu carrito está vacío</h3>
                            <p>¡Agrega productos para empezar a comprar!</p>
                            <Link to="/Crea_tu_Box" className={styles.continueBtn}>
                                Explorar Kits
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className={styles.cartList}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className={styles.cartItem}>
                                        <div className={styles.itemContainer}>
                                            {item.image ? (
                                                item.image.endsWith('.mp4') ? (
                                                    <video 
                                                        src={item.image} 
                                                        className={styles.itemImage} 
                                                        autoPlay 
                                                        muted 
                                                        loop 
                                                        playsInline 
                                                    />
                                                ) : (
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className={styles.itemImage} 
                                                    />
                                                )
                                            ) : null}
                                            <div className={styles.itemInfo}>
                                                <h4>{item.name}</h4>
                                                <p className={styles.itemPrice}>${item.price.toLocaleString()}</p>
                                                
                                                {/* Selector de color dinámico en el carrito */}
                                                {(() => {
                                                    const product = getProductById(item.productId);
                                                    const options = product ? getProductOptions(product) : [];
                                                    const colorOpt = options.find(o => o.name === 'color');
                                                    if (!colorOpt) return null;
                                                    return (
                                                        <div className={styles.cartColorSelector}>
                                                            <label htmlFor={`color-select-${item.id}`}>Color: </label>
                                                            <select
                                                                id={`color-select-${item.id}`}
                                                                value={item.selectedOptions?.color || colorOpt.default}
                                                                onChange={(e) => {
                                                                    const newColor = e.target.value;
                                                                    const newOptions = { ...item.selectedOptions, color: newColor };
                                                                    updateCartItemOptions(item.id, newOptions);
                                                                }}
                                                                className={styles.colorSelectDropdown}
                                                            >
                                                                {colorOpt.choices.map(choice => (
                                                                    <option key={choice} value={choice}>
                                                                        {choice}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                        <div className={styles.itemActions}>
                                            <div className={styles.quantityControls}>
                                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑️ Eliminar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.addMoreSection}>
                                <Link to="/Crea_tu_Box" className={styles.addMoreLink}>
                                    + Deseo añadir más productos
                                </Link>
                            </div>

                            <div className={styles.footer}>
                                <div className={styles.totalRow}>
                                    <span>Total Estimado:</span>
                                    <strong>${total.toLocaleString()}</strong>
                                </div>
                                <button className={styles.whatsappBtn} onClick={handleCheckout}>
                                    <span className={styles.waIcon}>💬</span>
                                    Finalizar compra por WhatsApp
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
