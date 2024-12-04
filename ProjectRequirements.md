Develop a web-based application using Supabase and shadcnUI to automate the assessment of Course Learning Outcomes (CLOs) and Program Learning Outcomes (PLOs). The system enables lecturers to input student marks, automates calculations (including normalization, CLO attainment, and PLO mapping), and provides a performance dashboard for data-driven decision-making.

Goals
Business Goals
•	Automate CLO and PLO calculations to reduce manual effort and errors.
•	Provide robust reporting capabilities (CAR and PAR dashboards) for course- and program-level insights.
•	Enhance operational efficiency through a user-friendly and secure platform.
User Goals
•	Lecturers: Quickly input student marks and access automated calculations of CLO performance.
•	Head of Lecturers (Admins): Manage courses, classes, and CLO/PLO configurations, and monitor performance using interactive dashboards.
Non-Goals
•	Integration with third-party LMS or gradebook systems (future enhancement).
•	Offline or mobile-native versions (current scope focuses on responsive web design).
________________________________________
User Stories
Lecturers
•	As a lecturer, I want a secure login to access my courses and data safely.
•	As a lecturer, I need an intuitive table to input student marks efficiently.
•	As a lecturer, I want the system to calculate and display CLO attainment without manual intervention.
Admins
•	As an admin, I want to add, edit, and manage courses and classes in the system.
•	As an admin, I need to define CLOs and PLOs and map them to courses and assessments.
•	As an admin, I want to review both course-level (CAR) and program-level (PAR) performance data through dashboards with drill-down capabilities.
________________________________________
User Experience (UX)
Lecturer Workflow
1.	Logs in securely.
2.	Selects an assigned course and class from a dropdown menu.
3.	Inputs student marks via a table interface, with student names prepopulated.
4.	System automatically normalizes marks and calculates CLO attainment for each student.
5.	Reviews CLO performance summary for the course.
Admin Workflow
1.	Logs in with privileged access.
2.	Manages system configurations: 
o	Adds, edits, or deletes courses and classes.
o	Assigns lecturers to courses and students to classes.
3.	Defines CLOs and PLOs, maps CLOs to PLOs, and configures weightages.
4.	Accesses dashboards for insights: 
o	CAR Dashboard: Reviews CLO attainment for individual courses and identifies trends or gaps.
o	PAR Dashboard: Monitors overall PLO performance and alignment with program objectives.
CAR Dashboard
Key Elements:
•	Displays CLO attainment for each course, broken down by assessment components.
•	Includes visualizations such as bar charts (e.g., CLO performance by component) and tables (e.g., student-level attainment).
•	Filters to view data by lecturer, class, or assessment type.
•	Drill-down capability to analyze individual student performance.
PAR Dashboard
Key Elements:
•	Aggregates PLO attainment data across all courses and programs.
•	Displays attainment trends for each PLO (e.g., percentage attainment over time).
•	Comparative views: By course, cohort, or academic year.
•	Visualizations: Line graphs for trends, heatmaps for attainment distribution, and tables summarizing PLO alignment with CLOs.
•	Interactive filters for deeper analysis (e.g., filter by CLO or drill down to specific courses contributing to PLO results).
________________________________________
Narrative
Imagine a streamlined CLO and PLO assessment process where lecturers and admins collaborate effortlessly through an intuitive web-based system. Lecturer Dr. Adams logs in to input her students’ marks after grading an exam. The system instantly normalizes the marks, calculates CLO attainment, and presents the results in an easy-to-read summary.
Simultaneously, the Head of Lecturers, Dr. Lee, reviews the CAR dashboard to spot any underperforming courses. With a few clicks, he drills down into specific classes to identify areas of concern. Switching to the PAR dashboard, Dr. Lee gains insights into program-wide PLO attainment trends, helping him plan curriculum adjustments and faculty training.
The system transforms a tedious manual process into a user-friendly and data-rich experience, empowering educators to make data-driven decisions that enhance learning outcomes.