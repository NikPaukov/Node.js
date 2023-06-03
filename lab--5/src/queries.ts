export const task1Query = function () {
    return "select users.id," +
        "users.name," +
        "users.avatar_url," +
        "channels.photo_url," +
        "channels.description," +
        "channels.created_at " +
        "from users left join channels on channels.user_id = users.id "+
        "order by channels.created_at";
}

export const task2Query = function () {
    return "select count(likes) as likes, videos.* " +
        " from videos join likes on (likes.video_id = videos.id) " +
        "where likes.positive " +
        "group by videos.id " +
        "order by count(likes) desc " +
        "limit 5";
}

export const task3Query = function (name: string) {
    return "select videos.* from subscriptions " +
        "inner join channels on (channels.id = subscriptions.channel_id) " +
        "inner join videos on (videos.channel_id = channels.id) " +
        "where subscriptions.user_id=(select id from users where name='Stephanie Bulger') " +
        "order by videos.published_at desc;";
}

export const task4Query = function (id: string) {
    return "select channels.*, " +
        "(select count(*) from subscriptions as subs " +
        `where subs.channel_id = '${id}') ` +
        `from channels where channels.id = '${id}'`;
}

export const task5Query = function (date: string) {
    return "select videos.*, count(*) as likes_count from videos " +
        "inner join likes on (likes.video_id = videos.id) " +
        "group by videos.id " +
        `having count(*)>4 and videos.published_at>'${date}' ` +
        "order by count(likes) desc " +
        "limit 10";
}

export const task6Query = function (name: string) {
    return "    select u.name," +
        "    u.avatar_url," +
        "    c.photo_url," +
        "    c.description," +
        "    s.level," +
        "    s.subscribed_at from channels as c" +
        "    inner join users as u on (u.id = c.user_id)" +
        "    join subscriptions as s on (s.channel_id = c.id)" +
        `    where s.user_id = (select id from users where name = '${name}')` +
        "    order by s.level='vip' desc," +
        "    s.level='follower' desc," +
        "    s.level='fan' desc," +
        "    s.level='standard' desc," +
        "    s.subscribed_at desc";
}