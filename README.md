# Helluva Fanfiction Generator Challenge

# Description
A simple application where the user can pick between Hazbin Hotel, Helluva Boss and a crossover and they can generate characters, genres and the tropes randomly. The idea behind the application is to give people a little writing challenge based on the characters, genres and tropes that's picked for them but the users have the decision to pick which show and difficulty on each genre and trope section. 

# Tech Stack
The tech stack I use is React.js, CSS, Node.js, Python and PostgreSQL. The reason for React is gives me the flexability to add in features such as cycling through options, being able to design different pages and fetching data while using functions to hold different classnames to make the code cleaner. For Python and PostgresSQL, I used Postgres to hold four different tables where I can add more characters and tropes depending on what's trending and Python is better for me to create the main, model and schema files to handle the SQL data easier, making it easier for React to fetch data.

# How to use the project
First you would be greeted by a homepage that contains three buttons, 'Hazbin Hotel', 'Helluva Boss' and 'Crossover' and the button will take you to different styled pages that contain different characters. On each page it has three sections, Characters, Genres and Tropes. For the character you just click generate and it will cycle through the characters one by one. For genres and tropes the users can can pick a difficulty based on how many genres and tropes they want to pick. Easy only picks one, medium is two and hard is three and again will cycle through and then the user can accept the challenge by trying to write the fanfiction based on what's chosen for them.
