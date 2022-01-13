# LaundryLott
Project repository for LaundryLott web app. Powered by JavaScript, mySQL Database and Oracle Cloud.

## Introduction

With LaundryLott, students enter a lottery for real money every week simply by changing over their laundry on time, and in the process helping colleges and communities by providing live laundry room status updates automatically.

Utilizing Oracle Cloud and Cloudflare to host the web app, with HTML, CSS, and Bootstrap on front end, and JavaScript, mySQL, Git, and custom Logwrite NPM package in the back end.

For sustainability, LaundryLott uses low tier virtual machines and DNS hosting to sustain affordability while not having to compromise on connectivity and latency.

## Instructions

When designing LaundryLott, over 6,500 lines of code were deleted and rewritten over the course of development, with the sole intent of ease-of-use. In the final design, users only have to touch their phones a total of 3 times to use the app. The 3 touches as follows:
- Select input field
- Input a machine id
- Click start / finish

These are the core functionalities of the web app, but in addition there are some bonus features. The Laundry View button redirects users to another page where they can see a live view of the laundry machines status. Additionally, users can report outages by inputting a machine ID and clicking the footer which reports the machine as out of order.

Creating an account is done automatically the first time you select start and from there you are set! Don't worry though, no personal information is collected.

## Deployment

In the LaundryLott gitignore file it ignores the node_modules folder, a dotenv file, and a logbin.log file.

Deploying this code requires a ".env" file to be located in the root directory with mySQL connection information in it with the following format:
"HOST=host_address
USERNAME=username
PASSWORD=username_password
DATABASE=database_name".
The use of a dotenv file will require the installation of the dotenv npm module (npm i dotenv --save).

The logbin.log file will be auto-generated to the root directory when the server is run. Creating the file before hand will not cause issues. The use of Logwrite will require the installation of the Logwrite npm module (npm i logwrite --save).

Starting the server for the first time requires the user to input "sudo node app" for Linux in the console or "node app" for Windows. The server will run on port 80 by default.

## Contributions 
Thank you to all these people that served contributions to the LaundryLott project!
- Quality and Beta Testing: Brynn Lintner
- Visual Design Contributions: Brey Rivera
- Guidance and Server Debugging: Vitaly Ford

######  ______
###### Contact laundrylott@gmail.com with any questions, concerns, or suggestions. 
###### - Adam Spera
