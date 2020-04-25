import styled, { keyframes } from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

interface SelectedLinkProps {
  hasSelected: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;

      div {
        & + div {
          margin-left: 32px;
        }

        a {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          transition: opacity 0.2s;

          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const SelectedLink = styled.div<SelectedLinkProps>`
  width: 73px;
  height: ${({ hasSelected }) => (hasSelected ? '2px' : '0')};
  animation: ${({ hasSelected }) => hasSelected && fadeIn} 0.4s linear;
  background: #ff872c;
`;
