import { styled } from "styled-components";

export const CardWrapper = styled.div`
    position: relative;
    box-shadow: 0px 2px 15px rgba(44, 73, 100, 0.08);
    padding: 30px;
    border-radius: 10px;
    display: flex;
    align-items: flex-start!important;
    background-color: #FFFFFF;
    height: 100%;
    &:hover img {
        transform: scale(1.1);
    }    
`
export const ImgBox = styled.div`
    overflow: hidden;
    width: 200px;
    border-radius: 50%;
`
export const DoctorImg = styled.img`
    transition: ease-in-out 0.3s;
    max-width: 100%;
    height: 150px;
`
export const DoctorInfo = styled.div`
    padding-left: 30px;
    width: 100%;
`
export const DoctorName = styled.h4`
    font-weight: 700;
    margin-bottom: 5px;
    font-size: 20px;
    color: #2c4964;
`

export const DoctorDesgi = styled.span`
    font-size: 17px;
    color: black;
`
export const DoctorPosition = styled.span`
    display: block;
    font-size: 15px;
    padding-bottom: 10px;
    position: relative;
    font-weight: 500;
    color: #444444;
    &:after {
        content: '';
        position: absolute;
        display: block;
        width: 50px;
        height: 1px;
        background: #b2c8dd;
        bottom: 0;
        left: 0;
    }
`
export const DoctorDesc = styled.p`
    margin: 10px 0 0 0;
    font-size: 14px;
    color: #444444;
`
export const SocialWapper = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    & :not(:last-child) {
        margin-right: 8px
    }
`
export const Media = styled.a`
    transition: ease-in-out 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 32px;
    height: 32px;
    background: #a0bcd5;
    &:hover {
        background-color: #FF6337;
    }
    & i {
        color: #fff;
        font-size: 16px;
        margin: 0 2px;
    }
`