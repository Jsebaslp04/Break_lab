import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Informacion.module.css';
import { useSEO } from '../hooks/useSEO';

const infoData = {
    'sobre-nosotros': {
        title: 'Sobre Nosotros',
        content: `Detrás de cada sorpresa hay una historia, y en BreakLab nos encargamos de contarla. Nacimos en 2020 con un propósito claro: transformar un día común en un recuerdo inolvidable a través de detalles personalizados y desayunos sorpresa creados con el corazón.

Creemos firmemente que los momentos especiales no se planifican a la ligera; merecen ser celebrados con algo tan único como la persona que lo recibe.

Por eso, cuidamos cada elemento como si fuera para nuestra propia familia. Desde nuestro taller seleccionamos ingredientes frescos de la mejor calidad y diseñamos minuciosamente cada caja sorpresa, combinando técnicas artesanales con un acabado impecable para garantizar que, al abrir tu regalo, la primera reacción sea una sonrisa gigante.`
    },
    'envios-entregas': {
        title: 'Envíos y Entregas',
        content: `Sabemos que no solo transportamos un paquete, sino una gran ilusión. Por eso, nos encargamos de que tu sorpresa llegue impecable y justo a tiempo, realizando entregas en toda la ciudad.

¿Llegas tarde a la celebración? Despreocúpate. 

Cuidado de principio a fin: Nuestro equipo de logística trata cada detalle con la máxima delicadeza. Nos aseguramos de que los desayunos y regalos viajen protegidos para que lleguen frescos, perfectos y listos para sorprender.

Entrega Garantizada: No delegamos la felicidad a cualquiera; nuestro equipo cuida el traslado para que todo llegue a tiempo y en perfectas condiciones.`
    },
    'medios-pago': {
        title: 'Medios de Pago',
        content: `Queremos que consentir a tus personas favoritas sea tan sencillo como seguro. Elige la opción que te resulte más cómoda:

Plataformas Digitales y Billeteras Móviles: Recibimos pagos rápidos desde tu celular a través de Nequi y Daviplata.

Transferencias Directas: Puedes realizar tu pago de forma sencilla mediante transferencia a nuestra cuenta Bancolombia o transferencias interbancarias.`
    },
    'terminos-condiciones': {
        title: 'Términos y Condiciones',
        content: `Bienvenido a nuestro sitio web. Al hacer uso de nuestros servicios, aceptas las presentes políticas.
        Los productos están sujetos a disponibilidad del inventario. En el caso de diseños o cajas personalizadas, el cliente debe aprobar los detalles previamente. 
        No se admiten cancelaciones una vez iniciada la preparación del pedido, ya que se trata de alimentos perecederos y decoración hecha a medida.
        Si tienes algún problema con tu pedido, por favor contáctanos el mismo día de la recepción.`
    },
    'politica-privacidad': {
        title: 'Política de Privacidad',
        content: `En BreakLab estamos comprometidos a proteger y respetar tu privacidad.
        La información personal que recopilamos (nombre, dirección, correo, teléfono) se utiliza exclusivamente para el procesamiento, despacho y facturación de tus pedidos.
        No compartimos ni vendemos tu información a terceros. 
        Ocasionalmente, usaremos tu correo o teléfono para enviarte actualizaciones, promociones e información relevante sobre nuestros servicios.`
    }
};

export function Informacion() {
    const { seccion } = useParams();
    const data = infoData[seccion] || {
        title: 'Información no encontrada',
        content: 'Lo sentimos, la sección que buscas no existe o ha sido movida.'
    };

    // Inyección de SEO dinámico según la sección
    useSEO({
        title: `${data.title} | BreakLab`,
        description: `${data.content.substring(0, 160).replace(/\n/g, ' ')}...`,
        keywords: `breaklab, ${data.title.toLowerCase()}, desayunos sorpresa bogota, informacion breaklab`
    });

    // Scroll to top when the component mounts or section changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [seccion]);

    return (
        <div className={styles.info_container}>
            {/* Background elements for premium visual aesthetic */}
            <div className={styles.bg_blob_1}></div>
            <div className={styles.bg_blob_2}></div>
            
            <div className={styles.info_card}>
                <h1 className={styles.title}>{data.title}</h1>
                <div className={styles.underline}></div>
                
                {seccion === 'medios-pago' && (
                    <div className={styles.payments_container}>
                        <p className={styles.intro_text}>
                            Queremos que consentir a tus personas favoritas sea tan sencillo como seguro. 
                            Elige la opción de pago que prefieras y finaliza tu pedido con total tranquilidad:
                        </p>
                        
                        <div className={styles.payments_grid}>
                            <div className={styles.payment_card}>
                                <div className={styles.payment_header}>
                                    <div className={styles.brand_logos}>
                                        <div className={styles.nequi_logo} title="Nequi">
                                            <svg viewBox="0 0 100 100" width="36" height="36">
                                                <rect width="100" height="100" rx="22" fill="#3f0075"/>
                                                <path d="M28 72V28h11l19 28V28h9v44H66L47 44v28h-9z" fill="#ffffff"/>
                                                <circle cx="74" cy="26" r="8" fill="#ff007f"/>
                                            </svg>
                                        </div>
                                        <div className={styles.daviplata_logo} title="DaviPlata">
                                            <svg viewBox="0 0 100 100" width="36" height="36">
                                                <rect width="100" height="100" rx="22" fill="#e30613"/>
                                                <path d="M50 22 L20 48 L30 48 L30 78 L70 78 L70 48 L80 48 Z" fill="#ffffff"/>
                                                <rect x="42" y="55" width="16" height="23" fill="#e30613" rx="2"/>
                                                <circle cx="50" cy="40" r="5" fill="#fecb00"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3>Billeteras Móviles</h3>
                                </div>
                                <div className={styles.payment_body}>
                                    <p>Transfiere de forma rápida desde tu celular con tus aplicaciones favoritas:</p>
                                    <div className={styles.payment_info_box}>
                                        <strong>Número Nequi / DaviPlata:</strong>
                                        <span className={styles.highlight}>+57 320 873 8961</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.payment_card}>
                                <div className={styles.payment_header}>
                                    <div className={styles.brand_logos}>
                                        <div className={styles.bank_logo} title="Transferencia Bancaria">
                                            <svg viewBox="0 0 100 100" width="36" height="36">
                                                <rect width="100" height="100" rx="22" fill="#fecb00"/>
                                                <path d="M15 82 h70 v-8 h-70 z M25 70 h8 v-28 h-8 z M40 70 h8 v-28 h-8 z M55 70 h8 v-28 h-8 z M70 70 h8 v-28 h-8 z M50 18 L15 36 v6 h70 v-6 z" fill="#1e1e1e"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3>Bancolombia</h3>
                                </div>
                                <div className={styles.payment_body}>
                                    <p>Realiza transferencias directas desde la app de tu banco o mediante corresponsal bancario:</p>
                                    <div className={styles.payment_info_box}>
                                        <strong>Cuenta de Ahorros Bancolombia:</strong>
                                        <span className={styles.account_number}>Nº 123-456789-01</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.payment_card}>
                                <div className={styles.payment_header}>
                                    <div className={styles.brand_logos}>
                                        <div className={styles.card_logo} title="Tarjetas de Crédito / Débito">
                                            <svg viewBox="0 0 100 100" width="36" height="36">
                                                <rect width="100" height="100" rx="22" fill="#2d3748"/>
                                                <rect x="15" y="30" width="22" height="16" rx="4" fill="#edc842"/>
                                                <rect x="15" y="60" width="40" height="6" rx="2" fill="#ffffff" opacity="0.3"/>
                                                <circle cx="70" cy="65" r="12" fill="#ea1d25" opacity="0.8"/>
                                                <circle cx="82" cy="65" r="12" fill="#fecb00" opacity="0.8"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3>Tarjetas de Crédito y Débito</h3>
                                </div>
                                <div className={styles.payment_body}>
                                    <p>Aceptamos pagos directos a través de las redes más seguras:</p>
                                    <div className={styles.cards_accepted}>
                                        <span className={styles.card_badge}>Visa</span>
                                        <span className={styles.card_badge}>Mastercard</span>
                                        <span className={styles.card_badge}>American Express</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.payment_security_footer}>
                            <span className={styles.security_icon}>🔒</span>
                            <p>Tus transacciones están encriptadas y protegidas bajo estándares de seguridad SSL 100% confiables.</p>
                        </div>
                    </div>
                )}

                {seccion === 'sobre-nosotros' && (
                    <div className={styles.quienes_somos}>
                        <div className={styles.qs_container}>
                            <div className={styles.qs_text_side}>
                                <span className={styles.qs_tag}>Detrás de la magia</span>
                                <h2 className={styles.qs_title}>¿Quiénes estamos detrás de Breaklab?</h2>
                                <p className={styles.qs_desc}>
                                    En <strong>Breaklab</strong>, más que crear objetos, nos dedicamos a materializar emociones.
                                    Somos un equipo de creativos apasionados por el arte hecho a mano, el diseño y la tecnología de impresión 3D,
                                    unidos por un propósito claro: convertir tus sentimientos en experiencias tangibles que dejan huella.
                                </p>
                                <p className={styles.qs_desc_secondary}>
                                    Cada detalle que sale de nuestro laboratorio es diseñado y fabricado a medida en Bogotá, cuidando cada terminación
                                    para garantizar que tu sorpresa se convierta en un recuerdo imborrable en el tiempo.
                                </p>

                                <div className={styles.qs_pillars}>
                                    <div className={styles.qs_pillar}>
                                        <span className={styles.qs_pillar_icon}>💝</span>
                                        <div>
                                            <p className={styles.qs_pillar_title}>Amor por el Detalle</p>
                                            <p>Cada desayuno y box sorpresa se decora a mano con dedicación exclusiva.</p>
                                        </div>
                                    </div>
                                    <div className={styles.qs_pillar}>
                                        <span className={styles.qs_pillar_icon}>🚀</span>
                                        <div>
                                            <p className={styles.qs_pillar_title}>Tecnología & Arte</p>
                                            <p>Fusionamos impresión 3D en tus detalles.</p>
                                        </div>
                                    </div>
                                    <div className={styles.qs_pillar}>
                                        <span className={styles.qs_pillar_icon}>✨</span>
                                        <div>
                                            <p className={styles.qs_pillar_title}>Personalización Sin Límites</p>
                                            <p>Tú imaginas la idea y nosotros la hacemos realidad, adaptada a tus gustos y para toda ocasión.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.qs_visual_side}>
                                <div className={styles.qs_stats_card}>
                                    <div className={styles.qs_stat_item}>
                                        <span className={styles.qs_stat_number}>2020</span>
                                        <span className={styles.qs_stat_label}>Creando momentos</span>
                                    </div>
                                    <div className={styles.qs_stat_item}>
                                        <span className={styles.qs_stat_number}>100%</span>
                                        <span className={styles.qs_stat_label}>Personalizado</span>
                                    </div>
                                    <div className={styles.qs_stat_item}>
                                        <span className={styles.qs_stat_number}>Bogotá</span>
                                        <span className={styles.qs_stat_label}>Envíos seguros</span>
                                    </div>
                                </div>
                                <div className={styles.qs_cta_box}>
                                    <p className={styles.qs_cta_title}>¿Listo para sorprender?</p>
                                    <p>Escríbenos y creemos juntos el regalo ideal.</p>
                                    <a href="https://wa.me/573208738961" target="_blank" rel="noopener noreferrer" className={styles.cta_button}>¡Comenzar ahora! 💬</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {seccion === 'envios-entregas' && (
                    <div className={styles.shipping_section}>
                        <p className={styles.intro_text}>
                            Sabemos que no solo transportamos un paquete, sino una gran ilusión. 
                            Por eso, nos encargamos de que tu sorpresa llegue impecable y justo a tiempo, realizando entregas en toda la ciudad.
                        </p>
                        
                        <div className={styles.shipping_grid}>
                            <div className={styles.shipping_card}>
                                <div className={styles.shipping_icon_wrapper}>
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#3182ce">
                                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17 12V9.5h2.5l1.97 2.5H17z"/>
                                    </svg>
                                </div>
                                <h3>Logística Delicada</h3>
                                <p>Nuestro equipo de logística trata cada detalle con la máxima delicadeza. Nos aseguramos de que los desayunos y regalos viajen protegidos para que lleguen frescos y perfectos.</p>
                            </div>
                            
                            <div className={styles.shipping_card}>
                                <div className={styles.shipping_icon_wrapper}>
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#319795">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                </div>
                                <h3>Entregas Bogotá</h3>
                                <p>Cubrimos toda el área urbana de Bogotá, garantizando que el obsequio llegue a la dirección indicada sin contratiempos.</p>
                            </div>
                            
                            <div className={styles.shipping_card}>
                                <div className={styles.shipping_icon_wrapper}>
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#dd6b20">
                                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                    </svg>
                                </div>
                                <h3>Puntualidad</h3>
                                <p>Cuidamos las rutas para entregar tus sorpresas en los rangos horarios definidos. ¡No delegamos tu felicidad a cualquiera!</p>
                            </div>
                        </div>
                    </div>
                )}

                {seccion === 'terminos-condiciones' && (
                    <div className={styles.terms_section}>
                        <p className={styles.intro_text}>
                            Bienvenido a BreakLab. Al hacer uso de nuestros servicios, aceptas las presentes políticas de servicio. 
                            Te invitamos a leerlas detenidamente:
                        </p>
                        
                        <div className={styles.terms_grid}>
                            <div className={styles.terms_card}>
                                <div className={styles.terms_badge}>✓</div>
                                <h3>Disponibilidad</h3>
                                <p>Los productos están sujetos a disponibilidad del inventario. En el caso de diseños o cajas personalizadas, el cliente debe aprobar los detalles previamente.</p>
                            </div>
                            
                            <div className={styles.terms_card}>
                                <div className={styles.terms_badge}>✕</div>
                                <h3>Cancelaciones</h3>
                                <p>No se admiten cancelaciones una vez iniciada la preparación del pedido, ya que se trata de alimentos perecederos y decoración hecha a medida.</p>
                            </div>
                            
                            <div className={styles.terms_card}>
                                <div className={styles.terms_badge}>ℹ</div>
                                <h3>Novedades y Reclamos</h3>
                                <p>Si tienes algún inconveniente o novedad con tu pedido, por favor contáctanos de inmediato el mismo día de la recepción para darte soporte.</p>
                            </div>
                        </div>
                    </div>
                )}

                {seccion === 'politica-privacidad' && (
                    <div className={styles.privacy_section}>
                        <p className={styles.intro_text}>
                            En BreakLab estamos comprometidos a proteger y respetar tu privacidad.
                            Los datos recopilados se gestionan bajo altos estándares de seguridad:
                        </p>
                        
                        <div className={styles.privacy_grid}>
                            <div className={styles.privacy_card}>
                                <div className={styles.privacy_icon_box}>
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#319795">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                                    </svg>
                                </div>
                                <h3>Uso de Información</h3>
                                <p>La información recopilada (nombre, dirección, correo, teléfono) se utiliza exclusivamente para procesar, facturar y despachar tus pedidos.</p>
                            </div>
                            
                            <div className={styles.privacy_card}>
                                <div className={styles.privacy_icon_box}>
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#d65b79">
                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                                    </svg>
                                </div>
                                <h3>Confidencialidad</h3>
                                <p>Garantizamos absoluta reserva. No vendemos, alquilamos ni compartimos tus datos personales con terceros bajo ningún concepto.</p>
                            </div>
                            
                            <div className={styles.privacy_card}>
                                <div className={styles.privacy_icon_box}>
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#2b6cb0">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                </div>
                                <h3>Novedades y Boletines</h3>
                                <p>Únicamente utilizaremos tu correo o teléfono para enviarte actualizaciones, cupones o información relevante si nos autorizas.</p>
                            </div>
                        </div>
                    </div>
                )}

                {!['medios-pago', 'sobre-nosotros', 'envios-entregas', 'terminos-condiciones', 'politica-privacidad'].includes(seccion) && (
                    <div className={styles.content}>
                        {data.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
