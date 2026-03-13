# 📸 Celebrare Photo Gallery

A responsive Photo Gallery Web App built with React, Vite, and Tailwind CSS.
This project was developed as part of the Celebrare Frontend Internship Pre-Screening Assignment.

The application fetches photos from the Picsum Photos API, displays them in a responsive grid, allows users to search by photographer, and lets them mark photos as favourites with persistence using localStorage.

## 🚀 Features

- Fetch photos from the Picsum Photos API
- Responsive image grid layout
- Real-time search filtering by photographer name
- Favourite photos with a heart toggle
- Favourite state managed using React useReducer
- Favourites persist using localStorage
- Custom React hook for API fetching
- Performance optimization using useMemo and useCallback
- Loading spinner while fetching data
- Error handling UI
- Image lazy loading and skeleton shimmer
- Smooth card animations and hover effects

## 🛠 Tech Stack

- React
- Vite
- TailwindCss
- Javascript
- Picsum API

## 📂 Project Structure

```
 .
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   └── favicon.svg
├── README.md
├── src
│   ├── App.jsx
│   ├── assets
│   ├── components
│   │   ├── Loading.jsx
│   │   ├── PhotoCard.jsx
│   │   ├── PhotoGrid.jsx
│   │   └── SearchBar.jsx
│   ├── hooks
│   │   └── useFetchPhotos.js
│   ├── index.css
│   ├── main.jsx
│   └── reducers
│       └── favouritesReducer.js
├── tailwind.config.js
└── vite.config.js
```

## ⚙️ Installation & Setup

```
 git clone https://github.com/Mayank9056-MM/celebrare-gallery
cd celebrare-gallery
```

```
 npm install
 npm run dev
```

## 👨‍💻 Author

`Mayank Mahajan`
