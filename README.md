# 🗺️ Hotel Map Tool

The **Hotel Map Tool** is a web application that helps users explore and locate hotels, guest houses, hostels, and motels around any given coordinate using **OpenStreetMap** and **Overpass API**. It includes features such as clustering markers and persistent map position using local storage.

---

## 📁 Project Structure

- `index.html` – Main HTML file that sets up the page layout and loads external Leaflet libraries.
- `style.css` – Stylesheet for layout and UI styling.
- `script.js` – Core JavaScript logic for map interaction, hotel fetching, and marker clustering.

---

## 🚀 Features

- Input fields to enter latitude and longitude and jump to a location.
- Displays hotels and similar accommodations on an interactive map.
- Uses **Overpass API** to dynamically fetch data from OpenStreetMap.
- Clusters nearby hotel markers for cleaner visualization.
- Remembers last searched coordinates using **localStorage**.
- Clean and responsive UI using pure HTML & CSS.

---

## 🌐 Technologies Used

- **HTML5** – Page structure
- **CSS3** – Styling and layout
- **JavaScript (ES6)** – App logic
- **Leaflet.js** – Interactive maps
- **Overpass API** – Fetch hotel data from OpenStreetMap
- **Leaflet.markercluster** – Cluster nearby map markers

---

## 📦 How to Use

1. Clone this repository or [download ZIP](https://github.com/your-username/your-repo-name).
2. Ensure the following files are in the same folder:
   - `index.html`
   - `style.css`
   - `script.js`
3. Open `index.html` in a modern web browser.
4. Enter coordinates (latitude and longitude) and click **Enter**.
5. Pan or zoom the map to update nearby hotel listings.

---

## 📍 Example Coordinates

- Jaipur, India:  
  - Latitude: `26.9124`  
  - Longitude: `75.7873`

---

## 📌 Author

Made by **Mitul Agarwal**

---

## ⚠️ Note

- An active internet connection is required to load the map and fetch data from the Overpass API.
- No backend or database is used — everything runs in the browser.

