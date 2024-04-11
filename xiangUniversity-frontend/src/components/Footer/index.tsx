import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'Coderxiang';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'GitHub',
          title: (
            <>
              <GithubOutlined /> GitHub
            </>
          ),
          href: 'https://github.com/xiangxiang62',
          blankTarget: true,
        },
        {
          key: '博客',
          title: '博客',
          href: 'http://xiangworld.cn',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
