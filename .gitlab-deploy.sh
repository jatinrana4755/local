set -f
string=$ip
#testing
"apt-get update -y && apt-get install sshpass"
sshpass -p $pass ubuntu@$ip "cd /home/aakob/localcalls-UI/ && git pull origin master"

