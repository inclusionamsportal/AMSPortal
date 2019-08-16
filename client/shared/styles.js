import styled from 'styled-components'

export const secondaryColor = '#53ccf1'
export const secondaryColorHover = '#7ba5ca'
export const whiteSmoke = '#ececec'
export const white = '#fff'
export const gray = '#888'
export const lightGray = '#dcdcdc'
export const red = '#c72525'
export const flatRed = '#b96969'
export const brandyRose = '#bb7c75'
export const green = '#44a23f'
export const greenHover = '#77a274'
export const black = '#333'
export const yellow = '#e4bb32'

export const SectionHeading = styled.h2`
  border-bottom: 1px solid ${whiteSmoke};
  margin-bottom: 0;
  margin-top: 0.6rem;
  padding-bottom: 0.2rem;
`

export const Button = styled.button`
  padding: 1rem;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  background-color: ${white};
  color: ${black};
  font-size: 1rem;

  &:hover {
    background-color: ${greenHover};
    border-color: ${greenHover};
  }
`

export const Container = styled.div`
  margin: 0 4rem;
`

export const FlexContainer = styled.div`
  margin: 0 4rem;
  display: flex;
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`
