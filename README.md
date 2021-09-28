# College-Students-App

A MERN Based WebApp which keeps in track of two datasets : student and college details which are stored in Mangodb atlas platform. The app is launched in an AWS instance. Axios is used to make get,post,update and delete requests.

![WebApp](https://github.com/DarkcrusherX/College-Students-App/blob/main/images/webapp.png)

## Features 

### Pages
Interative pages list from which you can choose any page you need to browse into. Can view student list, College list and make entries for colleges and students.
![pages](https://github.com/DarkcrusherX/College-Students-App/blob/main/images/pages.png)

### FeatureBar
Select the feature from the dropdown menu and select a college to view similar colleges to it with the given features.
![featurebar](https://github.com/DarkcrusherX/College-Students-App/blob/main/images/featurebar.png)

### SearchBar
Displays all the colleges containing the given information irrespective of the fields. eg: Typing 10 results in displaying colleges with id = 10, year founded =%10% and number of students of the form %10%. Also a reset button is provided in case if user made a typo in between the whole process.
![searchbar](https://github.com/DarkcrusherX/College-Students-App/blob/main/images/searchbar.png)

### Buttons
Edit and Delete options are provided to manipulate data. Incase if a student needs to change collge, changing collegeid automatically updates the number of stduents in the college. Also after deleting a college the user wont be having access to that collegeid while making new student entry. Collegeid remains the same as it is the choice of the stduent to shift their college to thei likings.
![buttons](https://github.com/DarkcrusherX/College-Students-App/blob/main/images/edit delete.png)

### Piechart
On selecting the feature, a pie chart is displayed and on clicking a segment ,the colleges list will get updated with the colleges belonging to that segment.
![piechart](https://github.com/DarkcrusherX/College-Students-App/blob/main/images/Piechartoption.png)

### Student Search Bar
This is available in the next page to sort the stduents according to the entry. So if you enter the collegeid , students belonging to that college is displayed.
![piechart](https://github.com/DarkcrusherX/College-Students-App/blob/main/images/studentsearch.png)

## Frontend and Backend 

All the works in backend is done under the folder backend and frontend under src. To run both frontend and backedn locally , npm start is enough as i have binded nodemon server and npm start into the same command.

## Thank You For Your Time
