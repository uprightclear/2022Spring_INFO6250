# Quick Start
- In the current directory
    - `npm install express uuid cookie-parser react-router-dom`
    - `npm run build`
    - `npm start`
- Open a new terminal
    - `npm run dev`
- The react app will start at PORT 3000 and the Proxy will start at PORT 4000

# Final Project Description
This React app is designed as Northeastern University Student Center, and the design inspiration comes from Northeastern University Student Hub.
## Home
Main page of the Student Center.
- Calendar(UI only)
- Application Center
    - Canvas, Robin, Teams, OneNote, Outlook, Planner
- School Service
    - Wellness Check, Covid Test Scheduler, Study Space Booking
## News
It provides news published by Northeastern University ( All the contents are from [Northeastern University](https://www.northeastern.edu/) ).
## Support
Support page for student.
- Tech Service Portal
- Training Options
- Solutions & Services Statuses
## FAQ
This page provides Frequently Asked Questions.
## About
The introduction and history of Northeastern University.
## More
- Privacy Policy
- Research Home
- Health
- Sustainability
- Security
## Student Hub
This feature is only available to logged-in users.
### TodoList
  - The Login System will check whether your username is valid ( e.g. dog is an invalid username ).
  - Your TodoLists are able to `Add/Delete/Toggle`.
  - Your TodoLists will be saved on server for your next login.
### Course Survey
  - The Login System will check whether your username is valid ( e.g. dog is an invalid username ).
  - Your CourseLists are able to `Add/Delete/Score`.
  - Your CourseLists will be saved on server for your next login.
# Complex UI Element
- Accordion on `FAQ` page
- Dropdown Menu on `More ▾`
- Grid-column on `Home` & `News` page
- Transition on footer links & icons

# Loading Indicator
The Loading Indicator will be shown when you login in TodoList. In this app, I used `setTimeOut()` to make sure that the spinner will be shown. If your login request is invalid, you are able to click the spinner to back to the login page.

# Fake Services
To use this app, you have to start the proxy service at first ( http://localhost:4000 ). The fake service is used to store and manipulate the data of logged-in users.

# Images / Icons License Terms
- Most of the Images/Icons are downloaded from [Northeastern University](https://www.northeastern.edu/).
- All the svg files are downloaded from [ICONS8](https://icons8.com/)