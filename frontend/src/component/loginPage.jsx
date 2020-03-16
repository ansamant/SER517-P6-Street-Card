import React, { Component } from "react";
import "antd/dist/antd.css";
import "./loginPage.css";
import logo from "./streetcard.png";
import { Layout } from "antd";
import LoginForm from "./loginForm";

const { Header, Content, Footer } = Layout;

class HeaderTest extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header className="site-layout-header">
          <img className="logo" src={logo} />
          <div className="form-login">
            <LoginForm></LoginForm>
          </div>
        </Header>
        <Content className="content">
          <div className="site-layout-content-login">
            {/* place map hear */}
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default HeaderTest;
