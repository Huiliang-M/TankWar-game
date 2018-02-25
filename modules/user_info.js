const db = require('./index');
const insert_user='INSERT INTO user_info( username,email,password) VALUES($1,$2,$3) returning *'
const check_user="SELECT * FROM user_info s WHERE s.name=$1 and s.password=$2 VALUES($1,$2)"
const FIND_BY_USERNAME = 'SELECT * FROM user_info WHERE username=$1'
const find_by_id = 'SELECT * FROM user_info WHERE id=$1'
module.exports = {
	insert_user: function(user_name,email,password) {
        return db.one( insert_user, [user_name,email,password] )
    },
    findByUsername: function(username, cb) {
	    db.oneOrNone( FIND_BY_USERNAME, username )
	      .then(user => {
	        cb(null, user)
	      })
	      .catch(err => {
	        cb(err, 'could not find user by username')
	      })
    },

    findUser:function(username){
       // console.log('find user  '+username);
        return db.oneOrNone( FIND_BY_USERNAME, username);
    },
    
    findByIdPassport: function(id,cb){
         db.oneOrNone(find_by_id,id)
         	.then(user=>{
         		cb(null, user)
         	})
         	.catch(err => {
	            cb(err, 'could not find user by username')
	        })
    }

    
}