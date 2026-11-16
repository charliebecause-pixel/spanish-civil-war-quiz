import type { LegalContent } from './types';

// `{contact}` se sustituye por la dirección de contacto de la configuración del sitio.
export const legalEs: LegalContent = {
  privacy: {
    title: 'Política de privacidad',
    description: 'Qué ocurre con la información cuando usas este sitio.',
    updated: '2026-11-16',
    intro: [
      'Este sitio es una parodia de los tests políticos de internet. Está hecho para recoger lo mínimo posible sobre quienes lo visitan.',
      'Esta política explica qué ocurre con la información cuando usas el sitio. Las preguntas pueden enviarse a {contact}.',
    ],
    sections: [
      {
        heading: 'Qué recogemos de ti',
        paragraphs: [
          'Nada que te identifique. No hay cuentas, ni formularios de registro, ni cajas de comentarios.',
          'La respuesta que eliges en el test se queda en tu navegador. Nunca se nos envía ni se envía a nadie más, y desaparece al cerrar o recargar la página.',
        ],
      },
      {
        heading: 'Qué se trata de forma automática',
        paragraphs: [
          'Ningún sitio web puede entregarse sin que cierta información técnica pase por las empresas que lo hacen funcionar:',
        ],
        items: [
          'Nuestro proveedor de alojamiento trata tu dirección IP y los datos básicos de la petición (la página solicitada, la hora y el tipo de navegador) para entregar las páginas y bloquear ataques.',
          'Las visitas se cuentan de forma agregada, sin cookies y sin crear un perfil sobre ti.',
          'Si el código del sitio falla en tu navegador, se envía un informe técnico del error para que podamos corregirlo. Contiene el error, la dirección de la página y el tipo de navegador. Todo lo que parezca información personal se elimina antes de que el informe salga de tu navegador.',
        ],
      },
      {
        id: 'partners',
        heading: 'Empresas que nos ayudan a mantener este sitio',
        paragraphs: [
          'Estas son todas las empresas externas que intervienen. La lista se genera a partir de la configuración del propio sitio, así que cambia cada vez que se añade o se retira una empresa.',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Este sitio no instala cookies propias ni guarda nada en tu dispositivo. Si alguna empresa de la lista anterior instala una cookie, su nombre aparece junto a esa empresa.',
        ],
      },
      {
        heading: 'Publicidad y enlaces patrocinados',
        paragraphs: [
          'El sitio solo muestra publicidad o enlaces patrocinados si en la lista anterior aparece una empresa de publicidad o de enlaces patrocinados.',
          'Toda la publicidad de este sitio es no personalizada: los anuncios no se eligen a partir de tu historial de navegación ni de un perfil sobre ti. Cada enlace patrocinado se identifica como tal justo al lado del enlace.',
        ],
      },
      {
        heading: 'Tus opciones de privacidad',
        paragraphs: [
          'No vendemos ni compartimos información personal, ni la usamos para publicidad dirigida. Si tu navegador envía una señal de Global Privacy Control, la tratamos como una solicitud de exclusión de cualquier venta o cesión.',
          'Según dónde vivas, puedes tener derecho a preguntar qué información tiene una empresa sobre ti y a que se corrija o se elimine. No guardamos nada que te identifique, pero puedes escribir a {contact} y te responderemos.',
        ],
      },
      {
        heading: 'Menores',
        paragraphs: [
          'El sitio no está dirigido a menores y no recoge información personal de nadie, sea cual sea su edad.',
        ],
      },
      {
        heading: 'Dónde se trata la información',
        paragraphs: [
          'Las empresas de la lista anterior tratan la información en Estados Unidos y, para entregar las páginas con rapidez, en servidores cercanos a ti.',
        ],
      },
      {
        heading: 'Cambios en esta política',
        paragraphs: [
          'Actualizamos esta página antes de que empiece a funcionar cualquier empresa nueva o cualquier uso nuevo de la información. La fecha de arriba indica el último cambio.',
        ],
      },
    ],
  },
  terms: {
    title: 'Condiciones de uso',
    description: 'Las normas para usar este sitio.',
    updated: '2026-11-16',
    intro: [
      'Al usar este sitio aceptas estas condiciones. Si no estás de acuerdo, por favor no lo uses.',
    ],
    sections: [
      {
        heading: 'Este sitio es una broma',
        paragraphs: [
          'Este sitio es una parodia de los tests políticos de internet, hecha para entretener. Sus «resultados» son el remate de un chiste. No son una evaluación de ti, de tus ideas ni de tu carácter, y no afirman ningún hecho sobre nadie.',
          'Nada de lo que aparece aquí es asesoramiento político, histórico, educativo ni profesional.',
        ],
      },
      {
        heading: 'Uso del sitio',
        paragraphs: [
          'Puedes usar el sitio con fines personales y no comerciales. Por favor, no lo ataques, no lo sobrecargues y no lo copies entero para presentarlo como tuyo.',
        ],
      },
      {
        heading: 'Nuestro contenido',
        paragraphs: [
          'El texto, el diseño y las imágenes pertenecen a la persona titular del sitio, salvo que se indique otra cosa. Puedes enlazar el sitio y compartir capturas de tu resultado.',
        ],
      },
      {
        heading: 'Enlaces, publicidad y enlaces patrocinados',
        paragraphs: [
          'El sitio puede enlazar a otros sitios y puede mostrar publicidad o enlaces patrocinados. Los enlaces patrocinados siempre se identifican. No somos responsables del contenido ni de las prácticas de otros sitios.',
        ],
      },
      {
        heading: 'Sin garantías',
        paragraphs: [
          'El sitio se ofrece tal cual, sin compromiso de servicio y sin garantía de que esté disponible, libre de errores o sea adecuado para un fin concreto.',
        ],
      },
      {
        heading: 'Límite de responsabilidad',
        paragraphs: [
          'En la máxima medida que permita la ley, la persona titular del sitio no responde de ninguna pérdida derivada del uso que hagas del sitio.',
        ],
      },
      {
        heading: 'Cambios',
        paragraphs: [
          'Podemos cambiar el sitio o estas condiciones en cualquier momento. La fecha de arriba indica el último cambio.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: ['Escribe a {contact}.'],
      },
    ],
  },
};
