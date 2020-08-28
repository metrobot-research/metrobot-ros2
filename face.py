import face_recognition
from PIL import Image
import matplotlib.pyplot as plt
import dlib
import cv2
import numpy as np
import sqlite3
import io

# Allow DB to take in numpy arrays


def adapt_array(arr):
    return arr.tobytes()


def convert_array(text):
    return np.frombuffer(text)


sqlite3.register_adapter(np.ndarray, adapt_array)
sqlite3.register_converter("array", convert_array)
conn = sqlite3.connect("faces.db", detect_types=sqlite3.PARSE_DECLTYPES)
cursor = conn.cursor().execute(
    "CREATE TABLE IF NOT EXISTS faces (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, face_matrix array UNIQUE)"
)

cursor = conn.cursor().execute("SELECT name, face_matrix FROM faces")
data = cursor.fetchall()

known_face_names = []
known_face_encodings = []
for face in data:
    known_face_names.append(face[0])
    known_face_encodings.append(face[1])

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

video_capture = cv2.VideoCapture(0)
while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()

    # Resize frame of video to 1/4 size for faster face recognition processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

    # Convert the image from BGR color (which OpenCV uses) to RGB color (which
    # face_recognition uses)
    rgb_small_frame = small_frame[:, :, ::-1]

    # Only process every other frame of video to save time
    if process_this_frame:
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(
            rgb_small_frame, face_locations
        )

        face_names = []
        for face_encoding in face_encodings:
            name = None
            if known_face_encodings:
                # See if the face is a match for the known face(s)
                face_distances = face_recognition.face_distance(
                    known_face_encodings, face_encoding
                )
                best_match_index = np.argmin(face_distances)
                if face_distances[best_match_index] < 0.6:
                    name = known_face_names[best_match_index]

            if not name:
                print("What is your name?")
                name = input()
                known_face_names.append(name)
                known_face_encodings.append(face_encoding)
                conn.cursor().execute(
                    "INSERT INTO faces (name, face_matrix) VALUES (?, ?)",
                    (name, face_encoding),
                )
                conn.commit()

            face_names.append(name)

    process_this_frame = not process_this_frame

    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was
        # scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        color = (0, 255, 0)

        if name == "unknown":
            color = (0, 0, 255)

        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), color, 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), color, cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow("Video", frame)

    try:
        # Hit 'q' on the keyboard to quit!
        if cv2.waitKey(1) & 0xFF == ord("q"):
            # Release handle to the webcam
            video_capture.release()
            cv2.destroyAllWindows()
            break
    except:
        break

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
