import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Container, SelectedLink } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const links = [
  {
    text: 'Listagem',
    path: '/',
  },
  {
    text: 'Importar',
    path: '/import',
  },
];

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { path } = useRouteMatch();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          {links.map(link => (
            <div key={link.text}>
              <Link to={link.path}>{link.text}</Link>
              <SelectedLink hasSelected={link.path === path} />
            </div>
          ))}
        </nav>
      </header>
    </Container>
  );
};

export default Header;
