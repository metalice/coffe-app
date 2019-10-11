import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import actions from "store/actions";

const Login = ({ form }) => {
  const { LOGIN_IN_FORM } = actions.user;
  const dispatch = useDispatch();

  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(LOGIN_IN_FORM(values));
      }
    });
  };
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("email", {
          rules: [{ required: true, message: "Please input your email!" }]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "normal_login" })(Login);
