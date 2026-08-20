# Student-Nutrition, BMI & Budget Tracker
import matplotlib.pyplot as plt
import json
food_database = {"oats": {"calories": 150,"protein": 5},
    "roti": {"calories": 100,"protein": 3},
    "dal": {"calories": 180,"protein": 9},
    "rice": {"calories": 200,"protein": 4},
    "soya chunks": {"calories": 170,"protein": 25},
    "egg": {"calories": 70,"protein": 6},
    "milk": { "calories": 120,"protein": 6}
}
# Function to save user data in JSON file
def save_data(data):
    file = open("user_data.json", "w")
    json.dump(data, file, indent=4)
    file.close()
# Function to load previous user data
def load_data():
    try:
        file = open("user_data.json", "r")
        data = json.load(file)
        file.close()
        return data
    except:
        return {}
# BMI Calculator Function
def calculate_bmi():
    print("\n--- Create Student Profile ---")
    name = input("Enter name: ")
    age = int(input("Enter age: "))
    weight = float(input("Enter weight (kg): "))
    height = float(input("Enter height (cm): "))
    print("""
Activity Level:
1. Sedentary
2. Light Active
3. Very Active
""")
    activity = int(input("Choose activity level: "))
# Convert height cm into meter
    height_meter = height / 100
# BMI Formula
    bmi = weight / (height_meter * height_meter)
# BMI Category
    if bmi < 18.5:
        category = "Underweight"
    elif bmi < 25:
        category = "Normal"
    elif bmi < 30:
        category = "Overweight"
    else:
        category = "Obese"
# Simple calorie maintenance formula
    calories = weight * 24
    if activity == 2:
        calories = calories + 300
    elif activity == 3:
        calories = calories + 600
    user = {
        "name": name,
        "age": age,
        "weight": weight,
        "height": height,
        "BMI": round(bmi,2),
        "BMI Category": category,
        "Daily Calories": calories
    }
    save_data(user)
    print("\nProfile Saved Successfully!")
    print("BMI:", round(bmi,2))
    print("Category:", category)
    print("Daily Calories:", calories)
def show_profile_table():
    user = load_data()
    if user == {}:
        print("No Profile Found!")
        return
    print("\n" + "="*55)
    print("{:<20} {:<25}".format("FIELD", "VALUE"))
    print("="*55)
    for key, value in user.items():
        print("{:<20} {:<25}".format(key, str(value)))
    print("="*55)
def show_piechart():
    user = load_data()
    if user == {}:
        print("No Profile Found!")
        return
    labels = ["Weight", "BMI", "Calories"]
    values = [user["weight"], user["BMI"], user["Daily Calories"]]
    plt.pie(values, labels=labels)
    plt.title("Student Nutrition Report")
    plt.show()
# Budget Meal Suggestion Function
def meal_suggestion():
    print("""
Choose Student Budget:
1. Low Budget (Hostel/Mess)
2. Medium Budget (Pocket Money)
3. High Budget (Gym/Fitness)
""")
    choice = int(input("Enter choice: "))
    if choice == 1:
        print("""
Recommended Foods:
- Roti
- Rice
- Dal
- Chana
- Peanuts
- Banana
""")
    elif choice == 2:
        print("""
Recommended Foods:
- Oats
- Milk
- Fruits
- Paneer
- Soya Chunks
""")
    elif choice == 3:
        print("""
Recommended Foods:
- Eggs
- Paneer
- Soya Chunks
- Dry Fruits
- High Protein Meals
""")
    else:
        print("Invalid Choice")
# Daily Calorie Tracker Function
def calorie_meter():
    user = load_data()
    if user == {}:
        print("Create your profile first!")
        return
    remaining_calories = user["Daily Calories"]
    total_protein = 0
    while True:
        print("\n========== FOOD MENU ==========")
        for food in food_database:
            print("-", food)
        print("-------------------------------")
        item = input("Enter food name (or type stop): ").lower()
        if item == "stop":
            break
        if item in food_database:
            quantity = int(input("How many servings? "))
            calories = food_database[item]["calories"] * quantity
            protein = food_database[item]["protein"] * quantity
            remaining_calories -= calories
            total_protein += protein
            print("\nFood Added Successfully!")
            print("Food :", item.title())
            print("Quantity :", quantity)
            print("Calories Added :", calories)
            print("Protein Added :", protein, "g")
        else:
            print("Food not found!")
    print("\n========== DAILY REPORT ==========")
    print("Remaining Calories :", remaining_calories)
    print("Total Protein Consumed :", total_protein, "g")
    user = load_data()
    if user == {}:
        print("Create your profile first!")
        return
    remaining_calories = user["Daily Calories"]
    total_protein = 0
    while True:
        print("\nAvailable Foods:")
        for food in food_database:
            print("-",food)
        item = input(
        "\nEnter food eaten (or type stop): "
        ).lower()
        if item == "stop":
            break
        if item in food_database:
            remaining_calories -= food_database[item]["calories"]
            total_protein += food_database[item]["protein"]
            print("Food Added!")
        else:
            print("Food not available")
    print("\n------Daily Report------")
    print("Remaining Calories:",remaining_calories)
    print("Protein Consumed:",total_protein,"grams")
# Show User Profile
def show_profile():
    user = load_data()
    if user == {}:
        print("No Profile Found")
    else:
        print("\nStudent Profile")
        for key,value in user.items():
            print(key,":",value)
# Main Menu
while True:
    print("""
==============================
STUDENT NUTRITION TRACKER
==============================
1. Create Profile + BMI
2. Budget Meal Suggestion
3. Daily Calorie Meter
4. Show Profile
5. Exit

""")
    try:
        choice = int(input("Enter your choice: "))
    except ValueError:
        print("Please enter numbers only.")
        continue
    if choice == 1:
            calculate_bmi()
            show_profile_table()
            show_piechart()
    elif choice == 2:
            meal_suggestion()
    elif choice == 3:
            calorie_meter()
    elif choice == 4:
            show_profile()
    elif choice == 5:
            print("Thank you for using tracker!")
            break
    else:
         print("Wrong Choice")