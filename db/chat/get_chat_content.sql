select
    m.message_time,
    m.message_content,
    u.user_name,
    u.user_pic
from chat c
    join message m on m.message_chat_id = c.id
    join users u on m.message_author_id = u.id
where c.id = $1;