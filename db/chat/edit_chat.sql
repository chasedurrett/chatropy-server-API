update chat 
set 
    chat_name = $2,
    chat_bio = $3
where 
    id = $1
returning *;