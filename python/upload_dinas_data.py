from firebase import firebase


firebase = firebase.FirebaseApplication('https://dina-723d7.firebaseio.com', None)
result = firebase.get('/', None)
print(result)



#import firebase_admin
#from firebase_admin import credentials
#from firebase_admin import db

## Fetch the service account key JSON file contents
#cred = credentials.Certificate('python/dina-723d7-firebase-adminsdk-k2ugx-8933232ee8.json')
# Initialize the app with a service account, granting admin privileges
#firebase_admin.initialize_app(cred, {
#    'databaseURL': "https://dina-723d7.firebaseapp.com/"
#})

#ref = db.reference('/')
#print(ref.get())

