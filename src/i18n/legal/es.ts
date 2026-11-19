import type { LegalContent } from './types';

// `{contact}` se sustituye por la dirección de contacto de la configuración del sitio.
export const legalEs: LegalContent = {
  about: {
    title: 'Acerca de este sitio',
    description: 'Qué es este sitio, de qué se burla y de dónde vienen sus cifras y sus imágenes.',
    updated: '2026-11-19',
    intro: [
      'El Test de ideología política en 60 segundos es una parodia de los tests políticos de internet. Es una broma, y esta página es donde lo dice claramente.',
    ],
    sections: [
      {
        heading: 'De qué se burla',
        paragraphs: [
          'Los tests políticos de internet hacen decenas de preguntas y luego te sitúan con precisión en un mapa político. Este presume de la misma precisión con una sola pregunta sobre una guerra que terminó en 1939, y después te da la etiqueta más extrema que encuentra.',
        ],
      },
      {
        heading: 'La broma',
        paragraphs: [
          'La pregunta es una falsa disyuntiva. Si eliges a los republicanos, te dice que eres comunista; si eliges a los nacionales, que eres fascista, al instante y con letras enormes. Es como se etiquetan hoy a menudo los adversarios políticos: una opinión, y te colocan en el peor bando de ese lado.',
          'Tu resultado no dice nada de ti. No todos los del bando republicano eran comunistas, ni todos los del bando nacional eran fascistas.',
        ],
      },
      {
        heading: 'La Guerra Civil española, en pocas palabras',
        paragraphs: [
          'En julio de 1936, un grupo de militares se sublevó contra el Gobierno elegido de la Segunda República. La guerra que siguió duró hasta abril de 1939.',
        ],
        items: [
          'Los republicanos eran una coalición de republicanos liberales, socialistas, comunistas, anarquistas y nacionalistas vascos y catalanes, a la que se unieron voluntarios extranjeros en las Brigadas Internacionales. La Unión Soviética y México les enviaron ayuda.',
          'Los nacionales eran el ejército sublevado, pronto dirigido por el general Francisco Franco, junto con la Falange (el partido fascista español), los monárquicos y gran parte de la derecha católica. La Italia fascista y la Alemania nazi les enviaron tropas, aviones y armas.',
          'Los dos bandos mataron a decenas de miles de civiles en su propia retaguardia. Las estimaciones del total de muertos varían; a menudo se da la cifra de unos 500.000.',
          'Ganaron los nacionales. Franco gobernó España como dictador hasta su muerte en 1975.',
        ],
      },
      {
        heading: 'De dónde vienen las cifras de muertos',
        paragraphs: [
          'Las cifras de los resultados cuentan a las personas muertas en todo el mundo a manos de regímenes comunistas y de regímenes fascistas y nazis, no a manos de los dos bandos en España.',
          'Para los regímenes comunistas, las estimaciones de los historiadores van de unos 21 millones (Benjamin Valentino, Final Solutions, 2005) a unos 100 millones (Stéphane Courtois y otros, El libro negro del comunismo, 1997). El sitio dice «más de 60 millones», una cifra dentro de ese intervalo.',
          'Para los regímenes fascistas y nazis, el sitio dice «más de 11 millones»: los 6 millones de judíos asesinados en el Holocausto y unos 5,9 millones de personas más asesinadas por la Alemania nazi y sus aliados, según el Museo Conmemorativo del Holocausto de Estados Unidos. No cuenta la Segunda Guerra Mundial en sí, que causó entre 70 y 85 millones de muertos.',
        ],
      },
      {
        heading: 'Las imágenes',
        paragraphs: [
          'Los carteles detrás de la pregunta y las fotos detrás de los resultados son imágenes históricas de Wikimedia Commons. La página de créditos de las imágenes, enlazada al pie de todas las páginas, indica de cada una su autor, su licencia y su origen.',
          'La hoz y el martillo y las fasces de los resultados se dibujaron para este sitio. El sitio no muestra emblemas nazis ni cuerpos de víctimas.',
        ],
      },
      {
        heading: 'Tu respuesta',
        paragraphs: [
          'Nada de lo que pulsas se envía a ninguna parte. No hay cuentas ni registros. La política de privacidad tiene los detalles.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: ['Escribe a {contact}.'],
      },
    ],
  },
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
