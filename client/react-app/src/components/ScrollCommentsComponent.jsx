import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton, Rate } from 'antd';
import Cookies from 'js-cookie';

const ScrollCommentsComponent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const jwtToken = Cookies.get('jwtToken');
    const dbToken = Cookies.get('dbToken');

    if (jwtToken) {
      fetch(`${apiUrl}/api/1.0/user/fetchComments`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          dbToken,
        },
      })
        .then((res) => res.json())
        .then((body) => {
          setData([...data, ...body]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: '570px',
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        hasMore={data.length < 5}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.profile_photo_url} size="large" />}
                  title={<a href="https://ant.design">{item.author_name}</a>}
                  description={
                    <>
                      <Rate
                        disabled
                        defaultValue={item.rating}
                        style={{ fontSize: '14px' }}
                      />
                      <div>{item.relative_time_description}</div>
                    </>
                  }
                />
                <p
                  style={{
                    fontFamily: "'Microsoft YaHei', '黑体', '宋体', sans-serif",
                    fontSize: '14px',
                    textIndent: '2em',
                    padding: '10px',
                    marginTop: '20px',
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '0.5px',
                  }}
                >
                  {item.text}
                </p>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default ScrollCommentsComponent;
