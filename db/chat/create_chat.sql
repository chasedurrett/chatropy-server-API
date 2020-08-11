insert into chat
    (
    chat_name,
    chat_pic,
    chat_bio,
    chat_author,
    chat_cake_day
    )
values
    (
        $1,
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fcircle-icons-1%2F64%2Fglobe-512.png&f=1&nofb=1',
        $2,
        $3,
        $4
)
returning *;