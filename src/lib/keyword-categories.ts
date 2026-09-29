export type KeywordCategory = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  keywords: string[];
  examples: string[];
  catch: string;
  thumbnail: string;
  intentModes: string[];
  useCases: string[];
  faq: string[];
};

const rawKeywordCategories: Omit<KeywordCategory, "catch" | "thumbnail" | "intentModes" | "useCases" | "faq">[] = [
  {slug:"review",name:"Reviews",icon:"⭐",description:"Reviews and ratings across products, food, apps, services and places.",keywords:["review","reviews","rating","user reviews","honest review","best reviews"],examples:["phone review","restaurant reviews","app review","hotel review","car review"]},
  {slug:"shopping",name:"Shopping & Products",icon:"🛍️",description:"Product discovery, buying, comparison, deals and shopping intent.",keywords:["shopping","online shopping","product","buy","best","price"],examples:["best phone","laptop price","online shopping","product comparison","best deals"]},
  {slug:"food",name:"Food & Restaurants",icon:"🍔",description:"Restaurants, food, menus, delivery, recipes and dining searches.",keywords:["food","restaurant","menu","delivery","recipe","near me"],examples:["restaurants near me","food near me","pizza delivery","restaurant menu","easy recipes"]},
  {slug:"local",name:"Near Me & Local",icon:"📍",description:"Nearby places, businesses, services, opening hours and directions.",keywords:["near me","nearby","open now","directions","location","hours"],examples:["gas station near me","hotel near me","pharmacy near me","open now","directions"]},
  {slug:"travel",name:"Travel & Hotels",icon:"✈️",description:"Flights, hotels, destinations, booking and trip-planning searches.",keywords:["flights","hotels","travel","booking","destination","vacation"],examples:["cheap flights","hotels near me","best hotels","travel guide","things to do"]},
  {slug:"maps",name:"Maps & Directions",icon:"🗺️",description:"Maps, routes, distances, navigation and location searches.",keywords:["maps","directions","route","distance","location","navigation"],examples:["directions to airport","distance calculator","route map","nearby places","maps"]},
  {slug:"jobs",name:"Jobs & Careers",icon:"💼",description:"Jobs, careers, hiring, salaries, resumes and professional growth.",keywords:["jobs","jobs near me","careers","salary","resume","hiring"],examples:["jobs near me","remote jobs","resume template","salary","career options"]},
  {slug:"finance",name:"Finance & Money",icon:"💰",description:"Personal finance, loans, taxes, payments, banking and money tools.",keywords:["finance","loan","tax","EMI","money","banking"],examples:["EMI calculator","loan calculator","GST calculator","currency converter","tax calculator"]},
  {slug:"banking",name:"Banking & Payments",icon:"🏦",description:"Bank accounts, cards, UPI, payments, transfers and support searches.",keywords:["bank","account","credit card","debit card","UPI","payment"],examples:["bank login","UPI payment","credit card","bank customer care","IFSC code"]},
  {slug:"insurance",name:"Insurance",icon:"🛡️",description:"Insurance plans, quotes, policies, claims and comparisons.",keywords:["insurance","policy","claim","premium","quote","coverage"],examples:["health insurance","car insurance","insurance quote","claim status","policy renewal"]},
  {slug:"real-estate",name:"Real Estate & Property",icon:"🏠",description:"Property buying, renting, prices, listings and home searches.",keywords:["property","house","home","rent","buy","real estate"],examples:["houses for sale","rent near me","property price","apartments","real estate"]},
  {slug:"automotive",name:"Cars & Vehicles",icon:"🚗",description:"Cars, bikes, vehicles, prices, mileage, parts and servicing.",keywords:["car","bike","vehicle","SUV","mileage","service"],examples:["car price","car review","best bike","vehicle insurance","car service"]},
  {slug:"health",name:"Health & Wellness",icon:"❤️",description:"General health information, wellness, fitness and healthy-living searches.",keywords:["health","symptoms","wellness","fitness","nutrition","doctor"],examples:["healthy diet","fitness tips","symptoms","doctor near me","health calculator"]},
  {slug:"medical",name:"Medical & Healthcare",icon:"🩺",description:"Healthcare services, hospitals, appointments, medicines and medical information.",keywords:["hospital","clinic","doctor","appointment","medicine","healthcare"],examples:["hospital near me","doctor appointment","clinic near me","medicine information","lab test"]},
  {slug:"fitness",name:"Fitness & Exercise",icon:"🏋️",description:"Workout, exercise, gym, training and fitness-planning searches.",keywords:["fitness","workout","exercise","gym","training","BMI"],examples:["home workout","gym near me","exercise plan","BMI calculator","running plan"]},
  {slug:"beauty",name:"Beauty & Personal Care",icon:"💄",description:"Beauty, skincare, haircare, grooming and personal-care searches.",keywords:["beauty","skincare","haircare","makeup","grooming","salon"],examples:["skincare routine","salon near me","haircut","makeup tips","best shampoo"]},
  {slug:"fashion",name:"Fashion & Clothing",icon:"👗",description:"Clothing, shoes, accessories, styles, sizes and fashion shopping.",keywords:["fashion","clothes","dress","shoes","style","outfit"],examples:["summer outfits","shoes online","dress price","fashion trends","clothing stores"]},
  {slug:"technology",name:"Technology & Apps",icon:"📱",description:"Phones, computers, apps, software, devices and technology searches.",keywords:["app","software","AI","phone","computer","download"],examples:["AI tools","phone review","app download","software review","computer help"]},
  {slug:"ai",name:"AI & Artificial Intelligence",icon:"🤖",description:"AI tools, chatbots, image generation, automation and AI learning.",keywords:["AI","chatbot","GPT","AI tools","AI image","automation"],examples:["best AI tools","AI chatbot","AI image generator","AI writing","AI automation"]},
  {slug:"internet",name:"Internet & Web",icon:"🌐",description:"Websites, browsers, internet services, domains and online help.",keywords:["internet","website","browser","web","domain","online"],examples:["website builder","browser","internet speed","domain search","web tools"]},
  {slug:"social-media",name:"Social Media",icon:"📲",description:"Social platforms, profiles, posts, followers, creators and social tools.",keywords:["Instagram","Facebook","TikTok","YouTube","social media","followers"],examples:["Instagram login","social media tools","YouTube views","TikTok trends","Facebook help"]},
  {slug:"entertainment",name:"Movies, Music & Games",icon:"🎬",description:"Movies, shows, music, lyrics, streaming and gaming searches.",keywords:["movies","music","lyrics","shows","games","videos"],examples:["movie review","music lyrics","new movies","game review","watch online"]},
  {slug:"sports",name:"Sports",icon:"⚽",description:"Sports teams, players, scores, schedules, results and news.",keywords:["sports","score","match","team","player","schedule"],examples:["live score","football schedule","cricket score","NBA results","sports news"]},
  {slug:"news",name:"News & Current Events",icon:"📰",description:"News, headlines, breaking updates, local and world events.",keywords:["news","latest news","breaking news","headlines","today","updates"],examples:["latest news","local news","world news","business news","sports news"]},
  {slug:"weather",name:"Weather",icon:"🌤️",description:"Current weather, forecasts, temperature, rain and climate searches.",keywords:["weather","forecast","temperature","rain","climate","today"],examples:["weather today","weather near me","7 day forecast","temperature","rain forecast"]},
  {slug:"education",name:"Education & Learning",icon:"🎓",description:"Courses, classes, subjects, exams, answers and study resources.",keywords:["education","courses","classes","exam","answers","study"],examples:["online courses","math answers","exam syllabus","study material","free courses"]},
  {slug:"language",name:"Language & Translation",icon:"🌍",description:"Translation, dictionaries, meanings, grammar and language learning.",keywords:["translate","translation","meaning","dictionary","grammar","language"],examples:["English to Hindi","word meaning","translate online","grammar checker","language learning"]},
  {slug:"how-to",name:"How To & Questions",icon:"❓",description:"How-to, why, what-is, guides, tutorials and problem-solving searches.",keywords:["how to","what is","why","how","guide","tutorial"],examples:["how to convert PDF","what is AI","how to calculate","how to fix","tutorial"]},
  {slug:"free",name:"Free & Online",icon:"🆓",description:"Free, online, browser-based and no-download search intent.",keywords:["free","online","free online","without download","browser","no signup"],examples:["free PDF converter","online calculator","free image editor","online tools","free generator"]},
  {slug:"download",name:"Download & Files",icon:"⬇️",description:"Downloads, files, file formats and document-related searches.",keywords:["download","PDF","file","JPG","PNG","DOC"],examples:["PDF download","image download","file converter","download tool","DOC to PDF"]},
  {slug:"calculator",name:"Calculators",icon:"🧮",description:"Math, finance, date, health, percentage and everyday calculators.",keywords:["calculator","calculate","percentage","age","BMI","math"],examples:["percentage calculator","age calculator","BMI calculator","scientific calculator","date calculator"]},
  {slug:"converter",name:"Converters",icon:"🔄",description:"Unit, currency, file, image, PDF, data and format conversion.",keywords:["converter","convert","conversion","to PDF","to JPG","currency"],examples:["currency converter","PDF converter","JPG to PNG","unit converter","JSON converter"]},
  {slug:"generator",name:"Generators",icon:"⚡",description:"QR, password, random, text, invoice, resume and content generators.",keywords:["generator","create","generate","QR code","password","random"],examples:["QR code generator","password generator","random number generator","invoice generator","resume generator"]},
  {slug:"documents",name:"Documents & PDF",icon:"📄",description:"PDF, Word, documents, OCR, editing, merging, splitting and file tools.",keywords:["PDF","document","Word","OCR","merge","split"],examples:["PDF editor","PDF to Word","merge PDF","split PDF","OCR online"]},
  {slug:"images",name:"Images & Photos",icon:"🖼️",description:"Image search, editing, resizing, compression, formats and photo tools.",keywords:["images","photos","image editor","resize","compress","JPG"],examples:["image compressor","image resizer","photo editor","JPG converter","remove background"]},
  {slug:"videos",name:"Videos & Video Tools",icon:"🎥",description:"Video search, editing, conversion, compression, subtitles and thumbnails.",keywords:["videos","video editor","converter","compress","subtitles","thumbnail"],examples:["video compressor","video converter","thumbnail maker","subtitle tool","video editor"]},
  {slug:"audio",name:"Audio & Music Tools",icon:"🎧",description:"Audio conversion, editing, recording, compression and music utilities.",keywords:["audio","MP3","music","recording","sound","converter"],examples:["MP3 converter","audio cutter","audio compressor","voice recorder","audio editor"]},
  {slug:"qr",name:"QR Codes & Barcodes",icon:"🔳",description:"QR code creation, scanning, decoding and barcode utilities.",keywords:["QR code","barcode","scanner","generator","decode","scan"],examples:["QR code generator","QR scanner","barcode generator","QR reader","WiFi QR"]},
  {slug:"password-security",name:"Passwords & Security",icon:"🔐",description:"Passwords, security checks, encryption, privacy and account safety tools.",keywords:["password","security","privacy","encrypt","secure","generator"],examples:["password generator","password checker","secure password","text encryption","privacy tools"]},
  {slug:"email",name:"Email & Messaging",icon:"✉️",description:"Email, messaging, inbox, signatures, templates and communication searches.",keywords:["email","Gmail","mail","message","inbox","signature"],examples:["Gmail login","email template","email signature","mail merge","email help"]},
  {slug:"login",name:"Login & Customer Service",icon:"🔑",description:"Account login, sign-in, support, contact and customer-service intent.",keywords:["login","sign in","account","customer service","support","contact"],examples:["Gmail login","Amazon login","customer service","account sign in","support"]},
  {slug:"business",name:"Business & Companies",icon:"🏢",description:"Companies, business information, services, contacts and business tools.",keywords:["business","company","services","office","contact","B2B"],examples:["company information","business ideas","business tools","company contact","local business"]},
  {slug:"marketing",name:"Marketing & SEO",icon:"📈",description:"SEO, keywords, content marketing, advertising and website growth searches.",keywords:["SEO","keywords","marketing","ads","content","traffic"],examples:["SEO tools","keyword research","content ideas","Google ranking","marketing tools"]},
  {slug:"web-development",name:"Web Development & Coding",icon:"💻",description:"Programming, websites, APIs, code, developers and technical tools.",keywords:["coding","programming","HTML","CSS","JavaScript","API"],examples:["HTML editor","JSON formatter","API tools","JavaScript help","code converter"]},
  {slug:"productivity",name:"Productivity & Office",icon:"✅",description:"Everyday productivity, notes, calendars, spreadsheets and office utilities.",keywords:["productivity","notes","calendar","tasks","office","spreadsheet"],examples:["to do list","meeting notes","calendar","spreadsheet tools","productivity apps"]},
  {slug:"legal",name:"Legal & Law",icon:"⚖️",description:"General legal information, documents, laws, forms and legal services.",keywords:["legal","law","lawyer","contract","agreement","court"],examples:["lawyer near me","contract template","legal forms","legal information","agreement template"]},
  {slug:"government",name:"Government & Public Services",icon:"🏛️",description:"Government services, forms, IDs, taxes, public records and official information.",keywords:["government","official","form","ID","passport","public service"],examples:["passport application","government forms","tax portal","public services","official website"]},
  {slug:"home",name:"Home & Repair",icon:"🔧",description:"Home improvement, repairs, cleaning, appliances and local home services.",keywords:["home","repair","plumber","electrician","cleaning","appliance"],examples:["plumber near me","electrician near me","home repair","cleaning service","appliance repair"]},
  {slug:"pets",name:"Pets & Animals",icon:"🐾",description:"Pet care, animal information, vets, food and pet products.",keywords:["pets","dogs","cats","vet","pet food","animals"],examples:["vet near me","dog food","cat care","pet shop","animal information"]},
  {slug:"parenting",name:"Parenting & Kids",icon:"👨‍👩‍👧",description:"Parenting, children, baby products, activities and family resources.",keywords:["parenting","baby","kids","children","school","family"],examples:["baby products","kids activities","parenting tips","school activities","baby names"]},
  {slug:"books",name:"Books & Reading",icon:"📚",description:"Books, authors, summaries, reviews, reading and literature searches.",keywords:["books","book review","author","novel","summary","reading"],examples:["book reviews","best books","book summary","author information","free ebooks"]},
  {slug:"events",name:"Events & Tickets",icon:"🎟️",description:"Events, concerts, festivals, tickets and things happening nearby.",keywords:["events","tickets","concert","festival","show","near me"],examples:["events near me","concert tickets","movie tickets","festival dates","local events"]},
  {slug:"coupons",name:"Deals, Coupons & Discounts",icon:"🏷️",description:"Coupons, promo codes, sales, discounts and shopping deals.",keywords:["coupon","promo code","discount","deal","sale","offer"],examples:["coupon codes","promo code","best deals","discount online","sale"]},
  {slug:"utilities",name:"Everyday Utilities",icon:"🛠️",description:"Small everyday web utilities for text, numbers, files and quick tasks.",keywords:["online tool","utility","quick tool","calculator","formatter","checker"],examples:["text formatter","word counter","JSON formatter","unit converter","online tools"]},
  {slug:"food-recipes",name:"Recipes & Cooking",icon:"👨‍🍳",description:"Recipes, ingredients, cooking methods, meal planning and food ideas.",keywords:["recipe","ingredients","cooking","meal","dinner","breakfast"],examples:["chicken recipe","easy dinner","cake recipe","meal plan","vegetarian recipes"]},
  {slug:"telecom",name:"Mobile & Telecom",icon:"📡",description:"Mobile plans, SIM, recharge, networks, internet and telecom support.",keywords:["mobile","SIM","recharge","5G","internet","network"],examples:["SIM recharge","5G plans","mobile plans","internet speed","network coverage"]},
  {slug:"electronics",name:"Electronics & Gadgets",icon:"🔌",description:"Electronics, gadgets, accessories, specifications, prices and reviews.",keywords:["electronics","gadget","headphones","TV","laptop","specifications"],examples:["best headphones","TV price","laptop specs","smartwatch review","phone accessories"]},
  {slug:"accessibility",name:"Accessibility & Assistive Tools",icon:"♿",description:"Accessibility, captions, screen readers, text assistance and inclusive tools.",keywords:["accessibility","screen reader","captions","voice","assistive","text to speech"],examples:["screen reader","live captions","text to speech","voice typing","accessibility tools"]},
  {slug:"science",name:"Science & Knowledge",icon:"🔬",description:"Science facts, concepts, experiments, calculations and educational references.",keywords:["science","physics","chemistry","biology","facts","experiment"],examples:["physics calculator","science facts","chemistry help","biology notes","science experiments"]},
];


export const categoryIntent: Record<string, string> = {
  review: "Visitors usually want evidence, ratings, pros and cons before a decision.",
  shopping: "Visitors usually have a product need and want options, prices or a path to purchase.",
  food: "Visitors usually need a place to eat, a menu, delivery option or food idea.",
  local: "Visitors usually need a nearby place or service with practical details such as hours.",
  travel: "Visitors usually want to plan a trip by comparing destinations, stays, transport or activities.",
  maps: "Visitors usually need a route, distance, location or navigation answer.",
  jobs: "Visitors usually want an opportunity, employer information, salary context or career guidance.",
  finance: "Visitors usually want to calculate, compare or understand a money-related decision.",
  banking: "Visitors usually need an account, payment, transfer or bank-support action.",
  insurance: "Visitors usually want to understand coverage, compare policies or track a claim.",
  "real-estate": "Visitors usually want property listings, prices, rental options or buying information.",
  automotive: "Visitors usually want vehicle information, pricing, maintenance or ownership help.",
  health: "Visitors usually seek general wellness information, habits, symptoms or everyday health guidance.",
  medical: "Visitors usually need healthcare information, a provider, appointment or medical-service path.",
  fitness: "Visitors usually want an exercise plan, workout idea, training resource or fitness calculation.",
  beauty: "Visitors usually want a routine, product, treatment or nearby personal-care service.",
  fashion: "Visitors usually want a style idea, item, size, price or outfit recommendation.",
  technology: "Visitors usually want help choosing, using, downloading or troubleshooting technology.",
  ai: "Visitors usually want an AI capability, tool, workflow, explanation or generation task.",
  internet: "Visitors usually need an online service, website, browser answer or connectivity resource.",
  "social-media": "Visitors usually want a platform action, profile answer, creator resource or social-media workflow.",
  entertainment: "Visitors usually want something to watch, listen to or play, plus related information.",
  sports: "Visitors usually want current scores, schedules, teams, players or sports information.",
  news: "Visitors usually want a current story, update, headline or event context.",
  weather: "Visitors usually need current conditions or a forecast for a particular time or place.",
  education: "Visitors usually want a learning resource, course, answer, syllabus or study aid.",
  language: "Visitors usually need to translate, understand, check or learn language.",
  "how-to": "Visitors usually have a task or problem and want actionable steps to complete it.",
  free: "Visitors usually want a useful resource with no-cost, online or low-friction access.",
  download: "Visitors usually want to obtain a file, resource or compatible downloadable format.",
  calculator: "Visitors usually want a precise numeric result from a specific input and formula.",
  converter: "Visitors usually want to change a value, unit or file from one format into another.",
  generator: "Visitors usually want a ready-made output produced from a small set of inputs.",
  documents: "Visitors usually want to edit, convert, organize, extract or manage document files.",
  images: "Visitors usually want to create, edit, resize, compress or convert an image.",
  videos: "Visitors usually want to create, edit, convert, compress or understand video content.",
  audio: "Visitors usually want to record, edit, convert, compress or process audio.",
  qr: "Visitors usually want to create, scan, decode or use a QR or barcode.",
  "password-security": "Visitors usually want to create safer credentials or perform a privacy and security task.",
  email: "Visitors usually want to write, send, organize or troubleshoot digital messages.",
  login: "Visitors usually need a reliable route to sign in, recover access or contact support.",
  business: "Visitors usually want company information, a service, a contact or a business workflow.",
  marketing: "Visitors usually want to improve visibility, content, traffic, keywords or campaign performance.",
  "web-development": "Visitors usually want to build, test, debug or transform something for the web.",
  productivity: "Visitors usually want to organize work, notes, tasks, schedules or office information.",
  legal: "Visitors usually want general legal information, a document resource or a route to professional help.",
  government: "Visitors usually need an official service, form, application, record or public-service resource.",
  home: "Visitors usually want to solve a repair, maintenance, cleaning or home-improvement task.",
  pets: "Visitors usually need pet-care information, an animal resource, product or nearby service.",
  parenting: "Visitors usually want practical ideas, resources or information for children and family life.",
  books: "Visitors usually want to discover, compare, understand or find information about books and authors.",
  events: "Visitors usually want to discover an event, check timing, location or obtain tickets.",
  coupons: "Visitors usually want a current deal, promotion or discount before purchasing.",
  utilities: "Visitors usually want a small practical tool that completes one everyday task quickly.",
  "food-recipes": "Visitors usually want a dish idea, ingredients, cooking method or meal plan.",
  telecom: "Visitors usually want to compare connectivity, mobile plans, SIM options or network information.",
  electronics: "Visitors usually want specifications, prices, compatibility, accessories or product comparisons.",
  accessibility: "Visitors usually want a digital task to become easier through captions, voice or assistive features.",
  science: "Visitors usually want to understand a concept, calculate something or explore a scientific fact.",
};

const categoryCatch: Record<string, string> = {
  review: "Know before you buy.", shopping: "Find it. Compare it. Choose smarter.", food: "Find what to eat, fast.", local: "Discover useful places nearby.", travel: "Plan the trip with better searches.", maps: "From where to how to get there.", jobs: "Turn searches into opportunities.", finance: "Understand the numbers before you act.", banking: "Everyday money, made easier.", insurance: "Compare coverage with clarity.", "real-estate": "Search smarter for your next property.", automotive: "Everything for cars, in one search intent.", health: "Everyday health information, organized.", medical: "Find healthcare information with context.", fitness: "Train smarter, one search at a time.", beauty: "Discover products, routines and ideas.", fashion: "Find the look, price and style you want.", technology: "Make tech searches actually useful.", ai: "Turn AI curiosity into practical tools.", internet: "Search the web with clearer intent.", "social-media": "Find, create and grow online.", entertainment: "What to watch, hear or play next.", sports: "Scores, facts, gear and more.", news: "Find the story behind the search.", weather: "Know what conditions to expect.", education: "Learn faster with focused searches.", language: "Understand, translate and communicate.", "how-to": "From question to step-by-step answer.", free: "Find useful things without the price tag.", download: "Find the file or resource you need.", calculator: "Turn numbers into quick answers.", converter: "Convert values without the manual work.", generator: "Generate useful output in seconds.", documents: "Work with PDFs and documents faster.", images: "Edit and optimize images simply.", videos: "Create, convert and understand video intent.", audio: "Work with sound, music and audio files.", qr: "Create and use scannable codes.", "password-security": "Protect accounts and data with better tools.", email: "Write, send and manage messages faster.", login: "Find the right account or support path.", business: "Search companies, services and business tools.", marketing: "Turn search intent into growth.", "web-development": "Build, test and debug for the web.", productivity: "Get more done with practical tools.", legal: "Find legal information and resources.", government: "Navigate public services more easily.", home: "Solve everyday home tasks.", pets: "Better searches for animals and pet care.", parenting: "Useful ideas for parents and kids.", books: "Find books, authors and reading ideas.", events: "Find what is happening and when.", coupons: "Find deals before you pay.", utilities: "Small tools for everyday tasks.", "food-recipes": "From ingredients to the finished dish.", telecom: "Compare mobile and connectivity needs.", electronics: "Search gadgets by need, specs and price.", accessibility: "Make digital tasks easier to access.", science: "Explore facts, formulas and how things work.",
};

const categoryThumb: Record<string, string> = {
  "review": "/category-art/review.svg",   "shopping": "/category-art/shopping.svg",   "food": "/category-art/food.svg",   "local": "/category-art/local.svg",   "travel": "/category-art/travel.svg",   "maps": "/category-art/maps.svg",   "jobs": "/category-art/jobs.svg",   "finance": "/category-art/finance.svg",   "banking": "/category-art/banking.svg",   "insurance": "/category-art/insurance.svg",   "real-estate": "/category-art/real-estate.svg",   "automotive": "/category-art/automotive.svg",   "health": "/category-art/health.svg",   "medical": "/category-art/medical.svg",   "fitness": "/category-art/fitness.svg",   "beauty": "/category-art/beauty.svg",   "fashion": "/category-art/fashion.svg",   "technology": "/category-art/technology.svg",   "ai": "/category-art/ai.svg",   "internet": "/category-art/internet.svg",   "social-media": "/category-art/social-media.svg",   "entertainment": "/category-art/entertainment.svg",   "sports": "/category-art/sports.svg",   "news": "/category-art/news.svg",   "weather": "/category-art/weather.svg",   "education": "/category-art/education.svg",   "language": "/category-art/language.svg",   "how-to": "/category-art/how-to.svg",   "free": "/category-art/free.svg",   "download": "/category-art/download.svg",   "calculator": "/category-art/calculator.svg",   "converter": "/category-art/converter.svg",   "generator": "/category-art/generator.svg",   "documents": "/category-art/documents.svg",   "images": "/category-art/images.svg",   "videos": "/category-art/videos.svg",   "audio": "/category-art/audio.svg",   "qr": "/category-art/qr.svg",   "password-security": "/category-art/password-security.svg",   "email": "/category-art/email.svg",   "login": "/category-art/login.svg",   "business": "/category-art/business.svg",   "marketing": "/category-art/marketing.svg",   "web-development": "/category-art/web-development.svg",   "productivity": "/category-art/productivity.svg",   "legal": "/category-art/legal.svg",   "government": "/category-art/government.svg",   "home": "/category-art/home.svg",   "pets": "/category-art/pets.svg",   "parenting": "/category-art/parenting.svg",   "books": "/category-art/books.svg",   "events": "/category-art/events.svg",   "coupons": "/category-art/coupons.svg",   "utilities": "/category-art/utilities.svg",   "food-recipes": "/category-art/food-recipes.svg",   "telecom": "/category-art/telecom.svg",   "electronics": "/category-art/electronics.svg",   "accessibility": "/category-art/accessibility.svg",   "science": "/category-art/science.svg"
};

function buildIntentModes(item: Omit<KeywordCategory, "catch" | "thumbnail" | "intentModes" | "useCases" | "faq">) {
  const k = item.keywords.map((x) => x.toLowerCase());
  const modes: string[] = [];
  if (k.some((x) => x.includes("near me") || x === "nearby" || x === "location")) modes.push("Local discovery");
  if (k.some((x) => x.includes("price") || x === "buy" || x === "best" || x === "shopping")) modes.push("Comparison & purchase");
  if (k.some((x) => x.includes("review") || x === "rating")) modes.push("Evaluation & reviews");
  if (k.some((x) => x.includes("calculator") || x === "convert" || x === "converter")) modes.push("Calculation & conversion");
  if (k.some((x) => x.includes("download") || x === "online" || x === "tool")) modes.push("Action & utility");
  if (k.some((x) => x.includes("guide") || x === "how-to" || x === "help" || x === "information")) modes.push("Information & guidance");
  for (const fallback of ["Discovery & information", "Practical next steps", "Action-focused search"]) {
    if (modes.length >= 3) break;
    if (!modes.includes(fallback)) modes.push(fallback);
  }
  return [...new Set(modes)].slice(0, 4);
}
function buildUseCases(item: Omit<KeywordCategory, "catch" | "thumbnail" | "intentModes" | "useCases" | "faq">) {
  const primary = item.keywords[0] ?? item.name.toLowerCase();
  return [`Find useful ${primary} information or options`, `Compare ${primary} results using a more specific modifier`, `Move from a ${primary} search to a practical online action`];
}
function buildFaq(item: Omit<KeywordCategory, "catch" | "thumbnail" | "intentModes" | "useCases" | "faq">) {
  const primary = item.keywords[0] ?? item.name.toLowerCase();
  return [`What should I include when searching for ${primary}?`, `Which ${primary} search modifiers make the intent more specific?`, `Can an online tool help with a ${primary} task?`];
}
export const keywordCategories: KeywordCategory[] = rawKeywordCategories.map((item) => ({
  ...item,
  catch: categoryCatch[item.slug] ?? `Explore ${item.name.toLowerCase()} with clearer search intent.`,
  thumbnail: categoryThumb[item.slug] ?? item.icon,
  intentModes: buildIntentModes(item),
  useCases: buildUseCases(item),
  faq: buildFaq(item),
}));

export const keywordCategoryCount = keywordCategories.length;
