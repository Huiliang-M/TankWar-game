# tankapp
Team member:Alberto Mancini, Huiliang Huang,Yangshan Huang,Yingjing Chen

heroku link:https://csc667tankapp.herokuapp.com/

### Version
1.1.0

### Usage
Download the file to the local then create tankwar scheme then create tables
1.create table user_info(text username,text email,text password, id serial)
2.create table games(text game_name,text user_name,integer game_member,id serial)
3.create table game_info(text game_name,boolean prepare,text user_name)

Then use node app to run the app. Go to the localhost:3000 to test the app

