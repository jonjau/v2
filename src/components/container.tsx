import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spacing[20]};

  @media (min-width: ${({ theme }) => theme.breakpoints.phone}) {
    max-width: 20rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet_portrait}) {
    max-width: 40rem;
    padding-left: ${({ theme }) => theme.spacing[6]};
    padding-right: ${({ theme }) => theme.spacing[6]};
    padding-top: ${({ theme }) => theme.spacing[40]};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet_landscape}) {
    max-width: 50rem;
  }
`;

export default Container;
