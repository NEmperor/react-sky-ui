import React from 'react'
import { Menu, Dropdown, Avatar,Button } from 'antd'
import { connect } from 'react-redux'

@connect()
class GlobalHeader extends React.Component {

  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }
  };


  render(){

    const menu = (
      <Menu onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <div style={{float:"right", cursor:"pointer",paddingRight:"30px"}}>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>Knight</Avatar>
        </Dropdown>
      </div>
    )
  }
}

  

  


export default GlobalHeader
