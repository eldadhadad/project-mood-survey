window.addEventListener('load', function() {
    
    // --- חלק 1: טיפול בדף ההרשמה ---
    const regForm = document.getElementById('registrationForm');
    
    if (regForm) {
        regForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // שליפת נתונים מהשדות
            const fName = document.getElementById('firstName').value;
            const lName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // בדיקת מייל חוקי (Regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("נא להזין כתובת אימייל תקינה.");
                return; 
            }

            // בדיקת אורך סיסמה
            if (password.length < 6) {
                alert("הסיסמה חייבת להכיל לפחות 6 תווים.");
                return;
            }

            // שמירת המשתמש
            const user = {
                firstName: fName,
                lastName: lName,
                email: email
            };
            
            // המרת האובייקט לטקסט ושמירה
            localStorage.setItem('registeredUser', JSON.stringify(user));

            // וידוא הצלחה בלוג (לצורך בדיקה שלך)
            console.log("משתמש נשמר בהצלחה:", user);

            alert(`נרשמת בהצלחה, ${fName}!`);
            window.location.href = "homepage.html";
        });
    }

    // --- חלק 2: הצגת השם בדף הבית ---
    const welcomeArea = document.getElementById('welcomeArea');
    const savedUser = localStorage.getItem('registeredUser');

    if (welcomeArea) {
        if (savedUser) {
            const user = JSON.parse(savedUser);
            // מציג שם פרטי ושם משפחה כפי שביקשת
            welcomeArea.textContent = `שלום, ${user.firstName} ${user.lastName}! טוב לראות אותך.`;
        } else {
            welcomeArea.textContent = "שלום, אורח! נשמח אם תירשם למערכת.";
        }
    }
});