cat .env | awk '{ print "export " $1 }'  
