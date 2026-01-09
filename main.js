document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    // --- Mobile Nav Logic ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

// --- 1. Course Data (Fixed) ---
    const courseData = {
        algebra1: {
            title: 'Algebra 1',
            color: 'blue',
            description: 'Master the fundamentals of algebra, including variables, equations, and functions.',
            videoTitle: 'Introduction to Linear Equations',
            videoUrl: 'https://www.youtube.com/embed/fTvgHgS96Wk',
            quizTitle: 'Algebra Basics Quiz',
            quizQuestions: [
                { q: 'Solve for x: 2x + 5 = 15', options: ['5', '10', '2', '7.5'], correct: 0 },
                { q: 'What is the slope in y = 3x + 2?', options: ['2', '3', 'x', 'y'], correct: 1 },
                { q: 'Simplify: 3(x + 2)', options: ['3x + 2', '3x + 6', 'x + 6', '3x'], correct: 1 }
            ]
        },
        geometry: {
            title: 'Geometry',
            color: 'indigo',
            description: 'Explore the properties of shapes, sizes, relative positions, and dimensions of space.',
            videoTitle: 'The Pythagorean Theorem Explained',
            videoUrl: 'https://www.youtube.com/embed/AA6RfgP-AHU',
            quizTitle: 'Geometry Shapes Quiz',
            quizQuestions: [
                { q: 'What is the sum of angles in a triangle?', options: ['180°', '360°', '90°', '270°'], correct: 0 },
                { q: 'A square has a side length of 4. What is the area?', options: ['8', '12', '16', '64'], correct: 2 },
                { q: 'What do you call a triangle with 3 equal sides?', options: ['Isosceles', 'Scalene', 'Equilateral', 'Right'], correct: 2 }
            ]
        },
        algebra2: {
            title: 'Algebra 2',
            color: 'sky',
            description: 'Dive deeper into polynomial functions, rational expressions, and complex numbers.',
            videoTitle: 'Introduction to Polynomials',
            videoUrl: 'https://www.youtube.com/embed/ffLLmV4mZwU',
            quizTitle: 'Polynomials Quiz',
            quizQuestions: [
                { q: 'What is i squared equal to?', options: ['1', '-1', '0', 'undefined'], correct: 1 },
                { q: 'How many roots does x^2 - 9 = 0 have?', options: ['0', '1', '2', '3'], correct: 2 },
                { q: 'Expand (x+2)(x-2)', options: ['x^2+4', 'x^2-4', 'x^2+4x-4', 'x^2-2x'], correct: 1 }
            ]
        },
        precalculus: {
            title: 'Pre-Calculus',
            color: 'teal',
            description: 'Prepare for calculus with a focus on trigonometry, vectors, and limits.',
            videoTitle: 'Unit Circle and Trigonometry',
            videoUrl: 'https://www.youtube.com/embed/1-HRaJZAqY0',
            quizTitle: 'Trig Functions Quiz',
            quizQuestions: [
                { q: 'What is sin(90°)?', options: ['0', '1', '-1', '0.5'], correct: 1 },
                { q: 'Convert 180° to radians', options: ['π', '2π', 'π/2', '3π/2'], correct: 0 },
                { q: 'What is the period of y = sin(x)?', options: ['π', '2π', '4π', 'π/2'], correct: 1 }
            ]
        },
        calculus: {
            title: 'Calculus',
            color: 'purple',
            description: 'Understand the study of continuous change, including derivatives and integrals.',
            videoTitle: 'The Concept of the Derivative',
            videoUrl: 'https://www.youtube.com/embed/9vKqVkMQHKk',
            quizTitle: 'Derivatives Quiz',
            quizQuestions: [
                { q: 'What is the derivative of x^2?', options: ['x', '2x', '2', 'x^2'], correct: 1 },
                { q: 'What represents the area under a curve?', options: ['Derivative', 'Integral', 'Limit', 'Tangent'], correct: 1 },
                { q: 'Limit of 1/x as x approaches infinity?', options: ['0', '1', 'Infinity', 'Undefined'], correct: 0 }
            ]
        },
        statistics: {
            title: 'Statistics',
            color: 'slate',
            description: 'Learn techniques for collecting, analyzing, interpreting, and presenting data.',
            videoTitle: 'Mean, Median, and Mode',
            videoUrl: 'https://www.youtube.com/embed/5C9LBF3b65s',
            quizTitle: 'Data Analysis Quiz',
            quizQuestions: [
                { q: 'What is the average of 2, 4, 6?', options: ['2', '3', '4', '5'], correct: 2 },
                { q: 'Which value is the "middle" number?', options: ['Mean', 'Median', 'Mode', 'Range'], correct: 1 },
                { q: 'Probability of flipping heads on a coin?', options: ['25%', '50%', '75%', '100%'], correct: 1 }
            ]
        }
    };
// --- Course Card Interaction Logic ---
// --- Course Card Interaction Logic (UPDATED) ---
    const courseCards = document.querySelectorAll('.course-card');
    const learningScreen = document.getElementById('learning-screen');
    const backBtn = document.getElementById('back-to-courses');

    // DOM Elements for the Learning Screen
    const lsTitle = document.getElementById('ls-title');
    const lsDesc = document.getElementById('ls-description');
    const lsVideo = document.getElementById('ls-video');
    const lsMaterials = document.getElementById('ls-materials-list');
    const lsQuizContainer = document.getElementById('ls-quiz-container');
    const lsSubmitQuiz = document.getElementById('ls-submit-quiz');
    const lsQuizResult = document.getElementById('ls-quiz-result');

    // Helper: Switch Views
    const openLearningScreen = () => {
        pages.forEach(p => p.classList.remove('active'));
        learningScreen.classList.add('active');
        // Ensure the learning screen is visible by removing hidden class if present
        learningScreen.classList.remove('hidden');
        window.scrollTo(0, 0);
    };

    const closeLearningScreen = () => {
        learningScreen.classList.remove('active');
        learningScreen.classList.add('hidden');
        // Show the courses page again
        document.getElementById('courses').classList.add('active');
    };

    if (courseCards && learningScreen) {
        // 1. Handle Card Clicks
        courseCards.forEach(card => {
            card.addEventListener('click', () => {
                const courseKey = card.getAttribute('data-course');
                const data = courseData[courseKey];

                if (data) {
                    // Populate Main Info
                    lsTitle.textContent = data.title;
                    lsTitle.className = `text-3xl font-bold text-${data.color}-600`; 
                    lsDesc.textContent = data.description;
                    lsVideo.src = data.videoUrl;

                    // Populate Resources (Mock Data + Dynamic Color)
                    const resources = [
                        { name: 'Lecture Notes (PDF)', size: '2.4 MB' },
                        { name: 'Practice Worksheet', size: '1.1 MB' },
                        { name: 'Answer Key', size: '0.5 MB' },
                        { name: 'External Reference Guide', size: 'Link' }
                    ];
                    
                    lsMaterials.innerHTML = resources.map(res => `
                        <li class="group flex items-center justify-between p-3 rounded-lg hover:bg-${data.color}-50 cursor-pointer transition border border-transparent hover:border-${data.color}-100">
                            <div class="flex items-center">
                                <div class="bg-${data.color}-100 p-2 rounded-lg mr-3 text-${data.color}-600 group-hover:bg-white transition">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <span class="font-medium text-gray-700 group-hover:text-${data.color}-700">${res.name}</span>
                            </div>
                            <span class="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded">${res.size}</span>
                        </li>
                    `).join('');
                    // Populate Sidebar Quiz (Styled for Light Mode)
                    lsQuizContainer.innerHTML = '';
                    const miniQuiz = data.quizQuestions.slice(0, 2);
                    miniQuiz.forEach((q, idx) => {
                        lsQuizContainer.innerHTML += `
                            <div class="mb-5">
                                <p class="text-sm font-bold mb-2 text-gray-700 flex items-center">
                                    <span class="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center mr-2 border border-gray-200">${idx + 1}</span>
                                    ${q.q}
                                </p>
                                <div class="relative">
                                    <select id="ls-q-${idx}" data-correct="${q.correct}" class="w-full appearance-none bg-gray-50 hover:bg-white border border-gray-200 text-gray-700 text-sm rounded-xl p-3 pr-8 focus:ring-2 focus:ring-${data.color}-500 focus:border-${data.color}-500 transition-all cursor-pointer outline-none font-medium">
                                        <option value="">Select answer...</option>
                                        ${q.options.map((opt, optIdx) => `<option value="${optIdx}">${opt}</option>`).join('')}
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        `;
                    });

                    // Quiz Logic
                    lsSubmitQuiz.onclick = () => {
                        let score = 0;
                        const selects = lsQuizContainer.querySelectorAll('select');
                        selects.forEach(select => {
                            if (parseInt(select.value) === parseInt(select.dataset.correct)) score++;
                        });
                        lsQuizResult.textContent = `You got ${score} / ${selects.length} correct!`;
                        lsQuizResult.className = `mt-3 text-center font-bold block ${score === selects.length ? 'text-green-400' : 'text-yellow-400'}`;
                        lsQuizResult.classList.remove('hidden');
                    };

                    lsQuizResult.classList.add('hidden'); // Reset result
                    openLearningScreen();
                }
            });
        });

        // 2. Handle Back Button
        if (backBtn) {
            backBtn.addEventListener('click', closeLearningScreen);
        }
    }

    // Global Quiz Checker
    window.checkQuiz = function(courseKey) {
        const data = courseData[courseKey];
        let score = 0;
        const resultDiv = document.getElementById(`quiz-result-${courseKey}`);
        
        data.quizQuestions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q-${courseKey}-${index}"]:checked`);
            if (selected && parseInt(selected.value) === q.correct) {
                score++;
            }
        });

        resultDiv.textContent = `You scored ${score} out of ${data.quizQuestions.length}!`;
        resultDiv.className = `mt-4 text-center font-bold text-xl text-${data.color}-600 block animate-bounce`;
    };

    // --- Dashboard Data (Unchanged) ---
    const dashboardData = {
        quizScores: [
            { course: 'Algebra 1', title: 'Linear Equations Quiz', score: 9, total: 10, date: '2025-10-21', percentage: 90 },
            { course: 'Geometry', title: 'Angles and Triangles', score: 8, total: 10, date: '2025-10-20', percentage: 80 },
            { course: 'Algebra 2', title: 'Polynomial Functions', score: 7, total: 10, date: '2025-10-19', percentage: 70 },
            { course: 'Pre-Calculus', title: 'Trigonometric Functions', score: 10, total: 10, date: '2025-10-18', percentage: 100 },
            { course: 'Calculus', title: 'Derivatives Quiz', score: 8, total: 10, date: '2025-10-17', percentage: 80 },
            { course: 'Statistics', title: 'Mean and Standard Deviation', score: 9, total: 10, date: '2025-10-16', percentage: 90 }
        ],
        gameStats: [
            { name: 'Equation Challenge', gamesPlayed: 15, highScore: 420, avgScore: 310, lastPlayed: '2025-10-22' },
            { name: 'Geometry Dash', gamesPlayed: 13, highScore: 285, avgScore: 195, lastPlayed: '2025-10-21' },
            { name: 'Calculus Climber', gamesPlayed: 0, highScore: 0, avgScore: 0, lastPlayed: 'n/a' }
        ],
        courseProgress: [
            { course: 'Algebra 1', completed: 8, total: 10, percentage: 80, color: 'blue' },
            { course: 'Geometry', completed: 6, total: 10, percentage: 60, color: 'indigo' },
            { course: 'Algebra 2', completed: 5, total: 10, percentage: 50, color: 'blue' },
            { course: 'Pre-Calculus', completed: 7, total: 10, percentage: 70, color: 'teal' },
            { course: 'Calculus', completed: 4, total: 10, percentage: 40, color: 'purple' },
            { course: 'Statistics', completed: 9, total: 10, percentage: 90, color: 'slate' }
        ],
        lessons: [
            { id: 1, title: 'Introduction to Variables', course: 'Algebra 1', completed: true },
            { id: 2, title: 'Solving Linear Equations', course: 'Algebra 1', completed: true },
            { id: 3, title: 'Graphing Linear Functions', course: 'Algebra 1', completed: false },
            { id: 4, title: 'Understanding Angles', course: 'Geometry', completed: true },
            { id: 5, title: 'Pythagorean Theorem', course: 'Geometry', completed: true },
            { id: 6, title: 'Area and Perimeter', course: 'Geometry', completed: false },
            { id: 7, title: 'Polynomial Functions', course: 'Algebra 2', completed: true },
            { id: 8, title: 'Complex Numbers', course: 'Algebra 2', completed: false },
            { id: 9, title: 'Quadratic Equations', course: 'Algebra 2', completed: false },
            { id: 10, title: 'Unit Circle', course: 'Pre-Calculus', completed: true },
            { id: 11, title: 'Trigonometric Identities', course: 'Pre-Calculus', completed: true },
            { id: 12, title: 'Introduction to Limits', course: 'Calculus', completed: true },
            { id: 13, title: 'Power Rule', course: 'Calculus', completed: false },
            { id: 14, title: 'Mean, Median, Mode', course: 'Statistics', completed: true },
            { id: 15, title: 'Standard Deviation', course: 'Statistics', completed: true }
        ],
        recentActivity: [
            { type: 'quiz', icon: 'quiz', text: 'Completed Linear Equations Quiz', score: '9/10', time: '2 hours ago', color: 'blue' },
            { type: 'game', icon: 'game', text: 'Played Equation Challenge', score: '420 pts', time: '3 hours ago', color: 'purple' },
            { type: 'lesson', icon: 'lesson', text: 'Watched "Solving Linear Equations"', score: '', time: '5 hours ago', color: 'green' },
            { type: 'quiz', icon: 'quiz', text: 'Completed Angles and Triangles Quiz', score: '8/10', time: '1 day ago', color: 'blue' },
            { type: 'game', icon: 'game', text: 'Played Geometry Dash', score: '285 pts', time: '1 day ago', color: 'purple' },
            { type: 'lesson', icon: 'lesson', text: 'Watched "Pythagorean Theorem"', score: '', time: '2 days ago', color: 'green' },
            { type: 'quiz', icon: 'quiz', text: 'Completed Polynomial Functions Quiz', score: '7/10', time: '2 days ago', color: 'blue' },
            { type: 'tutoring', icon: 'tutoring', text: 'Attended Algebra 1 tutoring session', score: '', time: '3 days ago', color: 'yellow' },
            { type: 'lesson', icon: 'lesson', text: 'Watched "Complex Numbers"', score: '', time: '4 days ago', color: 'green' },
            { type: 'quiz', icon: 'quiz', text: 'Completed Trigonometric Functions Quiz', score: '10/10', time: '5 days ago', color: 'blue' }
        ],
        mySessions: [
             { course: 'Algebra 1', tutor: 'Mrs. Davis', time: '3:00 PM', date: '2025-10-20' }
        ]
    };

    // --- Calendar State & Data (Unchanged) ---
    let currentDate;
    const tutorSlots = {
        '2026-01-22': [
            { id: 24, time: '3:30 PM', tutor: 'Mr. Smith', subject: 'Pre-Calculus', type: 'Group Study', slots: 3, maxSlots: 6 }
        ],

        // --- FEBRUARY 2026 ---
        '2026-02-05': [
            { id: 25, time: '4:00 PM', tutor: 'Mrs. Davis', subject: 'Geometry Proofs', type: 'Group Study', slots: 6, maxSlots: 8 }
        ],
        '2026-02-11': [
            { id: 26, time: '3:00 PM', tutor: 'Dr. Chen', subject: 'Derivatives', type: '1-on-1', slots: 0, maxSlots: 1 }, // Full
            { id: 27, time: '4:00 PM', tutor: 'Ms. Rodriguez', subject: 'SAT Math Prep', type: 'Group Study', slots: 10, maxSlots: 12 }
        ],
        '2026-02-18': [
            { id: 28, time: '5:00 PM', tutor: 'Mr. Smith', subject: 'Statistics Project Help', type: '1-on-1', slots: 1, maxSlots: 1 }
        ],

        // --- MARCH 2026 ---
        '2026-03-04': [
            { id: 29, time: '3:30 PM', tutor: 'Mrs. Davis', subject: 'Algebra 1', type: 'Group Study', slots: 5, maxSlots: 5 }
        ],
        '2026-03-12': [
            { id: 30, time: '4:00 PM', tutor: 'Dr. Chen', subject: 'Integrals', type: 'Group Study', slots: 3, maxSlots: 8 }
        ],
        '2026-03-25': [
            { id: 31, time: '3:00 PM', tutor: 'Ms. Rodriguez', subject: 'Trigonometry', type: '1-on-1', slots: 1, maxSlots: 1 },
            { id: 32, time: '4:30 PM', tutor: 'Mr. Smith', subject: 'Probability', type: 'Group Study', slots: 4, maxSlots: 6 }
        ],

        // --- APRIL 2026 ---
        '2026-04-08': [
            { id: 33, time: '4:00 PM', tutor: 'Mrs. Davis', subject: 'Geometry Construction', type: 'Group Study', slots: 8, maxSlots: 10 }
        ],
        '2026-04-15': [
            { id: 34, time: '3:00 PM', tutor: 'Dr. Chen', subject: 'AP Calculus Prep', type: 'Group Study', slots: 15, maxSlots: 20 },
            { id: 35, time: '5:00 PM', tutor: 'Ms. Rodriguez', subject: 'Algebra 2', type: '1-on-1', slots: 0, maxSlots: 1 }
        ],
        '2026-04-22': [
            { id: 36, time: '3:30 PM', tutor: 'Mr. Smith', subject: 'AP Stats Prep', type: 'Group Study', slots: 12, maxSlots: 15 }
        ],

        // --- MAY 2026 ---
        '2026-05-06': [
            { id: 37, time: '3:00 PM', tutor: 'Mrs. Davis', subject: 'End of Year Review', type: 'Group Study', slots: 20, maxSlots: 25 }
        ],
        '2026-05-13': [
            { id: 38, time: '4:00 PM', tutor: 'Dr. Chen', subject: 'Calculus Final Review', type: 'Group Study', slots: 10, maxSlots: 15 }
        ],
        '2026-05-20': [
            { id: 39, time: '2:30 PM', tutor: 'Ms. Rodriguez', subject: 'Summer Math Plans', type: '1-on-1', slots: 1, maxSlots: 1 }
        ]
    };
    
    let quizScoreChart = null;

    // --- UI and Routing (Unchanged) ---
    const showPage = (hash) => {
        const newHash = hash || '#home';
        pages.forEach(page => page.classList.toggle('active', `#${page.id}` === newHash));
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === newHash));
        
        if (document.querySelector(newHash)) {
            window.scrollTo(0, 0);
        }

        if (newHash === '#dashboard') {
            renderDashboard();
        }
    };

    // --- renderCourseContent (Unchanged) ---
    const renderCourseContent = (courseId) => {
        const data = courseData[courseId];
        if (!data) return;

        const contentArea = document.getElementById('course-content-area');
        const courseTitle = document.getElementById('course-title');
        const courseDetails = document.getElementById('course-details');

        courseTitle.textContent = data.title;
        courseTitle.className = `text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-${data.color}-600 to-${data.color}-400 mb-6`;
        courseDetails.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div><h4 class="text-xl font-semibold mb-3 text-gray-700">Videos</h4><ul class="list-disc list-inside space-y-2">${data.videos.map(v => `<li><a href="#" class="text-blue-600 hover:underline">${v}</a></li>`).join('')}</ul></div>
                <div><h4 class="text-xl font-semibold mb-3 text-gray-700">Materials</h4><ul class="list-disc list-inside space-y-2">${data.materials.map(m => `<li><a href="#" class="text-blue-600 hover:underline">${m}</a></li>`).join('')}</ul></div>
                <div><h4 class="text-xl font-semibold mb-3 text-gray-700">Quick Quiz</h4><div id="quiz-container" class="space-y-3"></div><button id="submit-quiz" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Check</button><div id="quiz-results" class="mt-2 font-semibold" role="alert" aria-live="assertive"></div></div>
            </div>
        `;

        const quizContainer = document.getElementById('quiz-container');
        data.quiz.forEach((item, index) => {
            const questionId = `quiz-q-${index}`;
            quizContainer.innerHTML += `
                <div class="bg-gray-50 p-3 rounded">
                    <label for="${questionId}" class="font-medium">${item.q}</label>
                    <input type="text" id="${questionId}" data-answer="${item.a}" class="quiz-input w-full mt-2 p-2 border rounded-md" placeholder="Answer">
                </div>
            `;
        });

        document.getElementById('submit-quiz').onclick = () => {
            const inputs = document.querySelectorAll('.quiz-input');
            let score = 0;
            inputs.forEach(input => {
                const isCorrect = input.value.toLowerCase().trim() === input.dataset.answer.toLowerCase().trim();
                score += isCorrect ? 1 : 0;
                input.classList.toggle('border-green-500', isCorrect);
                input.classList.toggle('border-red-500', !isCorrect);
            });
            document.getElementById('quiz-results').textContent = `Score: ${score}/${inputs.length}`;
        };

        contentArea.classList.remove('hidden');
        contentArea.scrollIntoView({ behavior: 'smooth' });
    };

    // --- Calendar Logic (Unchanged) ---
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('month-year');
    const scheduleDisplay = document.getElementById('schedule-display');
    const selectedDateDisplay = document.getElementById('selected-date-display');

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarGrid.innerHTML += '<div role="gridcell"></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day h-16 border rounded flex items-center justify-center cursor-pointer';
            dayEl.textContent = day;
            dayEl.dataset.date = dateString;
            dayEl.setAttribute('role', 'button');
            dayEl.setAttribute('tabindex', '-1'); 
            dayEl.setAttribute('aria-label', `${currentDate.toLocaleString('default', { month: 'long' })} ${day}`);
            dayEl.setAttribute('aria-selected', 'false');

            if (day === 1) {
                dayEl.setAttribute('tabindex', '0');
            }

            if (tutorSlots[dateString]) {
                dayEl.classList.add('has-slots');
            }
            calendarGrid.appendChild(dayEl);
        }
    }

    function bookSession(dateString, slotId) {
        const slots = tutorSlots[dateString];
        if (!slots) return;

        const slot = slots.find(s => s.id === slotId);
        if (slot && slot.slots > 0) {
            const isBooked = dashboardData.mySessions.some(s => s.id === slot.id);
            if (isBooked) {
                alert('You have already booked this session.');
                return;
            }
            slot.slots--;
            dashboardData.mySessions.push({
                id: slot.id,
                course: slot.subject,
                tutor: slot.tutor,
                time: slot.time,
                date: dateString
            });
            renderDaySchedule(dateString);
        }
    }

    function renderDaySchedule(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        selectedDateDisplay.textContent = date.toLocaleDateString('default', { month: 'long', day: 'numeric' });
        const slots = tutorSlots[dateString];

        document.querySelectorAll('.calendar-day').forEach(d => {
            d.classList.remove('selected');
            d.setAttribute('aria-selected', 'false');
        });
        const selectedDayEl = document.querySelector(`.calendar-day[data-date="${dateString}"]`);
        if (selectedDayEl) {
            selectedDayEl.classList.add('selected');
            selectedDayEl.setAttribute('aria-selected', 'true');
        }

        if (slots && slots.length > 0) {
            scheduleDisplay.innerHTML = slots.map(slot => {
                const isBooked = dashboardData.mySessions.some(s => s.id === slot.id);
                const isFull = slot.slots === 0;
                
                let buttonHtml = '';
                if (isBooked) {
                    buttonHtml = `<button class="w-full mt-2 px-4 py-2 text-white rounded-lg bg-green-600 cursor-not-allowed" disabled>Booked!</button>`;
                } else if (isFull) {
                    buttonHtml = `<button class="w-full mt-2 px-4 py-2 text-white rounded-lg bg-gray-400 cursor-not-allowed" disabled>Full</button>`;
                } else {
                    buttonHtml = `<button class="book-btn w-full mt-2 px-4 py-2 text-white rounded-lg bg-blue-600 hover:bg-blue-700" data-slot-id="${slot.id}" data-date="${dateString}">Book Session</button>`;
                }

                const sessionTypeClass = slot.type === 'Group Study' ? 'bg-purple-50' : 'bg-blue-50';
                const sessionTypeText = slot.type === 'Group Study' 
                    ? `Group Study (${slot.slots} / ${slot.maxSlots} spots)`
                    : '1-on-1 Session';
                const availableColor = slot.slots > 0 ? 'text-green-600' : 'text-red-600';

                return `
                <div class="p-4 rounded-lg ${isBooked ? 'bg-green-50' : (isFull ? 'bg-gray-100' : sessionTypeClass)}">
                    <p class="font-bold text-lg">${slot.time}</p>
                    <p>${slot.subject} with ${slot.tutor}</p>
                    <p class="text-sm font-semibold ${availableColor}">${sessionTypeText}</p>
                    ${buttonHtml}
                </div>
            `;
            }).join('');

            document.querySelectorAll('.book-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const slotId = parseInt(e.target.dataset.slotId);
                    const date = e.target.dataset.date;
                    bookSession(date, slotId);
                });
            });

        } else {
            scheduleDisplay.innerHTML = '<p class="text-gray-500">No tutoring slots available for this day.</p>';
        }
    }

    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    calendarGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('calendar-day') && e.target.dataset.date) {
            renderDaySchedule(e.target.dataset.date);
        }
    });

    // --- Main Event Listeners (Unchanged) ---
    window.addEventListener('hashchange', () => showPage(window.location.hash));
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = link.getAttribute('href');
        });
    });

    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', (e) => renderCourseContent(e.currentTarget.dataset.course));
        card.addEventListener('keypress', (e) => {
             if (e.key === 'Enter' || e.key === ' ') {
                renderCourseContent(e.currentTarget.dataset.course);
             }
        });
    });

    // --- Equation Challenge Game (Unchanged) ---
    let eqScore = 0;
    let eqStreak = 0;
    let eqBestStreak = 0;
    let eqTimer = 60;
    let eqTimerInterval = null;
    let eqCurrentAnswer = 0;

    function generateEquation() {
        const types = [
            () => {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 20) - 10;
                const x = Math.floor(Math.random() * 20) - 10;
                const c = a * x + b;
                return { question: `${a}x + ${b} = ${c}`, answer: x };
            },
            () => {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 20) + 1;
                const x = Math.floor(Math.random() * 15) + 1;
                const c = a * x - b;
                return { question: `${a}x - ${b} = ${c}`, answer: x };
            },
            () => {
                const a = Math.floor(Math.random() * 9) + 2;
                const b = Math.floor(Math.random() * 10) + 1;
                const x = a * b;
                return { question: `x/${a} = ${b}`, answer: x };
            }
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        return type();
    }

    function startEquationGame() {
        eqScore = 0;
        eqStreak = 0;
        eqBestStreak = 0;
        eqTimer = 60;
        document.getElementById('eq-score').textContent = '0';
        document.getElementById('eq-streak').textContent = '0';
        document.getElementById('eq-timer').textContent = '60';
        document.getElementById('eq-game-area').classList.add('hidden');
        document.getElementById('eq-game-over').classList.add('hidden');
        document.getElementById('eq-question-area').classList.remove('hidden');
        document.getElementById('eq-feedback').textContent = '';
        document.getElementById('eq-answer').value = '';

        loadEquation();
        clearInterval(eqTimerInterval); // Clear any existing timer
        eqTimerInterval = setInterval(() => {
            eqTimer--;
            document.getElementById('eq-timer').textContent = eqTimer;
            if (eqTimer <= 0) {
                endEquationGame();
            }
        }, 1000);
    }

    function loadEquation() {
        const eq = generateEquation();
        eqCurrentAnswer = eq.answer;
        document.getElementById('eq-question').textContent = eq.question;
        document.getElementById('eq-answer').value = '';
        document.getElementById('eq-answer').focus();
        document.getElementById('eq-feedback').textContent = '';
    }

    function checkEquation() {
        const userAnswer = parseInt(document.getElementById('eq-answer').value);
        const feedback = document.getElementById('eq-feedback');

        if (userAnswer === eqCurrentAnswer) {
            eqScore += 10 + eqStreak * 2;
            eqStreak++;
            if (eqStreak > eqBestStreak) eqBestStreak = eqBestStreak;
            feedback.textContent = '✓ Correct!';
            feedback.className = 'mt-4 text-center font-semibold text-lg text-green-600';
            document.getElementById('eq-score').textContent = eqScore;
            document.getElementById('eq-streak').textContent = eqStreak;
            setTimeout(loadEquation, 500);
        } else {
            eqStreak = 0;
            feedback.textContent = `✗ Wrong! The answer was ${eqCurrentAnswer}`;
            feedback.className = 'mt-4 text-center font-semibold text-lg text-red-600';
            document.getElementById('eq-streak').textContent = '0';
            setTimeout(loadEquation, 1500);
        }
    }

    function endEquationGame() {
        clearInterval(eqTimerInterval);
        document.getElementById('eq-question-area').classList.add('hidden');
        document.getElementById('eq-game-over').classList.remove('hidden');
        document.getElementById('eq-final-score').textContent = eqScore;
        document.getElementById('eq-best-streak').textContent = eqBestStreak;
        const gameStat = dashboardData.gameStats.find(g => g.name === 'Equation Challenge');
        if (gameStat) {
            gameStat.gamesPlayed++;
            if (eqScore > gameStat.highScore) gameStat.highScore = eqScore;
            gameStat.avgScore = Math.round((gameStat.avgScore * (gameStat.gamesPlayed - 1) + eqScore) / gameStat.gamesPlayed);
            gameStat.lastPlayed = new Date().toLocaleDateString('en-CA');
        }
    }

    document.getElementById('eq-start-btn')?.addEventListener('click', startEquationGame);
    document.getElementById('eq-restart-btn')?.addEventListener('click', startEquationGame);
    document.getElementById('eq-submit-btn')?.addEventListener('click', checkEquation);
    document.getElementById('eq-answer')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkEquation();
    });

    // --- UPDATED: Geo-Lane Rush Game ---
    let geoScore = 0;
    let geoLives = 3;
    let geoGameSpeed = 5;
    let geoPlayerLane = 1; // 0 (top), 1 (middle), 2 (bottom)
    let geoGameLoopInterval = null;
    let geoWalls = [];
    const geoGameScreen = document.getElementById('geo-game-screen');
    const geoPlayer = document.getElementById('geo-player');

    // NEW: Updated generator to provide 3 options
    function generateGeometryQuestion() {
        const questionTypes = [
            () => { // Area of Rectangle
                const w = Math.floor(Math.random() * 10) + 3;
                const h = Math.floor(Math.random() * 10) + 3;
                const area = w * h;
                return {
                    question: `Area of rectangle? (w=${w}, h=${h})`,
                    svg: `<rect x="70" y="70" width="${w * 8}" height="${h * 8}" fill="none" stroke="purple" stroke-width="3"/>`,
                    answer: area,
                    options: [area, area + w, area - h]
                };
            },
            () => { // Perimeter of Square
                const side = Math.floor(Math.random() * 12) + 4;
                const perimeter = side * 4;
                return {
                    question: `Perimeter of square? (s=${side})`,
                    svg: `<rect x="70" y="70" width="${side * 8}" height="${side * 8}" fill="none" stroke="purple" stroke-width="3"/>`,
                    answer: perimeter,
                    options: [perimeter, perimeter / 2, perimeter * 2]
                };
            },
            () => { // Missing Angle in Triangle
                const angle1 = Math.floor(Math.random() * 80) + 20;
                const angle2 = Math.floor(Math.random() * (160 - angle1)) + 20;
                const answer = 180 - angle1 - angle2;
                return {
                    question: `Missing angle? (${angle1}°, ${angle2}°)`,
                    svg: `<polygon points="100,30 20,170 180,170" fill="none" stroke="purple" stroke-width="3"/>`,
                    answer: answer,
                    options: [answer, 180 - angle1, 180 - angle2]
                };
            },
            () => { // True/False
                const statements = [
                    { q: 'All squares are rectangles', a: 'True' },
                    { q: 'All rectangles are squares', a: 'False' },
                    { q: 'A right angle is 180°', a: 'False' },
                    { q: 'Parallel lines never meet', a: 'True' }
                ];
                const statement = statements[Math.floor(Math.random() * statements.length)];
                return {
                    question: statement.q,
                    svg: '',
                    answer: statement.a,
                    options: ['True', 'False', (Math.random() < 0.5 ? '180' : '90')] // Third dummy option
                };
            }
        ];
        const qData = questionTypes[Math.floor(Math.random() * questionTypes.length)]();
        
        // Shuffle options
        qData.options.sort(() => Math.random() - 0.5);
        qData.correctLane = qData.options.indexOf(qData.answer);
        return qData;
    }

    function updateGeoPlayerPosition() {
        // 350px height. Lanes are ~116px. Center of lane: 58px, 174px, 290px. Player is 40px.
        const lanePositions = [38, 155, 272]; // top positions for player
        geoPlayer.style.top = `${lanePositions[geoPlayerLane]}px`;
    }

    // NEW: Handle keyboard input for lane switching
    function handleGeoKeydown(e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            geoPlayerLane = Math.max(0, geoPlayerLane - 1); // Move up
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            geoPlayerLane = Math.min(2, geoPlayerLane + 1); // Move down
        }
        updateGeoPlayerPosition();
    }

    function startGeometryGame() {
        geoScore = 0;
        geoLives = 3;
        geoGameSpeed = 5;
        geoPlayerLane = 1;
        geoWalls = [];
        
        document.getElementById('geo-score').textContent = '0';
        document.getElementById('geo-speed').textContent = '1x';
        updateGeoLives(0); // Reset lives
        updateGeoPlayerPosition();

        document.getElementById('geo-game-area').classList.add('hidden');
        document.getElementById('geo-game-over').classList.add('hidden');
        document.getElementById('geo-question-area').classList.remove('hidden');

        // Add game-specific event listener
        document.addEventListener('keydown', handleGeoKeydown);
        
        spawnGeoWall();
        clearInterval(geoGameLoopInterval); // Clear any existing loop
        geoGameLoopInterval = setInterval(geoGameLoop, 1000 / 60); // 60 FPS
    }

    function geoGameLoop() {
        let collision = false;
        
        geoWalls.forEach(wall => {
            let rightPos = parseInt(wall.element.style.right);
            rightPos += geoGameSpeed;
            wall.element.style.right = `${rightPos}px`;

            // Check for collision
            // Player is at left: 30px, width: 40px (so 70px)
            // Wall right pos is from right. Screen width is ~736px.
            // Let's use getBoundingClientRect for simplicity
            const playerRect = geoPlayer.getBoundingClientRect();
            const wallRect = wall.element.getBoundingClientRect();
            
            if (playerRect.right > wallRect.left && playerRect.left < wallRect.right && !wall.passed) {
                wall.passed = true; // Mark as passed
                
                if (wall.correctLane !== geoPlayerLane) {
                    // Collision!
                    collision = true;
                    geoLives--;
                    updateGeoLives(geoLives);
                    // Flash screen
                    geoGameScreen.style.backgroundColor = '#ef4444';
                    setTimeout(() => { geoGameScreen.style.backgroundColor = '#1f2937'; }, 100);
                } else {
                    // Correct!
                    geoScore += 10;
                    geoGameSpeed += 0.2; // Increase speed
                    document.getElementById('geo-score').textContent = geoScore;
                    document.getElementById('geo-speed').textContent = `${(geoGameSpeed / 5).toFixed(1)}x`;
                }
                
                // Spawn next wall
                spawnGeoWall();
            }

            // Remove wall if off-screen
            if (wallRect.right < 0) {
                wall.element.remove();
                geoWalls = geoWalls.filter(w => w !== wall);
            }
        });
        
        if (geoLives <= 0) {
            endGeometryGame();
        }
    }

    function spawnGeoWall() {
        const questionData = generateGeometryQuestion();
        
        // Update question display
        document.getElementById('geo-question').textContent = questionData.question;
        document.getElementById('geo-shape-display').innerHTML = questionData.svg ? 
            `<svg width="200" height="80" viewBox="0 0 200 200">${questionData.svg}</svg>` : '';
            
        // Create wall element
        const wallEl = document.createElement('div');
        wallEl.className = 'geo-wall';
        wallEl.style.right = '-100px';
        
        for (let i = 0; i < 3; i++) {
            const gateEl = document.createElement('div');
            gateEl.className = 'geo-gate';
            if (i === questionData.correctLane) {
                gateEl.classList.add('open');
            }
            
            // Add text label
            const textEl = document.createElement('div');
            textEl.className = 'geo-gate-text';
            textEl.textContent = questionData.options[i];
            gateEl.appendChild(textEl);
            
            wallEl.appendChild(gateEl);
        }
        
        geoGameScreen.appendChild(wallEl);
        geoWalls.push({
            element: wallEl,
            correctLane: questionData.correctLane,
            passed: false
        });
    }

    function updateGeoLives(lives) {
        const livesContainer = document.getElementById('geo-lives-container');
        livesContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            livesContainer.innerHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${i < geoLives ? 'text-red-500' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
            `;
        }
    }

    function endGeometryGame() {
        clearInterval(geoGameLoopInterval);
        document.removeEventListener('keydown', handleGeoKeydown);
        
        document.getElementById('geo-question-area').classList.add('hidden');
        document.getElementById('geo-game-over').classList.remove('hidden');
        document.getElementById('geo-final-score').textContent = geoScore;
        
        // Clear all remaining walls
        geoWalls.forEach(wall => wall.element.remove());
        geoWalls = [];
        
        const gameStat = dashboardData.gameStats.find(g => g.name === 'Geometry Dash');
        if (gameStat) {
            gameStat.gamesPlayed++;
            if (geoScore > gameStat.highScore) gameStat.highScore = geoScore;
            gameStat.avgScore = Math.round((gameStat.avgScore * (gameStat.gamesPlayed - 1) + geoScore) / gameStat.gamesPlayed);
            gameStat.lastPlayed = new Date().toLocaleDateString('en-CA');
        }
    }

    document.getElementById('geo-start-btn')?.addEventListener('click', startGeometryGame);
    document.getElementById('geo-restart-btn')?.addEventListener('click', startGeometryGame);
    
    
    // --- UPDATED: Calculus Climber Game ---
    let calcScore = 0; // Renamed to "Altitude" in UI
    let calcLives = 3; // New "Gear" system
    let calcTimer = 60;
    let calcTimerInterval = null;
    let calcCurrentAnswer = '';
    const calcClimberIcon = document.getElementById('climber-icon');
    const calcGearContainer = document.getElementById('calc-gear-container');
    const MAX_ALTITUDE = 1000; // Score to reach the "top"

    function generateCalculusQuestion() {
        const types = [
            () => { const a = Math.floor(Math.random() * 9) + 2, b = Math.floor(Math.random() * 5) + 2; return { question: `d/dx (${a}x^${b})`, answer: `${a * b}x^${b - 1}` }; },
            () => { const a = Math.floor(Math.random() * 50) + 2; return { question: `d/dx (${a}x)`, answer: `${a}` }; },
            () => { const a = Math.floor(Math.random() * 100) + 1; return { question: `d/dx (${a})`, answer: `0` }; },
            () => { const a = Math.floor(Math.random() * 5) + 2, b = Math.floor(Math.random() * 10) + 2, c = Math.floor(Math.random() * 20) + 1; return { question: `d/dx (${a}x^2 + ${b}x + ${c})`, answer: `${a * 2}x + ${b}` }; },
            () => { const a = Math.floor(Math.random() * 10) + 1, b = Math.floor(Math.random() * 10) + 1, limit = Math.floor(Math.random() * 5); return { question: `lim(x→${limit}) [${a}x + ${b}]`, answer: `${a * limit + b}` }; },
            () => { const a = Math.floor(Math.random() * 5) + 1, b = Math.floor(Math.random() * 10) + 1, limit = Math.floor(Math.random() * 4) + 1; return { question: `lim(x→${limit}) [${a}x^2 - ${b}]`, answer: `${a * (limit*limit) - b}` }; }
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        return type();
    }

    function startCalculusGame() {
        calcScore = 0;
        calcLives = 3;
        calcTimer = 60;
        
        document.getElementById('calc-score').textContent = '0';
        updateCalculusGear(0); // Reset gear
        updateClimberPosition(); // Reset climber
        
        document.getElementById('calc-timer').textContent = '60';
        document.getElementById('calc-game-area').classList.add('hidden');
        document.getElementById('calc-game-over').classList.add('hidden');
        document.getElementById('calc-question-area').classList.remove('hidden');
        document.getElementById('calc-feedback').textContent = '';
        document.getElementById('calc-answer').value = '';

        loadCalculusQuestion();
        clearInterval(calcTimerInterval); // Clear any existing timer
        calcTimerInterval = setInterval(() => {
            calcTimer--;
            document.getElementById('calc-timer').textContent = calcTimer;
            if (calcTimer <= 0) {
                endCalculusGame(false); // End due to time
            }
        }, 1000);
    }
    
    // NEW: Update Gear (Lives) display
    function updateCalculusGear(lost) {
        if (lost > 0) {
            const gearIcons = calcGearContainer.querySelectorAll('.gear-icon:not(.lost)');
            if (gearIcons.length > 0) {
                gearIcons[gearIcons.length - 1].classList.add('lost');
            }
        } else {
            // Reset
            calcGearContainer.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                calcGearContainer.innerHTML += `
                    <svg class="gear-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                `;
            }
        }
    }
    
    // NEW: Update climber position
    function updateClimberPosition() {
        const percentage = Math.min(100, (calcScore / MAX_ALTITUDE) * 100);
        // Move between 0% and 90% (to keep icon visible)
        calcClimberIcon.style.bottom = `${percentage * 0.9}%`;
    }

    function loadCalculusQuestion() {
        const eq = generateCalculusQuestion();
        calcCurrentAnswer = eq.answer;
        document.getElementById('calc-question').textContent = eq.question;
        document.getElementById('calc-answer').value = '';
        document.getElementById('calc-answer').focus();
        document.getElementById('calc-feedback').textContent = '';
    }
    
    function cleanAnswer(str) {
        return str.replace(/\s+/g, '').toLowerCase();
    }

    function checkCalculusAnswer() {
        const userAnswer = cleanAnswer(document.getElementById('calc-answer').value);
        const correctAnswer = cleanAnswer(calcCurrentAnswer);
        const feedback = document.getElementById('calc-feedback');

        if (userAnswer === correctAnswer) {
            calcScore += 50; // More points per question
            feedback.textContent = '✓ Correct! Keep climbing!';
            feedback.className = 'mt-4 text-center font-semibold text-lg text-green-600';
            document.getElementById('calc-score').textContent = calcScore;
            updateClimberPosition();
            setTimeout(loadCalculusQuestion, 500);
        } else {
            calcLives--;
            updateCalculusGear(1); // Lose 1 gear
            feedback.textContent = `✗ Slipped! The answer was ${calcCurrentAnswer}`;
            feedback.className = 'mt-4 text-center font-semibold text-lg text-red-600';
            
            if (calcLives <= 0) {
                setTimeout(() => endCalculusGame(true), 1000); // End due to no lives
            } else {
                setTimeout(loadCalculusQuestion, 1500);
            }
        }
    }

    // NEW: Updated end game function
    function endCalculusGame(outOfLives) {
        clearInterval(calcTimerInterval);
        document.getElementById('calc-question-area').classList.add('hidden');
        document.getElementById('calc-game-over').classList.remove('hidden');
        document.getElementById('calc-final-score').textContent = calcScore;
        
        if (outOfLives) {
            document.getElementById('calc-end-message').textContent = "You ran out of gear! Better luck next time.";
        } else {
            document.getElementById('calc-end-message').textContent = "Time's up! A great effort.";
        }

        const gameStat = dashboardData.gameStats.find(g => g.name === 'Calculus Climber');
        if (gameStat) {
            gameStat.gamesPlayed++;
            if (calcScore > gameStat.highScore) gameStat.highScore = calcScore;
            gameStat.avgScore = Math.round((gameStat.avgScore * (gameStat.gamesPlayed - 1) + calcScore) / gameStat.gamesPlayed);
            gameStat.lastPlayed = new Date().toLocaleDateString('en-CA');
        }
    }

    document.getElementById('calc-start-btn')?.addEventListener('click', startCalculusGame);
    document.getElementById('calc-restart-btn')?.addEventListener('click', startCalculusGame);
    document.getElementById('calc-submit-btn')?.addEventListener('click', checkCalculusAnswer);
    document.getElementById('calc-answer')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkCalculusAnswer();
    });
    

    // --- Dashboard Rendering (Unchanged) ---
    function renderQuizChart() {
        const ctx = document.getElementById('quiz-score-chart');
        if (!ctx) return;
        if (quizScoreChart) {
            quizScoreChart.destroy();
        }
        quizScoreChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dashboardData.quizScores.map(q => q.title),
                datasets: [{
                    label: 'Quiz Score %',
                    data: dashboardData.quizScores.map(q => q.percentage),
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 2,
                    borderRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } } },
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (c) => `Score: ${c.parsed.y}%` } }
                }
            }
        });
    }

    function renderBadges() {
        const badgeList = document.getElementById('badge-list');
        if (!badgeList) return;
        const badges = [
            { id: 'quiz-1', title: 'Quiz Novice', icon: 'M9 5H7...', req: () => dashboardData.quizScores.length >= 1 },
            { id: 'quiz-5', title: 'Quiz Taker', icon: 'M9 5H7...', req: () => dashboardData.quizScores.length >= 5 },
            { id: 'perfect', title: 'Perfect Score', icon: 'M13 10V3...', req: () => dashboardData.quizScores.some(q => q.percentage === 100) },
            { id: 'game-1', title: 'Gamer', icon: 'M11 4a2...', req: () => dashboardData.gameStats.reduce((acc, g) => acc + g.gamesPlayed, 0) >= 1 },
            { id: 'game-10', title: 'Pro Gamer', icon: 'M11 4a2...', req: () => dashboardData.gameStats.reduce((acc, g) => acc + g.gamesPlayed, 0) >= 10 },
            { id: 'lesson-1', title: 'First Step', icon: 'M15 10l4...', req: () => dashboardData.lessons.some(l => l.completed) },
            { id: 'lesson-5', title: 'Bookworm', icon: 'M15 10l4...', req: () => dashboardData.lessons.filter(l => l.completed).length >= 5 },
            { id: 'algebra', title: 'Algebraist', icon: 'M13 10V3...', req: () => dashboardData.lessons.filter(l => l.completed && l.course === 'Algebra 1').length >= 2 },
            { id: 'geometry', title: 'Geometer', icon: 'M13 10V3...', req: () => dashboardData.lessons.filter(l => l.completed && l.course === 'Geometry').length >= 2 },
            { id: 'tutor', title: 'Go-Getter', icon: 'M17 20h5...', req: () => dashboardData.mySessions.length >= 1 }
        ];
        const iconMap = {
            'M9 5H7...': '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>',
            'M13 10V3...': '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>',
            'M11 4a2...': '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>',
            'M15 10l4...': '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>',
            'M17 20h5...': '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>'
        };
        badgeList.innerHTML = badges.map(badge => {
            const earned = badge.req();
            const lockedClass = earned ? '' : 'locked';
            return `
                <div class="p-2" title="${earned ? badge.title : 'Locked'}">
                    <div class="badge-icon ${lockedClass}">
                        ${iconMap[badge.icon] || ''}
                    </div>
                    <p class="badge-title ${lockedClass}">${badge.title}</p>
                </div>
            `;
        }).join('');
    }
    
    function renderMySchedule() {
        const scheduleList = document.getElementById('my-schedule-list');
        if (!scheduleList) return;
        const sortedSessions = dashboardData.mySessions.sort((a, b) => new Date(a.date) - new Date(b.date));
        if (sortedSessions.length === 0) {
            scheduleList.innerHTML = '<p class="text-sm text-gray-500">You have no upcoming sessions. Visit the Tutoring page to book one!</p>';
            return;
        }
        scheduleList.innerHTML = sortedSessions.map(session => {
             const date = new Date(session.date + 'T00:00:00');
             const displayDate = date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
            return `
                <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div class="bg-blue-100 text-blue-600 p-2 rounded-full flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800">${session.course} w/ ${session.tutor}</p>
                        <p class="text-sm text-gray-600">${displayDate} at ${session.time}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderDashboard() {
        const quizScoresList = document.getElementById('quiz-scores-list');
        if (quizScoresList) {
            quizScoresList.innerHTML = dashboardData.quizScores.map(quiz => {
                const scoreColor = quiz.percentage >= 90 ? 'green' : quiz.percentage >= 70 ? 'blue' : 'orange';
                return `
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800">${quiz.title}</h4>
                            <p class="text-sm text-gray-500">${quiz.course} • ${quiz.date}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-${scoreColor}-600">${quiz.score}/${quiz.total}</p>
                            <p class="text-sm text-gray-500">${quiz.percentage}%</p>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        renderQuizChart();

        const gameStatsList = document.getElementById('game-stats-list');
        if (gameStatsList) {
            gameStatsList.innerHTML = dashboardData.gameStats.map(game => `
                <div class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <h4 class="font-semibold text-gray-800 mb-3">${game.name}</h4>
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p class="text-sm text-gray-500">Games</p>
                            <p class="text-xl font-bold text-purple-600">${game.gamesPlayed}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">High Score</p>
                            <p class="text-xl font-bold text-yellow-600">${game.highScore}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Avg Score</p>
                            <p class="text-xl font-bold text-blue-600">${game.avgScore}</p>
                        </div>
                    </div>
                    <p class="text-xs text-gray-400 mt-2 text-center">Last played: ${game.lastPlayed}</p>
                </div>
            `).join('');
        }

        const courseProgressList = document.getElementById('course-progress-list');
        if (courseProgressList) {
            courseProgressList.innerHTML = dashboardData.courseProgress.map(course => `
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="font-semibold text-gray-800">${course.course}</h4>
                        <span class="text-sm font-semibold text-${course.color}-600">${course.percentage}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div class="bg-gradient-to-r from-${course.color}-400 to-${course.color}-600 h-full rounded-full transition-all duration-500" style="width: ${course.percentage}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">${course.completed} of ${course.total} lessons completed</p>
                </div>
            `).join('');
        }

        const lessonChecklist = document.getElementById('lesson-checklist');
        if (lessonChecklist) {
            lessonChecklist.innerHTML = dashboardData.lessons.map(lesson => `
                <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer" role="listitem">
                    <input type="checkbox" ${lesson.completed ? 'checked' : ''}
                           class="lesson-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                           data-lesson-id="${lesson.id}">
                    <div class="ml-3 flex-1">
                        <p class="font-medium text-gray-800 ${lesson.completed ? 'line-through text-gray-500' : ''}">${lesson.title}</p>
                        <p class="text-xs text-gray-500">${lesson.course}</p>
                    </div>
                </label>
            `).join('');

            document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const lessonId = parseInt(e.target.dataset.lessonId);
                    const lesson = dashboardData.lessons.find(l => l.id === lessonId);
                    if (lesson) {
                        lesson.completed = e.target.checked;
                        const label = e.target.closest('label');
                        const titleElement = label.querySelector('p.font-medium');
                        titleElement.classList.toggle('line-through', e.target.checked);
                        titleElement.classList.toggle('text-gray-500', e.target.checked);
                        renderBadges(); 
                    }
                });
            });
        }

        const activityFeed = document.getElementById('activity-feed');
        if (activityFeed) {
            const iconMap = {
                quiz: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>',
                game: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>',
                lesson: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>',
                tutoring: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>'
            };
            activityFeed.innerHTML = dashboardData.recentActivity.map(activity => `
                <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div class="bg-${activity.color}-100 text-${activity.color}-600 p-2 rounded-full flex-shrink-0">
                        ${iconMap[activity.type]}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-800">${activity.text}</p>
                        <div class="flex items-center justify-between mt-1">
                            <p class="text-xs text-gray-500">${activity.time}</p>
                            ${activity.score ? `<span class="text-xs font-semibold text-${activity.color}-600">${activity.score}</span>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        renderBadges();
        renderMySchedule();
    }
    
    // --- ENHANCED: Calculator Logic ---
    const miniCalc = document.getElementById('mini-calc');
    const calcDisplay = document.getElementById('calc-display');
    const calcKeys = document.getElementById('calc-keys');
    const calcHeader = document.getElementById('calc-header');
    let currentExpression = '0';
    let lastResult = null;

    // Show/Hide Calculator
    document.getElementById('show-calc-btn').addEventListener('click', () => {
        miniCalc.classList.remove('hidden', 'minimized');
    });

    document.getElementById('calc-close').addEventListener('click', () => {
        miniCalc.classList.add('hidden');
    });

    // Minimize/Maximize
    document.getElementById('calc-minimize')?.addEventListener('click', (e) => {
        e.stopPropagation();
        miniCalc.classList.toggle('minimized');
        // If minimized, clicking header should restore
        if (miniCalc.classList.contains('minimized')) {
            calcHeader.style.cursor = 'pointer';
        } else {
            calcHeader.style.cursor = 'move';
        }
    });

    // Click header to restore when minimized
    calcHeader.addEventListener('click', (e) => {
        if (miniCalc.classList.contains('minimized') && !e.target.closest('button')) {
            miniCalc.classList.remove('minimized');
            calcHeader.style.cursor = 'move';
        }
    });

    document.getElementById('calc-enlarge').addEventListener('click', (e) => {
        e.stopPropagation();
        miniCalc.classList.toggle('enlarged');
    });

    // Update display
    function updateDisplay(value) {
        currentExpression = value;
        calcDisplay.value = value;
        calcDisplay.scrollLeft = calcDisplay.scrollWidth;

        // Add error styling
        if (value === 'Error') {
            calcDisplay.classList.add('error');
            setTimeout(() => calcDisplay.classList.remove('error'), 300);
        }
    }

    // Handle calculator button clicks
    calcKeys.addEventListener('click', (e) => {
        if (!e.target.matches('.calc-btn')) return;

        const button = e.target;
        let value = button.dataset.value;
        const action = button.dataset.action;

        if (action === 'clear') value = 'C';
        else if (action === 'backspace') value = '⌫';
        else if (action === 'calculate') value = '=';

        // Add button click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => button.style.transform = '', 100);

        handleInput(value);
    });

    function handleInput(value) {
        // Handle error state
        if (currentExpression === 'Error') {
            if (value === 'C') {
                currentExpression = '0';
            } else if (value !== '=') {
                currentExpression = value;
            }
            updateDisplay(currentExpression);
            return;
        }

        if (currentExpression === '0' && value !== '.' && value !== 'C' && value !== '=') {
            if (['+', '-', '*', '/', '^', '%'].includes(value)) {
                currentExpression = '0' + value;
            } else if (value === '√') {
                currentExpression = '√(';
            } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(value)) {
                currentExpression = value + '(';
            } else if (value === '(') {
                currentExpression = '(';
            } else {
                currentExpression = value;
            }
        } else if (value === 'C') {
            currentExpression = '0';
        } else if (value === '⌫') {
            currentExpression = currentExpression.length > 1 ? currentExpression.slice(0, -1) : '0';
        } else if (value === '=') {
            try {
                let expression = currentExpression;

                // Handle square roots properly
                // Convert √(number) to Math.sqrt(number)
                expression = expression.replace(/√\(/g, 'Math.sqrt(');

                // Handle factorial (simple integer factorial)
                expression = expression.replace(/(\d+)!/g, (match, num) => {
                    let n = parseInt(num);
                    if (n < 0) return 'NaN';
                    if (n === 0) return '1';
                    let res = 1;
                    for (let i = 1; i <= n; i++) res *= i;
                    return res;
                });

                // Add scientific support
                expression = expression.replace(/sin/g, 'Math.sin');
                expression = expression.replace(/cos/g, 'Math.cos');
                expression = expression.replace(/tan/g, 'Math.tan');
                expression = expression.replace(/log/g, 'Math.log10');
                expression = expression.replace(/ln/g, 'Math.log');
                expression = expression.replace(/π/g, 'Math.PI');
                expression = expression.replace(/e/g, 'Math.E');

                // Replace operators with JavaScript equivalents
                expression = expression.replace(/×/g, '*');
                expression = expression.replace(/÷/g, '/');
                expression = expression.replace(/−/g, '-');
                expression = expression.replace(/\^/g, '**');

                // Evaluate the expression
                let result = Function('"use strict"; return (' + expression + ')')();

                if (isFinite(result)) {
                    // Round to avoid floating point errors
                    result = Math.round(result * 1000000000) / 1000000000;
                    lastResult = result;
                    currentExpression = result.toString();
                } else {
                    currentExpression = 'Error';
                }
            } catch (error) {
                console.error('Calculation error:', error);
                currentExpression = 'Error';
            }
        } else if (value === '√') {
            // Add square root with opening parenthesis
            if (currentExpression === '0') {
                currentExpression = '√(';
            } else {
                currentExpression += '√(';
            }
        } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(value)) {
            if (currentExpression === '0') currentExpression = value + '(';
            else currentExpression += value + '(';
        } else if (value === '1/x') {
            currentExpression = '1/(' + currentExpression + ')';
        } else if (value === '!') {
            currentExpression += '!';
        } else if (value === '+/-') {
            // Toggle sign of the current number
            try {
                if (currentExpression.startsWith('-')) {
                    currentExpression = currentExpression.substring(1);
                } else if (currentExpression !== '0' && currentExpression !== 'Error') {
                    currentExpression = '-' + currentExpression;
                }
            } catch {
                currentExpression = 'Error';
            }
        } else if (value === '%') {
            // Convert current value to percentage
            try {
                // Only convert if it's a number
                if (!isNaN(parseFloat(currentExpression))) {
                    let result = parseFloat(currentExpression) / 100;
                    currentExpression = result.toString();
                }
            } catch {
                currentExpression = 'Error';
            }
        } else {
            // Append the value to the expression
            currentExpression += value;
        }

        updateDisplay(currentExpression);
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (miniCalc.classList.contains('hidden')) return;

        const key = e.key;

        if (key >= '0' && key <= '9' || key === '.') {
            handleInput(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleInput(key);
        } else if (key === 'Enter') {
            e.preventDefault();
            handleInput('=');
        } else if (key === 'Escape') {
            handleInput('C');
        } else if (key === 'Backspace') {
            e.preventDefault();
            handleInput('⌫');
        } else if (key === '(' || key === ')') {
            handleInput(key);
        } else if (key === '%') {
            handleInput('%');
        }
    });
// --- Draggable Mini Calculator Logic (FIXED) ---
    // Uses transform for 60fps smoothness and prevents text highlighting
    
    // We reuse the variables defined above: miniCalc, calcHeader
    if (miniCalc && calcHeader) {
        let isDragging = false;
        let startX, startY, initialTranslateX = 0, initialTranslateY = 0;

        // Helper to get current transform values
        const getTranslateValues = (element) => {
            const style = window.getComputedStyle(element);
            const matrix = new WebKitCSSMatrix(style.transform);
            return { x: matrix.m41, y: matrix.m42 };
        };

        const dragStart = (e) => {
            if (e.target.closest('button')) return; // Ignore button clicks

            // Get current position (so we don't snap back to 0,0)
            const currentPos = getTranslateValues(miniCalc);
            initialTranslateX = currentPos.x;
            initialTranslateY = currentPos.y;

            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else {
                startX = e.clientX;
                startY = e.clientY;
                e.preventDefault(); // STOPS THE HIGHLIGHTING
            }

            isDragging = true;
            calcHeader.style.cursor = 'grabbing';
            // Disable transition during drag for instant response
            miniCalc.style.transition = 'none';
        };

        const drag = (e) => {
            if (!isDragging) return;

            e.preventDefault(); // Stop scrolling on mobile

            let clientX, clientY;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            // Calculate how far we moved
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            // Apply new position
            const newX = initialTranslateX + deltaX;
            const newY = initialTranslateY + deltaY;

            miniCalc.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
        };

        const dragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            calcHeader.style.cursor = 'move';
            // Re-enable smooth transition for maximize/minimize actions
            miniCalc.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        };

        // Attach Listeners
        calcHeader.addEventListener('mousedown', dragStart);
        calcHeader.addEventListener('touchstart', dragStart, { passive: false });

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });

        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    }


// --- Initial Setup ---

    // 1. Force the calendar to start on the correct date
    // We use "new Date()" to show the current real-world month (Jan).
    // If you want to force it to show Nov 2025 data first, use: new Date(2025, 10, 1)
    currentDate = new Date(); 

    // 2. Handle Routing (Load the correct page)
    showPage(window.location.hash);

    // 3. Render the Calendar Grid IMMEDIATELY
    // This draws the boxes so you don't have to click '>'
    renderCalendar();

    // 4. Update the side panel (Schedule)
    // Try to select today's date in the side panel
    const todayIso = currentDate.toISOString().split('T')[0];
    renderDaySchedule(todayIso);

    // 5. Handle Calculator visibility if loading directly into dashboard
    if (window.location.hash === '#dashboard') {
        renderDashboard();
    }
}); // End of DOMContentLoaded