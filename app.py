import os
import pandas as pd
import numpy as np

from flask import Flask, jsonify, request, url_for, redirect, render_template
from flask_pymongo import PyMongo

import json
from bson import json_util


#################################################
# Database Setup
#################################################

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/flights2_db"
mongo = PyMongo(app)

holiday = mongo.db.flightDec
flightsByAirline = mongo.db.flights_ByAirline
flightsByDay = mongo.db.flights_byDay
flightsByState = mongo.db.flights_byState
flightsByDate = mongo.db.flights_byDate
tweets = mongo.db.tweets_df


@app.route("/")
def index():
    return render_template("index.html")



@app.route("/profile/<airline>")
def get_one_flight(airline):
    """Return the information based on the user input for a given flight."""
    filt = {'AIRLINE': airline}
    selected_flight = holiday.find_one(filt)

    if selected_flight: 
        output = {
        'AIRLINE_ID' : selected_flight['AIRLINE_ID'], 
        'AIRLINE' : selected_flight['AIRLINE'],
        'DATE' : selected_flight['DATE'],
        'DAY_OF_WEEK' : selected_flight['DAY_OF_WEEK'],
        'DEPARTURE_DELAY_in_min' : selected_flight['DEPARTURE_DELAY'],
        'ARRIVAL_DELAY_in_min' : selected_flight['ARRIVAL_DELAY'],
        'DEPART_FROM' : selected_flight['ORIG_AIRPORT'],
        'DEPARTURE_CITY' : selected_flight['ORIG_CITY'],
        'DESTINATION_CITY' : selected_flight['DEST_CITY'],
        'DEPARTURE_STATE' : selected_flight['ORIG_STATE'],
        'DEPARTURE_LATITUDE' : selected_flight['ORIG_LATITUDE'],
        'DEPARTURE_LONGITUDE' : selected_flight['ORIG_LONGITUDE'],
        'FLY_TO' : selected_flight['DEST_AIRPORT'],
        'DESTINATION_STATE' : selected_flight['DEST_STATE'],
        'DESTINATION_LATITUDE' : selected_flight['DEST_LATITUDE'],
        'DESTINATION_LONGITUDE': selected_flight['DEST_LONGITUDE']
        }
    else: 
        output = "No matching flight"
    return jsonify(output)



@app.route("/airlinetotal")
def get_airline_total():
    """ Return airline total counts. """
    output = []
    for f in flightsByAirline.find():
        output.append({'AIRLINE' : f['AIRLINE'], 'TOTAL' : f['TOTAL']})
    return jsonify(output)

@app.route("/weekly")
def get_dayily_total():
    """ Return weekly counts (by day of week)."""
    output = []
    for f in flightsByDay.find():
        output.append({'DAY_OF_WEEK' : f['DAY_OF_WEEK'], 'TOTAL' : f['TOTAL']})
    return jsonify(output)

@app.route("/state")
def get_state():
    output = []
    for f in flightsByState.find():
        output.append({'STATE' : f['ORIG_STATE'], 'TOTAL' : f['TOTAL']})
    return jsonify(output)

@app.route("/date")
def get_date():
    output = []
    for f in flightsByDate.find():
        output.append({'DATE' : f['DATE'], 'TOTAL' : f['TOTAL'], 'CANC_TOTAL': f['CANC_TOTAL']})
    return jsonify(output)


@app.route("/tweets/<airline>")
def get_tweets(airline):
    filt = {'AIRLINE': airline}
    output = []
    for t in tweets.find(filt):
        output.append({'ATTITUDE' : t['attitude'], 'AIRLINE' : t['AIRLINE'], 'DATE': t['DATE'], 'TEXT': t['text']})
    return jsonify(output)


if __name__ == '__main__':
    app.run(debug=True)