import styled from 'styled-components';

export const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const SearchBox = styled.div`
  padding: 10px;
  border: 1px solid var(--foreground-color);
  border-radius: 40px 0 0 40px;
  width: 30rem;
  height: 40px;
  display: flex;
  flex-direction: row;
  background-color: var(--background-color);
  @media (max-width: 480px){
    width: 7rem;
  }
`;
export const ButtonDiv = styled.div`
  border: 1px solid #f2f2f2;
  border-radius:0 40px 40px 0;
`;

export const StyledInput = styled.input`
   border: none;
   background-color: var(--background-color);
   width: 25rem;
   &:focus {
    outline: none;
  @media (max-width: 480px){
    width: 7rem;
  }
`;

export const MaterialIcons = styled.span`
  color: var(--primary-text-color);
  font-weight: 100;
  padding: 0 10px 0 10px;
`;
export const SearchButton = styled.button`
  border: none;
  border: 1px solid #f2f2f2;
  padding: 5px;
  border-radius: 0 40px 40px 0;
  background-color: var(--foreground-color);
  color: var(--primary-text-color);
  &:hover {
    background-color: var(--foreground-color);
    color: var(--secondary-text-color);
  }
`;

export const CommentMiddle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px
`;

export const CommentFlex = styled.div`
  display: flex;
  margin-bottom: 30px;
  `;
export const AuthorImg = styled.img`
  display: flex;
  border-radius: 50%;
  margin-right: 10px;
  `;
  export const ParseDate = styled.p`
    font-size: 12px;
    margin-left: 10px;
    color: var(--sometext-color);

  `;
  export const LikeDiv = styled.div`
    display: flex;
    align-items: center;
  `;
  export const LikeContent = styled.div`
    display: flex;
    align-items: center;
  `;
  export const CommentUp = styled.div`
    display: flex;
    align-items: center;
  `;
  export const CommentTitle = styled.h4`
      color: var(--primary-text-color);

`;
export const CommentUpContent = styled.p`
      color: var(--primary-text-color);
`;
export const CommentContent = styled.h4`
      color: var(--primary-text-color);
`;



