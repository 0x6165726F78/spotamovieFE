import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
  en: {
    //CONTAINERS/LOGIN.JS
    welcome: 'Welcome',
    reco: 'RECOMMENDATION',
    recommendations:
      'Get movie recommendations based on your music preferences',
    signIn: 'Sign in with Spotify so we can process your playlists',
    signButton: 'SIGN IN WITH SPOTIFY',
    logging: 'LOGGING IN ...',
    //AppContainer.js
    login: 'Login',
    recom: 'Recommendations',
    likedMovies: 'Liked Movies',
    movieSurvey: 'Movie Survey',
    //Component/Wizard
    tellUS: 'Tell us more about your movie prefs!',
    appYoung:
      'This app is young, so we need to create a base of movie preferences to detect connections with your music taste.',
    skipIt: 'SKIP IT',
    startWizard: 'START SURVEY',
    //SwiperEL
    loadingSurvey: 'LOADING SURVEY ...',
    //SWIPERCOMPO/Card
    idk: "I don't know",
    //RecLoader
    thankyou: 'Thank you !',
    songsmovies: "We're now processing your songs and movies.",
    discover: 'DISCOVER',
    Discover: 'Discover',
    Last: 'Last',
    Liked: 'Liked',
    Disliked: 'Disliked',
    loadingMovies: 'Loading Movies',
    Suggestions: 'Suggestions',
    description: 'description',
  },

  fr: {
    welcome: 'Bienvenue',
    reco: 'RECOMMANDATION',
    recommendations:
      'Obtenez des recommandations de films en fonction de vos préférences musicales',
    signIn:
      'Connectez-vous avec Spotify afin que nous puissions traiter vos playlists',
    signButton: "S'INSCRIRE AVEC SPOTIFY",
    logging: 'CONNEXION EN COURS',
    //AppContainer.js
    login: "S'identifier",
    recom: 'Recommandations',
    likedMovies: 'Films aimés',
    movieSurvey: 'Enquête Films',
    //Component/Wizard
    tellUS: 'Dites-nous plus sur vos préférences de films!',
    appYoung:
      'Cette application est jeune, donc nous devons créer une base de préférences de films pour détecter les connexions avec votre goût musical.',
    skipIt: 'SAUTER',
    startWizard: "DÉMARRER L'ASSISTANT",
    //SwiperEL
    loadingSurvey: "CHARGEMENT DE L'ENQUÊTE ...",
    //SWIPERCOMPO/Card
    idk: 'Je ne sais pas',
    //RecLoader
    thankyou: 'Merci !',
    songsmovies: 'Nous traitons maintenant vos chansons et vos films.',
    discover: 'DÉCOUVRIR',
    Discover: 'Découvrir',
    Last: 'Précédent',
    Liked: 'Aimés',
    Disliked: 'Non aimés',
    loadingMovies: 'Chargement des Films',
    Suggestions: 'Suggestions',
    description: 'description',
  },

  ar: {
    welcome: 'أهلا بك',
    reco: 'توصية',
    recommendations:
      'الحصول على توصيات الفيلم استنادا إلى التفضيلات الموسيقية الخاصة بك',
    signIn:
      'سجل الدخول باستخدام سبوتيفي حتى نتمكن من معالجة قوائم التشغيل التابعة لك',
    signButton: 'تسجيل الدخول مع سبوتيفي',
    logging: 'الاتصال الحالي',
    //AppContainer.js
    login: 'تسجيل الدخول',
    recom: 'توصيات',
    likedMovies: 'أحب الأفلام',
    movieSurvey: 'مسح الفيلم',
    //Component/Wizard
    tellUS: 'تخبرنا المزيد عن خياراتك للأفلام!',
    appYoung:
      'هذا التطبيق هو الشباب، لذلك نحن بحاجة إلى إنشاء قاعدة من تفضيلات الفيلم للكشف عن اتصالات مع طعم الموسيقى الخاصة بك.',
    skipIt: 'تخطاها',
    startWizard: 'بدء المعالج',
    //SwiperEL
    loadingSurvey: 'جار تحميل الاستطلاع ...',
    //SWIPERCOMPO/Card
    idk: 'انا لا اعرف',
    //RecLoader
    thankyou: 'شكرا !',
    songsmovies: 'نحن الآن بصدد معالجة الأغاني والأفلام.',
    discover: 'اكتشف',
    Discover: 'اكتشف',
    Last: 'الاخير',
    Liked: 'احب',
    Disliked: 'لم يعجبني',
    loadingMovies: 'تحميل الأفلام',
    Suggestions: 'اقتراحات',
    description: 'وصف',
  },

  es: {
    welcome: 'Bienvenido',
    reco: 'RECOMENDACIÓN',
    recommendations:
      'Obtenga recomendaciones de películas basadas en sus preferencias de música',
    signIn:
      'Inicia sesión con Spotify para poder procesar tus listas de reproducción',
    signButton: 'ENTRAR CON SPOTIFY',
    logging: 'Conexión en curso',
    //AppContainer.js
    login: 'iniciar sesión',
    recom: 'Recomendaciones',
    likedMovies: 'Películas gustaron',
    movieSurvey: 'Encuesta película',
    //Component/Wizard
    tellUS: 'Cuéntanos más sobre tus prefs de película!',
    appYoung:
      'Esta aplicación es joven, por lo que necesitamos crear una base de preferencias de películas para detectar conexiones con tu gusto musical.',
    skipIt: 'SALTARLO',
    startWizard: 'MAGO PRINCIPIANTE',
    //SwiperEL
    loadingSurvey: 'CARGANDO LA ENCUESTA ...',
    //SWIPERCOMPO/Card
    idk: 'no lo sé',
    //RecLoader
    thankyou: 'gracias !',
    songsmovies: 'Ahora estamos procesando tus canciones y películas.',
    discover: 'DESCUBRIR',
    Discover: 'Descubrir',
    Last: 'Último',
    Liked: 'Gustó',
    Disliked: 'No me gusta',
    loadingMovies: 'Cargando películas',
    Suggestions: 'Sugerencias',
    description: 'Descripción',
  },

  ru: {
    welcome: 'добро пожаловать',
    reco: 'РЕКОМЕНДАЦИЯ',
    recommendations:
      'Получите рекомендации по фильмам на основе ваших музыкальных предпочтений',
    signIn:
      'Войдите в систему с помощью Spotify, чтобы мы могли обрабатывать ваши плейлисты',
    signButton: 'ЗАРЕГИСТРИРОВАТЬСЯ С SPOTIFY',
    logging: 'текущее соединение',
    //AppContainer.js
    login: 'авторизоваться',
    recom: 'рекомендации',
    likedMovies: 'Любимые фильмы',
    movieSurvey: 'Обзор фильмов',
    //Component/Wizard
    tellUS: 'Расскажите подробнее о своих фильмах!',
    appYoung:
      'Это приложение молодое, поэтому нам нужно создать основу предпочтений фильма, чтобы обнаружить связи с вашим музыкальным вкусом.',
    skipIt: 'ПРОПУСТИ ЭТО',
    startWizard: 'СТАРТОВЫЙ МАСТЕР',
    //SwiperEL
    loadingSurvey: 'ЗАГРУЗКА ИССЛЕДОВАНИЯ ...',
    //SWIPERCOMPO/Card
    idk: 'я не знаю',
    //RecLoader
    thankyou: 'Спасибо !',
    songsmovies: 'Теперь мы обрабатываем ваши песни и фильмы.',
    discover: 'ОБНАРУЖИТЬ',
    Discover: 'Обнаружить',
    Last: 'Последний',
    Liked: 'Понравилось',
    Disliked: 'Не понравилось',
    loadingMovies: 'Скачать фильмы',
    Suggestions: 'Предложения',
    description: 'Описание',
  },
};
