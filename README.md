# Airline_Visualization
- In this project, we used the 2015 delayed and cancalled flights data from kaggle.com and visualized delayed and cancelled flights data by their features. 
- We built a python-powered flask app and then use plotly.js to add graphs on it. 
- The database we used is MongoDB. 
- For the background, we used bideo.js to have a full screen video playing. 

## How to run this app locally: 
- First, run the file "Analysis_v2.ipynb" in jupyter notebook. There might be some packages you need to install. 
- In the last step of analysis mentioned above, we will connect to MongoDB. You need to ensure that your mongodb server is running in the background. 
- Second, Check if all the outputs are saved to "Resources/output" and if there is a database called "flights2_db" in MongoDB with 6 collections. The name of collections should match with files in "Resources/output". 
- Third, open the terminal of your choice, locate to where you save all the files, and run "python app.py" from terminal. 
- Now that the environments for the webpage is created and data are retrieved, open browser at "localhost:5000" and see your result.
- By changing the dropdown menu, you should be able to see changes in the tweets table down below. Enjoy!

## Here are some screenshots of the final result:
![app1](images/app1.png)
![app2](images/app2.png)
![app3](images/app3.png)
