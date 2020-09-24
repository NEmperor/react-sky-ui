import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './style.less'

const Login = (props) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.form}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="admin" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="admin"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>

  );
};


export default connect()(Login);