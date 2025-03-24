# 🚀 LogixFleet Stripe-style Dashboard UI (React)

## 🌟 Overview

This project is a **Stripe-inspired financial dashboard** built using **React**. It is designed to be **modular, scalable, and responsive**, with a focus on delivering a **clean UI and a great user experience**.

---

## 🛠️ Tech Stack & Design Decisions

### **Frontend**
- **React**: Functional components with Hooks for state management.
- **Tailwind CSS**: Chosen for rapid development and consistent styling.
- **Recharts / Chart.js**: Used for rendering revenue trend charts.
- **React Router**: For page navigation and routing.
- **shadcn/ui or Chakra UI**: Used for UI components to ensure consistency and accessibility.

### **Data Handling**
- **Mock Data**: Used for transactions and customers via JSON.
- **json-server / Mock Service Worker**: Can be used for API simulation.

### **UX & Design Choices**
- **Stripe-Like UI**: Clean and modern layout inspired by Stripe's dashboard.
- **Responsiveness**: Works across all screen sizes with a mobile-friendly design.
- **Smooth Interactions**: Hover effects, transitions, and sticky navigation for a polished experience.
- **Pagination & Filtering**: Allows easy navigation of large datasets.
- **Loading & Empty States**: Ensures a user-friendly experience even when data is not available.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Guantaijp/logixfleet-frontend
cd logixfleet-dashboard
```

### 2️⃣ Install Dependencies
```sh
pnpm install 
```
### 3️⃣ Run the Development Server
```sh
pnpm run dev 
```
## 🚀 Features

### **Dashboard Overview**
- Displays **Total Revenue, Payments, and Revenue Trends**.
- Lists **Recent Transactions** with customer details.

### **Customers Page**
- Shows a searchable, filterable **customer list** with total spending.
- Clickable profiles with **customer details**.

### **Payments Page**
- Displays **all transactions** in a paginated table.
- Ability to **filter payments** by status (e.g., succeeded, failed).

### **Additional UX Enhancements**
- **Sticky navigation & smooth transitions**.
- **Consistent typography & spacing** for a professional look.
- **Loading states** for a better user experience.

---

## 🔥 Future Enhancements

While this project meets the core requirements, here are some potential improvements for future iterations:

✅ **Better Data Handling** – Replace mock data with a real backend API to enable dynamic content.  
✅ **Unit & Integration Tests** – Improve reliability by implementing tests using Jest & React Testing Library.  
✅ **Accessibility Enhancements** – Enhance keyboard navigation and screen reader support for an inclusive experience.  

