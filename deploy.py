import subprocess
subprocess.Popen('start /wait npm start', shell=True)
subprocess.Popen('cd backend & start /wait nodemon server', shell=True)
