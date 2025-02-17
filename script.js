document.addEventListener("DOMContentLoaded", () => {
    // Variables globales
    let currentUser = "";
    let currentReading = "";
    let requiredCards = [];
    let selectedCards = [];
    let currentDeck = [];
    let lang = "es"; // Idioma por defecto
    let isDarkTheme = true; // Tema oscuro por defecto
  
    // Mazo de los 22 arcanos mayores
    const deck = [
      {
        name: { es: "El Loco", en: "The Fool", pt: "O Louco" },
        image: "img/arcanos/el_loco.jpg",
        meanings: {
          es: {
            amor: "Nuevos comienzos en el amor, aventura y libertad, pero cuidado con la inexperiencia.",
            trabajo: "Oportunidades inesperadas y arriesgarse a nuevos proyectos.",
            salud: "Energía renovada, aunque a veces inestabilidad.",
            espiritual: "Un viaje de autodescubrimiento y fe en lo desconocido.",
            general: "Inocencia y espontaneidad que abren nuevos caminos."
          },
          en: {
            love: "New beginnings in love, adventure and freedom, but beware of inexperience.",
            work: "Unexpected opportunities and taking risks in new projects.",
            health: "Renewed energy, though sometimes instability.",
            spiritual: "A journey of self-discovery and trust in the unknown.",
            general: "Innocence and spontaneity opening new paths."
          },
          pt: {
            amor: "Novos começos no amor, aventura e liberdade, mas cuidado com a inexperiência.",
            trabalho: "Oportunidades inesperadas e assumir riscos em novos projetos.",
            saúde: "Energia renovada, embora às vezes haja instabilidade.",
            espiritual: "Uma jornada de autoconhecimento e confiança no desconhecido.",
            general: "Inocência e espontaneidade que abrem novos caminhos."
          }
        }
      },
      {
        name: { es: "El Mago", en: "The Magician", pt: "O Mágico" },
        image: "img/arcanos/el_mago.jpg",
        meanings: {
          es: {
            amor: "Habilidad para conectar y manifestar deseos en el amor.",
            trabajo: "Recursos y creatividad para convertir ideas en realidad.",
            salud: "Buen estado, energía y control personal.",
            espiritual: "Conexión entre lo espiritual y lo material.",
            general: "Potencial y capacidad para transformar la realidad."
          },
          en: {
            love: "Ability to connect and manifest desires in love.",
            work: "Resources and creativity to turn ideas into reality.",
            health: "Good condition, energy, and personal control.",
            spiritual: "Connection between the spiritual and material realms.",
            general: "Potential and ability to transform reality."
          },
          pt: {
            amor: "Habilidade para conectar e manifestar desejos no amor.",
            trabalho: "Recursos e criatividade para transformar ideias em realidade.",
            saúde: "Boa condição, energia e controle pessoal.",
            espiritual: "Conexão entre o espiritual e o material.",
            general: "Potencial e capacidade de transformar a realidade."
          }
        }
      },
      {
        name: { es: "La Sacerdotisa", en: "The High Priestess", pt: "A Sacerdotisa" },
        image: "img/arcanos/la_sacerdotisa.jpg",
        meanings: {
          es: {
            amor: "Intuición y misterio en las relaciones.",
            trabajo: "Confía en tu intuición y observa lo que se oculta.",
            salud: "Atención a la salud mental y emocional.",
            espiritual: "Acceso a sabiduría interna y conocimientos profundos.",
            general: "Misterio y conocimiento oculto."
          },
          en: {
            love: "Intuition and mystery in relationships.",
            work: "Trust your intuition and observe the hidden.",
            health: "Focus on mental and emotional well-being.",
            spiritual: "Access to inner wisdom and deep knowledge.",
            general: "Mystery and hidden knowledge."
          },
          pt: {
            amor: "Intuição e mistério nos relacionamentos.",
            trabalho: "Confie na sua intuição e observe o que está oculto.",
            saúde: "Atenção à saúde mental e emocional.",
            espiritual: "Acesso à sabedoria interior e conhecimentos profundos.",
            general: "Mistério e conhecimento oculto."
          }
        }
      },
      {
        name: { es: "La Emperatriz", en: "The Empress", pt: "A Imperatriz" },
        image: "img/arcanos/la_emperatriz.jpg",
        meanings: {
          es: {
            amor: "Abundancia y amor incondicional.",
            trabajo: "Creatividad y prosperidad en proyectos.",
            salud: "Equilibrio y bienestar general.",
            espiritual: "Conexión con la naturaleza y la fertilidad.",
            general: "Fertilidad, creatividad y abundancia."
          },
          en: {
            love: "Abundance and unconditional love.",
            work: "Creativity and prosperity in projects.",
            health: "Balance and overall well-being.",
            spiritual: "Connection with nature and fertility.",
            general: "Fertility, creativity, and abundance."
          },
          pt: {
            amor: "Abundância e amor incondicional.",
            trabalho: "Criatividade e prosperidade em projetos.",
            saúde: "Equilíbrio e bem-estar geral.",
            espiritual: "Conexão com a natureza e a fertilidade.",
            general: "Fertilidade, criatividade e abundância."
          }
        }
      },
      {
        name: { es: "El Emperador", en: "The Emperor", pt: "O Imperador" },
        image: "img/arcanos/el_emperador.jpg",
        meanings: {
          es: {
            amor: "Estabilidad y seguridad en las relaciones.",
            trabajo: "Estructura, orden y liderazgo profesional.",
            salud: "Bienestar, aunque se debe evitar el exceso de estrés.",
            espiritual: "Control y autoridad interna.",
            general: "Autoridad y estabilidad en la vida."
          },
          en: {
            love: "Stability and security in relationships.",
            work: "Structure, order, and professional leadership.",
            health: "Well-being, but be cautious of stress.",
            spiritual: "Inner control and authority.",
            general: "Authority and stability in life."
          },
          pt: {
            amor: "Estabilidade e segurança nos relacionamentos.",
            trabalho: "Estrutura, ordem e liderança profissional.",
            saúde: "Bem-estar, mas evite o excesso de estresse.",
            espiritual: "Controle e autoridade interior.",
            general: "Autoridade e estabilidade na vida."
          }
        }
      },
      {
        name: { es: "El Hierofante", en: "The Hierophant", pt: "O Hierofante" },
        image: "img/arcanos/el_hierofante.jpg",
        meanings: {
          es: {
            amor: "Relaciones basadas en tradición y valores compartidos.",
            trabajo: "Conformidad y orientación en el entorno profesional.",
            salud: "Estabilidad a través de rutinas tradicionales.",
            espiritual: "Búsqueda de sabiduría y conexión con lo sagrado.",
            general: "Tradición y enseñanza espiritual."
          },
          en: {
            love: "Relationships based on tradition and shared values.",
            work: "Conformity and guidance in the professional environment.",
            health: "Stability through traditional routines.",
            spiritual: "A quest for wisdom and connection with the sacred.",
            general: "Tradition and spiritual guidance."
          },
          pt: {
            amor: "Relacionamentos baseados na tradição e valores compartilhados.",
            trabalho: "Conformidade e orientação no ambiente profissional.",
            saúde: "Estabilidade através de rotinas tradicionais.",
            espiritual: "Busca por sabedoria e conexão com o sagrado.",
            general: "Tradição e orientação espiritual."
          }
        }
      },
      {
        name: { es: "Los Enamorados", en: "The Lovers", pt: "Os Amantes" },
        image: "img/arcanos/los_enamorados.jpg",
        meanings: {
          es: {
            amor: "Decisiones importantes y unión emocional.",
            trabajo: "Asociaciones y colaboraciones basadas en compromiso.",
            salud: "Armonía emocional y bienestar.",
            espiritual: "Integración de opuestos y conexión profunda.",
            general: "Amor, unión y elecciones trascendentales."
          },
          en: {
            love: "Important decisions and emotional union.",
            work: "Partnerships and collaborations based on commitment.",
            health: "Emotional harmony and well-being.",
            spiritual: "Integration of opposites and deep connection.",
            general: "Love, union, and transcendent choices."
          },
          pt: {
            amor: "Decisões importantes e união emocional.",
            trabalho: "Parcerias e colaborações baseadas no compromisso.",
            saúde: "Harmonia emocional e bem-estar.",
            espiritual: "Integração de opostos e conexão profunda.",
            general: "Amor, união e escolhas transcendentais."
          }
        }
      },
      {
        name: { es: "El Carro", en: "The Chariot", pt: "O Carro" },
        image: "img/arcanos/el_carro.jpg",
        meanings: {
          es: {
            amor: "Victoria y avance en las relaciones.",
            trabajo: "Determinación y capacidad para superar obstáculos.",
            salud: "Energía y vigor para enfrentar retos.",
            espiritual: "Control y dirección hacia metas superiores.",
            general: "Triunfo y disciplina en la vida."
          },
          en: {
            love: "Victory and progress in relationships.",
            work: "Determination and ability to overcome obstacles.",
            health: "Energy and vigor to face challenges.",
            spiritual: "Control and direction towards higher goals.",
            general: "Triumph and discipline in life."
          },
          pt: {
            amor: "Vitória e progresso nos relacionamentos.",
            trabalho: "Determinação e capacidade para superar obstáculos.",
            saúde: "Energia e vigor para enfrentar desafios.",
            espiritual: "Controle e direção para metas superiores.",
            general: "Triunfo e disciplina na vida."
          }
        }
      },
      {
        name: { es: "La Fuerza", en: "Strength", pt: "A Força" },
        image: "img/arcanos/la_fuerza.jpg",
        meanings: {
          es: {
            amor: "Amor compasivo y la habilidad de superar conflictos con ternura.",
            trabajo: "Resiliencia y coraje ante desafíos laborales.",
            salud: "Equilibrio físico y emocional.",
            espiritual: "Fortaleza interior y dominio personal.",
            general: "Coraje, compasión y control de las pasiones."
          },
          en: {
            love: "Compassionate love and the ability to overcome conflicts gently.",
            work: "Resilience and courage in the face of work challenges.",
            health: "Physical and emotional balance.",
            spiritual: "Inner strength and personal mastery.",
            general: "Courage, compassion, and mastery over passions."
          },
          pt: {
            amor: "Amor compassivo e a habilidade de superar conflitos com ternura.",
            trabalho: "Resiliência e coragem diante dos desafios profissionais.",
            saúde: "Equilíbrio físico e emocional.",
            espiritual: "Força interior e domínio pessoal.",
            general: "Coragem, compaixão e controle das paixões."
          }
        }
      },
      {
        name: { es: "El Ermitaño", en: "The Hermit", pt: "O Eremita" },
        image: "img/arcanos/el_ermitano.jpg",
        meanings: {
          es: {
            amor: "Búsqueda interior y reflexión en el amor.",
            trabajo: "Momento para la introspección y el trabajo en solitario.",
            salud: "Necesidad de descanso y cuidado mental.",
            espiritual: "Camino de sabiduría a través de la soledad.",
            general: "Introspección y búsqueda de la verdad."
          },
          en: {
            love: "Inner search and reflection in love.",
            work: "A time for introspection and solitary work.",
            health: "The need for rest and mental care.",
            spiritual: "A path of wisdom through solitude.",
            general: "Introspection and the search for truth."
          },
          pt: {
            amor: "Busca interior e reflexão no amor.",
            trabalho: "Momento para introspecção e trabalho solitário.",
            saúde: "Necessidade de descanso e cuidado mental.",
            espiritual: "Caminho de sabedoria através da solidão.",
            general: "Introspecção e busca pela verdade."
          }
        }
      },
      {
        name: { es: "La Rueda de la Fortuna", en: "Wheel of Fortune", pt: "A Roda da Fortuna" },
        image: "img/arcanos/la_rueda_de_la_fortuna.jpg",
        meanings: {
          es: {
            amor: "Ciclos de cambio y destino en las relaciones.",
            trabajo: "Altibajos y giros inesperados en la carrera profesional.",
            salud: "Fluctuaciones en el bienestar físico.",
            espiritual: "El destino se renueva en ciclos continuos.",
            general: "Cambio, destino y la naturaleza cíclica de la vida."
          },
          en: {
            love: "Cycles of change and destiny in relationships.",
            work: "Ups and downs and unexpected turns in career.",
            health: "Fluctuations in physical well-being.",
            spiritual: "Destiny renews itself in continuous cycles.",
            general: "Change, destiny, and the cyclical nature of life."
          },
          pt: {
            amor: "Ciclos de mudança e destino nos relacionamentos.",
            trabalho: "Altos e baixos e reviravoltas inesperadas na carreira.",
            saúde: "Flutuações no bem-estar físico.",
            espiritual: "O destino se renova em ciclos contínuos.",
            general: "Mudança, destino e a natureza cíclica da vida."
          }
        }
      },
      {
        name: { es: "La Justicia", en: "Justice", pt: "A Justiça" },
        image: "img/arcanos/la_justicia.jpg",
        meanings: {
          es: {
            amor: "Equilibrio y equidad en las relaciones.",
            trabajo: "Decisiones éticas y balance en el entorno laboral.",
            salud: "Moderación y cuidado de la salud.",
            espiritual: "Búsqueda de verdad y justicia interior.",
            general: "Equidad, balance y verdad."
          },
          en: {
            love: "Balance and fairness in relationships.",
            work: "Ethical decisions and balance in the professional sphere.",
            health: "Moderation and attention to health.",
            spiritual: "A quest for inner truth and justice.",
            general: "Equity, balance, and truth."
          },
          pt: {
            amor: "Equilíbrio e justiça nos relacionamentos.",
            trabalho: "Decisões éticas e equilíbrio no ambiente de trabalho.",
            saúde: "Moderação e cuidado com a saúde.",
            espiritual: "Busca pela verdade e justiça interior.",
            general: "Equidade, equilíbrio e verdade."
          }
        }
      },
      {
        name: { es: "El Colgado", en: "The Hanged Man", pt: "O Enforcado" },
        image: "img/arcanos/el_colgado.jpg",
        meanings: {
          es: {
            amor: "Una nueva perspectiva en el amor.",
            trabajo: "Pausa para reevaluar proyectos y metas.",
            salud: "Tiempo para recuperación y reflexión.",
            espiritual: "Sacrificio y cambio de perspectiva espiritual.",
            general: "Reevaluación y dejar ir lo que ya no sirve."
          },
          en: {
            love: "A new perspective in love.",
            work: "A pause to reevaluate projects and goals.",
            health: "Time for recovery and reflection.",
            spiritual: "Sacrifice and a shift in spiritual perspective.",
            general: "Reevaluation and letting go of what no longer serves."
          },
          pt: {
            amor: "Uma nova perspectiva no amor.",
            trabalho: "Uma pausa para reavaliar projetos e metas.",
            saúde: "Tempo para recuperação e reflexão.",
            espiritual: "Sacrifício e mudança de perspectiva espiritual.",
            general: "Reavaliação e deixar ir o que não serve mais."
          }
        }
      },
      {
        name: { es: "La Muerte", en: "Death", pt: "A Morte" },
        image: "img/arcanos/la_muerte.jpg",
        meanings: {
          es: {
            amor: "Fin de ciclos y transformación en las relaciones.",
            trabajo: "Cambios radicales que abren nuevas oportunidades.",
            salud: "Renovación de hábitos para mejorar el bienestar.",
            espiritual: "Renacimiento y transformación profunda.",
            general: "Cambio, finalización y nuevo comienzo."
          },
          en: {
            love: "The end of cycles and transformation in relationships.",
            work: "Radical changes opening new opportunities.",
            health: "Renewal of habits for improved well-being.",
            spiritual: "Rebirth and profound transformation.",
            general: "Change, ending, and new beginnings."
          },
          pt: {
            amor: "Fim de ciclos e transformação nos relacionamentos.",
            trabalho: "Mudanças radicais que abrem novas oportunidades.",
            saúde: "Renovação de hábitos para melhorar o bem-estar.",
            espiritual: "Renascimento e transformação profunda.",
            general: "Mudança, finalização e novo começo."
          }
        }
      },
      {
        name: { es: "La Templanza", en: "Temperance", pt: "A Temperança" },
        image: "img/arcanos/la_templanza.jpg",
        meanings: {
          es: {
            amor: "Equilibrio y armonía en las relaciones.",
            trabajo: "Integración de ideas con paciencia y moderación.",
            salud: "Estabilidad y bienestar a través del equilibrio.",
            espiritual: "Fusión de lo espiritual y lo material en perfecta armonía.",
            general: "Moderación, armonía y balance."
          },
          en: {
            love: "Balance and harmony in relationships.",
            work: "Integration of ideas with patience and moderation.",
            health: "Stability and well-being through balance.",
            spiritual: "A blending of the spiritual and the material in perfect harmony.",
            general: "Moderation, harmony, and balance."
          },
          pt: {
            amor: "Equilíbrio e harmonia nos relacionamentos.",
            trabalho: "Integração de ideias com paciência e moderação.",
            saúde: "Estabilidade e bem-estar através do equilíbrio.",
            espiritual: "Fusão do espiritual e do material em perfeita harmonia.",
            general: "Moderação, harmonia e equilíbrio."
          }
        }
      },
      {
        name: { es: "El Diablo", en: "The Devil", pt: "O Diabo" },
        image: "img/arcanos/el_diablo.jpg",
        meanings: {
          es: {
            amor: "Pasión intensa, pero con riesgos de dependencia y toxicidad.",
            trabajo: "Situaciones restrictivas y apegos en el ámbito laboral.",
            salud: "Excesos que pueden comprometer el bienestar físico y emocional.",
            espiritual: "Enfrenta tus sombras para liberarte de ataduras.",
            general: "Tentación, ataduras y confrontación con lo oscuro."
          },
          en: {
            love: "Intense passion, but with risks of dependency and toxicity.",
            work: "Restrictive situations and attachments in the workplace.",
            health: "Excesses that may compromise physical and emotional well-being.",
            spiritual: "Confront your inner shadows to free yourself from bonds.",
            general: "Temptation, bondage, and facing the darkness."
          },
          pt: {
            amor: "Paixão intensa, mas com riscos de dependência e toxicidade.",
            trabalho: "Situações restritivas e apegos no ambiente de trabalho.",
            saúde: "Excessos que podem comprometer o bem-estar físico e emocional.",
            espiritual: "Enfrente suas sombras para se libertar das amarras.",
            general: "Tentação, amarras e confronto com o lado sombrio."
          }
        }
      },
      {
        name: { es: "La Torre", en: "The Tower", pt: "A Torre" },
        image: "img/arcanos/la_torre.jpg",
        meanings: {
          es: {
            amor: "Cambios drásticos que pueden desestabilizar relaciones.",
            trabajo: "Crisis que rompen estructuras establecidas.",
            salud: "Eventos imprevistos que requieren precaución.",
            espiritual: "Ruptura de creencias para dar paso a una nueva verdad.",
            general: "Crisis, destrucción y oportunidad para reconstruir."
          },
          en: {
            love: "Dramatic changes that may destabilize relationships.",
            work: "Crises that shatter established structures.",
            health: "Unexpected events requiring caution.",
            spiritual: "Breaking down old beliefs to usher in new truth.",
            general: "Crisis, destruction, and opportunity to rebuild."
          },
          pt: {
            amor: "Mudanças drásticas que podem desestabilizar relacionamentos.",
            trabalho: "Crises que rompem estruturas estabelecidas.",
            saúde: "Eventos imprevistos que exigem cautela.",
            espiritual: "Rompimento de crenças antigas para dar lugar a uma nova verdade.",
            general: "Crise, destruição e oportunidade de reconstruir."
          }
        }
      },
      {
        name: { es: "La Estrella", en: "The Star", pt: "A Estrela" },
        image: "img/arcanos/la_estrella.jpg",
        meanings: {
          es: {
            amor: "Esperanza y renovación en el amor.",
            trabajo: "Inspiración y claridad en tus proyectos.",
            salud: "Recuperación y bienestar general.",
            espiritual: "Renovación de la fe y conexión intuitiva.",
            general: "Esperanza, inspiración y luz en la oscuridad."
          },
          en: {
            love: "Hope and renewal in love.",
            work: "Inspiration and clarity in your projects.",
            health: "Recovery and overall well-being.",
            spiritual: "Renewal of faith and intuitive connection.",
            general: "Hope, inspiration, and light in the darkness."
          },
          pt: {
            amor: "Esperança e renovação no amor.",
            trabalho: "Inspiração e clareza em seus projetos.",
            saúde: "Recuperação e bem-estar geral.",
            espiritual: "Renovação da fé e conexão intuitiva.",
            general: "Esperança, inspiração e luz na escuridão."
          }
        }
      },
      {
        name: { es: "La Luna", en: "The Moon", pt: "A Lua" },
        image: "img/arcanos/la_luna.jpg",
        meanings: {
          es: {
            amor: "Misterio y confusión en el amor, cuidado con las ilusiones.",
            trabajo: "Inseguridad y falta de claridad en el trabajo.",
            salud: "Altibajos emocionales que afectan lo físico.",
            espiritual: "Exploración del inconsciente y la intuición.",
            general: "Incertidumbre y la influencia del subconsciente."
          },
          en: {
            love: "Mystery and confusion in love, beware of illusions.",
            work: "Insecurity and lack of clarity at work.",
            health: "Emotional ups and downs affecting the physical.",
            spiritual: "Exploration of the unconscious and intuition.",
            general: "Uncertainty and the influence of the subconscious."
          },
          pt: {
            amor: "Mistério e confusão no amor, cuidado com ilusões.",
            trabalho: "Insegurança e falta de clareza no trabalho.",
            saúde: "Altos e baixos emocionais que afetam o físico.",
            espiritual: "Exploração do inconsciente e da intuição.",
            general: "Incerteza e a influência do subconsciente."
          }
        }
      },
      {
        name: { es: "El Sol", en: "The Sun", pt: "O Sol" },
        image: "img/arcanos/el_sol.jpg",
        meanings: {
          es: {
            amor: "Felicidad y armonía en las relaciones.",
            trabajo: "Éxito y claridad en tus proyectos.",
            salud: "Buena salud y energía positiva.",
            espiritual: "Iluminación y claridad interior.",
            general: "Alegría, vitalidad y éxito."
          },
          en: {
            love: "Happiness and harmony in relationships.",
            work: "Success and clarity in your projects.",
            health: "Good health and positive energy.",
            spiritual: "Illumination and inner clarity.",
            general: "Joy, vitality, and success."
          },
          pt: {
            amor: "Felicidade e harmonia nos relacionamentos.",
            trabalho: "Sucesso e clareza em seus projetos.",
            saúde: "Boa saúde e energia positiva.",
            espiritual: "Iluminação e clareza interior.",
            general: "Alegria, vitalidade e sucesso."
          }
        }
      },
      {
        name: { es: "El Juicio", en: "Judgement", pt: "O Julgamento" },
        image: "img/arcanos/el_juicio.jpg",
        meanings: {
          es: {
            amor: "Renovación y segundas oportunidades en el amor.",
            trabajo: "Revisión y redención en el ámbito profesional.",
            salud: "Evaluación para mejorar hábitos y bienestar.",
            espiritual: "Llamado a la introspección y renacimiento espiritual.",
            general: "Renacimiento, evaluación y transformación final."
          },
          en: {
            love: "Renewal and second chances in love.",
            work: "Review and redemption in the professional realm.",
            health: "Assessment to improve habits and well-being.",
            spiritual: "A call for introspection and spiritual rebirth.",
            general: "Rebirth, evaluation, and final transformation."
          },
          pt: {
            amor: "Renovação e segundas chances no amor.",
            trabalho: "Revisão e redenção no ambiente profissional.",
            saúde: "Avaliação para melhorar hábitos e bem-estar.",
            espiritual: "Chamada para introspecção e renascimento espiritual.",
            general: "Renascimento, avaliação e transformação final."
          }
        }
      },
      {
        name: { es: "El Mundo", en: "The World", pt: "O Mundo" },
        image: "img/arcanos/el_mundo.jpg",
        meanings: {
          es: {
            amor: "Plenitud y realización en las relaciones.",
            trabajo: "Culminación y reconocimiento profesional.",
            salud: "Equilibrio integral y bienestar.",
            espiritual: "Conexión con el universo y armonía espiritual.",
            general: "Integración, culminación y realización plena."
          },
          en: {
            love: "Fulfillment and realization in relationships.",
            work: "Culmination and professional recognition.",
            health: "Holistic balance and well-being.",
            spiritual: "Connection with the universe and spiritual harmony.",
            general: "Integration, culmination, and complete fulfillment."
          },
          pt: {
            amor: "Plenitude e realização nos relacionamentos.",
            trabalho: "Culminação e reconhecimento profissional.",
            saúde: "Equilíbrio integral e bem-estar.",
            espiritual: "Conexão com o universo e harmonia espiritual.",
            general: "Integração, culminação e realização plena."
          }
        }
      }
    ];
  
    // Diccionario de traducciones para la interfaz
    const translations = {
      es: {
        welcomeTitle: "Bienvenido a Tarot App",
        welcomeMessage: "Este servicio es solo orientativo. La información mostrada no sustituye un asesoramiento profesional.",
        namePlaceholder: "Ingresa tu nombre",
        enterButton: "Entrar",
        menuGreeting: "Hola, ",
        menuPrompt: "Elige el tipo de tirada:",
        ptpfButton: "Tirada Pasado, Presente y Futuro",
        cruzButton: "Tirada de Cruz Celta",
        historyButton: "Historial de tiradas",
        readingTitle_ptpf: "Tirada: Pasado, Presente y Futuro",
        readingTitle_cruz: "Tirada: Cruz Celta",
        backToMenu: "Volver al menú",
        newReading: "Volver a Tirar",
        finalConclusion: "Conclusión Final",
        noHistory: "No hay tiradas guardadas.",
        musicPause: "Pausar Música",
        musicPlay: "Reanudar Música",
        themeToggle_dark: "Modo Claro",
        themeToggle_light: "Modo Oscuro",
        exitApp: "Salir",
        positions: {
          ptpf: ["Pasado", "Presente", "Futuro"],
          cruz: [
            "Situación Actual",
            "Desafío",
            "Base",
            "Pasado Reciente",
            "Metas/Aspiraciones",
            "Futuro Cercano",
            "Actitud del Consultante",
            "Influencias Externas",
            "Esperanzas y Miedos",
            "Resultado Final"
          ]
        },
        labels: {
          amor: "Amor",
          trabajo: "Trabajo",
          salud: "Salud",
          espiritual: "Espiritual",
          general: "General"
        }
      },
      en: {
        welcomeTitle: "Welcome to Tarot App",
        welcomeMessage: "This service is for guidance only. The information provided does not replace professional advice.",
        namePlaceholder: "Enter your name",
        enterButton: "Enter",
        menuGreeting: "Hello, ",
        menuPrompt: "Choose the reading type:",
        ptpfButton: "Past, Present, Future Reading",
        cruzButton: "Celtic Cross Reading",
        historyButton: "Reading History",
        readingTitle_ptpf: "Reading: Past, Present, Future",
        readingTitle_cruz: "Reading: Celtic Cross",
        backToMenu: "Back to Menu",
        newReading: "New Reading",
        finalConclusion: "Final Conclusion",
        noHistory: "No readings saved.",
        musicPause: "Pause Music",
        musicPlay: "Resume Music",
        themeToggle_dark: "Light Mode",
        themeToggle_light: "Dark Mode",
        exitApp: "Exit",
        positions: {
          ptpf: ["Past", "Present", "Future"],
          cruz: [
            "Current Situation",
            "Challenge",
            "Foundation",
            "Recent Past",
            "Goals/Aspirations",
            "Near Future",
            "Querent's Attitude",
            "External Influences",
            "Hopes and Fears",
            "Final Outcome"
          ]
        },
        labels: {
          love: "Love",
          work: "Work",
          health: "Health",
          spiritual: "Spiritual",
          general: "General"
        }
      },
      pt: {
        welcomeTitle: "Bem-vindo ao Tarot App",
        welcomeMessage: "Este serviço é apenas para orientação. As informações fornecidas não substituem um aconselhamento profissional.",
        namePlaceholder: "Digite seu nome",
        enterButton: "Entrar",
        menuGreeting: "Olá, ",
        menuPrompt: "Escolha o tipo de leitura:",
        ptpfButton: "Leitura: Passado, Presente e Futuro",
        cruzButton: "Leitura: Cruz Celta",
        historyButton: "Histórico de leituras",
        readingTitle_ptpf: "Leitura: Passado, Presente e Futuro",
        readingTitle_cruz: "Leitura: Cruz Celta",
        backToMenu: "Voltar ao menu",
        newReading: "Nova Leitura",
        finalConclusion: "Conclusão Final",
        noHistory: "Nenhuma leitura salva.",
        musicPause: "Pausar Música",
        musicPlay: "Retomar Música",
        themeToggle_dark: "Modo Claro",
        themeToggle_light: "Modo Escuro",
        exitApp: "Sair",
        positions: {
          ptpf: ["Passado", "Presente", "Futuro"],
          cruz: [
            "Situação Atual",
            "Desafio",
            "Base",
            "Passado Recente",
            "Metas/Aspirações",
            "Futuro Próximo",
            "Atitude do Consultante",
            "Influências Externas",
            "Esperanças e Medos",
            "Resultado Final"
          ]
        },
        labels: {
          amor: "Amor",
          trabalho: "Trabalho",
          saúde: "Saúde",
          espiritual: "Espiritual",
          general: "Geral"
        }
      }
    };
  
    // Función para aplicar las traducciones a la UI
    function applyTranslations() {
      const t = translations[lang];
      document.getElementById("welcome-title").textContent = t.welcomeTitle;
      document.getElementById("welcome-message").textContent = t.welcomeMessage;
      document.getElementById("username").placeholder = t.namePlaceholder;
      document.getElementById("enter-button").textContent = t.enterButton;
      document.getElementById("menu-greeting").childNodes[0].textContent = t.menuGreeting;
      document.getElementById("menu-prompt").textContent = t.menuPrompt;
      document.getElementById("btn-ptpf").textContent = t.ptpfButton;
      document.getElementById("btn-cruz").textContent = t.cruzButton;
      document.getElementById("btn-history").textContent = t.historyButton;
      document.getElementById("btn-back-menu").textContent = t.backToMenu;
      document.getElementById("btn-new-reading").textContent = t.newReading;
      document.getElementById("exit-app").textContent = t.exitApp;
      document.getElementById("history-title").textContent = t.historyButton;
      const themeBtn = document.getElementById("btn-theme-toggle");
      themeBtn.textContent = isDarkTheme ? t.themeToggle_dark : t.themeToggle_light;
      const musicBtn = document.getElementById("btn-music-toggle");
      musicBtn.textContent = ambientMusic.paused ? t.musicPlay : t.musicPause;
    }
  
    // Referencias a elementos globales
    const welcomeForm = document.getElementById("welcome-form");
    const usernameInput = document.getElementById("username");
    const displayUsername = document.getElementById("display-username");
    const cardsContainer = document.getElementById("cards-container");
    const resultPanel = document.getElementById("result-panel");
    const readingTitle = document.getElementById("reading-title");
    const ambientMusic = document.getElementById("ambient-music");
    const btnMusicToggle = document.getElementById("btn-music-toggle");
    const btnThemeToggle = document.getElementById("btn-theme-toggle");
    const languageSelect = document.getElementById("language-select");
    const exitAppBtn = document.getElementById("exit-app");
  
    applyTranslations();
  
    languageSelect.addEventListener("change", (e) => {
      lang = e.target.value;
      applyTranslations();
    });
  
    // Función para mostrar una pantalla
    function showScreen(screenId) {
      document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("active");
      });
      document.getElementById(screenId).classList.add("active");
    }
  
    // Evento en la pantalla de bienvenida
    welcomeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      currentUser = usernameInput.value.trim();
      if (currentUser !== "") {
        displayUsername.textContent = currentUser;
        showScreen("menu-screen");
        ambientMusic.play();
      }
    });
  
    // Botón de salir: volver a la pantalla de bienvenida y detener la música
    exitAppBtn.addEventListener("click", () => {
      showScreen("welcome-screen");
      ambientMusic.pause();
      ambientMusic.currentTime = 0;
    });
  
    // Eventos del menú
    document.getElementById("btn-ptpf").addEventListener("click", () => {
      currentReading = "ptpf";
      startReading();
    });
    document.getElementById("btn-cruz").addEventListener("click", () => {
      currentReading = "cruz";
      startReading();
    });
    document.getElementById("btn-history").addEventListener("click", () => {
      showHistory();
      showScreen("history-screen");
    });
    document.getElementById("btn-back-menu").addEventListener("click", () => {
      showScreen("menu-screen");
    });
    document.getElementById("btn-back-menu-history").addEventListener("click", () => {
      showScreen("menu-screen");
    });
    document.getElementById("btn-new-reading").addEventListener("click", () => {
      startReading();
    });
  
    // Control de la música ambiental
    btnMusicToggle.addEventListener("click", () => {
      if (ambientMusic.paused) {
        ambientMusic.play();
        btnMusicToggle.textContent = translations[lang].musicPause;
      } else {
        ambientMusic.pause();
        btnMusicToggle.textContent = translations[lang].musicPlay;
      }
    });
  
    // Control del tema
    btnThemeToggle.addEventListener("click", () => {
      isDarkTheme = !isDarkTheme;
      if (isDarkTheme) {
        document.body.classList.remove("light-theme");
      } else {
        document.body.classList.add("light-theme");
      }
      applyTranslations();
    });
  
    // Función para iniciar la tirada
    function startReading() {
      showScreen("reading-screen");
      resultPanel.innerHTML = "";
      cardsContainer.innerHTML = "";
      selectedCards = [];
      currentDeck = shuffleArray([...deck]);
      const t = translations[lang];
      if (currentReading === "ptpf") {
        readingTitle.textContent = t.readingTitle_ptpf;
        requiredCards = t.positions.ptpf.slice();
      } else if (currentReading === "cruz") {
        readingTitle.textContent = t.readingTitle_cruz;
        requiredCards = t.positions.cruz.slice();
      }
      // Crear placeholders para las cartas
      requiredCards.forEach((position, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.dataset.position = position;
        cardDiv.innerHTML = `
          <div class="card-inner">
            <div class="card-front" data-index="${index}"></div>
            <div class="card-back"><span>${position}</span></div>
          </div>
        `;
        cardDiv.addEventListener("click", () => {
          flipCard(cardDiv, index);
        });
        cardsContainer.appendChild(cardDiv);
      });
    }
  
    // Función para voltear una carta y asignar un arcano
    function flipCard(cardElement, index) {
      if (cardElement.classList.contains("flipped")) return;
      const cardData = currentDeck.shift();
      selectedCards.push({ position: requiredCards[index], card: cardData });
      const cardFront = cardElement.querySelector(".card-front");
      cardFront.style.backgroundImage = `url('${cardData.image}')`;
      cardElement.classList.add("flipped");
  
      // Mostrar detalles de la carta
      displayCardDetails(cardData, requiredCards[index]);
  
      if (selectedCards.length === requiredCards.length) {
        setTimeout(() => {
          displayFinalConclusion();
          saveReading();
        }, 800);
      }
    }
  
    // Función para mostrar los detalles de la carta en el panel de resultados
    function displayCardDetails(cardData, position) {
      const tLabels = translations[lang].labels;
      // Definir las claves para "trabajo" y "salud" según el idioma
      let workKey, healthKey;
      if (lang === "pt") {
        workKey = "trabalho";
        healthKey = "saúde";
      } else if (lang === "es") {
        workKey = "trabajo";
        healthKey = "salud";
      } else {
        workKey = "work";
        healthKey = "health";
      }
      const cardInfoDiv = document.createElement("div");
      cardInfoDiv.classList.add("card-info");
      const cardName = cardData.name[lang];
      const meanings = cardData.meanings[lang];
      cardInfoDiv.innerHTML = `
        <h3>${position} - ${cardName}</h3>
        <p><strong>${tLabels.amor}: </strong>${meanings.amor}</p>
        <p><strong>${(lang === "pt") ? tLabels.trabalho : tLabels.trabajo}: </strong>${meanings[workKey]}</p>
        <p><strong>${(lang === "pt") ? tLabels["saúde"] : tLabels.salud}: </strong>${meanings[healthKey]}</p>
        <p><strong>${tLabels.espiritual}: </strong>${meanings.espiritual}</p>
        <p><strong>${tLabels.general}: </strong>${meanings.general}</p>
      `;
      resultPanel.appendChild(cardInfoDiv);
    }
  
    // Función para mostrar la conclusión final
    function displayFinalConclusion() {
      const conclusionDiv = document.createElement("div");
      conclusionDiv.classList.add("final-conclusion");
      const conclusionText = generateConclusion();
      conclusionDiv.innerHTML = `
        <h3>${translations[lang].finalConclusion}</h3>
        <p>${conclusionText}</p>
      `;
      resultPanel.appendChild(conclusionDiv);
    }
  
    // Función para generar una interpretación única en tiempo real
    function generateConclusion() {
      const t = translations[lang];
      if (currentReading === "ptpf") {
        let past = selectedCards[0].card.name[lang];
        let present = selectedCards[1].card.name[lang];
        let future = selectedCards[2].card.name[lang];
        if (lang === "es") {
          return `La energía de "${past}" en tu pasado marcó el inicio de un viaje lleno de aprendizajes; ahora, con "${present}", enfrentas desafíos que te invitan a transformar tu realidad. Con la presencia de "${future}", el futuro se perfila como una etapa de renacimiento y oportunidades únicas, donde cada experiencia te acerca a tu verdadera esencia.`;
        } else if (lang === "en") {
          return `The influence of "${past}" in your past set you on a journey full of lessons; now, with "${present}", you face challenges that urge you to transform your reality. With "${future}" on the horizon, your future appears as a stage of rebirth and unique opportunities, drawing you closer to your true essence.`;
        } else if (lang === "pt") {
          return `A influência de "${past}" no seu passado iniciou uma jornada repleta de aprendizados; agora, com "${present}", você enfrenta desafios que o impulsionam a transformar sua realidade. Com "${future}" se aproximando, o futuro se apresenta como uma etapa de renascimento e oportunidades únicas, aproximando-o da sua verdadeira essência.`;
        }
      } else if (currentReading === "cruz") {
        if (lang === "es") {
          return `Tu Cruz Celta teje un relato complejo: "${selectedCards[0].card.name[lang]}" describe tu situación actual, mientras que "${selectedCards[1].card.name[lang]}" expone el desafío que enfrentas. Las cartas centrales, como "${selectedCards[2].card.name[lang]}" y "${selectedCards[3].card.name[lang]}", profundizan en las raíces de tus emociones, y la interacción final entre "${selectedCards[8].card.name[lang]}" y "${selectedCards[9].card.name[lang]}" indica que, al integrar tus miedos y aspiraciones, se abre un camino hacia una transformación profunda y única.`;
        } else if (lang === "en") {
          return `Your Celtic Cross weaves a complex narrative: "${selectedCards[0].card.name[lang]}" reflects your current situation, while "${selectedCards[1].card.name[lang]}" highlights the challenge you face. The central cards, such as "${selectedCards[2].card.name[lang]}" and "${selectedCards[3].card.name[lang]}", delve into the roots of your emotions, and the final interplay between "${selectedCards[8].card.name[lang]}" and "${selectedCards[9].card.name[lang]}" suggests that by integrating your fears and aspirations, a path opens toward profound and unique transformation.`;
        } else if (lang === "pt") {
          return `Sua Cruz Celta tece uma narrativa complexa: "${selectedCards[0].card.name[lang]}" reflete sua situação atual, enquanto "${selectedCards[1].card.name[lang]}" destaca o desafio que você enfrenta. As cartas centrais, como "${selectedCards[2].card.name[lang]}" e "${selectedCards[3].card.name[lang]}", aprofundam as raízes das suas emoções, e a interação final entre "${selectedCards[8].card.name[lang]}" e "${selectedCards[9].card.name[lang]}" indica que, ao integrar seus medos e aspirações, um caminho se abre para uma transformação profunda e única.`;
        }
      }
      return "";
    }
  
    // Función para guardar la tirada en localStorage
    function saveReading() {
      const history = JSON.parse(localStorage.getItem("tarotHistory")) || [];
      const readingRecord = {
        user: currentUser,
        type: currentReading === "ptpf" ? translations[lang].ptpfButton : translations[lang].cruzButton,
        date: new Date().toLocaleString(),
        cards: selectedCards
      };
      history.push(readingRecord);
      localStorage.setItem("tarotHistory", JSON.stringify(history));
    }
  
    // Función para mostrar el historial
    function showHistory() {
      const historyContainer = document.getElementById("history-list");
      historyContainer.innerHTML = "";
      const history = JSON.parse(localStorage.getItem("tarotHistory")) || [];
      if (history.length === 0) {
        historyContainer.innerHTML = `<div class="history-item"><p>${translations[lang].noHistory}</p></div>`;
      } else {
        history.forEach((record, index) => {
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("history-item");
          let recordHTML = `<strong>${record.date}</strong> - ${record.user} - ${record.type}<br>`;
          record.cards.forEach(item => {
            recordHTML += `<em>${item.position}:</em> ${item.card.name[lang]}<br>`;
          });
          itemDiv.innerHTML = recordHTML;
          const delBtn = document.createElement("button");
          delBtn.classList.add("delete-btn");
          delBtn.textContent = "X";
          delBtn.addEventListener("click", () => {
            deleteHistoryRecord(index);
          });
          itemDiv.appendChild(delBtn);
          historyContainer.appendChild(itemDiv);
        });
      }
    }
  
    // Función para borrar un registro del historial
    function deleteHistoryRecord(index) {
      let history = JSON.parse(localStorage.getItem("tarotHistory")) || [];
      history.splice(index, 1);
      localStorage.setItem("tarotHistory", JSON.stringify(history));
      showHistory();
    }
  
    // Función de utilidad para mezclar un arreglo (Fisher-Yates)
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Función para crear enlaces de redes sociales en la pantalla de bienvenida
    function createSocialLinks() {
      const container = document.getElementById("social-links");
      container.innerHTML = `
        <a href="https://instagram.com/tu_perfil" target="_blank" class="social-btn instagram">
          <img src="img/instagram.png" alt="Instagram" /> Instagram
        </a>
        <a href="https://cafecito.app/tu_perfil" target="_blank" class="social-btn cafecito">
          <img src="img/cafecito.png" alt="Cafecito" /> Cafecito
        </a>
      `;
    }
  
    createSocialLinks();
  });
  