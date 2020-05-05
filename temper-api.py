import pymysql
import json
from flask import Flask
from flask_restx import reqparse, Api, Resource, fields
from flask_cors import CORS

try:
    temperDB = pymysql.connect(
        host="localhost",
        user="root",
        passwd="",
        charset="utf8",
        db="temper"
    )
    dbCursor = temperDB.cursor()
except:
    print("Connection failed!")


app = Flask(__name__)

api = Api(app=app,
          version="1.0",
          doc="/temper/api/v1/doc/",
          title="Temper",
          default="Temper",
          default_label="Temper API",
          contact="Florian Leroux",
          contact_email="florian.leroux3@laposte.net",
          contact_url="https://github.com/floriaaan/",
          description="API for Temper",
          validate=True)
cors = CORS(app)

@api.route("/temper/api/v1/probe/<int:id>/measures")
class Measure(Resource):
    @api.response(200, 'Measure : Measure posted')
    @api.response(400, 'Measure : Error')
    def get(self, id):
        """
        Get all measures of probe corresponding to passed id
        :param id:
        :return:
        """
        
        try:
            result = []
            dbCursor.execute("SELECT * from measures WHERE probe = '%s'" % id)
            array = dbCursor.fetchall()

            for i in array:
                result.append({
                    'id': i[0],
                    'probe' : i[1],
                    'temperature' : i[2],
                    'humidity' : i[3],
                    'date' : i[4]
                })

            return {
                'response': result,
                'error': {'flag': False}
            }, 201

        except Exception as e:

            return {
                'error': {'flag': True, 'type': json.dumps(str(e))}
            }, 500

@api.route("/temper/api/v1/measure/")
class MeasurePost(Resource):
    @api.response(201, 'Measure : Measure posted')
    @api.response(500, 'Measure : Error')
    def post(self):
        """
        Save a measure in database
        :param probe:
        :param temperature:
        :param humidity:
        :return:
        """
        probe = api.payload["probe"]
        temperature = api.payload["temperature"]
        humidity = api.payload["humidity"]

        try:
            dbCursor.execute(
                "INSERT INTO measures (probe, temperature, humidity)"
                " VALUES ('%s', '%s', '%s')"
                % (probe, temperature, humidity))
            temperDB.commit()

            return {
                'response':
                    {
                        'id': dbCursor.lastrowid,
                        'probe': probe,
                        'temperature': temperature,
                        'humidity': humidity,
                    },
                'error': {'flag': False}
            }, 201

        except Exception as e:

            return {
                'error': {'flag': True, 'type': json.dumps(str(e))}
            }, 500

@api.route("/temper/api/v1/probe/all")
class ProbeList(Resource):
    @api.response(200, 'Probe : List of all probes obtained')
    @api.response(400, 'Probe : Error')
    def get(self):
        """
        Get all probes of database
        :return:
        """
        
        try:
            result = []
            dbCursor.execute("SELECT * from probes")
            array = dbCursor.fetchall()

            for i in array:
                dbCursor.execute("SELECT * from measures WHERE probe = '%s' ORDER BY measures.id DESC LIMIT 1" % i[0])
                lastMeasure = dbCursor.fetchone()
                result.append({
                    'id': i[0],
                    'name' : i[1],
                    'user' : i[2],
                    'gps_lon' : i[3],
                    'gps_lat' : i[4],
                    'state' : i[5],
                    'lastmeasure': {
                        'id': lastMeasure[0],
                        'probe' : lastMeasure[1],
                        'temperature' : lastMeasure[2],
                        'humidity' : lastMeasure[3],
                        'date' : lastMeasure[4]
                    }
                })

            return {
                'response': result,
                'error': {'flag': False}
            }, 201

        except Exception as e:

            return {
                'error': {'flag': True, 'type': json.dumps(str(e))}
            }, 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", threaded=True)
