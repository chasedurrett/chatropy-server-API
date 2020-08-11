insert into users
    (
    user_name,
    user_password,
    user_pic,
    user_cake_day
    )
values
    (
        $1,
        $2,
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficon-icons.com%2Ficons2%2F1234%2FPNG%2F512%2F1492719128-robot_83633.png&f=1&nofb=1',
        $3
)
returning *;