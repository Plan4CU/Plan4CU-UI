document.getElementById("submitBtn").addEventListener("click", function() {
    const professorName = document.getElementById("professorName").value.trim();
    
    if (professorName) {
        // For demonstration, simulate fetching data for the entered professor
        fetchCoursesForProfessor(professorName);
    } else {
        alert("Please enter a professor's name.");
    }
});

function fetchCoursesForProfessor(professorName) {
    // Example of mock course data (replace with actual API call)
    const mockCourses = {
        "Professor A": ["Intro to Python", "Data Structures", "Advanced Programming"],
        "Professor B": ["Discrete Math", "Algorithms", "Operating Systems"]
    };

    const courseList = document.getElementById("courseList");
    const resultContainer = document.getElementById("resultContainer");
    courseList.innerHTML = ""; // Clear previous results

    if (mockCourses[professorName]) {
        mockCourses[professorName].forEach(course => {
            const listItem = document.createElement("li");
            listItem.textContent = course;
            courseList.appendChild(listItem);
        });
        resultContainer.classList.remove("hidden"); // Show result container
    } else {
        resultContainer.classList.remove("hidden");
        courseList.innerHTML = "<li>No courses found for this professor.</li>";
    }
}
