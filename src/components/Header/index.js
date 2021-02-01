import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import Logo from '../../assets/logo.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={Logo} alt="logo" style={{ height: 40 }} />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meus dados</Link>
            </div>
            <img src={Logo} alt="logoMenor" />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
