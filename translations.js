
const translations = {
    en: {
      title: 'F1 Calendar',
      race: 'Race',
      location: 'Location',
      date: 'Date',
      localTimes: 'Local Times',
      Australia: 'Australia',
      'United States': 'United States',
      'United Kingdom': 'United Kingdom',
      'Saudi Arabia': 'Saudi Arabia'
    },
    es: {
      title: 'Calendario F1',
      race: 'Carrera',
      location: 'Ubicación',
      date: 'Fecha',
      localTimes: 'Horas locales',
      Australia: 'Australia',
      'United States': 'Estados Unidos',
      'United Kingdom': 'Reino Unido',
      'Saudi Arabia': 'Arabia Saudita'
    },
    fr: {
      title: 'Calendrier F1',
      race: 'Course',
      location: 'Lieu',
      date: 'Date',
      localTimes: 'Heures locales',
      Australia: 'Australie',
      'United States': 'États-Unis',
      'United Kingdom': 'Royaume-Uni',
      'Saudi Arabia': 'Arabie Saoudite'
    }
  };
  
  function getTranslations(language) {
    return translations[language] || translations.en;
  }