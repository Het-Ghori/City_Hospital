import React from 'react';
import {
    CardWrapper,
    DoctorImg,
    DoctorInfo,
    ImgBox,
    Media,
    DoctorName,
    SocialWapper,
    DoctorDesc,
    DoctorPosition,
    DoctorDesgi
} from './DoctorCard.Style';

function DoctorCard({
    variant,
    cardType,
    socialMedia,
    drInfo,
    path,
    imgPath,
    imgAlt,
    drDesgi,
    drDesc,
    drName,
    drPost }) {
    return (
        <CardWrapper variant={variant} as={cardType} to={path}>
            <ImgBox>
                <DoctorImg src={imgPath} alt={imgAlt} />
            </ImgBox>
            <DoctorInfo>
                <DoctorName>{drName}</DoctorName>
                <DoctorDesgi>{drDesgi}</DoctorDesgi>
                <DoctorPosition>{drPost}</DoctorPosition>
                <DoctorDesc>{drDesc}</DoctorDesc>
                <SocialWapper>
                    {
                        socialMedia.map((value, index) => {
                            return (
                                <Media key={'media' + index}>{value}</Media>
                            )
                        })
                    }
                </SocialWapper>
            </DoctorInfo>
        </CardWrapper>
    );
}

export default DoctorCard;