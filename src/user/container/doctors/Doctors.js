import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DoctorCard from '../../UI/doctorCard/DoctorCard';
import TitleBox from '../../UI/titlePart/TitleBox';

const doctorData = [
    {
        id: 1,
        name: "Atha Smith",
        designation: "Chief Medical Officer",
        description: "Duis sagittis rutrum neque, quis tincidunt arcu pretiumac.",
        url: "../assets/img/doctors/doctors-1.jpg",
    },
    {
        id: 2,
        name: "John White",
        designation: "Anesthesiologist",
        description: "Aenean ac turpis ante. Mauris velit sapien.",
        url: "../assets/img/doctors/doctors-2.jpg",
    },
    {
        id: 3,
        name: "Umika Loha",
        designation: "Cardiology",
        description: "Curabitur luctus eleifend odio. Phasellus placerat mi.",
        url: "../assets/img/doctors/doctors-3.jpg",
    },
    {
        id: 4,
        name: "Daimy Smith",
        designation: "Neurosurgeon",
        description:
            " Morbi vulputate, tortor nec pellentesque molestie, erosnisi ornare purus.",
        url: "../assets/img/doctors/doctors-4.jpg",
    },
];

function Doctors() {
    const [doctorFData, setDoctorFData] = useState(doctorData);
    return (
        <main>
            <section id="doctors" className="doctors">
                <div className="container">
                    <TitleBox
                        titleText='Doctors'
                        subTitleText={['Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et, tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.']} />
                    <div className="row">
                        {
                            doctorFData.map((doctor, i) => {
                                return (

                                    <div key={doctor.id} className={`col-lg-6 ${doctor.id !== '1' ? 'mt-4' : ''}${doctor.id === '2' ? ' mt-lg-0' : ''}`}>
                                        <DoctorCard
                                            variant='Horizontale'
                                            cardType={Link}
                                            // path={'/doctor/' + doctor.id}
                                            imgPath={'../assets/img/doctors/doctors-' + doctor.id + '.jpg'}
                                            imgAlt='img'
                                            drName={doctor.name}
                                            drPost={doctor.post}
                                            drDesc={doctor.description}
                                            socialMedia={[
                                                <i className="ri-twitter-fill"></i>,
                                                <i className="ri-facebook-fill"></i>,
                                                <i className="ri-instagram-fill"></i>,
                                                <i className="ri-linkedin-box-fill"></i>
                                            ]}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Doctors;