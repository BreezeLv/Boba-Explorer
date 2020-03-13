import styled from 'styled-components';

const A = styled.a`
    display: block;
    padding: 3px 0;
    font-weight: bold;
    text-decoration: none;
    color:#666;

    &:hover, &:focus, &:active {
        color:#444;
        text-decoration:underline;
    }
`;

export default A;