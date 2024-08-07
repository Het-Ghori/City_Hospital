import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import TitleBox from '../../UI/titlePart/TitleBox';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../redux/action/doctor.action';

const doctorData = [
    {
      id: 1,
      name: 'Atha Smith',
      designation: 'Chief Medical Officer',
      description: 'Duis sagittis rutrum neque, quis tincidunt arcu pretiumac.',
      url: '../assets/img/doctors/doctors-1.jpg'
    },
    {
      id: 2,
      name: 'John White',
      designation: 'Anesthesiologist',
      description: 'Aenean ac turpis ante. Mauris velit sapien.',
      url: '../assets/img/doctors/doctors-2.jpg'
    },
    {
      id: 3,
      name: 'Umika Loha',
      designation: 'Cardiology',
      description: 'Curabitur luctus eleifend odio. Phasellus placerat mi.',
      url: '../assets/img/doctors/doctors-3.jpg'
    },
    {
      id: 4,
      name: 'Daimy Smith',
      designation: 'Neurosurgeon',
      description: ' Morbi vulputate, tortor nec pellentesque molestie, erosnisi ornare purus.',
      url: '../assets/img/doctors/doctors-4.jpg'
    }
  ]

function Doctor() {
    const { id } = useParams();
    const [doctorD, setDoctorD] = useState(doctorData)

    const doctor = doctorD.filter((value) => value.id === parseInt(id))
    console.log(doctor);
    return (
        <main>
            {doctor ? (
                <section className="doctor_details">
                    <div className="container">
                        <div className="row">
                            <div className="col-5">
                                <div className="doctor_details_image">
                                    <img src={doctor[0].url} alt="img" />
                                    <h4>Dr. {doctor.name}</h4>
                                    <span>{doctor.post}</span>
                                    <ul className="social">
                                        <li><a href="/"><i className="fab fa-facebook-f" /></a></li>
                                        <li><a href="/"><i className="fab fa-twitter" /></a></li>
                                        <li><a href="/"><i className="fab fa-linkedin-in" /></a></li>
                                        <li><a href="/"><i className="fab fa-instagram" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6">
                                <TitleBox
                                    type='left'
                                    titleText={<>Hello i'm Dr. {doctor.name} <br /> Introducing My Self.</>}
                                    subTitleText={[
                                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duisaute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.'
                                    ]}
                                />
                                <div className="signature_image text-end">
                                    <img src="../assets/img/signature.png" alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className='row bottom_part'>
                            <div className='col-10'>
                                <TitleBox
                                    type='left'
                                    OrangeTitleText='My Skills'
                                    titleText='I Have Explained about Myself A bit'
                                    subTitleText={['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.']}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    );
}

export default Doctor;