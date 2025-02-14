# Hospital Backend System

## Overview
The Hospital Backend System is designed to manage user signups, patient-doctor assignments, doctor note submissions, and dynamic scheduling of actionable steps based on live LLM processing. The system ensures the security of sensitive data and utilizes a live LLM to extract actionable steps, which are categorized into immediate tasks and scheduled actions.

## Features
- **User Management**: Allows users to sign up as either Patients or Doctors with secure authentication.
- **Patient-Doctor Assignment**: Patients can select their doctors, and doctors can view their assigned patients.
- **Doctor Notes & Actionable Steps**: Doctors can submit notes for patients, which are processed to create actionable steps using a live LLM.
- **Dynamic Scheduling**: The system schedules reminders based on actionable steps and adjusts them dynamically based on patient check-ins.

## API Endpoints
- **DOCS**
 - GET `/api/docs`
- **User Signup and Authentication**
  - POST `/api/auth/signup`: Register a new user.
  - POST `/api/auth/login`: Authenticate a user.

- **Patient-Doctor Selection**
  - POST `/api/patients/select-doctor`: Patients select their preferred doctor.
  - GET `/api/doctors/patients`: Retrieve the list of patients assigned to a doctor.

- **Doctor Notes & Actionable Steps**
  - POST `/api/notes/submit`: Submit notes for a patient.
  - GET `/api/notes/actionable-steps/:patientId`: Retrieve actionable steps for a patient.

## Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hospital-backend-system.git
   ```
2. Navigate to the project directory:
   ```
   cd hospital-backend-system
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## Design Decisions
- **Authentication**: Implemented using JWT for secure user sessions.
- **Data Encryption**: Patient notes are encrypted using end-to-end encryption to ensure that only authorized users can access them.
- **Dynamic Scheduling**: Utilizes a scheduling utility to manage reminders based on patient interactions and actionable steps.

## Technologies Used
- Node.js
- Express.js
- TypeScript
- MongoDB (or any preferred database)
- Live LLM for actionable step extraction

## Contribution
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.