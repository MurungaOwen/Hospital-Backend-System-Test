
spital Backend System Test

## Overview
Develop a backend system for a hospital that handles user signups, patient–doctor assignments, doctor note submissions, and dynamic scheduling of actionable steps based on live LLM processing. The system must secure sensitive data and use a live LLM to extract actionable steps—divided into a checklist (immediate tasks) and a plan (scheduled actions). New note submissions should cancel any existing actionable steps and create new ones.

## Requirements

### 1. User Management
- **Signup Endpoint:**  
  - Register users with **Name, Email, Password**.
    - Users sign up as either a *Patient* or a *Doctor* (you choose the structure).

    - **Authentication & Security:**  
      - Use your preferred authentication method.
        - Store passwords securely and encrypt all patient notes meaning raw notes can ONLY be seen by the patient or doctor (Hint. end-to-end encryption).

### 2. Patient–Doctor Assignment
- **Doctor Selection:**  
  - Patients must choose from a list of available doctors after signup.
  - **Doctor View:**  
    - Doctors should see a list of patients who have selected them.

### 3. Doctor Notes & Actionable Steps
- **Note Submission:**  
  - Doctors select a patient and submit notes.
  - **LLM Integration:**  
    - Use a live LLM (e.g., Google Gemini Flash or equivalent) to extract actionable steps:
        - **Checklist:** Immediate one-time tasks (eg. buy a drug).
            - **Plan:** A schedule of actions (e.g., daily reminders to take the drug for 7 days).
            - **Dynamic Scheduling:**  
              - Schedule reminders per the plan (reminders may be logged or stored).
                - Reminders repeat until a patient checks in, then proceed to the next one. Eg. if a user has to take a drug a day for 7 days and misses one day only (doesn't check-in once), this means the reminder runs for 8 days. 
                  - New patient notes cancel any previously scheduled actionable steps.

### 4. API Endpoints
Expose endpoints for:
- User signup and authentication.
- Patient doctor selection.
- Doctor retrieval of their patient list.
- Submitting doctor notes and processing actionable steps.
- Retrieving actionable steps and reminders.

### 5. Documentation & Justification
Provide documentation justifying your design decisions (e.g., authentication, encryption, scheduling strategy, data storage). All specifics are up to you.

## Technical Constraints
- Use any backend stack you prefer (Node.js is recommended).
- This is a backend-only project.
- You can use any AI model, stack overflow, etc to help you complete the test. Actually, we encourage it. It shows your resourcefulness & the end product is what matters!

## Submission
- Host your project on GitHub.
- Submit via the gigsama.com talent portal.

## Reward
- If you're in the top 5 of submissions, you will receive GHS 1k and get a final interview with our team

Good luck!

