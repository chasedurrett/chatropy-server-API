delete from message where message_chat_id = $1;
delete from chat_users where chat_id = $1;
delete from chat where id = $1;