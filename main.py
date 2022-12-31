from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message

import json
#from flask.ext.mail import Mail, Message

app = Flask(__name__)
mail = Mail(app)


app_version = 20140815

@app.route("/")
def home():
	return render_template('index.html', name='index')

@app.route("/send_msg", methods=['POST','GET'])
def send_msg():
	response = { 'status' : False }

	if request.method == 'POST':
		try:
			name = request.form['name']
			last_name = request.form['last_name']
			email = request.form['email']
			message = request.form['message']

			body = 'First Name: ' + name
			body += '\nLast Name: ' + last_name
			body +='\nEmail: ' + email
			body +='\nMessage: ' + message

			msg = Message("Contacto Web Mancave",
			  					sender=email,
			  					recipients=["msstudio10@gmail.com"],
			  					bcc=["info@mintitmedia.com"])
			msg.body = body
			mail.send(msg)
			response = { 'status' : True}

		except Exception as e:
			print(e)
		
		return jsonify(response)
	return False

if __name__ == "__main__":
	app.debug = True
	app.run('')
