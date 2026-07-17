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

    const WEB3FORMS_ACCESS_KEY = "70eb391a-0ed2-4987-ab7e-1b1a3e8026f6";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const sendEmailInBackground = (labelOcasion) => {
        if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
            console.warn("Web3Forms Access Key no configurada. Obtén tu clave gratuita en https://web3forms.com/ y reemplázala en Contacto.jsx para recibir correos.");
            return;
        }

        const emailBody = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Nueva Cotización desde BreakLab - ${formData.nombre}`,
            from_name: "Contacto BreakLab",
            to_email: "breaklab.colombia@gmail.com",
            name: formData.nombre,
            email: formData.email,
            phone: formData.telefono,
            occasion: labelOcasion,
            message: formData.mensaje
        };

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(emailBody)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log("Correo enviado con éxito a breaklab.colombia@gmail.com!");
            } else {
                console.error("Error al enviar correo por Web3Forms:", data.message);
            }
        })
        .catch(err => {
            console.error("Error de conexión al enviar correo:", err);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const ocasionLabels = {
            cumpleanos: "Aniversario / Cumpleaños 🎂",
            amor: "Amor / San Valentín 💖",
            madre_padre: "Día de la Madre / Padre 👩‍👦",
            corporativo: "Regalo Empresarial 💼",
            otro: "Otra Ocasión Especial 🎉"
        };
        const labelOcasion = ocasionLabels[formData.ocasion] || formData.ocasion;

        // Enviar correo silenciosamente en segundo plano
        sendEmailInBackground(labelOcasion);

        // Abrir WhatsApp con el texto pre-rellenado
        handleSendWhatsApp(labelOcasion);
    };

    const handleSendWhatsApp = (labelOcasion) => {
        let finalLabel = labelOcasion;
        if (typeof labelOcasion !== 'string') {
            const ocasionLabels = {
                cumpleanos: "Aniversario / Cumpleaños 🎂",
                amor: "Amor / San Valentín 💖",
                madre_padre: "Día de la Madre / Padre 👩‍👦",
                corporativo: "Regalo Empresarial 💼",
                otro: "Otra Ocasión Especial 🎉"
            };
            finalLabel = ocasionLabels[formData.ocasion] || formData.ocasion;
        }

        const text = `¡Hola BreakLab! Me gustaría realizar una cotización:\n\n` +
            `*Nombre:* ${formData.nombre}\n` +
            `*Email:* ${formData.email}\n` +
            `*Teléfono:* ${formData.telefono}\n` +
            `*Ocasión:* ${finalLabel}\n` +
            `*Mensaje:* ${formData.mensaje}`;

        window.open(`https://wa.me/573208738961?text=${encodeURIComponent(text)}`, '_blank');
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
                                    <span className={styles.card_icon} style={{ backgroundColor: '#fff0f3' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#d65b79" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                        </svg>
                                    </span>
                                    <div>
                                        <h2>Dirección</h2>
                                        <p>Bogotá, Colombia</p>
                                    </div>
                                </div>
                                <div className={styles.info_card}>
                                    <span className={styles.card_icon} style={{ backgroundColor: '#e8f8f0' }}>
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.86.002-2.638-1.022-5.117-2.884-6.98C16.386 1.898 13.916.87 11.272.87 5.834.87 1.411 5.289 1.409 10.73c0 1.558.423 3.082 1.222 4.41l-.979 3.57 3.66-.96c1.332.727 2.768 1.124 4.335 1.124zm11.362-7.75c-.29-.145-1.716-.847-1.982-.944-.266-.097-.46-.145-.653.145-.193.29-.747.944-.916 1.137-.169.194-.338.218-.628.073-.29-.145-1.222-.45-2.327-1.436-.86-.767-1.44-1.716-1.609-2.006-.17-.29-.018-.446.127-.59.13-.13.29-.339.435-.508.145-.17.193-.29.29-.484.097-.193.048-.362-.024-.508-.073-.145-.653-1.573-.894-2.153-.235-.565-.472-.489-.653-.498-.169-.008-.362-.01-.555-.01-.193 0-.508.072-.773.362-.266.29-1.014.99-1.014 2.415 0 1.425 1.038 2.802 1.182 2.996.145.193 2.043 3.12 4.95 4.378.69.299 1.23.478 1.649.612.693.22 1.325.19 1.824.115.556-.08 1.716-.7 1.958-1.378.242-.677.242-1.258.17-1.378-.073-.12-.266-.193-.556-.339z"/>
                                        </svg>
                                    </span>
                                    <div>
                                        <h2>WhatsApp Directo</h2>
                                        <p>+57 320 873 8961</p>
                                    </div>
                                </div>
                                <div className={styles.info_card}>
                                    <span className={styles.card_icon} style={{ backgroundColor: '#fde8e8' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#EA4335" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                    </span>
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
                                        placeholder="Escribe tu nombre..."
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
                                            placeholder="300 123 4567"
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