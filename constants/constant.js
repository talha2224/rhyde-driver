import profile_image from "../assets/images/profile_photo.png";

export const notificationsData = [
  {
    id: "1",
    category: "today",
    type: "payment_success",
    title: "Payment success",
    description: "You just made a payment for taxi",
  },
  {
    id: "2",
    category: "today",
    type: "new_services",
    title: "New services are now available",
    description: "You can now track your drivers",
  },
  {
    id: "3",
    category: "today",
    type: "new_services",
    title: "New services are now available",
    description: "You can now track your drivers",
  },
  {
    id: "4",
    category: "yesterday",
    type: "payment_success",
    title: "Payment success",
    description: "You just made a payment for taxi",
  },
  {
    id: "5",
    category: "yesterday",
    type: "new_services",
    title: "New services are now available",
    description: "You can now track your drivers",
  },
  {
    id: "6",
    category: "yesterday",
    type: "new_services",
    title: "New services are now available",
    description: "You can now track your drivers",
  },
];

export const rideHistoryData = [
  {
    id: "1",
    type: "store",
    title: "Fashion Store",
    address: "45, Jos Avenue 34 Crescent",
    price: "$40.6",
  },
  {
    id: "2",
    type: "home",
    title: "Home",
    address: "45, Jos Avenue 34 Crescent",
    price: "$34.78",
  },
  {
    id: "3",
    type: "home",
    title: "Home",
    address: "45, Jos Avenue 34 Crescent",
    price: "$34.78",
  },
  {
    id: "4",
    type: "home",
    title: "Home",
    address: "45, Jos Avenue 34 Crescent",
    price: "$34.78",
  },
  {
    id: "5",
    type: "home",
    title: "Home",
    address: "45, Jos Avenue 34 Crescent",
    price: "$34.78",
  },
  {
    id: "6",
    type: "school",
    title: "School",
    address: "45, Jos Avenue 34 Crescent",
    price: "$16.00",
  },
];

export const transactionsData = [
  {
    id: "1",
    icon: "car-side",
    iconColor: "#FF6347", // Tomato
    title: "Ryde Payment – Compact SUV",
    date: "3 June, 2025",
    time: "8:04 PM",
    amount: "$40.79",
  },
  {
    id: "2",
    icon: "credit-card-outline",
    iconColor: "#4682B4", // SteelBlue
    title: "Ryde Credits Purchase",
    date: "3 June, 2025",
    time: "8:04 PM",
    amount: "$40.79",
  },
  {
    id: "3",
    icon: "gift-outline",
    iconColor: "#DAA520", // Goldenrod
    title: "Referral Bonus – Level 2",
    date: "3 June, 2025",
    time: "8:04 PM",
    amount: "$40.79",
  },
  {
    id: "4",
    icon: "calendar-check",
    iconColor: "#6A5ACD", // SlateBlue
    title: "Subscription Renewal",
    date: "3 June, 2025",
    time: "8:04 PM",
    amount: "$40.79",
  },
  {
    id: "5",
    icon: "hand-coin",
    iconColor: "#3CB371", // MediumSeaGreen
    title: "MLM Earnings - May Total",
    date: "3 June, 2025",
    time: "8:04 PM",
    amount: "$40.79",
  },
];

export const paymentMethods = [
  { id: "1", name: "Paypal" },
  { id: "2", name: "Credit card/ Debit" },
  { id: "3", name: "Ryde Credits" },
  { id: "4", name: "Maurice" }, // As per image
];

export const ryderOptions = [
  {
    id: "1",
    name: "Saif",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
  },
  {
    id: "2",
    name: "John Mikel",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
  },
  {
    id: "3",
    name: "Justinah Christy",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
  },
  {
    id: "4",
    name: "Maurice",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
  },
];

export const rideScheduleOptions = [
  { id: "1", date: "Sat 12 April", time: "12 58 PM" },
  { id: "2", date: "Sun 13 April", time: "12 59 AM" },
  { id: "3", date: "Mon 14 April", time: "12 00 PM" },
  { id: "4", date: "Tues 15 April", time: "12 01 PM" },
  { id: "5", date: "Wed 16 April", time: "12 02 PM" },
];

export const rydesData = [
  {
    id: "1",
    name: "XL Intercity",
    distance: "10 Mins away",
    reviews: 120,
    price: "$34.60",
    color: "#FBB73A",
  },
  {
    id: "2",
    name: "Compact SUV",
    distance: "10 Mins away",
    reviews: 120,
    price: "$34.60",
    color: "#FBB73A",
  },
  {
    id: "3",
    name: "Full-Size SUV",
    distance: "10 Mins away",
    reviews: 120,
    price: "$34.60",
    color: "#FBB73A",
  },
  {
    id: "4",
    name: "Sport Car",
    distance: "10 Mins away",
    reviews: 120,
    price: "$34.60",
    color: "#FBB73A",
  },
];

export const driverDetails = {
  name: "Wilson Ezekiel",
  location: "Illinois, United States",
  rating: 4.7,
  rides: 359,
  yearsOfExp: 5,
  totalReviews: 205,
  carModel: "Lexus Es350",
  licenseNumber: "GR-34645-GHE",
  seats: 2,
  color: "Red",
  arrivalTime: "5 Mins away",
};

export const rideDetails = {
  pickup: "4517 Washington Ave. Manchester...",
  destination: "2118 Thornridge Cir. Syracuse...",
};

export const priceConfirmationDetails = {
  estimatedTime: "10 mins",
  additionalFare: "$250",
  totalFare: "$650",
};

export const BOOKING_STATES = {
  AWAITING_DRIVER: "awaitingDriver",
  DRIVER_ARRIVED: "driverArrived",
  LIVE_TRACKING: "liveTracking",
  ADD_STOP: "addStop",
  PRICE_CONFIRMATION: "priceConfirmation",
  STOP_ADDED: "stopAdded",
  RYDE_COMPLETED: "rydeCompleted",
};

export const cancellationReasons = [
  { id: "1", text: "I want to change details of this journey" },
  { id: "2", text: "The driver took long than expected" },
  { id: "3", text: "Wrong address" },
  { id: "4", text: "I don't want the journey" },
  { id: "5", text: "Driver denied coming to pickup" },
  { id: "6", text: "Others" },
];

export const rydeRequests = [
  {
    id: "1",
    name: "Alisha Mark",
    distance: "2.7KM",
    price: "$21",
    pickup: "4517 Washington Ave, Manchester",
    destination: "2118 Thornridge Cir, Syracuse, Con",
    avatar: profile_image,
  },
  {
    id: "2",
    name: "Mike",
    distance: "3.1KM",
    price: "$10",
    pickup: "123 Main St, Anytown",
    destination: "456 Oak Ave, Otherville",
    avatar: profile_image,
  },
  {
    id: "3",
    name: "Sarah",
    distance: "1.5KM",
    price: "$15",
    pickup: "789 Pine Ln, Somewhere",
    destination: "101 Elm Blvd, Nowhere",
    avatar: profile_image,
  },
];

export const userDetails = {
  name: "Paul Cleverly",
  location: "Kingston, Jamaica",
  rating: 4.8,
  numberOfTrips: 200,
  totalEarned: "$200",
};

export const reviewsData = {
  averageRating: 4.5,
  totalReviews: 12004,
  ratingsBreakdown: { 5: 85, 4: 9, 3: 4, 2: 2, 1: 1 },
  feedback: [
    {
      id: "1",
      userName: "Sammy Mahrex",
      tripId: "GFD6746DGUFVY3R",
      date: "30/03/25",
      comment:
        "The driver was calm, attentive and straightforward, I will recommend him any day anytime.",
    },
    {
      id: "2",
      userName: "Jim Hyke",
      tripId: "GFD6746DGUFVY3R",
      date: "30/03/25",
      comment: "Well reserved and composed in nature",
    },
    {
      id: "3",
      userName: "Michael",
      tripId: "GFD6746DGUFVY3R",
      date: "30/03/25",
      comment: "Well reserved and composed in nature",
    },
  ],
};

export const milestonesData = [
  {
    id: "1",
    level: 1,
    title: "2% off first ryde",
    reached: true,
    description: "You're currently in this level",
  },
  {
    id: "2",
    level: 10,
    title: "Free ryde for a day",
    reached: false,
    description: "Level 10",
    progress: "10/20 rides",
  },
  {
    id: "3",
    level: 20,
    title: "10% off ryde",
    reached: true,
    description: "You're currently in this level",
  },
  {
    id: "4",
    level: 30,
    title: "10% off first ryde for 48 hrs",
    reached: false,
    description: "Level 30",
  },
  {
    id: "5",
    level: 40,
    title: "10% off ryde",
    reached: false,
    description: "Level 40",
  },
];

export const menuItems = [
  {
    title: "My Profile",
    description: "Customize your app experience",
    icon: "account-details-outline",
    route: "/home/profile/singleprofile",
  },
  {
    title: "Settings",
    description: "Customize your app experience",
    icon: "cog-outline",
    route: "/home/profile/setting",
  },
  {
    title: "Notifications",
    description: "Stay updated on your trips",
    icon: "bell-outline",
    route: "/home/profile/notification",
  },
  {
    title: "Payment methods",
    description: "Manage your payout",
    icon: "credit-card-outline",
    route: "/home/profile/paymentmethod",
  },
  {
    title: "Vehicle information",
    description: "Manage your vehicle",
    icon: "car",
    route: "/home/profile/vehicleinformation",
  },
    {
    title: "Emergency",
    description: "",
    icon: "phone",
    route: "/home/profile/emergency",
  },
  {
    title: "Customer Support",
    description: "Chat with our customer support",
    icon: "lifebuoy",
    route: "/home/profile/support",
  },
  {
    title: "Subscription",
    description: "Subscribe to our premium plan",
    icon: "tag-heart-outline",
    route: "/home/profile/subscription",
  },
  {
    title: "Report a problem",
    description: "Let's help you experience the best",
    icon: "alert-circle-outline",
    route: "/home/profile/report",
    danger: true,
  },
  {
    title: "Logout",
    description: "",
    icon: "logout",
    route: "/",
    danger: true,
  },
];
