import pymysql
from datetime import datetime
from flask import Flask
from flask_restx import reqparse, Api, Resource, fields
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv()
import os

try:
    temperDB = pymysql.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        passwd=os.getenv('DB_PASS'),
        charset="utf8",
        db=os.getenv('DB_NAME')
    )
    dbCursor = temperDB.cursor()
except:
    print("Connection to database failed!")
    raise Exception


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
        dateNow = datetime.today()
        dateNow = dateNow.strftime("%Y-%m-%d %H:%M:%S")

        try:
            dbCursor.execute(
                "INSERT INTO measures (probe, temperature, humidity, date)"
                " VALUES ('%s', '%s', '%s', '%s')"
                % (probe, temperature, humidity, dateNow))
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
                'error': {'flag': True, 'type': str(e)}
            }, 500


@api.route("/temper/api/v1/probe/<int:id>/measures")
class ProbeMeasures(Resource):
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
                    'probe': i[1],
                    'temperature': i[2],
                    'humidity': i[3],
                    'date': str(i[4])
                })

            return {
                'response': result,
                'error': {'flag': False}
            }, 201

        except Exception as e:

            return {
                'error': {'flag': True, 'type': str(e)}
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
                dbCursor.execute(
                    "SELECT * from measures WHERE probe = '%s' ORDER BY measures.id DESC LIMIT 1" % i[0])
                lastMeasure = dbCursor.fetchone()

                if (lastMeasure != None):
                    result.append({
                        'id': i[0],
                        'name': i[1],
                        'user': i[2],
                        'state': i[5],
                        'category': i[6],
                        'gps': {
                            'lon': i[3],
                            'lat': i[4],
                        },
                        'lastmeasure': {
                            'id': lastMeasure[0],
                            'probe': lastMeasure[1],
                            'temperature': lastMeasure[2],
                            'humidity': lastMeasure[3],
                            'date': str(lastMeasure[4])
                        }
                    })
                else:
                    result.append({
                        'id': i[0],
                        'name': i[1],
                        'user': i[2],
                        'state': i[5],
                        'gps': {
                            'lon': i[3],
                            'lat': i[4],
                        },
                        'lastmeasure': {
                            'id': None,
                            'probe': None,
                            'temperature': None,
                            'humidity': None,
                            'date': None
                        }
                    })

            return {
                'response': result,
                'error': {'flag': False}
            }, 200

        except Exception as e:

            return {
                'error': {'flag': True, 'type': str(e)}
            }, 400


@api.route("/temper/api/v1/probe/user/<int:id>")
class ProbeUser(Resource):
    @api.response(200, 'Probe : List of user probes obtained')
    @api.response(400, 'Probe : Error')
    def get(self, id):
        """
        Get all probes id of a specified User
        """
        try:
            dbCursor.execute("SELECT id FROM probes WHERE user = %s " % id)
            array = dbCursor.fetchall()
            result = []
            for i in array:
                result.append(i[0])

            return {
                'response': result,
                'error': {'flag': False}
            }, 200

        except Exception as e:

            return {
                'error': {'flag': True, 'type': str(e)}
            }, 400


@api.route("/temper/api/v1/probe/<int:id>")
class Probe(Resource):
    @api.response(200, 'Probe : Probe obtained')
    @api.response(400, 'Probe : Error')
    def get(self, id):
        """
        Get specified probe
        """
        try:
            dbCursor.execute(
                "SELECT * FROM probes WHERE id = %s LIMIT 1 " % id)
            probe = dbCursor.fetchone()
            dbCursor.execute(
                "SELECT * from measures WHERE probe = '%s' ORDER BY measures.id DESC LIMIT 1" % probe[0])
            lastMeasure = dbCursor.fetchone()
            result = {
                'id': probe[0],
                'name': probe[1],
                'user': probe[2],
                'state': probe[5],
                'category': probe[6],
                'gps': {
                    'lon': probe[3],
                    'lat': probe[4],
                },
                'lastmeasure': {
                    'id': lastMeasure[0],
                    'probe': lastMeasure[1],
                    'temperature': lastMeasure[2],
                    'humidity': lastMeasure[3],
                    'date': str(lastMeasure[4])
                }
            }

            return {
                'response': result,
                'error': {'flag': False}
            }, 200

        except Exception as e:

            return {
                'error': {'flag': True, 'type': str(e)}
            }, 400


@api.route("/temper/api/v1/probe/<int:id>/toggle")
class ProbeChangeState(Resource):
    @api.response(200, 'Probe : State of probe changed')
    @api.response(400, 'Probe : Error')
    @api.response(403, 'Probe : Error, forbidden access')
    def put(self, id):
        """
        Change state of one probe (active or not)
        :param id:
        :return:
        """
        try:
            dbCursor.execute("SELECT state FROM probes WHERE id = %s" % id)
            activity = dbCursor.fetchone()[0]
            if (activity == 1):
                dbCursor.execute(
                    "UPDATE probes SET state = 0 WHERE id = %s" % id)
                temperDB.commit()
                return {
                    'response': {
                        'id': id,
                        'state': 0
                    },
                    'error': {'flag': False}
                }, 200

            elif (activity == 0):
                dbCursor.execute(
                    "UPDATE probes SET state = 1 WHERE id = %s" % id)
                temperDB.commit()
                return {
                    'response': {
                        'id': id,
                        'state': 1
                    },
                    'error': {'flag': False}
                }, 200

        except Exception as e:
            return {
                'response': {
                    'id': id,
                    'state': 'undefined'
                },
                'error': {'flag': True, 'type': str(e)}
            }, 400


if __name__ == '__main__':
    app.run(host="0.0.0.0", threaded=True)
