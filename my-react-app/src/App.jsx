import React, { useState } from "react";
import "./App.css";

function App() {
  const lectureSubjects = [
    { name: "Engineering Mathematics", present: 42, total: 50 },
    { name: "Applied Physics", present: 38, total: 50 },
    { name: "Soft Skill", present: 40, total: 50 },
    { name: "Engineering Electronics", present: 45, total: 50 },
    { name: "Design Thinking", present: 43, total: 50 },
    { name: "DS Using C++", present: 39, total: 50 },
  ];

  const labSubjects = [
    { name: "DS Using C++ Lab", present: 18, total: 20 },
    { name: "Mechanical Lab", present: 17, total: 20 },
    { name: "Applied Physics Lab", present: 19, total: 20 },
    { name: "Soft Skill Lab", present: 18, total: 20 },
    { name: "Engineering Electronics Lab", present: 18, total: 20 },
  ];

  const allSubjects = [...lectureSubjects, ...labSubjects];

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [activeModal, setActiveModal] = useState("");

  const totalPresent = allSubjects.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalClasses = allSubjects.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const overallAttendance = (
    (totalPresent / totalClasses) *
    100
  ).toFixed(2);

  const currentLecture = {
    subject: "Engineering Mathematics",
    time: "09:00 AM - 10:00 AM",
    room: "A-204",
  };

  const filteredLectures = lectureSubjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLabs = labSubjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatus = (present, total) => {
    const percentage = (present / total) * 100;

    if (percentage >= 90) {
      return "Excellent 🟢";
    } else if (percentage >= 75) {
      return "Good 🟡";
    } else {
      return "Low 🔴";
    }
  };

  return (
    <div className="container">
      <div className="overlay">

        {/* Header */}
        <header className="header">
          <h1>AIMS</h1>

          <div className="menu-container">
            <button
              className="menu-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              ☰
            </button>

            {showMenu && (
              <div className="dropdown">
                <p onClick={() => setActiveModal("settings")}>
                  ⚙ Settings
                </p>

                <p onClick={() => setActiveModal("quiz")}>
                  📝 Quiz
                </p>

                <p onClick={() => setActiveModal("about")}>
                  ℹ About
                </p>
              </div>
            )}
          </div>
        </header>

        {/* College Banner */}
        <div className="college-banner">
          <h2>ABES ENGINEERING COLLEGE</h2>
          <p>Attendance Management Information System</p>
        </div>

        {/* Student Card */}
        <div className="student-card">
          <h3>Nirjara Verma</h3>
          <p>Branch : CSE - AIML</p>
          <p>Semester : II</p>
        </div>

        {/* Dashboard */}
        <div className="dashboard">
          <div className="dashboard-card">
            <h4>Total Subjects</h4>
            <h2>{allSubjects.length}</h2>
          </div>

          <div className="dashboard-card">
            <h4>Total Classes</h4>
            <h2>{totalClasses}</h2>
          </div>

          <div className="dashboard-card">
            <h4>Attended</h4>
            <h2>{totalPresent}</h2>
          </div>

          <div className="dashboard-card">
            <h4>Attendance</h4>
            <h2>{overallAttendance}%</h2>
          </div>
        </div>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search subject or laboratory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Current Lecture */}
        <div className="current-lecture">
          <h2>📚 Current Lecture</h2>

          <h3>{currentLecture.subject}</h3>

          <p>🕒 {currentLecture.time}</p>

          <p>🏫 Room : {currentLecture.room}</p>

          <span className="live-badge">
            LIVE NOW
          </span>
        </div>

        {/* Lectures */}
        <h2 className="section-title">
          📘 LECTURES
        </h2>

        <div className="subjects-grid">
          {filteredLectures.map((subject, index) => (
            <div
              key={index}
              className="subject-card"
              onClick={() => setSelectedSubject(subject)}
            >
              <h3>{subject.name}</h3>

              <p>
                {(
                  (subject.present /
                    subject.total) *
                  100
                ).toFixed(0)}
                %
              </p>
            </div>
          ))}
        </div>

        {/* Labs */}
        <h2 className="section-title">
          🧪 LABORATORIES
        </h2>

        <div className="subjects-grid">
          {filteredLabs.map((subject, index) => (
            <div
              key={index}
              className="lab-card"
              onClick={() => setSelectedSubject(subject)}
            >
              <h3>{subject.name}</h3>

              <p>
                {(
                  (subject.present /
                    subject.total) *
                  100
                ).toFixed(0)}
                %
              </p>
            </div>
          ))}
        </div>

        {/* Subject Details */}
        {selectedSubject && (
          <div className="attendance-details">
            <h2>{selectedSubject.name}</h2>

            <p>
              Classes Attended :
              {" "}
              {selectedSubject.present}
            </p>

            <p>
              Total Classes :
              {" "}
              {selectedSubject.total}
            </p>

            <p>
              Attendance :
              {" "}
              {(
                (selectedSubject.present /
                  selectedSubject.total) *
                100
              ).toFixed(2)}
              %
            </p>

            <p>
              Status :
              {" "}
              {getStatus(
                selectedSubject.present,
                selectedSubject.total
              )}
            </p>
          </div>
        )}

        {/* Overall Attendance */}
        <div className="overall-box">
          <h2>Overall Attendance</h2>
          <h1>{overallAttendance}%</h1>
        </div>

        {/* Status */}
        <div className="criteria-box">
          <h2>Attendance Status</h2>

          {overallAttendance >= 75 ? (
            <p>
              ✅ Eligible for Examination
            </p>
          ) : (
            <p>
              ⚠ Attendance below required
              criteria.
            </p>
          )}
        </div>

        {/* Modal */}
        {activeModal && (
          <div className="modal-overlay">
            <div className="modal-box">

              <button
                className="close-btn"
                onClick={() => setActiveModal("")}
              >
                ✖
              </button>

              {activeModal === "settings" && (
                <>
                  <h2>Settings</h2>

                  <p>🔔 Notifications</p>
                  <p>📊 Attendance Alerts</p>
                  <p>👤 Profile</p>
                  <p>🔒 Change Password</p>
                  <p>🌙 Dark Theme</p>
                  <p>🚪 Logout</p>
                </>
              )}

              {activeModal === "quiz" && (
                <>
                  <h2>Quiz Portal</h2>

                  <p>
                    No quiz available today.
                  </p>

                  <p>
                    Please check again later.
                  </p>
                </>
              )}

              {activeModal === "about" && (
                <>
                  <h2>About AIMS</h2>

                  <p>
                    Attendance Management
                    Information System
                  </p>

                  <p>
                    Developed using React.js,
                    JSX, HTML and CSS.
                  </p>

                  <p>
                    ABES Engineering College
                  </p>

                  <p>Version 1.0</p>
                </>
              )}

            </div>
          </div>
        )}

        <footer>
          © 2026 Attendance Management
          Information System (AIMS)
        </footer>

      </div>
    </div>
  );
}

export default App;