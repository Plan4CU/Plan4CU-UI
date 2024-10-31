const mockData = {
    schools: {
        "CC": { school_name: "College of Arts and Sciences" },
        "SEAS": { school_name: "School of Engineering and Applied Science" },
        "GS": { school_name: "Graduate School of Arts and Sciences" }
    },
    majors: {
        "COMS": { major_name: "Computer Science", school_id: "SEAS" },
        "MATH": { major_name: "Mathematics", school_id: "CC" },
        "ECON": { major_name: "Economics", school_id: "GS" },
        "PHYS": { major_name: "Physics", school_id: "CC" }
    },
    professors: {
        "Donald Ferguson": {
            p_uni: "dff9",
            first_name: "Donald",
            last_name: "Ferguson",
            courses: [
                { course_id: "COMS4111W", course_name: "Introduction to Databases", credits: 3 }
            ],
            school: "SEAS"
        },
        "George Dragomir": {
            p_uni: "gd2572",
            first_name: "George",
            last_name: "Dragomir",
            courses: [
                { course_id: "MATH1101UN", course_name: "Calculus I", credits: 3 }
            ],
            school: "CC"
        },
        "Sunil Gulati": {
            p_uni: "skg21",
            first_name: "Sunil",
            last_name: "Gulati",
            courses: [
                { course_id: "ECON1105UN", course_name: "Principles of Economics", credits: 4 }
            ],
            school: "GS"
        },
        "Eric Raymer": {
            p_uni: "er2741",
            first_name: "Eric",
            last_name: "Raymer",
            courses: [
                { course_id: "PHYS1201UN", course_name: "General Physics I", credits: 3 }
            ],
            school: "CC"
        },
        "Brian Borowski": {
            p_uni: "bsb2151",
            first_name: "Brian",
            last_name: "Borowski",
            courses: [
                { course_id: "COMS3134W", course_name: "Data Structures in Java", credits: 3 }
            ],
            school: "SEAS"
        },
        "Paul Blaer": {
            p_uni: "psb15",
            first_name: "Paul",
            last_name: "Blaer",
            courses: [
                { course_id: "COMS3137W", course_name: "Honors Data Structures & Algorithms", credits: 4 }
            ],
            school: "SEAS"
        }
    }
};

document.getElementById("submitBtn").addEventListener("click", function() {
    const professorName = document.getElementById("professorName").value.trim();
    const subjectName = document.getElementById("subjectName").value.trim();
    document.getElementById("professorSuggestions").classList.add("hidden");
    document.getElementById("subjectSuggestions").classList.add("hidden");

    if (professorName && subjectName) {
        checkProfessorCourse(professorName, subjectName);
    } else if (professorName) {
        showProfessorCourses(professorName);
    } else if (subjectName) {
        showCourseProfessors(subjectName);
    } else {
        alert("Please enter a professor's name or course name.");
    }
});

document.getElementById("resetBtn").addEventListener("click", function() {
    document.getElementById("professorName").value = "";
    document.getElementById("subjectName").value = "";
    document.getElementById("resultList").innerHTML = "";
    document.getElementById("resultContainer").classList.add("hidden");
    document.getElementById("professorSuggestions").classList.add("hidden");
    document.getElementById("subjectSuggestions").classList.add("hidden");
});

function showProfessorCourses(professorName) {
    const resultList = document.getElementById("resultList");
    const resultContainer = document.getElementById("resultContainer");
    resultList.innerHTML = "";

    if (mockData.professors[professorName]) {
        const professor = mockData.professors[professorName];
        const schoolName = mockData.schools[professor.school].school_name;

        const schoolItem = document.createElement("li");
        schoolItem.textContent = `School: ${schoolName}`;
        resultList.appendChild(schoolItem);

        professor.courses.forEach(course => {
            const courseNameItem = document.createElement("li");
            courseNameItem.textContent = `Course: ${course.course_name} (${course.course_id})`;
            resultList.appendChild(courseNameItem);

            const creditsItem = document.createElement("li");
            creditsItem.textContent = `Credits: ${course.credits}`;
            resultList.appendChild(creditsItem);
        });
    } else {
        resultList.innerHTML = `<li>No professor found with the name "${professorName}".</li>`;
    }
    resultContainer.classList.remove("hidden");
}

function showCourseProfessors(subjectName) {
    const resultList = document.getElementById("resultList");
    const resultContainer = document.getElementById("resultContainer");
    resultList.innerHTML = "";

    const professorsTeachingCourse = Object.keys(mockData.professors).filter(professor =>
        mockData.professors[professor].courses.some(course => course.course_name === subjectName)
    );

    if (professorsTeachingCourse.length > 0) {
        professorsTeachingCourse.forEach(professorName => {
            const professor = mockData.professors[professorName];
            const course = professor.courses.find(c => c.course_name === subjectName);
            const schoolName = mockData.schools[professor.school].school_name;

            const professorItem = document.createElement("li");
            professorItem.textContent = `Professor: ${professorName}`;
            resultList.appendChild(professorItem);

            const schoolItem = document.createElement("li");
            schoolItem.textContent = `School: ${schoolName}`;
            resultList.appendChild(schoolItem);

            const creditsItem = document.createElement("li");
            creditsItem.textContent = `Credits: ${course.credits}`;
            resultList.appendChild(creditsItem);
        });
    } else {
        resultList.innerHTML = `<li>No professors found for the course "${subjectName}".</li>`;
    }
    resultContainer.classList.remove("hidden");
}


function checkProfessorCourse(professorName, subjectName) {
    const resultList = document.getElementById("resultList");
    const resultContainer = document.getElementById("resultContainer");
    resultList.innerHTML = "";

    if (mockData.professors[professorName]) {
        if (mockData.professors[professorName].courses.some(course => course.course_name === subjectName)) {
            const listItem = document.createElement("li");
            listItem.textContent = subjectName;
            resultList.appendChild(listItem);
        } else {
            resultList.innerHTML = `<li>${professorName} does not teach "${subjectName}".</li>`;
        }
    } else {
        resultList.innerHTML = `<li>No professor found with the name "${professorName}".</li>`;
    }
    resultContainer.classList.remove("hidden");
}

document.getElementById("professorName").addEventListener("input", function() {
    const input = this.value.trim();
    const suggestions = document.getElementById("professorSuggestions");
    suggestions.innerHTML = "";

    if (input) {
        Object.keys(mockData.professors).forEach(prof => {
            if (prof.toLowerCase().includes(input.toLowerCase())) {
                const suggestionItem = document.createElement("div");
                suggestionItem.textContent = prof;
                suggestionItem.onclick = () => {
                    document.getElementById("professorName").value = prof;
                    suggestions.classList.add("hidden");
                };
                suggestions.appendChild(suggestionItem);
            }
        });
        suggestions.classList.remove("hidden");
    } else {
        suggestions.classList.add("hidden");
    }
});

document.getElementById("subjectName").addEventListener("input", function() {
    const input = this.value.trim();
    const suggestions = document.getElementById("subjectSuggestions");
    suggestions.innerHTML = "";

    if (input) {
        const uniqueCourses = new Set(Object.values(mockData.professors).flatMap(professor => professor.courses.map(course => course.course_name)));
        uniqueCourses.forEach(course => {
            if (course.toLowerCase().includes(input.toLowerCase())) {
                const suggestionItem = document.createElement("div");
                suggestionItem.textContent = course;
                suggestionItem.onclick = () => {
                    document.getElementById("subjectName").value = course;
                    suggestions.classList.add("hidden");
                };
                suggestions.appendChild(suggestionItem);
            }
        });
        suggestions.classList.remove("hidden");
    } else {
        suggestions.classList.add("hidden");
    }
});
