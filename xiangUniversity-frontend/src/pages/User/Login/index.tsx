import Footer from '@/components/Footer';
import { userLogin } from '@/services/backend/userController';
import {
  userLoginByEmailUsingPost,
  userLoginUseEmailUsingPost,
} from '@/services/xxubackend/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Button, Input, message, Tabs } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState('');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  /**
   * 账号密码登录
   *
   * @param values
   * @returns
   */
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLogin({
        ...values,
      });

      const defaultLoginSuccessMessage = '登录成功！';
      message.success(defaultLoginSuccessMessage);
      // 保存已登录用户信息
      setInitialState({
        ...initialState,
        currentUser: res.data,
      });
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `登录失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };

  /**
   * 获取邮箱验证码
   */
  const handleSendEmailCode = async () => {
    try {
      if (email == '') {
        message.error('邮箱不能为空');
        return;
      }
      // 登录
      const res = await userLoginByEmailUsingPost({
        userEmailAccount: email,
      });

      const defaultLoginSuccessMessage = '发送成功！';
      setLoading(true);
      message.success(defaultLoginSuccessMessage);
      // 保存已登录用户信息
      setInitialState({
        ...initialState,
        emailCurrentUser: res.data,
      });
      const urlParams = new URL(window.location.href).searchParams;
      // history.push(urlParams.get('redirect') || '/');
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `发送失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };

  /**
   * 邮箱登录
   *
   * @returns
   */
  const handleEmailLogin = async (userPassword: any) => {
    try {
      // 获取验证码输入框中的值
      const code = document.getElementById('emailCodeInput').value;
      // 将获取到的值设置为状态中的值
      setEmailCode(code);
      // 登录
      const res = await userLoginUseEmailUsingPost({
        emailCode: code,
        userPassword: userPassword,
      });

      const defaultLoginSuccessMessage = '登录成功！';
      setLoading(true);
      message.success(defaultLoginSuccessMessage);
      // 保存已登录用户信息
      setInitialState({
        ...initialState,
        emailCurrentUser: res.data,
      });
      const urlParams = new URL(window.location.href).searchParams;
      // 等待一秒后执行页面跳转操作
      setTimeout(() => {
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      }, 500);
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `发送失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" style={{ height: '100%' }} src="/logo.svg" />}
          title="香香大学"
          subTitle={'旨在为年轻学子提供参考和指导'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            const { userAccount, userPassword, userEmail, emailVerificationCode } = values;
            if (type === 'account') {
              await handleSubmit(values as API.UserLoginRequest);
            } else if (type === 'email') {
              await handleEmailLogin(userPassword);
            }
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'email',
                label: '邮箱登录',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          ,
          {type === 'email' && (
            <>
              <ProFormText
                name="userEmail"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                  onChange: (e) => setEmail(e.target.value),
                }}
                placeholder={'请输入邮箱'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  id="emailCodeInput"
                  placeholder={'请输入验证码'}
                  style={{ marginRight: '10px' }}
                />
                <Button type="primary" disabled={loading} onClick={handleSendEmailCode}>
                  发送验证码
                </Button>
              </div>
              <br />

              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <a href="register">新用户注册</a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
