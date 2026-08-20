// Food Database from Python code
const foodDatabase = {
    "oats": { calories: 150, protein: 5, icon: 'fa-bowl-rice' },
    "roti": { calories: 100, protein: 3, icon: 'fa-bread-slice' },
    "dal": { calories: 180, protein: 9, icon: 'fa-bowl-food' },
    "rice": { calories: 200, protein: 4, icon: 'fa-bowl-rice' },
    "soya chunks": { calories: 170, protein: 25, icon: 'fa-seedling' },
    "egg": { calories: 70, protein: 6, icon: 'fa-egg' },
    "milk": { calories: 120, protein: 6, icon: 'fa-glass-water' }
};

// State Variables
let userProfile = JSON.parse(localStorage.getItem('nutrifit_user')) || null;
let dailyLog = JSON.parse(localStorage.getItem('nutrifit_log')) || { consumedCalories: 0, consumedProtein: 0, items: [] };
let profileChartInstance = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    initNavigation();
    populateFoodDropdown();
    if (userProfile) {
        updateProfileUI();
        updateTrackerUI();
    }

    // Form Submissions
    document.getElementById('profile-form').addEventListener('submit', handleProfileSubmit);
    document.getElementById('food-form').addEventListener('submit', handleFoodAdd);
    document.getElementById('reset-log').addEventListener('click', resetDailyLog);
    
    // Reset App Data
    const resetAppBtn = document.getElementById('reset-app');
    if (resetAppBtn) {
        resetAppBtn.addEventListener('click', () => {
            if (confirm("WARNING: This will permanently delete your profile configuration and logs. Proceed?")) {
                localStorage.removeItem('nutrifit_user');
                localStorage.removeItem('nutrifit_log');
                location.reload();
            }
        });
    }

    // Budget Buttons
    const budgetBtns = document.querySelectorAll('.budget-btn');
    budgetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            budgetBtns.forEach(b => b.classList.remove('active'));
            const targetBtn = e.target.closest('.budget-btn');
            targetBtn.classList.add('active');
            showBudgetSuggestions(parseInt(targetBtn.dataset.budget));
        });
    });
});

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Navigation Logic
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.dataset.target;
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === targetId) {
                    section.classList.add('active-section');
                }
            });
        });
    });
}

// Profile Logic
function handleProfileSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseInt(document.getElementById('activity').value);

    const heightMeter = height / 100;
    const bmi = weight / (heightMeter * heightMeter);
    
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    let calories = weight * 24;
    if (activity === 2) calories += 300;
    else if (activity === 3) calories += 600;

    userProfile = {
        name, age, gender, weight, height,
        BMI: parseFloat(bmi.toFixed(2)),
        "BMI Category": category,
        "Daily Calories": calories
    };

    localStorage.setItem('nutrifit_user', JSON.stringify(userProfile));
    updateProfileUI();
    updateTrackerUI();
    updateGreeting();
    showToast('Configuration Saved Successfully', 'success');
}

function updateGreeting() {
    const greetingEl = document.getElementById('greeting-title');
    if (!greetingEl) return;
    
    const hour = new Date().getHours();
    let timeGreeting = 'Good Evening';
    if (hour < 12) timeGreeting = 'Good Morning';
    else if (hour < 18) timeGreeting = 'Good Afternoon';

    if (userProfile && userProfile.name) {
        greetingEl.innerHTML = `${timeGreeting}, ${userProfile.name.split(' ')[0]}`;
    } else {
        greetingEl.innerHTML = `Welcome to NutriFit`;
    }
}

function updateProfileUI() {
    if (!userProfile) return;

    document.getElementById('name').value = userProfile.name;
    document.getElementById('age').value = userProfile.age;
    document.getElementById('gender').value = userProfile.gender || 'Male';
    document.getElementById('weight').value = userProfile.weight;
    document.getElementById('height').value = userProfile.height;
    
    let activityVal = 1;
    let baseCal = userProfile.weight * 24;
    if(userProfile["Daily Calories"] == baseCal + 300) activityVal = 2;
    if(userProfile["Daily Calories"] == baseCal + 600) activityVal = 3;
    document.getElementById('activity').value = activityVal;

    // Professional Abstract Avatar Icon
    const genderIcon = userProfile.gender === 'Female' 
        ? '<i class="fa-solid fa-user" style="font-size:32px; color:var(--accent-blue); background: var(--bg-main); border: 1px solid var(--border-light); padding: 20px; border-radius: 50%;"></i>' 
        : '<i class="fa-solid fa-user" style="font-size:32px; color:var(--accent-blue); background: var(--bg-main); border: 1px solid var(--border-light); padding: 20px; border-radius: 50%;"></i>';
    
    const detailsDiv = document.getElementById('profile-details');
    detailsDiv.innerHTML = `
        <div style="display:flex; align-items:center; gap:16px; margin-bottom: 24px;">
            ${genderIcon}
            <div>
                <h3 style="font-size: 18px; font-weight: 500;">${userProfile.name}</h3>
                <p style="color: var(--text-secondary); font-size: 13px;">${userProfile.gender}, ${userProfile.age} yrs</p>
            </div>
        </div>
    ` + Object.entries(userProfile).filter(([k]) => k !== 'name' && k !== 'gender' && k !== 'age').map(([key, value]) => `
        <div class="profile-item">
            <span class="profile-key">${key.toUpperCase()}</span>
            <span class="profile-value">${key === 'Daily Calories' ? value + ' kcal' : value}</span>
        </div>
    `).join('');

    document.querySelector('.chart-container').style.display = 'block';
    renderChart();
}

function renderChart() {
    const ctx = document.getElementById('profileChart').getContext('2d');
    
    if (profileChartInstance) {
        profileChartInstance.destroy();
    }

    Chart.defaults.color = '#71717a';
    Chart.defaults.font.family = "'Inter', sans-serif";

    profileChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Weight (kg)', 'BMI', 'Daily Target'],
            datasets: [{
                data: [userProfile.weight, userProfile.BMI, userProfile["Daily Calories"]],
                backgroundColor: [
                    '#3b82f6', // Blue
                    '#10b981', // Emerald
                    '#8b5cf6'  // Violet
                ],
                borderWidth: 2,
                borderColor: '#18181b',
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, padding: 15, font: {size: 12} } },
                tooltip: {
                    backgroundColor: '#18181b',
                    titleColor: '#a1a1aa',
                    bodyColor: '#fafafa',
                    borderColor: '#27272a',
                    borderWidth: 1,
                    padding: 10,
                    bodyFont: {size: 13},
                    callbacks: {
                        label: function(context) {
                            return ' ' + context.label + ': ' + context.formattedValue;
                        }
                    }
                }
            }
        }
    });
}

// Budget Meal Logic
function showBudgetSuggestions(choice) {
    const resultsDiv = document.getElementById('budget-results');
    let items = [];

    if (choice === 1) {
        items = [
            {name: 'Roti (4x)', icon: 'fa-bread-slice', price: 8},
            {name: 'Rice (1 plate)', icon: 'fa-bowl-rice', price: 15},
            {name: 'Dal (1 bowl)', icon: 'fa-bowl-food', price: 10},
            {name: 'Chana / Salad', icon: 'fa-seedling', price: 5},
            {name: 'Peanuts (50g)', icon: 'fa-leaf', price: 2},
            {name: 'Banana (2x)', icon: 'fa-apple-whole', price: 5}
        ];
    } else if (choice === 2) {
        items = [
            {name: 'Oats (1 bowl)', icon: 'fa-bowl-rice', price: 15},
            {name: 'Milk (500ml)', icon: 'fa-glass-water', price: 20},
            {name: 'Mixed Fruits', icon: 'fa-apple-whole', price: 15},
            {name: 'Paneer (100g)', icon: 'fa-cheese', price: 20},
            {name: 'Soya Chunks', icon: 'fa-seedling', price: 10}
        ];
    } else if (choice === 3) {
        items = [
            {name: 'Eggs (4x)', icon: 'fa-egg', price: 16},
            {name: 'Paneer (200g)', icon: 'fa-cheese', price: 40},
            {name: 'Soya Chunks', icon: 'fa-seedling', price: 10},
            {name: 'Dry Fruits', icon: 'fa-leaf', price: 30},
            {name: 'High Protein Chicken', icon: 'fa-drumstick-bite', price: 60}
        ];
    }

    const totalCost = items.reduce((sum, item) => sum + item.price, 0);

    resultsDiv.innerHTML = `
        <ul class="results-list">
            ${items.map(item => `
                <li>
                    <i class="fa-solid ${item.icon}"></i>
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">₹${item.price}</span>
                    </div>
                </li>
            `).join('')}
        </ul>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
            <span style="color: var(--text-secondary); font-size: 14px;">Estimated Daily Total</span>
            <span style="font-size: 20px; font-weight: 600; color: var(--text-primary);">₹${totalCost}</span>
        </div>
    `;
}

// Calorie Tracker Logic
function populateFoodDropdown() {
    const select = document.getElementById('food-item');
    select.innerHTML = Object.keys(foodDatabase).map(food => 
        `<option value="${food}">${food.charAt(0).toUpperCase() + food.slice(1)} (${foodDatabase[food].calories} kcal)</option>`
    ).join('');
}

function handleFoodAdd(e) {
    e.preventDefault();
    if (!userProfile) {
        showToast("Configuration required before logging.", 'error');
        return;
    }

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    const data = foodDatabase[foodItem];
    const addCalories = data.calories * quantity;
    const addProtein = data.protein * quantity;

    dailyLog.consumedCalories += addCalories;
    dailyLog.consumedProtein += addProtein;
    dailyLog.items.push({ 
        name: foodItem, 
        quantity, 
        calories: addCalories, 
        protein: addProtein,
        icon: data.icon 
    });

    localStorage.setItem('nutrifit_log', JSON.stringify(dailyLog));
    updateTrackerUI();
    showToast(`Logged ${quantity}x ${foodItem}`, 'success');
}

function updateTrackerUI() {
    if (!userProfile) return;

    const remCalories = Math.max(0, userProfile["Daily Calories"] - dailyLog.consumedCalories);
    
    const remEl = document.getElementById('rem-calories');
    remEl.textContent = remCalories;
    
    if(remCalories === 0 && dailyLog.consumedCalories > userProfile["Daily Calories"]) {
        remEl.style.color = 'var(--danger)';
    } else {
        remEl.style.color = 'var(--text-primary)';
    }
    
    document.getElementById('tot-protein').textContent = dailyLog.consumedProtein + "g";

    const logList = document.getElementById('log-list');
    if (dailyLog.items.length === 0) {
        logList.innerHTML = `<div class="empty-state small"><p>No entries recorded today.</p></div>`;
    } else {
        const reversedItems = [...dailyLog.items].reverse();
        logList.innerHTML = reversedItems.map(item => `
            <li class="log-item">
                <div style="display:flex; align-items:center; gap:12px;">
                    <i class="fa-solid ${item.icon}" style="color:var(--text-muted)"></i>
                    <span class="food-name">${item.quantity}x ${item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                </div>
                <span class="food-macros">${item.calories} kcal | ${item.protein}g P</span>
            </li>
        `).join('');
    }
}

function resetDailyLog() {
    if(dailyLog.items.length === 0) return;
    
    if(confirm("Are you sure you want to clear today's history?")) {
        dailyLog = { consumedCalories: 0, consumedProtein: 0, items: [] };
        localStorage.setItem('nutrifit_log', JSON.stringify(dailyLog));
        updateTrackerUI();
        showToast('History cleared', 'success');
    }
}
