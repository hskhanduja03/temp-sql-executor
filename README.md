# ⚡ SQL Runner  
> **A Web-Based SQL Query Executor**  

SQL Runner is a **web-based SQL execution tool** that allows users to execute SQL queries efficiently. It provides an **intuitive interface**, **real-time query execution**, **query history tracking**, and **query library management**, making it useful for **developers and data analysts**.  

---

## ✨ Features
 
### 🔹 **Real-Time Query Execution & Results**
- Users receive **instant query results** after execution along with the query execution time.
- The system **formats and displays results** in an easy-to-read tabular format.
- Users can **export filtered data** in **CSV and JSON** formats.
- Features include **searching, filtering, and sorting** query results.

### 🔹 **Query Library Management**
Users can **save queries** in a library for quick access and reuse, improving efficiency and organization.  

### 🔹 **Query History Tracking**
The system maintains a **history of executed queries**, enabling users to revisit and re-run previous commands without retyping them.  

### 🔹 **Code Editor with Syntax Highlighting**
The query editor uses **Monaco Editor**, the same editor used in VS Code, providing:
- **Syntax highlighting** for SQL.

### 🔹 **File Upload & Dataset Preview**
- Users can upload files and **preview datasets** before execution.
- The system allows **searching, filtering, and sorting** within uploaded datasets.
- **Export functionality** is available for filtered datasets.

---

## 🛠️ Tech Stack & Dependencies

- **React.js** – JavaScript library for building user interfaces.
- **Monaco Editor** – The powerful text editor from VS Code, offering syntax highlighting.
- **Vite** – A fast build tool to enhance development speed.
- **React-Toastify** – Used for user notifications.
- **Lodash** – Utilized for **debouncing** user inputs in the query editor.
- **Papaparse** – For parsing CSV files.
- **File Saver** – Helps with exporting query results and filtered data.


---

## 🖼️ Screenshots

<div align="center">

### 🔹 **Lighthouse Performance - Before & After**
<img src="public/Lighthouse%20-%20Before.png" width="400" height="500" alt="Lighthouse Before">  
<img src="public/Lighthouse%20-%20After.png" width="400" height="500" alt="Lighthouse After">  

### 🔹 **Load Time - Before & After**
<img src="public/Load%20Time%20-%20Before.png" width="400" height="500" alt="Load Time Before">  
<img src="public/Load%20Time%20-%20After.png" width="400" height="500" alt="Load Time After">  

### 🔹 **Component Render Time (using Profiler) - Before & After**
<img src="public/Profiler%20-%20Before.png" width="400" height="500" alt="Profiler Before">  
<img src="public/Profiler%20-%20After.png" width="400" height="500" alt="Profiler After">  

</div>

---


## 🚀 Performance & Load Time Optimization

### 🔍 **Measuring Page Load Time**
To evaluate SQL Runner’s performance, various tools and techniques were used:
- **Lighthouse in Chrome DevTools** – Provided performance insights and calculated the **Largest Contentful Paint (LCP)** at approximately **2s**.
- **React Profiler** – Showed that the **App component** was taking around **18s** to render initially due to inefficient state management.

### ⚡ **Optimizations Implemented**
To enhance performance and reduce the initial load time:
1. **Global Context for State Management** – Previously, the `App` component acted as a mediator for state changes between child components. Moving the state to a **global context** (`useContext`) significantly reduced render time to **1.3ms**.
2. **Debouncing in QueryEditor** – Since Monaco Editor updates the state frequently, **Lodash debouncing (300ms delay)** was applied to minimize unnecessary re-renders.
3. **Using Fragments** – Avoided extra DOM nodes for better efficiency.
4. **Lazy Loading in App.js** – Components are loaded only when required, reducing the initial bundle size.
5. **Layout & Children Format for Routing** – The sidebar remains persistent, and only the `Outlet` components get re-rendered instead of the entire layout.
6. **Memoization in PreviewTable** –
   - Wrapped the component with `React.memo` to prevent unnecessary re-renders.
   - Used `useMemo` to optimize expensive calculations like sorting, pagination, and generating page numbers.
   - Ensured recalculations occur only when dependencies (`filteredData`, `sortConfig`, `pageIndex`, `pageSize`) change.

---

## 📷 Performance Results (Before & After Optimization)

| Metric | Before Optimization | After Optimization |
|--------|--------------------|------------------|
| **React Profiler (App Component Render Time)** | ~18s | **1.3ms** |
| **Largest Contentful Paint (LCP)** | ~2s | **Reduced significantly** |
| **Lighthouse Performance Score** | **Moderate** | **Improved** |

By implementing these optimizations, SQL Runner now delivers a **faster and more responsive experience**, making query execution seamless for users.

---

## 📜 Conclusion
SQL Runner is a **powerful, web-based SQL execution tool** designed for efficiency and usability. With **advanced optimizations** in place, it ensures minimal load time, optimized state management, and a seamless querying experience.

🚀 **Try it out and experience fast SQL execution with a smooth user interface!**

