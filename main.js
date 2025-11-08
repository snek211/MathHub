document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- Course Data (Unchanged) ---
    const courseData = {
        algebra1: { title: 'Algebra 1', videos: ['Intro to Variables', 'Solving Linear Equations'], materials: ['Worksheet.pdf'], quiz: [{ q: '2x + 3 = 7', a: '2' }], color: 'blue' },
        geometry: { title: 'Geometry', videos: ['Understanding Angles', 'Pythagorean Theorem'], materials: ['Postulates.pdf'], quiz: [{ q: 'Sum of angles in a triangle?', a: '180' }], color: 'purple' },
        algebra2: { title: 'Algebra 2', videos: ['Polynomial Functions', 'Complex Numbers'], materials: ['Practice.pdf'], quiz: [{ q: 'What is i^2?', a: '-1' }], color: 'green' },
        precalculus: { title: 'Pre-Calculus', videos: ['Unit Circle', 'Sequences and Series'], materials: ['Formulas.pdf'], quiz: [{ q: 'sin(90)?', a: '1' }], color: 'yellow' },
        calculus: { title: 'Calculus', videos: ['Intro to Limits', 'Power Rule'], materials: ['Rules.pdf'], quiz: [{ q: 'Derivative of x^2?', a: '2x' }], color: 'red' },
        statistics: { title: 'Statistics', videos: ['Mean, Median, Mode', 'Standard Deviation'], materials: ['Tables.pdf'], quiz: [{ q: 'Most frequent value?', a: 'Mode' }], color: 'indigo' }
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
            { course: 'Geometry', completed: 6, total: 10, percentage: 60, color: 'purple' },
            { course: 'Algebra 2', completed: 5, total: 10, percentage: 50, color: 'green' },
            { course: 'Pre-Calculus', completed: 7, total: 10, percentage: 70, color: 'yellow' },
            { course: 'Calculus', completed: 4, total: 10, percentage: 40, color: 'red' },
            { course: 'Statistics', completed: 9, total: 10, percentage: 90, color: 'indigo' }
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
    let currentDate = new Date();
    const tutorSlots = {
        '2025-10-20': [
            { id: 1, time: '3:00 PM', tutor: 'Mrs. Davis', subject: 'Algebra 1', type: '1-on-1', slots: 1, maxSlots: 1 },
            { id: 2, time: '4:00 PM', tutor: 'Mr. Smith', subject: 'Pre-Calculus', type: 'Group Study', slots: 3, maxSlots: 5 }
        ],
        '2025-10-22': [
            { id: 3, time: '2:30 PM', tutor: 'Dr. Chen', subject: 'Calculus', type: '1-on-1', slots: 2, maxSlots: 2 },
            { id: 4, time: '4:00 PM', tutor: 'Mrs. Davis', subject: 'Geometry', type: 'Group Study', slots: 0, maxSlots: 5 },
            { id: 5, time: '5:00 PM', tutor: 'Ms. Rodriguez', subject: 'Algebra 2', type: '1-on-1', slots: 1, maxSlots: 1 }
        ],
        '2025-11-05': [
            { id: 6, time: '4:00 PM', tutor: 'Mr. Smith', subject: 'Algebra 2', type: 'Group Study', slots: 5, maxSlots: 5 }
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
        courseTitle.className = `text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-${data.color}-500 to-${data.color}-700`;

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
        const value = button.dataset.value;

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

    // Draggable calculator with smooth movement
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    const calcHeader = document.getElementById('calc-header');

    calcHeader.addEventListener('mousedown', dragStart);
    calcHeader.addEventListener('touchstart', dragStart);

    function dragStart(e) {
        if (e.target.closest('button')) return; // Don't drag when clicking buttons

        const rect = miniCalc.getBoundingClientRect();

        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - rect.left;
            initialY = e.touches[0].clientY - rect.top;
        } else {
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
            e.preventDefault();
        }

        isDragging = true;
        calcHeader.style.cursor = 'grabbing';
        miniCalc.style.transition = 'none';
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    function drag(e) {
        if (!isDragging) return;

        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        currentX = clientX - initialX;
        currentY = clientY - initialY;

        // Constrain to viewport
        const maxX = window.innerWidth - miniCalc.offsetWidth;
        const maxY = window.innerHeight - miniCalc.offsetHeight;

        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));

        miniCalc.style.left = currentX + 'px';
        miniCalc.style.top = currentY + 'px';
        miniCalc.style.bottom = 'auto';
        miniCalc.style.right = 'auto';
        miniCalc.style.transform = 'none';
    }

    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        calcHeader.style.cursor = 'move';
        miniCalc.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }


    // --- Initial Setup ---
    showPage(window.location.hash);
    renderCalendar();
    
    if (window.location.hash === '' || window.location.hash === '#home') {
       // do nothing
    } else if (window.location.hash === '#dashboard') {
        renderDashboard();
    }
});