-- 创建库
create database if not exists my_db;

-- 切换库
use my_db;

-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userName     varchar(256)                           null comment '用户昵称',
    userAccount  varchar(256)                           not null comment '账号',
    userAvatar   varchar(1024)                          null comment '用户头像',
    gender       tinyint                                null comment '性别',
    userRole     varchar(256) default 'user'            not null comment '用户角色：user / admin',
    userPassword varchar(512)                           not null comment '密码',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    constraint uni_userAccount
        unique (userAccount)
) comment '用户';

-- 帖子表
create table if not exists post
(
    id            bigint auto_increment comment 'id' primary key,
    age           int comment '年龄',
    gender        tinyint  default 0                 not null comment '性别（0-男, 1-女）',
    education     varchar(512)                       null comment '学历',
    place         varchar(512)                       null comment '地点',
    job           varchar(512)                       null comment '职业',
    contact       varchar(512)                       null comment '联系方式',
    loveExp       varchar(512)                       null comment '感情经历',
    content       text                               null comment '内容（个人介绍）',
    photo         varchar(1024)                      null comment '照片地址',
    reviewStatus  int      default 0                 not null comment '状态（0-待审核, 1-通过, 2-拒绝）',
    reviewMessage varchar(512)                       null comment '审核信息',
    viewNum       int                                not null default 0 comment '浏览数',
    thumbNum      int                                not null default 0 comment '点赞数',
    userId        bigint                             not null comment '创建用户 id',
    createTime    datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime    datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete      tinyint  default 0                 not null comment '是否删除'
) comment '帖子';

INSERT INTO post (age, gender, education, place, job, contact, loveExp, content, photo, reviewStatus, viewNum, thumbNum, userId, createTime, updateTime, isDelete)
VALUES
(25, 0, '本科', '北京', '工程师', '123456789', '曾经经历过一段不顺利的感情，但从中学到了成长...', '我是一个爱好旅行的人，喜欢到处探索不同的文化和风景。在旅途中，我收获了许多美好的回忆，也结识了许多志同道合的朋友。', 'http://example.com/photo1.jpg', 1, 100, 50, 1, '2024-04-11 12:00:00', '2024-04-11 12:00:00', 0),
(30, 1, '硕士', '上海', '医生', '987654321', '我曾经经历过一段令人难忘的恋情，虽然最终没有在一起，但那段经历让我成长了许多...', '我热爱音乐，喜欢弹吉他，音乐是我生活中不可或缺的一部分。我也喜欢和朋友一起分享音乐，一起演奏，一起欢笑。', 'http://example.com/photo2.jpg', 1, 150, 70, 2, '2024-04-11 12:10:00', '2024-04-11 12:10:00', 0),
(28, 0, '博士', '广州', '教师', '135792468', '我是一个热爱生活的人，对于每一天都充满了期待和憧憬...', '我热爱摄影，喜欢记录生活中的点点滴滴。在我眼中，世界是如此的美丽，我希望通过我的镜头将这些美好留存下来。', 'http://example.com/photo3.jpg', 0, 80, 40, 3, '2024-04-11 12:20:00', '2024-04-11 12:20:00', 0),
(35, 1, '本科', '深圳', '律师', '246813579', '我曾经游历过世界各地，见识了不同国家的文化和风土人情...', '我是一个喜欢瑜伽的人，瑜伽让我找到了内心的平静与宁静，也让我的身体更加健康灵活。我喜欢在清晨或傍晚的阳光下练习瑜伽，感受大自然的美好。', 'http://example.com/photo4.jpg', 1, 120, 60, 4, '2024-04-11 12:30:00', '2024-04-11 12:30:00', 0),
(22, 0, '大专', '成都', '设计师', '369258147', '我是一个阳光开朗的人，对生活充满了憧憬和热情...', '我热爱绘画，喜欢表达自己的内心世界。每当我感到情绪低落或疲惫时，我就会拿起画笔，用色彩和线条将心情表达出来，这让我感到无比舒畅。', 'http://example.com/photo5.jpg', 0, 90, 45, 5, '2024-04-11 12:40:00', '2024-04-11 12:40:00', 0);
