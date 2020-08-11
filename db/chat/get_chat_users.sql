select
    u.id,
    u.user_name,
    u.user_pic
from chat_users cu
    join users u on u.id = cu.chat_user_id
where cu.chat_id = $1
returning *;