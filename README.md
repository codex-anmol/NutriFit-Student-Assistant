# 🥗 NutriFit Student Assistant

![NutriFit Banner](https://via.placeholder.com/1200x400.png?text=NutriFit+Student+Assistant)

NutriFit Student Assistant is a comprehensive, two-part application designed specifically for students to manage their daily nutrition, track calories, calculate BMI, and plan cost-effective meals. 

It provides both a **Web-based Dashboard** for a rich graphical interface and a **Python CLI Application** for fast, text-based tracking.

---

## ✨ Features

- **Profile & BMI Calculator**: Input your age, height, weight, and activity level to automatically calculate your BMI and daily caloric requirements.
- **Budget Meal Suggestions**: Get tailored meal plans based on your student budget (Low/Hostel, Medium, or High/Gym).
- **Daily Calorie Tracker**: Log your meals from a built-in food database and track remaining calories and total protein intake in real-time.
- **Dual Interfaces**:
  - 🖥️ **Web App**: Beautiful, responsive dashboard built with modern web technologies and Chart.js.
  - 💻 **CLI App**: Lightweight, robust terminal application written in Python.

---

## 📸 Screenshots

### Web Dashboard
![Dashboard Placeholder](https://via.placeholder.com/800x450.png?text=Web+Dashboard+Screenshot)

### Python CLI Interface
![CLI Placeholder](https://via.placeholder.com/800x450.png?text=CLI+Interface+Screenshot)

---

## 🛠 Technologies Used

**Web Dashboard:**
- HTML5 & CSS3 (Custom responsive design)
- Vanilla JavaScript
- [Chart.js](https://www.chartjs.org/) for data visualization
- [FontAwesome](https://fontawesome.com/) for UI icons

**CLI Application:**
- Python 3
- `matplotlib` for generating nutrition charts
- `json` for local data persistence

---

## 📂 Folder Structure

```text
NutriFit Student Assistant/
├── .gitignore
├── LICENSE
├── README.md
├── cli/
│   └── codeBasic.py         # Python Command-Line Application
└── web/
    ├── app.js               # Web App Logic
    ├── index.html           # Web App Interface
    └── style.css            # Web App Styling
```

---

## 🚀 Installation & Setup

### Requirements
- **Web App**: Any modern web browser.
- **CLI App**: Python 3.x and `matplotlib`.

### Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nutrifit-student-assistant.git
   cd nutrifit-student-assistant
   ```

2. **For the Web App:**
   Simply open `web/index.html` in your favorite web browser. No server required!

3. **For the CLI App:**
   Install the required Python packages (if not already installed):
   ```bash
   pip install matplotlib
   ```
   Then run the script:
   ```bash
   python cli/codeBasic.py
   ```

---

## 📖 Usage Guide

### Using the Web App
1. **Dashboard**: Fill out the configuration form to generate your profile.
2. **Meal Plans**: Navigate to the "Meal Plans" tab and select your budget tier to view recommendations.
3. **Calorie Log**: Navigate to the "Calorie Log" tab to add food entries and monitor your daily macronutrient summary.
4. *(Note: Data is saved locally in your browser via `localStorage`.)*

### Using the CLI App
1. Launch the script via your terminal.
2. Select `1` from the Main Menu to create your profile. This generates a `user_data.json` file to save your data.
3. Follow the on-screen prompts to log food, get budget meal suggestions, or view your BMI and calorie charts.

---

## 🧩 Project Architecture

- **Data Persistence (Web)**: Uses HTML5 `localStorage` for seamless, server-less data retention.
- **Data Persistence (CLI)**: Uses standard JSON serialization to save and load state from `user_data.json`.
- **Modularity**: The project cleanly separates the lightweight Python backend logic from the graphical web frontend.

---

## 🔮 Future Improvements

- Add more items to the food database.
- Implement user authentication for cloud syncing.
- Add historical tracking to view weekly/monthly progress.
- Implement a backend REST API (e.g., Flask or FastAPI) to connect the Web App and Python logic to a unified database.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/yourusername/nutrifit-student-assistant/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ✍️ Author & Contact

**Anmol Sharma**  
- GitHub: https://github.com/codex-anmol
- Email: anmolsharmaa88@gmail.com

---
*Made with ❤️ for students striving for a healthier lifestyle.*
