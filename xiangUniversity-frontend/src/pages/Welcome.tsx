import { listPostByPageUsingGet } from '@/services/xxubackend/postController';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar, Button, Card, Divider, Input, List, Space, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
const { Search } = Input;

/**
 * 默认分页参数
 */
const DEFAULT_PAGE_PARAMS: PageRequest = {
  current: 1,
  pageSize: 10,
  sortField: 'createTime',
  sortOrder: 'descend',
};

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [searchValue, setSearchValue] = useState<any>(''); // 用于存储搜索框的值
  const [dataList, setDataList] = useState<API.Post[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>();
  // 搜索条件
  const [searchParms, setSearchParms] = useState<API.PostQueryRequest>({
    ...DEFAULT_PAGE_PARAMS,
  });

  const handleSearch = async () => {
    setLoading(true);
    const res = await listPostByPageUsingGet(searchParms);

    setDataList(res.data?.records ?? []);
    setTotal(Number(res.data?.total) ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [searchParms]);

  /**
   * 标签列表
   * @param tags
   */
  const tagListView = (tags?: string) => {
    if (!tags) {
      return <></>;
    }

    return (
      <div style={{ marginBottom: 16 }}>
        <Tag color="red" key={tags}>
          {tags}
        </Tag>
      </div>
    );
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <PageContainer>
      <Search
        placeholder="搜索想了解的经验"
        enterButton="搜索"
        size="large"
        showCount
        onSearch={(value: string) => {
          setSearchParms({
            ...DEFAULT_PAGE_PARAMS,
            content: value,
          });
        }} // 传递正确类型的参数给 onSearch
        loading={loading}
      />
      <Divider />
      <Card>
        <List<API.Post>
          itemLayout="vertical"
          size="large"
          dataSource={dataList}
          pagination={{
            current: searchParms.current,
            pageSize: searchParms.pageSize,
            total,
            onChange(current: number, pageSize: number) {
              setSearchParms({
                ...searchParms,
                current,
                pageSize,
              });
            },
          }}
          renderItem={(data) => (
            <List.Item
              key={data.content}
              actions={[
                <IconText icon={EyeOutlined} text={data.viewNum} key="list-vertical-star-o" />,
                <Button>
                  <IconText icon={LikeOutlined} text={data.thumbNum} key="list-vertical-like-o" />
                </Button>,
                <Button>
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                </Button>,
              ]}
              extra={<img width={272} alt="logo" src={data.photo} />}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://img2.baidu.com/it/u=528597190,3213543828&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" />
                }
                title={data.loveExp}
                description={moment(data.createTime).fromNow()}
              />
              {tagListView(data.job)}

              {data.content}
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
