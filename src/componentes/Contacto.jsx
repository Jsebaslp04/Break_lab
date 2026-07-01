import React, { useState } from 'react';
import styles from './Contacto.module.css';
import { useSEO } from '../hooks/useSEO';

export const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        ocasion: 'cumpleanos',
        mensaje: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useSEO({
        title: "Contacto | Pedidos y Cotizaciones | BreakLab",
        description: "Contáctanos para diseñar tu desayuno sorpresa o caja de regalos personalizada en Bogotá. Estaremos encantados de ayudarte a crear momentos mágicos.",
        keywords: "contacto breaklab, pedir desayuno sorpresa, cotizar regalos bogota, detalles personalizados telefono"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simular envío de datos
        setSubmitted(true);
    };

    const handleSendWhatsApp = () => {
        const text = `¡Hola BreakLab! Me gustaría realizar una cotización:%0A%0A` +
            `*Nombre:* ${formData.nombre}%0A` +
            `*Email:* ${formData.email}%0A` +
            `*Teléfono:* ${formData.telefono}%0A` +
            `*Ocasión:* ${formData.ocasion}%0A` +
            `*Mensaje:* ${formData.mensaje}`;
        
        window.open(`https://wa.me/573208738961?text=${text}`, '_blank');
    };

    return (
        <section className={styles.contacto_section}>
            <div className={styles.contacto_container}>
                {!submitted ? (
                    <>
                        <div className={styles.info_column}>
                            <span className={styles.tag}>¡Hablemos!</span>
                            <h1 className={styles.main_title}>Creemos Momentos Mágicos Juntos</h1>
                            <p className={styles.subtitle}>
                                ¿Tienes una idea especial en mente, una duda o deseas una cotización corporativa? 
                                Escríbenos y nuestro equipo creativo te ayudará a diseñar el regalo perfecto.
                            </p>
                            
                            <div className={styles.info_cards}>
                                <div className={styles.info_card}>
                                    <span className={styles.card_icon}>📍</span>
                                    <div>
                                        <h2>Dirección</h2>
                                        <p>Bogotá, Colombia</p>
                                    </div>
                                </div>
                                <div className={styles.info_card}>
                                    <span className={styles.card_icon}>📞</span>
                                    <div>
                                        <h2>WhatsApp Directo</h2>
                                        <p>+57 320 873 8961</p>
                                    </div>
                                </div>
                                <div className={styles.info_card}>
                                    <span className={styles.card_icon}>✉️</span>
                                    <div>
                                        <h2>Correo Electrónico</h2>
                                        <p>breaklab.colombia@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.form_column}>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.field_group}>
                                    <label htmlFor="nombre">Nombre Completo *</label>
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        name="nombre" 
                                        required 
                                        placeholder="Ej. María Fernanda Rojas" 
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.field_row}>
                                    <div className={styles.field_group}>
                                        <label htmlFor="email">Correo Electrónico *</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            required 
                                            placeholder="ejemplo@correo.com" 
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={styles.field_group}>
                                        <label htmlFor="telefono">WhatsApp / Teléfono *</label>
                                        <input 
                                            type="tel" 
                                            id="telefono" 
                                            name="telefono" 
                                            required 
                                            placeholder="Ej. 300 123 4567" 
                                            value={formData.telefono}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className={styles.field_group}>
                                    <label htmlFor="ocasion">Ocasión Especial</label>
                                    <select 
                                        id="ocasion" 
                                        name="ocasion" 
                                        value={formData.ocasion}
                                        onChange={handleChange}
                                    >
                                        <option value="cumpleanos">Aniversario / Cumpleaños 🎂</option>
                                        <option value="amor">Amor / San Valentín 💖</option>
                                        <option value="madre_padre">Día de la Madre / Padre 👩‍👦</option>
                                        <option value="corporativo">Regalo Empresarial 💼</option>
                                        <option value="otro">Otra Ocasión Especial 🎉</option>
                                    </select>
                                </div>

                                <div className={styles.field_group}>
                                    <label htmlFor="mensaje">Cuéntanos tu idea (detalles del regalo) *</label>
                                    <textarea 
                                        id="mensaje" 
                                        name="mensaje" 
                                        required 
                                        rows="4" 
                                        placeholder="Cuéntanos qué te gustaría incluir, temática, fecha de entrega y cualquier detalle personalizado..."
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <button type="submit" className={styles.submit_btn}>
                                    Enviar Mensaje 💝
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className={styles.success_container}>
                        <div className={styles.success_icon}>✨🎉</div>
                        <h2>¡Tu mensaje ha sido recibido con amor!</h2>
                        <p className={styles.success_text}>
                            Gracias por contactar con <strong>BreakLab</strong>. Analizaremos tu idea y nos pondremos en contacto contigo en menos de 2 horas.
                        </p>
                        <div className={styles.success_actions}>
                            <button className={styles.wa_direct_btn} onClick={handleSendWhatsApp}>
                                Enviar copia rápida por WhatsApp 💬
                            </button>
                            <button className={styles.back_btn} onClick={() => setSubmitted(false)}>
                                Regresar al formulario
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};