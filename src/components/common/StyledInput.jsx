import styled from 'styled-components';

const StyledInput = styled.input`
  font-size: 1rem;
  outline: none;
  padding: 0.7rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
  &:focus {
    border-color: #c1aaff;
  }
  & + & {
    margin-top: 1.3rem;
  }
`;

export default StyledInput;
