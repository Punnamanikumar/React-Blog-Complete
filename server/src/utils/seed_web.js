require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Post = require("../models/Post");
const User = require("../models/User");

const posts = [
  // TECHNOLOGY
  {
    title: "Apple Announces Revolutionary AI Integration in iOS 18",
    description: "The highly anticipated iOS 18 update brings deep on-device AI capabilities, transforming how users interact with Siri and native apps.",
    content: "In a landmark announcement, Apple has revealed iOS 18, featuring profound artificial intelligence integration across the entire operating system. Unlike cloud-reliant competitors, Apple is leveraging its powerful Neural Engine to process complex AI tasks directly on the iPhone. This means enhanced privacy and lightning-fast responses. Siri has been completely overhauled to understand contextual nuances and perform multi-step actions within third-party apps. Additionally, the Photos app now features generative editing capabilities, allowing users to seamlessly remove objects and alter backgrounds with a simple tap.",
    img: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&q=80",
    category: "technology",
    tags: ["apple", "ai", "ios18", "smartphone"],
  },
  {
    title: "Quantum Computing Breakthrough Achieved by Google Labs",
    description: "Researchers have maintained stable qubits for record-breaking durations, signaling a massive leap towards practical quantum computers.",
    content: "Google's Quantum AI division has published a paper demonstrating a massive leap in quantum error correction. By logically grouping physical qubits, the team successfully created a 'logical qubit' that exhibits unprecedented stability. Previously, quantum states were too fragile for sustained calculation. This breakthrough drastically reduces the error rate, bringing the tech industry significantly closer to commercially viable quantum computing. Experts predict this could revolutionize fields from cryptography to molecular modeling for drug discovery.",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    category: "technology",
    tags: ["quantum", "computing", "google", "science"],
  },
  {
    title: "Nvidia Unveils Next-Gen Blackwell Architecture GPUs",
    description: "The new Blackwell chips promise to accelerate AI training by up to 4x while consuming significantly less power.",
    content: "Dominating the AI hardware space, Nvidia has officially unveiled its Blackwell GPU architecture. Designed specifically for training trillion-parameter large language models, the Blackwell chips offer staggering performance improvements over their Hopper predecessors. The flagship B200 GPU packs 208 billion transistors and introduces a second-generation transformer engine. CEO Jensen Huang emphasized that Blackwell is not just a chip, but an entire platform designed to make generative AI accessible and sustainable by drastically reducing energy consumption.",
    img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    category: "technology",
    tags: ["nvidia", "gpu", "ai", "hardware"],
  },
  {
    title: "The Rise of Spatial Computing: Vision Pro One Year Later",
    description: "An in-depth look at how developers are utilizing Apple's Vision Pro headset to create entirely new paradigms in software.",
    content: "One year after the launch of the Apple Vision Pro, the landscape of 'spatial computing' is beginning to mature. While initial adoption was hindered by the high price point, enterprise applications have exploded. Surgeons are using custom AR apps to overlay MRI scans during operations, and architects are conducting immersive walk-throughs of unbuilt skyscrapers. The developer ecosystem has shifted focus from simple 2D ports to rich, volumetric experiences, suggesting that mixed reality may indeed be the next major computing platform.",
    img: "https://placehold.co/800x500/333333/FFFFFF?text=Vision+Pro",
    category: "technology",
    tags: ["vr", "ar", "apple", "visionpro"],
  },

  // TOLLYWOOD
  {
    title: "Pushpa 2: The Rule Breaks Box Office Records on Opening Weekend",
    description: "Allu Arjun's highly anticipated sequel has shattered global box office records, cementing his status as a pan-India superstar.",
    content: "The wait is over, and 'Pushpa 2: The Rule' has arrived like a hurricane at the global box office. Directed by Sukumar, the sequel takes the gritty saga of Pushpa Raj to an international scale. The film grossed a staggering ₹150 crore worldwide on its first day, surpassing all previous Indian cinema records. Critics have praised Allu Arjun's intense performance and the high-octane action sequences. The Hindi dubbed version alone contributed massively, proving that the boundary between regional and national cinema has completely dissolved.",
    img: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80",
    category: "tollywood",
    tags: ["tollywood", "pushpa2", "alluarjun", "movies"],
  },
  {
    title: "SS Rajamouli's SSMB29 Begins Pre-Production in Africa",
    description: "The visionary director's next globe-trotting adventure starring Mahesh Babu is officially underway.",
    content: "Following the historic Oscar win for 'RRR', director S.S. Rajamouli is gearing up for his next magnum opus, tentatively titled 'SSMB29', starring Mahesh Babu. Sources confirm that the pre-production team has flown to the deep jungles of Africa to scout locations for the film, which is described as an Indiana Jones-style jungle adventure. Mahesh Babu is reportedly undergoing a massive physical transformation for the role. The film is expected to be the most expensive Indian film ever produced, with a truly global casting approach.",
    img: "https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?w=800&q=80",
    category: "tollywood",
    tags: ["rajamouli", "maheshbabu", "tollywood", "upcoming"],
  },
  {
    title: "Kalki 2898 AD: Redefining Indian Sci-Fi Cinema",
    description: "Nag Ashwin's dystopian epic brings together mythological elements and futuristic visuals in a cinematic spectacle.",
    content: "Prabhas and Amitabh Bachchan star in 'Kalki 2898 AD', a film that is fundamentally altering the landscape of Indian VFX. Directed by Nag Ashwin, the film masterfully blends elements of the Mahabharata with a dystopian, Blade Runner-esque future. The intricate world-building of the city 'Kasi' and the stunning visual effects have garnered international acclaim. Industry analysts note that 'Kalki' represents a significant leap forward for Tollywood's technical capabilities, proving that Indian studios can deliver Hollywood-level spectacles.",
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    category: "tollywood",
    tags: ["kalki2898ad", "prabhas", "scifi", "vfx"],
  },
  {
    title: "Rise of OTT Originals in Telugu Entertainment",
    description: "Streaming platforms are investing heavily in local talent, leading to a golden age of Telugu web series.",
    content: "The landscape of Telugu entertainment is rapidly evolving as global streaming giants like Netflix, Amazon Prime, and Aha ramp up their investment in regional original content. Shows like 'Dhootha' and 'Save the Tigers' have proven that there is a massive appetite for long-form, narrative-driven content outside of the traditional theater experience. This shift is providing a platform for independent filmmakers and new actors to break into the industry without the pressure of box office constraints.",
    img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
    category: "tollywood",
    tags: ["ott", "webseries", "telugu", "entertainment"],
  },

  // NATURE
  {
    title: "Global Initiative Launched to Restore Amazon Rainforest",
    description: "A coalition of South American nations and international NGOs pledge $50 billion to halt deforestation and restore crucial biomes.",
    content: "In a historic summit held in Brazil, an international coalition has launched the 'Amazon Renaissance' initiative. Backed by $50 billion in funding over the next decade, the project aims to completely halt illegal logging and actively replant millions of hectares of degraded land. The initiative utilizes satellite monitoring and AI to track deforestation in real-time, allowing authorities to deploy rapid response teams. Indigenous leaders are at the forefront of the restoration efforts, combining traditional ecological knowledge with modern conservation science.",
    img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    category: "nature",
    tags: ["amazon", "rainforest", "conservation", "climate"],
  },
  {
    title: "New Species of Deep-Sea Bioluminescent Jellyfish Discovered",
    description: "Marine biologists exploring the Marianas Trench have documented a mesmerizing new species that emits neon-blue light.",
    content: "During a deep-sea exploration mission utilizing the latest autonomous submersibles, researchers at the Oceanographic Institute have discovered a new species of jellyfish at depths exceeding 6,000 meters. The species, tentatively named 'Aequorea neonis', possesses a unique bioluminescent protein that emits a pulsating, neon-blue light. Scientists believe this light is used to attract prey in the pitch-black environment of the abyssal zone. The discovery highlights how much of the Earth's oceans remain completely unexplored.",
    img: "https://placehold.co/800x500/000066/FFFFFF?text=Jellyfish",
    category: "nature",
    tags: ["ocean", "marinebiology", "discovery", "jellyfish"],
  },
  {
    title: "Renewable Energy Surpasses Fossil Fuels in European Grid",
    description: "For the first time in history, wind and solar power have generated more electricity than fossil fuels across Europe over a full year.",
    content: "A major milestone in the fight against climate change has been reached: renewable energy sources, primarily wind and solar, have officially surpassed fossil fuels in European electricity generation. According to the European Energy Commission, renewables accounted for 52% of the total grid output last year. This rapid transition has been driven by massive investments in offshore wind farms in the North Sea and widespread adoption of residential solar panels. Analysts predict this trend will only accelerate as battery storage technology improves.",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    category: "nature",
    tags: ["renewable", "energy", "climatechange", "europe"],
  },
  {
    title: "The Remarkable Resurgence of the Bengal Tiger",
    description: "Conservation efforts in India yield massive success as the tiger population sees a 30% increase over the last four years.",
    content: "The National Tiger Conservation Authority of India has released its latest census data, revealing a spectacular 30% increase in the Bengal tiger population over the past four years. The success is attributed to rigorous anti-poaching laws, the expansion of protected tiger reserves, and community-based conservation programs that incentivize local villages to protect the wildlife. This remarkable resurgence offers a glimmer of hope for endangered species worldwide, proving that dedicated human intervention can reverse the tide of extinction.",
    img: "https://placehold.co/800x500/ff9900/FFFFFF?text=Bengal+Tiger",
    category: "nature",
    tags: ["tiger", "wildlife", "conservation", "india"],
  },

  // JOBS
  {
    title: "Tech Industry Hiring Rebounds with Focus on AI Specialists",
    description: "After a year of consolidation, major tech firms are ramping up hiring, specifically targeting machine learning and AI ethics experts.",
    content: "The tech job market is experiencing a massive resurgence. After a period of industry-wide layoffs and restructuring, companies ranging from startups to FAANG giants are aggressively hiring again. However, the focus has shifted dramatically. Demand for prompt engineers, machine learning operations (MLOps) specialists, and AI ethics researchers is at an all-time high. Salaries for these specialized roles have skyrocketed, prompting many traditional software engineers to upskill rapidly through bootcamps and certifications.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    category: "jobs",
    tags: ["hiring", "tech", "ai", "careers"],
  },
  {
    title: "The 4-Day Workweek Becomes Standard in Scandinavian Tech",
    description: "Following highly successful trials, several major tech hubs in Sweden and Norway have permanently adopted a 32-hour workweek.",
    content: "The 4-day workweek movement has scored a massive victory in Scandinavia. Following extensive trials that showed no drop in productivity but massive increases in employee well-being, the majority of tech companies in Stockholm and Oslo have permanently implemented a 32-hour workweek with no reduction in pay. Companies report significant decreases in burnout and turnover. This shift is putting pressure on global corporations to adapt, as remote workers worldwide begin demanding similar work-life balance benefits.",
    img: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&q=80",
    category: "jobs",
    tags: ["worklifebalance", "careers", "scandinavia", "futureofwork"],
  },
  {
    title: "Green Collar Jobs: The New Boom in Employment",
    description: "As the world transitions to renewable energy, millions of new jobs are being created in solar installation, battery manufacturing, and grid modernization.",
    content: "A massive shift in the global workforce is underway with the explosion of 'Green Collar' jobs. As nations scramble to meet carbon-neutral targets, massive investments are flowing into the renewable sector. The demand for solar photovoltaic installers, wind turbine technicians, and electric vehicle battery engineers is far outpacing supply. Governments are heavily subsidizing vocational training programs to transition workers from declining fossil fuel industries into these high-growth, sustainable career paths.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    category: "jobs",
    tags: ["greenjobs", "employment", "renewable", "economy"],
  },
  {
    title: "Remote Work Is Here to Stay: Analyzing the Global Talent Pool",
    description: "A new study reveals that companies embracing permanent remote work are securing top talent significantly faster than office-bound competitors.",
    content: "Despite high-profile pushback from some traditional CEOs, a comprehensive study by the Global Labor Institute confirms that remote work is permanently reshaping the job market. Companies that offer fully remote or highly flexible hybrid models are hiring 40% faster and retaining employees 30% longer than those mandating a return to the office. The ability to hire from a global talent pool, rather than being restricted to a 50-mile radius of a headquarters, has given forward-thinking startups a massive competitive advantage.",
    img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
    category: "jobs",
    tags: ["remotework", "hiring", "careers", "business"],
  }
];

const runFreshSeed = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting fresh web data seed...");

    // 1. Delete all posts
    await Post.deleteMany({});
    console.log("🗑️  Deleted all existing posts.");

    // 2. Fetch admin user to attribute posts to
    const admin = await User.findOne({ email: "admin@thesiren.com" });
    if (!admin) {
      console.error("❌ Admin user not found. Please run the original seed script first.");
      process.exit(1);
    }

    // 3. Insert fresh posts
    console.log("⏳ Inserting new high-quality realistic web data...");
    for (const p of posts) {
      await Post.create({ ...p, author: admin._id });
    }

    console.log(`✅ Successfully seeded ${posts.length} new web posts!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

runFreshSeed();
