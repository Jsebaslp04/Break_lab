import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Informacion.module.css';
import { useSEO } from '../hooks/useSEO';

const infoData = {
    'sobre-nosotros': {
        title: 'Sobre Nosotros',
        content: `Somos BreakLab, una empresa nacida en 2020 con la misión de llevar sonrisas a través de detalles personalizados y desayunos sorpresa. 
        Creemos que cada momento especial merece ser celebrado con algo único. 
        Nuestro equipo trabaja con pasión y dedicación, seleccionando los mejores ingredientes y diseñando las cajas sorpresa más hermosas para impresionar a esa persona especial.`
    },
    'envios-entregas': {
        title: 'Envíos y Entregas',
        content: `Realizamos entregas en toda la ciudad. 
        Contamos con entregas el mismo día si realizas tu pedido antes de la hora límite marcada en la página de compra. 
        Nuestro equipo de logística se asegura de que cada detalle llegue en perfectas condiciones y a tiempo. 
        Los costos de envío varían dependiendo de la zona y se calcularán automáticamente durante el proceso de pago.`
    },
    'medios-pago': {
        title: 'Medios de Pago',
        content: `Aceptamos múltiples opciones para brindarte la mejor comodidad:
        • Tarjetas de crédito y débito (Visa, MasterCard, American Express).
        • Pasarelas de pago electrónico (PayU, MercadoPago).
        • Transferencias interbancarias y billeteras móviles.
        
        Todas las transacciones en nuestra web son 100% seguras y están encriptadas.`
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
            <div className={styles.info_card}>
                <h1 className={styles.title}>{data.title}</h1>
                <div className={styles.underline}></div>
                <div className={styles.content}>
                    {data.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
