import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "isha.singh@example.com",
    fullName: "Isha Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg", // Update with a new image URL
  },
  {
    email: "priya.kumar@example.com",
    fullName: "Priya Kumar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg", // Update with a new image URL
  },
  {
    email: "neha.sharma@example.com",
    fullName: "Neha Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg", // Update with a new image URL
  },
  {
    email: "sanya.verma@example.com",
    fullName: "Sanya Verma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg", // Update with a new image URL
  },
  {
    email: "ananya.mishra@example.com",
    fullName: "Ananya Mishra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg", // Update with a new image URL
  },
  {
    email: "rhea.jha@example.com",
    fullName: "Rhea Jha",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg", // Update with a new image URL
  },
  {
    email: "kriti.agarwal@example.com",
    fullName: "Kriti Agarwal",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg", // Update with a new image URL
  },
  {
    email: "divya.patel@example.com",
    fullName: "Divya Patel",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg", // Update with a new image URL
  },

  // Male Users
  {
    email: "arjun.verma@example.com",
    fullName: "Arjun Verma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg", // Update with a new image URL
  },
  {
    email: "rahul.kumar@example.com",
    fullName: "Rahul Kumar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg", // Update with a new image URL
  },
  {
    email: "vivek.sharma@example.com",
    fullName: "Vivek Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg", // Update with a new image URL
  },
  {
    email: "ajay.patel@example.com",
    fullName: "Ajay Patel",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg", // Update with a new image URL
  },
  {
    email: "rohit.singh@example.com",
    fullName: "Rohit Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg", // Update with a new image URL
  },
  {
    email: "kartik.jha@example.com",
    fullName: "Kartik Jha",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg", // Update with a new image URL
  },
  {
    email: "manish.mishra@example.com",
    fullName: "Manish Mishra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg", // Update with a new image URL
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
