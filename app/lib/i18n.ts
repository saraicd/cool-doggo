// Simple i18n system for Portuguese and English

export type Language = "en" | "pt";

export const translations = {
  en: {
    // Navigation
    home: "Home",
    coolStory: "Cool Story",
    store: "Store",
    about: "About",

    // Cool Story - Main Page
    coolStoryTitle: "Cool Story",
    coolStorySubtitle:
      "Join the collaborative storytelling adventure! Each person adds the next part of the story.",
    howDoesThisWork: "How does this work?",
    noStoriesAvailable: "No stories available yet.",
    checkBackSoon: "Check back soon for new collaborative stories!",
    noEntriesYet: "No entries yet. Be the first to start the story!",

    // Story Card
    maxEntries: "Max",
    entries: "entries",
    clickToContribute: "Click to contribute →",
    clickToView: "Click to view →",
    enterAccessCode: "Enter the access code to contribute to this story",
    incorrectAccessCode: "Incorrect access code. Please try again.",
    accessCodePlaceholder: "Enter access code",
    submit: "Submit",
    cancel: "Cancel",

    // Story Page
    latestEntry: "Latest Entry",
    previousEntries: "Previous Entries",
    blurredMessage:
      "Previous entries are hidden. Only the latest entry is visible.",
    editStory: "Edit Story",

    // Contribute Form
    contributeTitle: "Add Your Part",
    yourName: "Your Name",
    yourNamePlaceholder: "Enter your name",
    contactEmail: "Contact Email (Optional)",
    emailPlaceholder: "your@email.com",
    yourContribution: "Your Contribution",
    contributionPlaceholder: "Continue the story...",
    characters: "characters",
    submitContribution: "Submit Contribution",
    submitting: "Submitting...",
    storyCompleted: "This story has been completed! Enjoy!",
    storyArchived: "This story has been archived.",
    storyNoLongerAccepting: "This story is no longer accepting contributions.",
    storyCompletedMessage:
      "This story is completed, so now you can request an item from our ",
    visitStore: "Visit Store",

    // Edit Story Modal
    editStoryTitle: "Edit Story",
    enterEditCode: "Enter the edit code to update this story",
    editCodePlaceholder: "Edit code",
    continue: "Continue",
    verifying: "Verifying...",
    updateStoryDescription: "Update the story description and status",
    description: "Description",
    status: "Status",
    statusActive: "Active",
    statusCompleted: "Completed",
    statusArchived: "Archived",
    saveChanges: "Save Changes",
    saving: "Saving...",

    // Admin
    adminAuthentication: "Admin Authentication",
    adminKeyPrompt: "Enter the admin key to access story editor",
    adminKeyPlaceholder: "Admin key",
    login: "Login",
    logout: "Logout",
    invalidAdminKey: "Invalid admin key. Please try again.",
    storyEditor: "Story Editor",
    title: "Title",
    maxEntriesLabel: "Max Entries (leave empty for unlimited)",

    // Errors
    invalidEditCode:
      "Invalid edit code or this story does not allow edit code access",
    editCodeRequired: "Edit code is required",
    storyNotFound: "Story not found",
    errorOccurred: "An error occurred. Please try again.",
    networkError: "Network error. Please try again.",
    authenticationFailed:
      "Authentication failed. Please try again with a valid edit code.",

    // Success messages
    contributionAdded: "Your contribution has been added!",
    storyUpdated: "Story updated successfully!",

    // Store Page
    storeTitle: "Store",
    merchandiseComingSoon: "Merchandise coming soon",
    storeNotAvailableYet: "Store Not Available Yet",
    workingOnMerchandise:
      "We're working hard to bring you awesome Cool Doggo merchandise! Check back soon for updates.",
    stayTuned:
      "Stay tuned for exclusive items, limited editions, and more surprises.",

    // About Page
    aboutPageTitle: "About the Project",
    aboutPageSubtitle: "Collaborative storytelling, one contribution at a time",
    howCoolStoryWorks: "How Cool Story Works",
    step1: "Get an access code to join a story",
    step2: "Find the story on the main page and enter the access code",
    step3: "Read what the last person wrote",
    step4: "Add your part of the story (10-500 characters)",
    step5: "Watch the story grow!",
    step6:
      "The story owner will decide when the story is finished and unveiled the full tale!",
    theRules: "The Rules",
    rule1: "Each contribution must be between 10-500 characters",
    rule2: "You can contribute once every 15 minutes to give others a chance",
    rule3: "Previous entries are blurred to keep the story fresh and exciting",
    rule4:
      "Stories may have a maximum number of entries before completion or can be closed by the owner",
    rule5:
      "Once you contribute your part, you cannot edit or delete it, be mindful of your words!",
    rule6:
      "Once you contribute your part, you can share the story with the next contributor, click the button below!",
    whyCoolStory: "Why Cool Story?",
    whyCoolStoryText1:
      "Cool Story is all about collective creativity. By limiting what you can see and when you can contribute, we create an environment where every voice matters and stories can take unexpected turns.",
    whyCoolStoryText2: " ",
    startContributing: "Start Contributing →",

    // Common
    close: "Close",
    loading: "Loading...",
  },
  pt: {
    // Navigation
    home: "Início",
    coolStory: "Cool Story",
    store: "Store",
    about: "Sobre",

    // Cool Story - Main Page
    coolStoryTitle: "Cool Story",
    coolStorySubtitle:
      "Participa da aventura de narrativa colaborativa! Cada pessoa adiciona a próxima parte da história.",
    howDoesThisWork: "Como funciona?",
    noStoriesAvailable: "Ainda não há histórias disponíveis.",
    checkBackSoon: "Volta em breve para novas histórias colaborativas!",
    noEntriesYet: "Ainda não há entradas. Sê o primeiro a começar a história!",

    // Story Card
    maxEntries: "Máx",
    entries: "entradas",
    clickToContribute: "Clica para contribuir →",
    clickToView: "Clica para ver →",
    enterAccessCode:
      "Digita o código de acesso para contribuir com esta história",
    incorrectAccessCode:
      "Código de acesso incorreto. Por favor, tenta novamente.",
    accessCodePlaceholder: "Digita o código de acesso",
    submit: "Enviar",
    cancel: "Cancelar",

    // Story Page
    latestEntry: "Última Entrada",
    previousEntries: "Entradas Anteriores",
    blurredMessage:
      "As entradas anteriores estão ocultas. Apenas a última entrada está visível.",
    editStory: "Editar História",

    // Contribute Form
    contributeTitle: "Adiciona a Tua Parte",
    yourName: "O Teu Nome",
    yourNamePlaceholder: "Digita o teu nome",
    contactEmail: "Email de Contato (Opcional)",
    emailPlaceholder: "teu@email.com",
    yourContribution: "A Tua Contribuição",
    contributionPlaceholder: "Continua a história...",
    characters: "caracteres",
    submitContribution: "Enviar Contribuição",
    submitting: "A enviar...",
    storyCompleted: "Esta história foi concluída! ",
    storyArchived: "Esta história foi arquivada.",
    storyNoLongerAccepting: "Esta história já não aceita mais contribuições.",
    storyCompletedMessage:
      "Esta história está concluída, agora podes pedir um item da nossa ",
    visitStore: "Visitar Store",

    // Edit Story Modal
    editStoryTitle: "Editar História",
    enterEditCode: "Digita o código de edição para atualizar esta história",
    editCodePlaceholder: "Código de edição",
    continue: "Continuar",
    verifying: "A verificar...",
    updateStoryDescription: "Atualizar a descrição e status da história",
    description: "Descrição",
    status: "Status",
    statusActive: "Ativa",
    statusCompleted: "Concluída",
    statusArchived: "Arquivada",
    saveChanges: "Guardar Alterações",
    saving: "A guardar...",

    // Admin
    adminAuthentication: "Autenticação de Admin",
    adminKeyPrompt:
      "Digita a chave de admin para aceder ao editor de histórias",
    adminKeyPlaceholder: "Chave de admin",
    login: "Entrar",
    logout: "Sair",
    invalidAdminKey: "Chave de admin inválida. Por favor, tenta novamente.",
    storyEditor: "Editor de História",
    title: "Título",
    maxEntriesLabel: "Máximo de Entradas (deixa vazio para ilimitado)",

    // Errors
    invalidEditCode:
      "Código de edição inválido ou esta história não permite acesso com código de edição",
    editCodeRequired: "Código de edição é obrigatório",
    storyNotFound: "História não encontrada",
    errorOccurred: "Ocorreu um erro. Por favor, tenta novamente.",
    networkError: "Erro de rede. Por favor, tenta novamente.",
    authenticationFailed:
      "Autenticação falhou. Por favor, tenta novamente com um código de edição válido.",

    // Success messages
    contributionAdded: "A tua contribuição foi adicionada!",
    storyUpdated: "História atualizada com sucesso!",

    // Store Page
    storeTitle: "Store",
    merchandiseComingSoon: "Merchandise em breve",
    storeNotAvailableYet: "Loja Online Ainda Não Disponível",
    workingOnMerchandise:
      "Estamos a trabalhar arduamente para te trazer merchandise incrível do Cool Doggo! Volta em breve para atualizações.",
    stayTuned:
      "Fica atento a novidades exclusivas, edições limitadas e mais surpresas.",

    // About Page
    aboutPageTitle: "Sobre o Projeto",
    aboutPageSubtitle: "Narrativa colaborativa, uma contribuição de cada vez",
    howCoolStoryWorks: "Como Funciona o Cool Story",
    step1: "Recebe um código de acesso para entrar numa história",
    step2:
      "Encontra a história na página principal e digita o código de acesso",
    step3: "Lê o que a última pessoa escreveu",
    step4: "Adiciona a tua parte da história (10-500 caracteres)",
    step5: "Vê a história crescer!",
    step6:
      "O dono da história vai decidir quando a história está terminada e revelará o conto completo!",
    theRules: "As Regras",
    rule1: "Cada contribuição deve ter entre 10-500 caracteres",
    rule2:
      "Podes contribuir uma vez a cada 15 minutos para dar aos outros uma oportunidade",
    rule3:
      "As entradas anteriores estão desfocadas para manter a história fresca e emocionante",
    rule4:
      "As histórias podem ter um número máximo de entradas antes da conclusão ou podem ser fechadas pelo dono",
    rule5:
      "Depois de contribuíres com a tua parte, não podes editar ou apagar, tem cuidado com as tuas palavras!",
    rule6:
      "Depois de contribuíres com a tua parte, podes partilhar a história com o próximo contribuidor, clica no botão abaixo!",
    whyCoolStory: "Porquê Cool Story?",
    whyCoolStoryText1:
      "Cool Story é sobre criatividade coletiva. Ao limitar o que podes ver e quando podes contribuir, criamos um ambiente onde cada voz importa e as histórias podem tomar rumos inesperados.",
    whyCoolStoryText2: " ",
    startContributing: "Começar a Contribuir →",

    // Common
    close: "Fechar",
    loading: "Carregando...",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

// Get translation by key
export function t(key: TranslationKey, lang: Language = "pt"): string {
  return translations[lang][key];
}

// Language context helpers
export const getLanguage = (): Language => {
  if (typeof window === "undefined") return "pt";
  return (localStorage.getItem("language") as Language) || "pt";
};

export const setLanguage = (lang: Language): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("language", lang);
  window.dispatchEvent(new Event("languageChange"));
};
