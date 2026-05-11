/**
 * Seed Script — populates MongoDB with all 15 original blog posts
 * and creates the default admin user.
 *
 * Run with:  npm run seed   (from /server directory)
 */

require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const Post = require("../models/Post");
const User = require("../models/User");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file.");
  process.exit(1);
}

const posts = [
  {
    title: "Radhe Shyam, Pushpa 2 & Other Biggies To Take Tollywood A Step Higher In 2022",
    description: "A look at Tollywood's biggest releases of 2022 including Radhe Shyam and Pushpa 2.",
    content: "Radhe Shyam is a period romance that has been written and directed by Radha Krishna Kumar. The story of the film is set in the Europe of the 1970s and it has been simultaneously shot in Telugu and Hindi. It stars Pooja Hegde as Prerana, Prabhas as Vikramaditya and Krishnam Raju as Paramahamsa alongside Sachin Khedekar, Murali Sharma, Bhagyashree, Kunaal Roy Kapur, Priyadarshi, Sasha Chettri and Sathyan Sivakumar as supporting characters. Radhe Shyam has been produced under the banners of T-Series and UV Creations and the Hindi version is distributed by AA Films.",
    img: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/01/overcoming-the-odds-tollywood-eyes-2022-with-relish-001.jpg",
    category: "tollywood",
    tags: ["tollywood", "movies", "2022"],
  },
  {
    title: "Pushpa Box Office Day 23: Picks Up Terrifically On 4th Saturday",
    description: "Allu Arjun's Pushpa: The Rise is roaring ahead at the box office.",
    content: "Allu Arjun's Pushpa: The Rise is roaring ahead at the box office, 25 days on. Reportedly, the film has grossed Rs 100 crore in the Hindi belt alone. Pushpa Hindi will start streaming on Amazon Prime Video on January 14. Pushpa: The Rise has become a phenomenon, and Allu Arjun, a force to reckon with. The film's meteoric success at the box office despite competition from films 83 and Spider-Man: No Way Home, is simply outstanding. Reportedly, the film has crossed the Rs 325 crore-mark, but doesn't look like it is in any mood to slow down.",
    img: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/01/pushpa-to-cross-250-crore-mark-today-001.jpg",
    category: "tollywood",
    tags: ["tollywood", "pushpa", "boxoffice"],
  },
  {
    title: "Delay In RRR Release, A Blessing In Disguise For Other Tollywood Films",
    description: "SS Rajamouli's RRR postponed — here's how it benefits other Telugu films.",
    content: "Filmmaker S.S Rajamouli announced on January 1, that his much-awaited Pan India project 'RRR' will not be hitting theatres on January 7 due to the rise of Covid-19 cases and theatres being shut in major markets of Mumbai and Delhi. Within the next 48 hours, as many as five Telugu films announced their release dates around January 14, making it a Makar Sankranthi release. Experts reveal that with a major player like Jr NTR and Ram Charan's 'RRR' off the grid, it is a favourable situation for Telugu films that target mostly Telangana and Andhra Pradesh film market.",
    img: "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2020/10/rrr-1601963942.jpg",
    category: "tollywood",
    tags: ["rrr", "tollywood", "rajamouli"],
  },
  {
    title: "Go Girl: Tollywood Heroines Get A Professional Identity Finally",
    description: "Tollywood heroines are gaining professional identity — but is the change enough?",
    content: "Satyadev's Skylab is all set for its OTT Release. SonyLIV bagged the rights of the film and has lined up the OTT Premiere. The film will be out on January 14th as Sankranthi Special. The official announcement has been made. Tollywood heroines are finally being recognised for their professional contributions beyond just glamour roles, marking a significant shift in the industry.",
    img: "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/1/1/w900X450/Go_Girl.jpg?w=640&dpr=1.3",
    category: "tollywood",
    tags: ["tollywood", "heroines", "women"],
  },
  {
    title: "Samsung Galaxy S22 Series Video Leak Shows Off Design of 3 Models Ahead of Launch",
    description: "A leaked video reveals the design of all three Samsung Galaxy S22 models.",
    content: "Samsung Galaxy S22 series is not yet officially confirmed by the South Korean tech brand, even though leaks and renders have been in abundance. Samsung's new non-foldable flagship lineup is expected to include the vanilla Samsung Galaxy S22 model, alongside the Galaxy S22+ and Galaxy S22 Ultra models. In a new update, a video has now surfaced online showing the design of the three flagship smartphones. The design of the smartphones shown in the video is similar to the ones which appeared in earlier reports. Separately, a tipster has leaked specifications of Galaxy S22 and Galaxy S22 Ultra models including the presence of a 'SuperClear Lens'.",
    img: "https://cdn.mos.cms.futurecdn.net/VwjTHyddx9VjNiz7bt3c7Y-1024-80.jpeg.webp",
    category: "technology",
    tags: ["samsung", "galaxy", "smartphone"],
  },
  {
    title: "OnePlus 10 Pro Front Design Teased Ahead of January 11 Launch",
    description: "OnePlus reveals the front design of the OnePlus 10 Pro before its official launch.",
    content: "OnePlus 10 Pro front design has been revealed in a new teaser ahead of its official launch. The smartphone appears to have a curved-edge display, which looks similar to the OnePlus 9 Pro. The OnePlus 10 Pro is also teased to debut as the first phone to run on ColorOS 12.1. Although the launch of the new OnePlus phone is still a week away, the Chinese company has continued its trend of creating hype for its next-generation flagship by announcing its features on social media.",
    img: "https://i.gadgets360cdn.com/large/oneplus_10_pro_front_design_image_weibo_1641793339547.jpg?downsize=950:*",
    category: "technology",
    tags: ["oneplus", "smartphone", "android"],
  },
  {
    title: "Intel Core i9-12900KS Announced at CES With Massive 5.5GHz Clock Speed",
    description: "Intel's new flagship CPU hits 5.5GHz on a single core at CES 2022.",
    content: "Intel Core i9-12900KS was announced by the company at CES 2022. The 12th Gen Intel Core 'Alder Lake' CPU offers a 5.5GHz boost clock speed on a single core. The new Intel Core i9-12900KS is also capable of functioning at 5.2GHz on all cores while performing heavy multi-core tasks, according to the company. This is the first Special Edition processor for desktops from Intel since the Core i9-9900KS in 2019 and will be available to manufacturers in Q1 2022.",
    img: "https://i.gadgets360cdn.com/large/intel_core_i9_12900ks_intel_youtube_1641564934678.jpg?downsize=950:*",
    category: "technology",
    tags: ["intel", "cpu", "ces2022"],
  },
  {
    title: "Fire-Boltt Ninja 2 Budget Smartwatch With 30 Sports Modes Launched in India",
    description: "Fire-Boltt launches an affordable smartwatch with SpO2 tracking and 30 sports modes.",
    content: "Fire-Boltt Ninja 2, the newest smartwatch from the popular wearables brand is now official in India. The budget smartwatch features a 1.3-inch touch screen display and a blood oxygen saturation (SpO2) monitor. It also comes with inbuilt arcade-style games. Fire-Boltt Ninja 2 offers 30 sports modes and is claimed to have a battery life of up to 7 days when in use and a standby time of up to 25 days.",
    img: "https://i.gadgets360cdn.com/large/fire_boltt_ninja_2_smartwatch_website_1641540469956.jpg?downsize=950:*",
    category: "technology",
    tags: ["smartwatch", "wearable", "india"],
  },
  {
    title: "Non-Traditional Ways to Bag Data Science Job Roles in 2022",
    description: "How hackathons, networking, and portfolios can land you a data science job.",
    content: "A job role as a data scientist is a dream for many. But in 2022, the traditional ways of getting into analytics is just not enough. Even after your concepts are crystal clear, an aspiring data scientist cannot expect to land their desired jobs just by applying when they see job openings. Hackathons and competitions are a great way to test one's own skills and understand what is needed out of you as a data scientist. Kaggle has emerged as a go-to platform for aspiring data scientists as well as those who are already in the profession to prove their skills and compete with like-minded people.",
    img: "https://149695847.v2.pressablecdn.com/wp-content/uploads/2022/01/non-trad.jpg",
    category: "jobs",
    tags: ["datascience", "career", "jobs"],
  },
  {
    title: "Jobs: Cognizant Invites Applications From Graduates in Hyderabad",
    description: "Cognizant is hiring process executives in Hyderabad — good news for job seekers.",
    content: "Hyderabad: Good news for job seekers who are looking for customer service jobs in Hyderabad as Cognizant, an American-based multinational company, has invited applications from graduates for process executive posts. In order to be eligible for the posts, the candidates must hold a graduate degree other than B. Tech, B.E., and MCA. High school graduates are also eligible for the recruitment. Selected candidates will have the responsibility of providing support to customers through call, chat, and email.",
    img: "https://cdn.siasat.com/wp-content/uploads/2020/03/Cognizant-Chennai.webp",
    category: "jobs",
    tags: ["cognizant", "hyderabad", "fresher"],
  },
  {
    title: "Jobs in Hyderabad: Apprentice Jobs at HAL — Qualifications and Application Process",
    description: "Hindustan Aeronautics Limited is hiring apprentices in Hyderabad.",
    content: "Hindustan Aeronautics Limited has issued a notification for the replacement of multiple posts in Hyderabad. Through this notification, Technician Apprentice Trainee and Graduate Apprentice Trainee jobs will be filled. The notification details for this post need to be downloaded after registering on the official website. Without any examination, HAL will replace these posts on academic merit basis only. Selected candidates will be given a stipend of Rs. 8,000 to Rs. 9,000 depending on the post.",
    img: "https://images.news18.com/telugu/uploads/2022/01/HAL-Jobs-16416411333x2.jpg?impolicy=website&width=509&height=339",
    category: "jobs",
    tags: ["hal", "government", "apprentice"],
  },
  {
    title: "IT Jobs: Good News for Freshers — Capgemini Off Campus Drive Details",
    description: "Capgemini is hosting an off-campus drive for 2019 and 2020 engineering graduates.",
    content: "Capgemini, Multi National Information Technology Company, says good news for the unemployed. Off campus drive will be conducted for engineering students who have completed graduation in 2019 or 2020. This will create large scale job opportunities for freshers. Capgemini currently operates in 13 cities with over 1,50,000 employees. The company has offices in Bangalore, Bhubaneswar, Chennai, Coimbatore, Gandhinagar, Gurugram, Hyderabad, Kolkata, Mumbai, Noida, Pune, Salem and Tiruchirappalli.",
    img: "https://images.news18.com/telugu/uploads/2022/01/capgemini_1583049452007_1641716280065-16417963133x2.jpg?impolicy=website&width=509&height=339",
    category: "jobs",
    tags: ["capgemini", "it", "fresher"],
  },
  {
    title: "These Malayalis Make Christmas Clean and Green",
    description: "How Malayali communities are making Christmas celebrations eco-friendly.",
    content: "Green is the way to celebrate festivals in these days of climate emergency, but not everyone takes the effort for it. However, these Malayalis found ways to make Christmas eco-friendly and also help others do the same. Muhamma in Alappuzha district is known for coir making and a handful of youngsters there, belonging to St George Church's Yuvadeepthi group, made an eco-friendly star that suits the spirit of their place. Made of 40 kg coir, the star is 22 feet tall and was made in about 10 days.",
    img: "https://static.toiimg.com/thumb/msid-88500584,imgsize-282902,width-400,resizemode-4/88500584.jpg",
    category: "nature",
    tags: ["nature", "ecofriendly", "christmas"],
  },
  {
    title: "Fire Accident Act of God Only If Caused by Natural Force",
    description: "Supreme Court rules on when fire accidents qualify as 'acts of God'.",
    content: "NEW DELHI: The Supreme Court has held that only those fire accidents could be termed acts of God which is inevitable and caused by external natural force and not due to active or passive negligence of human being. A force majeure clause or act of God is one exception that releases the party of its contractual obligations to an extent when events beyond their control take place and leave them unable to perform their part of the contract.",
    img: "https://static.toiimg.com/thumb/msid-88744684,imgsize-116232,width-400,resizemode-4/88744684.jpg",
    category: "nature",
    tags: ["nature", "law", "india"],
  },
  {
    title: "Natural Eco-Friendly Fibre Weaves Its Way Into Surat's Poly Textile Hub",
    description: "Surat's textile industry is embracing plant-based fibres from pineapple, banana, and bamboo.",
    content: "SURAT: With the world consciously trying to leave at least one carbon footprint less in the sands of time, Surat's textile hub, known for its polyester products, too is making efforts into weaving a greener thinking by adopting plant-based materials. After introducing plant-based cupro fibre and viscose rayon, the city is now experimenting with fibre and yarn sourced from pineapple, birch wood, banana and bamboo. Few of the products are researched and developed locally, while some innovations made abroad are also trying to find its footing in the man-made fabric hub.",
    img: "https://static.toiimg.com/thumb/msid-88218300,imgsize-165476,width-400,resizemode-4/88218300.jpg",
    category: "nature",
    tags: ["nature", "textile", "sustainability"],
  },
];

const seed = async () => {
  await connectDB();
  console.log("🌱 Starting seed...");

  try {
    // Clear existing data
    await Post.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️  Cleared existing posts and users.");

    // Create admin user
    const admin = await User.create({
      name: "Punna ManiKumar",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(`👤 Admin created: ${admin.email}`);

    // Insert posts individually to trigger the 'pre-save' slug hook
    for (const p of posts) {
      await Post.create({ ...p, author: admin._id });
    }
    console.log(`📝 Inserted ${posts.length} posts.`);

    console.log("\n✅ Seed complete!");
    console.log(`   Admin Email:    ${ADMIN_EMAIL}`);
    console.log(`   Admin Password: ${ADMIN_PASSWORD}`);
    console.log("   ⚠️  Change the admin password after first login!\n");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    mongoose.disconnect();
  }
};

seed();
