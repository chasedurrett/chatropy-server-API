insert into message
    (
    message_chat_id,
    message_author_id,
    message_content,
    message_time
    )
values
    (
        $1,
        $2,
        $3,
        $4
)
returning *;